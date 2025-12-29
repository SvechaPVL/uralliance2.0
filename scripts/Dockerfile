FROM python:3.11-slim

LABEL maintainer="ЮрАльянс <info@uralliance.ru>"
LABEL description="HTML Email Autoresponder for info@uralliance.ru"

WORKDIR /app

# Копируем скрипт
COPY html-autoresponder.py .

# Создаём директорию для данных и шаблонов
RUN mkdir -p /app/data /app/templates

# Создаём непривилегированного пользователя для безопасности
RUN useradd -m -r -u 1000 autoresponder && \
    chown -R autoresponder:autoresponder /app

USER autoresponder

# Шаблон и processed файл через volume
VOLUME ["/app/templates", "/app/data"]

# Unbuffered Python output для логов
ENV PYTHONUNBUFFERED=1

CMD ["python3", "html-autoresponder.py"]
