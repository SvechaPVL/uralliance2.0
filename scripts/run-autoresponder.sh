#!/bin/bash
# Запуск HTML Autoresponder для info@uralliance.ru

# Пароль приложения (rgkctvliknmiunnt)
export YANDEX_APP_PASSWORD="${YANDEX_APP_PASSWORD:-rgkctvliknmiunnt}"

cd "$(dirname "$0")"

echo "🚀 Запуск HTML Autoresponder..."
python3 html-autoresponder.py
