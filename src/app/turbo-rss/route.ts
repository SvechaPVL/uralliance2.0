/**
 * Яндекс.Турбо RSS Feed
 * Документация: https://yandex.ru/support/turbo/rss/feed.html
 */

import { NextResponse } from "next/server";
import { contacts } from "@/lib/contacts";

interface TurboPage {
  url: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  pubDate: Date;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru";

  // Страницы для Турбо (9 страниц: главная + 8 ключевых услуг)
  const pages: TurboPage[] = [
    {
      url: `${baseUrl}`,
      title: "Uralliance - Юридические услуги и IT-решения во Владивостоке",
      description:
        "Профессиональные юридические услуги и IT-решения для бизнеса. Разработка сайтов, CRM-систем, чат-ботов.",
      image: `${baseUrl}/og-image.png`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Uralliance</h1>
          <h2>Юридические услуги и IT-решения</h2>
        </header>

        <p>Мы помогаем бизнесу решать юридические вопросы и автоматизировать процессы с помощью современных IT-технологий.</p>

        <h3>Наши услуги</h3>

        <div data-block="widget-feedback" data-stick="false">
          <div data-background-color="#06b6d4" data-send-button-text="Отправить">
            <div data-title="Получить консультацию">
              <input type="text" placeholder="Ваше имя" name="name" data-required="true"/>
              <input type="tel" placeholder="Телефон" name="phone" data-required="true"/>
              <textarea placeholder="Комментарий" name="message"></textarea>
            </div>
          </div>
        </div>

        <h4>Юридические услуги</h4>
        <ul>
          <li>Корпоративное право</li>
          <li>Арбитражные споры</li>
          <li>Договорное право</li>
        </ul>

        <h4>IT-решения</h4>
        <ul>
          <li>Разработка сайтов и приложений</li>
          <li>Внедрение CRM-систем</li>
          <li>Создание чат-ботов</li>
          <li>Интеграция систем</li>
        </ul>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Позвонить: ${contacts.phone.main.display}</a>
        </div>

        <div data-block="button">
          <a href="${baseUrl}/contacts">Написать нам</a>
        </div>
      `,
    },
    {
      url: `${baseUrl}/services/tech/web-development`,
      title: "Разработка сайтов во Владивостоке - Uralliance",
      description:
        "Создание корпоративных сайтов, интернет-магазинов и лендингов под ключ. Современные технологии, адаптивный дизайн.",
      image: `${baseUrl}/services/tech-web.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Разработка сайтов</h1>
        </header>

        <figure>
          <img src="${baseUrl}/services/tech-web.webp"/>
          <figcaption>Создание современных сайтов</figcaption>
        </figure>

        <p>Разрабатываем корпоративные сайты, интернет-магазины и лендинги с учетом современных требований SEO и юзабилити.</p>

        <h3>Что входит в разработку</h3>
        <ul>
          <li><strong>Уникальный дизайн</strong> - учитываем ваш фирменный стиль</li>
          <li><strong>Адаптивная верстка</strong> - отлично работает на всех устройствах</li>
          <li><strong>SEO-оптимизация</strong> - сайт готов к продвижению</li>
          <li><strong>Панель управления</strong> - легко обновлять контент самостоятельно</li>
          <li><strong>Интеграции</strong> - связываем с CRM, 1С, платежными системами</li>
        </ul>

        <h3>Стоимость</h3>
        <p>От 50 000 ₽</p>
        <p><em>Цена зависит от сложности проекта и требуемого функционала.</em></p>

        <h3>Срок разработки</h3>
        <p>От 2 недель</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Заказать разработку: ${contacts.phone.main.display}</a>
        </div>

        <div data-block="widget-feedback" data-stick="false">
          <div data-background-color="#06b6d4" data-send-button-text="Получить расчет">
            <div data-title="Рассчитать стоимость сайта">
              <input type="text" placeholder="Название компании" name="company" data-required="true"/>
              <input type="tel" placeholder="Телефон" name="phone" data-required="true"/>
              <textarea placeholder="Опишите проект" name="message"></textarea>
            </div>
          </div>
        </div>
      `,
    },
    {
      url: `${baseUrl}/services/tech/crm-systems`,
      title: "Внедрение CRM-систем - Битрикс24, amoCRM | Uralliance",
      description:
        "Настройка и автоматизация CRM для вашего бизнеса. Интеграция с 1С, сайтом, телефонией. Обучение персонала.",
      image: `${baseUrl}/services/tech-web.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Внедрение CRM-систем</h1>
        </header>

        <p>Настраиваем CRM-системы под ваши бизнес-процессы. Работаем с Битрикс24, amoCRM, Мегаплан и другими платформами.</p>

        <h3>Что мы делаем</h3>
        <ul>
          <li>Анализ бизнес-процессов</li>
          <li>Настройка воронок продаж</li>
          <li>Интеграция с сайтом и соцсетями</li>
          <li>Подключение телефонии</li>
          <li>Интеграция с 1С</li>
          <li>Автоматизация рутинных задач</li>
          <li>Обучение сотрудников</li>
        </ul>

        <h3>Преимущества</h3>
        <p>✅ Вся информация о клиентах в одном месте<br/>
        ✅ Автоматическое распределение заявок<br/>
        ✅ Контроль работы менеджеров<br/>
        ✅ Увеличение продаж на 20-30%</p>

        <h3>Стоимость</h3>
        <p>От 80 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Внедрить CRM: ${contacts.phone.main.display}</a>
        </div>
      `,
    },
    {
      url: `${baseUrl}/services/tech/chatbots`,
      title: "Разработка чат-ботов для Telegram, WhatsApp | Uralliance",
      description:
        "Создание умных чат-ботов для автоматизации общения с клиентами. Telegram, WhatsApp, VK боты под ключ.",
      image: `${baseUrl}/services/tech-web.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Разработка чат-ботов</h1>
        </header>

        <p>Создаем чат-ботов для Telegram, WhatsApp, VK, которые работают 24/7 и помогают автоматизировать общение с клиентами.</p>

        <h3>Возможности ботов</h3>
        <ul>
          <li>Автоответы на частые вопросы</li>
          <li>Прием заявок и заказов</li>
          <li>Запись на услуги</li>
          <li>Уведомления клиентам</li>
          <li>Интеграция с CRM</li>
          <li>Приём платежей</li>
          <li>Рассылки по базе</li>
        </ul>

        <h3>Для кого</h3>
        <p>Подходит для салонов красоты, клиник, интернет-магазинов, служб доставки, образовательных центров.</p>

        <h3>Стоимость</h3>
        <p>От 30 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Заказать бота: ${contacts.phone.main.display}</a>
        </div>
      `,
    },
    {
      url: `${baseUrl}/corporate`,
      title: "Корпоративное право - Регистрация ООО, реорганизация | Uralliance",
      description:
        "Юридическое сопровождение бизнеса: регистрация ООО, ИП, изменения в ЕГРЮЛ, корпоративные споры.",
      image: `${baseUrl}/services/legal-corporate.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Корпоративное право</h1>
        </header>

        <p>Оказываем полный спектр услуг по корпоративному праву для юридических лиц.</p>

        <h3>Наши услуги</h3>
        <ul>
          <li>Регистрация ООО, АО, ИП</li>
          <li>Внесение изменений в ЕГРЮЛ</li>
          <li>Смена учредителей и директора</li>
          <li>Реорганизация компаний</li>
          <li>Ликвидация юридических лиц</li>
          <li>Корпоративные споры</li>
          <li>Защита прав акционеров</li>
        </ul>

        <h3>Почему мы</h3>
        <p>✅ Опыт работы более 10 лет<br/>
        ✅ Успешно закрыто 500+ дел<br/>
        ✅ Прозрачное ценообразование<br/>
        ✅ Бесплатная первичная консультация</p>

        <h3>Стоимость</h3>
        <p>От 15 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Консультация юриста: ${contacts.phone.main.display}</a>
        </div>

        <div data-block="widget-feedback" data-stick="false">
          <div data-background-color="#d4af37" data-send-button-text="Отправить">
            <div data-title="Получить консультацию юриста">
              <input type="text" placeholder="Ваше имя" name="name" data-required="true"/>
              <input type="tel" placeholder="Телефон" name="phone" data-required="true"/>
              <textarea placeholder="Опишите ситуацию" name="message"></textarea>
            </div>
          </div>
        </div>
      `,
    },
    {
      url: `${baseUrl}/ecp`,
      title: "ЭЦП - Электронная цифровая подпись во Владивостоке | Uralliance",
      description:
        "Получение квалифицированной электронной подписи для юридических лиц и ИП. Работа с госуслугами, торговыми площадками, ЭДО.",
      image: `${baseUrl}/services/legal-corporate.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>ЭЦП - Электронная подпись</h1>
        </header>

        <p>Помогаем получить квалифицированную электронную цифровую подпись (ЭЦП) для работы в электронной среде.</p>

        <h3>Для чего нужна ЭЦП</h3>
        <ul>
          <li><strong>Госуслуги</strong> - работа на портале Госуслуг</li>
          <li><strong>Торговые площадки</strong> - участие в электронных торгах</li>
          <li><strong>ЭДО</strong> - обмен юридически значимыми документами</li>
          <li><strong>Отчетность</strong> - сдача отчетности в ФНС, ПФР, ФСС</li>
          <li><strong>Банки</strong> - дистанционное банковское обслуживание</li>
        </ul>

        <h3>Что входит</h3>
        <p>✅ Консультация по выбору типа подписи<br/>
        ✅ Подготовка документов<br/>
        ✅ Запись в удостоверяющий центр<br/>
        ✅ Получение сертификата ЭЦП<br/>
        ✅ Настройка на компьютере</p>

        <h3>Стоимость</h3>
        <p>От 3 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Получить ЭЦП: ${contacts.phone.main.display}</a>
        </div>
      `,
    },
    {
      url: `${baseUrl}/services/legal/vestnik`,
      title: "Публикация в Вестнике государственной регистрации | Uralliance",
      description:
        "Публикация уведомлений о ликвидации и реорганизации юридических лиц в официальном Вестнике.",
      image: `${baseUrl}/services/legal-corporate.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Публикация в Вестнике</h1>
        </header>

        <p>Размещение обязательных уведомлений о ликвидации и реорганизации юридических лиц в официальном издании "Вестник государственной регистрации".</p>

        <h3>Когда требуется</h3>
        <ul>
          <li>Ликвидация ООО, АО</li>
          <li>Реорганизация компании</li>
          <li>Уменьшение уставного капитала</li>
          <li>Выход участника из ООО</li>
        </ul>

        <h3>Что мы делаем</h3>
        <p>✅ Подготовка текста уведомления<br/>
        ✅ Размещение в Вестнике<br/>
        ✅ Получение подтверждения публикации<br/>
        ✅ Предоставление документов для ИФНС</p>

        <h3>Срок</h3>
        <p>3-5 рабочих дней</p>

        <h3>Стоимость</h3>
        <p>От 5 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Заказать публикацию: ${contacts.phone.main.display}</a>
        </div>
      `,
    },
    {
      url: `${baseUrl}/services/legal/fedresurs`,
      title: "Публикация на Федресурсе - ЕФРСБ | Uralliance Владивосток",
      description:
        "Размещение сообщений о банкротстве в Едином федеральном реестре сведений о банкротстве.",
      image: `${baseUrl}/services/legal-corporate.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Публикация на Федресурсе</h1>
        </header>

        <p>Размещение обязательных сообщений о процедурах банкротства в Едином федеральном реестре сведений о банкротстве (ЕФРСБ).</p>

        <h3>Виды публикаций</h3>
        <ul>
          <li>Уведомление о намерении обратиться в суд</li>
          <li>Сообщение о введении наблюдения</li>
          <li>Сообщение о введении внешнего управления</li>
          <li>Сообщение о банкротстве</li>
          <li>Сообщение о конкурсном производстве</li>
        </ul>

        <h3>Что входит</h3>
        <p>✅ Подготовка текста сообщения<br/>
        ✅ Размещение на ЕФРСБ<br/>
        ✅ Публикация в газете "Коммерсантъ"<br/>
        ✅ Получение подтверждений</p>

        <h3>Стоимость</h3>
        <p>От 4 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Разместить на Федресурсе: ${contacts.phone.main.display}</a>
        </div>
      `,
    },
    {
      url: `${baseUrl}/services/tech/taxcom-edo`,
      title: "Такском - Электронный документооборот ЭДО | Uralliance",
      description:
        "Настройка и внедрение системы электронного документооборота Такском для обмена юридически значимыми документами.",
      image: `${baseUrl}/services/tech-web.webp`,
      pubDate: new Date(),
      content: `
        <header>
          <h1>Такском - Электронный документооборот</h1>
        </header>

        <p>Внедряем систему электронного документооборота (ЭДО) Такском для обмена юридически значимыми документами с контрагентами.</p>

        <h3>Преимущества ЭДО Такском</h3>
        <ul>
          <li><strong>Экономия</strong> - не нужно печатать, подписывать, отправлять бумажные документы</li>
          <li><strong>Скорость</strong> - документы доходят за минуты, а не дни</li>
          <li><strong>Юридическая сила</strong> - документы равны бумажным оригиналам</li>
          <li><strong>Безопасность</strong> - защита от подделки и потери документов</li>
          <li><strong>Интеграция с 1С</strong> - автоматическая выгрузка документов</li>
        </ul>

        <h3>Что мы делаем</h3>
        <p>✅ Подключение к оператору ЭДО Такском<br/>
        ✅ Настройка системы<br/>
        ✅ Интеграция с 1С и другими программами<br/>
        ✅ Обучение сотрудников<br/>
        ✅ Техническая поддержка</p>

        <h3>Стоимость</h3>
        <p>От 25 000 ₽</p>

        <div data-block="button" data-primary="true">
          <a href="${contacts.phone.main.link}">Внедрить Такском ЭДО: ${contacts.phone.main.display}</a>
        </div>
      `,
    },
  ];

  // Генерация RSS
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:yandex="http://news.yandex.ru"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:turbo="http://turbo.yandex.ru"
     version="2.0">
  <channel>
    <title>Uralliance - Юридические услуги и IT-решения</title>
    <link>${baseUrl}</link>
    <description>Профессиональные юридические услуги и IT-решения для бизнеса во Владивостоке</description>
    <language>ru</language>
    <turbo:analytics id="${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || ""}" type="Yandex"/>

${pages
  .map(
    (page) => `    <item turbo="true">
      <title>${escapeXml(page.title)}</title>
      <link>${page.url}</link>
      <pubDate>${page.pubDate.toUTCString()}</pubDate>
      <turbo:topic>Услуги</turbo:topic>
      <description>${escapeXml(page.description)}</description>
      ${page.image ? `<enclosure url="${page.image}" type="image/jpeg"/>` : ""}
      <turbo:content><![CDATA[
${page.content}
      ]]></turbo:content>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
