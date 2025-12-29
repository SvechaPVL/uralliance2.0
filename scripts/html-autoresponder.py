#!/usr/bin/env python3
"""
HTML Autoresponder для info@uralliance.ru
Отслеживает новые письма через IMAP и отправляет HTML-ответ через SMTP.

ВАЖНО: Отвечает ТОЛЬКО на письма, полученные ПОСЛЕ запуска скрипта!
"""

import imaplib
import email
from email.header import decode_header
from email.utils import parseaddr
import time
import json
import os
from pathlib import Path
from datetime import datetime
import logging

import resend

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Конфигурация (поддержка Docker и локального запуска)
def get_config():
    """Определяет пути в зависимости от окружения."""
    # Docker paths
    docker_template = Path('/app/templates/welcome-email.html')
    docker_processed = Path('/app/data/.processed_emails.json')

    # Local paths (относительно скрипта)
    local_template = Path(__file__).parent.parent / 'email-templates' / 'welcome-email.html'
    local_processed = Path(__file__).parent / '.processed_emails.json'

    # Выбираем пути: Docker если существует /app/templates, иначе локальные
    if docker_template.parent.exists():
        template_path = docker_template
        processed_path = docker_processed
    else:
        template_path = local_template
        processed_path = local_processed

    return {
        'imap_server': 'imap.yandex.ru',
        'email': os.getenv('EMAIL_ADDRESS', 'info@uralliance.ru'),
        # Пароль приложения Яндекс для IMAP
        'imap_password': os.getenv('YANDEX_APP_PASSWORD', ''),
        # API ключ Resend для отправки писем
        'resend_api_key': os.getenv('RESEND_API_KEY', ''),
        'check_interval': int(os.getenv('CHECK_INTERVAL', '60')),
        'processed_file': processed_path,
        'html_template': template_path,
    }

CONFIG = get_config()

# Список email-адресов, которым НЕ отвечать (спам, no-reply, и т.д.)
IGNORE_PATTERNS = [
    'noreply@', 'no-reply@', 'mailer-daemon@', 'postmaster@',
    'notification@', 'notifications@', 'alert@', 'alerts@',
    'info@uralliance.ru',  # не отвечаем сами себе
    'uralliance.ru',  # не отвечаем на письма с нашего домена
]

# Анти-спам: не отвечаем одному и тому же человеку чаще чем раз в N часов
RESPONSE_COOLDOWN_HOURS = int(os.getenv('RESPONSE_COOLDOWN_HOURS', '24'))


def load_processed_data() -> dict:
    """Загружает данные: обработанные email ID и историю ответов."""
    if CONFIG['processed_file'].exists():
        try:
            with open(CONFIG['processed_file'], 'r') as f:
                data = json.load(f)
                return {
                    'processed': set(data.get('processed', [])),
                    'responded_to': data.get('responded_to', {})  # {email: timestamp}
                }
        except Exception as e:
            logger.error(f"Ошибка загрузки данных: {e}")
    return {'processed': set(), 'responded_to': {}}


def save_processed_data(processed: set, responded_to: dict):
    """Сохраняет данные: обработанные email ID и историю ответов."""
    # Храним только последние 1000 записей ID
    processed_list = list(processed)[-1000:]

    # Очищаем старые записи responded_to (старше 7 дней)
    cutoff = datetime.now().timestamp() - (7 * 24 * 3600)
    responded_to_clean = {
        email: ts for email, ts in responded_to.items()
        if ts > cutoff
    }

    with open(CONFIG['processed_file'], 'w') as f:
        json.dump({
            'processed': processed_list,
            'responded_to': responded_to_clean,
            'updated': datetime.now().isoformat()
        }, f)


def can_respond_to_sender(email_addr: str, responded_to: dict) -> bool:
    """Проверяет, можно ли отвечать этому отправителю (анти-спам)."""
    email_lower = email_addr.lower()
    if email_lower in responded_to:
        last_response = responded_to[email_lower]
        cooldown_seconds = RESPONSE_COOLDOWN_HOURS * 3600
        if datetime.now().timestamp() - last_response < cooldown_seconds:
            hours_ago = (datetime.now().timestamp() - last_response) / 3600
            logger.info(f"⏳ Пропускаем {email_addr} - уже отвечали {hours_ago:.1f}ч назад (cooldown {RESPONSE_COOLDOWN_HOURS}ч)")
            return False
    return True


