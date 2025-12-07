# Документация UrAlliance 2.0

Техническая документация проекта.

## Навигация

### SEO и Маркетинг

- [SEO Guide](./seo/README.md) — общие принципы SEO оптимизации
- [Yandex SEO](./seo/yandex.md) — специфика продвижения в Яндексе
- [Yandex Webmaster](./seo/webmaster-setup.md) — настройка Яндекс.Вебмастера
- [SEO страниц услуг](./seo/service-pages.md) — оптимизация сервисных страниц

### Аналитика

- [Yandex Metrika](./analytics/README.md) — цели, события, отладка

### Деплой и Инфраструктура

- [Deployment Guide](./deployment/README.md) — руководство по деплою
- [GitHub Secrets](./deployment/github-secrets.md) — настройка секретов CI/CD
- [Reg.ru Fixes](./deployment/reg-ru-fixes.md) — решение проблем с хостингом
- [Favicons](./deployment/favicons.md) — настройка фавиконок

### Дизайн

- [Design System](./design/README.md) — прототип и структура
- [Компоненты](./design/system.md) — дизайн-система компонентов

### Разработка

- [Переменные окружения](./development/env-variables.md) — стратегия ENV переменных
- [Changelog](./CHANGELOG.md) — история изменений

## Структура проекта

```
docs/
├── analytics/       # Аналитика и метрики
├── deployment/      # Деплой и инфраструктура
├── design/          # Дизайн и прототипы
├── development/     # Разработка и конфигурация
├── seo/             # SEO оптимизация
└── CHANGELOG.md     # История изменений
```

## Другие важные файлы

- [README.md](../README.md) — главный README проекта
- [TODO-arbitrazh-managers.md](../TODO-arbitrazh-managers.md) — активная задача
- [CLAUDE.md](../CLAUDE.md) — конфигурация Claude Code

## Спецификации

Подробные спецификации функций находятся в папке `specs/`:

- [001-uralliance-landing](../specs/001-uralliance-landing/) — спецификация основного лендинга