# Обратная совместимость
def load_processed_emails() -> set:
    """Загружает список обработанных email ID (deprecated, use load_processed_data)."""
    return load_processed_data()['processed']


def save_processed_emails(processed: set):
    """Сохраняет список обработанных email ID (deprecated)."""
    data = load_processed_data()
    save_processed_data(processed, data.get('responded_to', {}))


def decode_email_header(header: str) -> str:
    """Декодирует заголовок email."""
    if not header:
        return ''
    decoded_parts = []
    for part, encoding in decode_header(header):
        if isinstance(part, bytes):
            decoded_parts.append(part.decode(encoding or 'utf-8', errors='replace'))
        else:
            decoded_parts.append(part)
    return ''.join(decoded_parts)


def should_respond(from_email: str) -> bool:
    """Проверяет, нужно ли отвечать на это письмо."""
    from_email_lower = from_email.lower()
    for pattern in IGNORE_PATTERNS:
        if pattern in from_email_lower:
            logger.info(f"Пропускаем {from_email} (паттерн: {pattern})")
            return False
    return True


def load_html_template() -> str:
    """Загружает HTML-шаблон письма."""
    with open(CONFIG['html_template'], 'r', encoding='utf-8') as f:
        return f.read()


def send_html_response(to_email: str, original_subject: str):
    """Отправляет HTML-ответ через Resend API."""
    try:
        # Тема письма
        subject = f'Re: {original_subject}' if original_subject else 'Заявка получена — ЮрАльянс'

        # Текстовая версия (fallback)
        text_content = """Благодарим за обращение в ЮрАльянс!

Ваше письмо получено и будет обработано в ближайшие часы.

Наши услуги:
• Регистрация и ликвидация ООО, ИП
• Электронная подпись (ЭЦП), Рутокен
• Публикация «Вестник» и «Федресурс»
• Разработка сайтов и CRM-систем

Телефон: +7 (423) 202-88-78
Сайт: https://uralliance.ru

С уважением,
ООО "ЮрАльянс"
"""

        # HTML версия
        html_content = load_html_template()

        # Отправляем через Resend API
        resend.api_key = CONFIG['resend_api_key']
        result = resend.Emails.send({
            "from": f"ООО ЮрАльянс <{CONFIG['email']}>",
            "to": [to_email],
            "subject": subject,
            "html": html_content,
            "text": text_content,
        })

        logger.info(f"✅ HTML-ответ отправлен на {to_email} (id: {result.get('id', 'unknown')})")
        return True

    except Exception as e:
        logger.error(f"❌ Ошибка отправки на {to_email}: {e}")
        return False


def check_new_emails(start_time: datetime):
    """Проверяет новые письма и отправляет автоответы.

    Args:
        start_time: Время запуска скрипта. Отвечаем только на письма после этого времени.
    """
    data = load_processed_data()
    processed = data['processed']
    responded_to = data['responded_to']
    new_processed = set()

    # Формат даты для IMAP SINCE (DD-Mon-YYYY)
    since_date = start_time.strftime('%d-%b-%Y')

    try:
        # Подключаемся к IMAP
        with imaplib.IMAP4_SSL(CONFIG['imap_server']) as imap:
            imap.login(CONFIG['email'], CONFIG['imap_password'])
            imap.select('INBOX')

            # Ищем непрочитанные письма ТОЛЬКО с даты запуска скрипта
            search_criteria = f'(UNSEEN SINCE {since_date})'
            status, messages = imap.search(None, search_criteria)
            if status != 'OK':
                logger.error("Ошибка поиска писем")
                return

            email_ids = messages[0].split()
            if not email_ids:
                logger.debug("Новых писем нет")
                return

            logger.info(f"Найдено {len(email_ids)} новых писем с {since_date}")

            for email_id in email_ids:
                email_id_str = email_id.decode()

                # Уже обработано?
                if email_id_str in processed:
                    continue

                # Получаем письмо
                status, msg_data = imap.fetch(email_id, '(RFC822)')
                if status != 'OK':
                    continue

                raw_email = msg_data[0][1]
                msg = email.message_from_bytes(raw_email)

                # Проверяем дату письма - должно быть ПОСЛЕ запуска скрипта
                date_header = msg.get('Date', '')
                if date_header:
                    try:
                        from email.utils import parsedate_to_datetime
                        email_date = parsedate_to_datetime(date_header)
                        # Если письмо отправлено ДО запуска скрипта - пропускаем
                        if email_date.replace(tzinfo=None) < start_time:
                            logger.info(f"⏭️ Пропускаем старое письмо (получено {email_date.strftime('%H:%M:%S')})")
                            new_processed.add(email_id_str)
                            continue
                    except Exception:
                        pass  # Если не можем распарсить дату - обрабатываем письмо

                # Получаем данные отправителя
                from_header = decode_email_header(msg.get('From', ''))
                from_name, from_email_addr = parseaddr(from_header)
                subject = decode_email_header(msg.get('Subject', ''))

                logger.info(f"📧 Письмо от: {from_email_addr} | Тема: {subject}")

                # Проверяем, нужно ли отвечать
                if should_respond(from_email_addr):
                    # Анти-спам: проверяем cooldown для этого отправителя
                    if can_respond_to_sender(from_email_addr, responded_to):
                        if send_html_response(from_email_addr, subject):
                            new_processed.add(email_id_str)
                            # Записываем время ответа для анти-спама
                            responded_to[from_email_addr.lower()] = datetime.now().timestamp()
                    else:
                        new_processed.add(email_id_str)  # Cooldown - не отвечаем, но помечаем
                else:
                    new_processed.add(email_id_str)  # Игнорируем (no-reply и т.д.)

    except imaplib.IMAP4.error as e:
        logger.error(f"IMAP ошибка: {e}")
    except Exception as e:
        logger.error(f"Ошибка: {e}")

    # Сохраняем обработанные и историю ответов
    if new_processed or responded_to:
        processed.update(new_processed)
        save_processed_data(processed, responded_to)


def mark_all_as_processed():
    """Помечает все текущие письма как обработанные (для первого запуска)."""
    processed = load_processed_emails()

    try:
        with imaplib.IMAP4_SSL(CONFIG['imap_server']) as imap:
            imap.login(CONFIG['email'], CONFIG['imap_password'])
            imap.select('INBOX')

            # Получаем ВСЕ письма
            status, messages = imap.search(None, 'ALL')
            if status == 'OK':
                email_ids = messages[0].split()
                for email_id in email_ids:
                    processed.add(email_id.decode())

                save_processed_emails(processed)
                logger.info(f"✅ Помечено {len(email_ids)} писем как обработанные")
                return len(email_ids)

    except Exception as e:
        logger.error(f"Ошибка: {e}")
    return 0


def main():
    """Основной цикл."""
    import sys

    if not CONFIG['imap_password']:
        logger.error("❌ Установите переменную YANDEX_APP_PASSWORD с паролем приложения!")
        logger.info("   export YANDEX_APP_PASSWORD='ваш_пароль_приложения'")
        return

    if not CONFIG['resend_api_key']:
        logger.error("❌ Установите переменную RESEND_API_KEY с ключом Resend!")
        logger.info("   export RESEND_API_KEY='re_xxxxx'")
        return

    if not CONFIG['html_template'].exists():
        logger.error(f"❌ HTML-шаблон не найден: {CONFIG['html_template']}")
        return

    # Команда --init: помечает все письма как обработанные (опционально)
    if len(sys.argv) > 1 and sys.argv[1] == '--init':
        logger.info("🔧 Инициализация: помечаем все текущие письма как обработанные...")
        count = mark_all_as_processed()
        logger.info(f"✅ Готово! Помечено {count} писем. Теперь запустите без --init")
        return

    # Фиксируем время запуска - отвечаем ТОЛЬКО на письма после этого времени!
    start_time = datetime.now()

    logger.info("🚀 HTML Autoresponder запущен")
    logger.info(f"   Email: {CONFIG['email']}")
    logger.info(f"   Интервал проверки: {CONFIG['check_interval']} сек")
    logger.info(f"   ⏰ Время старта: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info(f"   📌 Отвечаем ТОЛЬКО на письма после {start_time.strftime('%H:%M:%S')}!")

    # Первый запуск - даём небольшую задержку чтобы не ловить письма "на границе"
    time.sleep(2)

    while True:
        try:
            check_new_emails(start_time)
        except KeyboardInterrupt:
            logger.info("👋 Остановка...")
            break
        except Exception as e:
            logger.error(f"Неожиданная ошибка: {e}")

        time.sleep(CONFIG['check_interval'])


if __name__ == '__main__':
    main()
