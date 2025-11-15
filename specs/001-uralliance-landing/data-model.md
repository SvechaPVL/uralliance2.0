# Data Model: Uralliance Premium Website

**Дата**: 2025-11-06
**Статус**: Завершен
**Цель**: Определить структуры данных для контента и форм

---

## Обзор

Проект использует **файловую систему** как хранилище (Markdown/JSON файлы) вместо базы данных. Все контентные сущности хранятся в `/content/` директории с типизированными frontmatter метаданными.

**Источники данных**:

- **Markdown файлы** (`content/services/`, `content/cases/`, `content/blog/`) - Контент с frontmatter
- **JSON файл** (`content/prices.json`) - Прайс-лист
- **Environment Variables** (Vercel) - Credentials и контактные данные
- **Client-side form data** - Временные данные из форм (не хранятся, отправляются в Telegram)

---

## 1. Service (Услуга)

### Описание

Представляет юридическую или IT-услугу. Хранится как Markdown файл в `content/services/{category}/{slug}.md`.

### Структура Файла

**Frontmatter** (YAML):

```yaml
title: "Арбитражные споры"
description: "Защита интересов в арбитражных судах всех инстанций"
price: "от 50 000 ₽"
icon: "⚖️"
category: "legal"
order: 1
seo:
  keywords: "арбитраж екатеринбург, арбитражный юрист, защита в суде"
  ogImage: "/images/services/arbitrazh-og.jpg"
```

**Контент** (Markdown):

```markdown
## Что входит в услугу

- Анализ документов и правовая оценка ситуации
- Подготовка процессуальных документов
- Представительство в суде

## Стоимость

Стоимость зависит от сложности дела. Консультация — от 3 000 ₽.

## Примеры кейсов

[Ссылка на кейсы]
```

### TypeScript Интерфейс

**Файл**: `src/types/content.ts`

```typescript
export interface ServiceFrontmatter {
  title: string;
  description: string;
  price: string; // Например: "от 50 000 ₽", "3 000 ₽/час"
  icon: string; // Emoji или путь к иконке
  category: "legal" | "tech";
  order: number; // Порядок отображения
  seo: {
    keywords: string;
    ogImage: string; // Путь к изображению для Open Graph
  };
}

export interface Service {
  slug: string; // Извлекается из имени файла
  frontmatter: ServiceFrontmatter;
  html: string; // Markdown сконвертирован в HTML
}
```

### Валидация

**Zod схема**:

```typescript
import { z } from "zod";

export const serviceFrontmatterSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(200),
  price: z.string(),
  icon: z.string(),
  category: z.enum(["legal", "tech"]),
  order: z.number().int().min(0),
  seo: z.object({
    keywords: z.string(),
    ogImage: z.string().url(),
  }),
});
```

### Операции

**Файл**: `src/lib/content.ts`

```typescript
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Service, ServiceFrontmatter } from "@/types/content";

/**
 * Получить все услуги определенной категории
 */
export async function getServicesByCategory(category: "legal" | "tech"): Promise<Service[]> {
  const servicesDir = path.join(process.cwd(), "content/services", category);
  const files = await fs.readdir(servicesDir);

  const services = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const service = await getServiceBySlug(category, slug);
        return service;
      })
  );

  return services.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/**
 * Получить конкретную услугу по slug
 */
export async function getServiceBySlug(category: "legal" | "tech", slug: string): Promise<Service> {
  const filePath = path.join(process.cwd(), "content/services", category, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    slug,
    frontmatter: data as ServiceFrontmatter,
    html: htmlContent,
  };
}
```

---

## 2. PriceItem (Позиция Прайс-Листа)

### Описание

Представляет услугу в прайс-листе. Хранится в `content/prices.json` как массив объектов.

### Структура Файла

**JSON** (`content/prices.json`):

```json
[
  {
    "id": "legal-consultation",
    "title": "Консультация юриста",
    "description": "Юридическая консультация по любым вопросам",
    "price": 3000,
    "priceFrom": false,
    "unit": "час",
    "category": "Консультации"
  },
  {
    "id": "arbitrazh-defense",
    "title": "Защита в арбитражном суде",
    "description": "Полное представительство в суде с подготовкой документов",
    "price": 50000,
    "priceFrom": true,
    "unit": "дело",
    "category": "Арбитраж"
  },
  {
    "id": "crm-integration",
    "title": "Интеграция CRM",
    "description": "Интеграция CRM с 1С, WhatsApp, Telegram",
    "price": 80000,
    "priceFrom": true,
    "unit": "проект",
    "category": "CRM"
  }
]
```

### TypeScript Интерфейс

**Файл**: `src/types/content.ts`

```typescript
export interface PriceItem {
  id: string; // Уникальный ID (kebab-case)
  title: string;
  description: string;
  price: number; // Цена в рублях
  priceFrom: boolean; // true = "от X ₽", false = "X ₽"
  unit: string; // Единица измерения: "час", "документ", "проект", "дело"
  category: string; // Категория для группировки: "Консультации", "Арбитраж", "CRM"
}
```

### Валидация

**Zod схема**:

```typescript
export const priceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(300),
  price: z.number().positive().int(),
  priceFrom: z.boolean(),
  unit: z.string(),
  category: z.string(),
});

export const priceListSchema = z.array(priceItemSchema);
```

### Операции

```typescript
/**
 * Получить весь прайс-лист
 */
export async function getPriceList(): Promise<PriceItem[]> {
  const filePath = path.join(process.cwd(), "content/prices.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const prices = JSON.parse(fileContent);
  return priceListSchema.parse(prices);
}

/**
 * Получить прайсы по категории
 */
export async function getPricesByCategory(category: string): Promise<PriceItem[]> {
  const prices = await getPriceList();
  return prices.filter((item) => item.category === category);
}
```

---

## 3. CaseStudy (Кейс/Портфолио)

### Описание

Представляет реализованный проект (кейс). Хранится как Markdown файл в `content/cases/{slug}.md`.

### Структура Файла

**Frontmatter** (YAML):

```yaml
title: "Интеграция CRM для производственной компании"
client: "ООО Производство+"
serviceType: "tech"
shortDescription: "Интеграция AmoCRM с 1С, WhatsApp и Telegram для автоматизации продаж"
resultMetrics: "+40% скорость обработки заявок, -30% время на рутину"
image: "/images/cases/case-1.jpg"
date: "2024-08-15"
technologies: ["AmoCRM", "1С", "WhatsApp API", "Telegram Bot API", "Python"]
```

**Контент** (Markdown):

```markdown
## Задача клиента

Компания получала заявки из разных каналов...

## Наше решение

Разработали интеграцию...

## Результаты

- Скорость обработки заявок выросла на 40%
- Время на рутину сократилось на 30%
- Внедрение заняло 3 недели
```

### TypeScript Интерфейс

```typescript
export interface CaseStudyFrontmatter {
  title: string;
  client: string; // Название компании клиента
  serviceType: "legal" | "tech";
  shortDescription: string; // Краткое описание (для карточки)
  resultMetrics: string; // Ключевые метрики результата
  image: string; // Путь к изображению кейса
  date: string; // Дата завершения проекта (ISO 8601)
  technologies?: string[]; // Технологии (только для Tech кейсов)
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  html: string;
}
```

### Валидация

```typescript
export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(10).max(200),
  client: z.string().min(3).max(100),
  serviceType: z.enum(["legal", "tech"]),
  shortDescription: z.string().min(20).max(300),
  resultMetrics: z.string().min(10).max(200),
  image: z.string().url(),
  date: z.string().date(),
  technologies: z.array(z.string()).optional(),
});
```

### Операции

```typescript
/**
 * Получить все кейсы
 */
export async function getAllCases(): Promise<CaseStudy[]> {
  const casesDir = path.join(process.cwd(), "content/cases");
  const files = await fs.readdir(casesDir);

  const cases = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        return await getCaseBySlug(slug);
      })
  );

  return cases.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Получить кейсы по типу услуги
 */
export async function getCasesByServiceType(serviceType: "legal" | "tech"): Promise<CaseStudy[]> {
  const cases = await getAllCases();
  return cases.filter((c) => c.frontmatter.serviceType === serviceType);
}
```

---

## 4. BlogPost (Статья Блога)

### Описание

Представляет статью блога для SEO. Хранится как Markdown файл в `content/blog/{slug}.md`.

### Структура Файла

**Frontmatter** (YAML):

```yaml
title: "Как выиграть арбитражный спор: 5 советов от практикующего юриста"
date: "2024-10-01"
author: "Иван Петров"
category: "Юридические советы"
keywords: "арбитраж, суд, защита прав, юрист"
excerpt: "Разбираем ключевые моменты подготовки к арбитражному спору и делимся опытом успешных дел"
image: "/images/blog/arbitrazh-tips.jpg"
relatedPosts: ["contract-mistakes", "business-protection"]
```

**Контент** (Markdown):

```markdown
## Совет 1: Тщательная подготовка документов

...

## Совет 2: Анализ судебной практики

...
```

### TypeScript Интерфейс

```typescript
export interface BlogPostFrontmatter {
  title: string;
  date: string; // ISO 8601
  author: string;
  category: string; // "Юридические советы", "IT-решения", "Новости"
  keywords: string; // Ключевые слова через запятую
  excerpt: string; // Краткое описание (160 chars max для meta description)
  image: string; // Путь к изображению статьи
  relatedPosts?: string[]; // Slugs связанных статей
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  html: string;
}
```

### Валидация

```typescript
export const blogPostFrontmatterSchema = z.object({
  title: z.string().min(10).max(100),
  date: z.string().date(),
  author: z.string().min(3).max(100),
  category: z.string(),
  keywords: z.string(),
  excerpt: z.string().min(50).max(160),
  image: z.string().url(),
  relatedPosts: z.array(z.string()).optional(),
});
```

### Операции

```typescript
/**
 * Получить все статьи блога (отсортированные по дате)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = await fs.readdir(blogDir);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        return await getBlogPostBySlug(slug);
      })
  );

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Получить статьи по категории
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((p) => p.frontmatter.category === category);
}

/**
 * Получить связанные статьи
 */
export async function getRelatedPosts(slugs: string[]): Promise<BlogPost[]> {
  return await Promise.all(slugs.map((slug) => getBlogPostBySlug(slug)));
}
```

---

## 5. ContactFormSubmission (Отправка Формы Контактов)

### Описание

Представляет данные из формы контактов. **НЕ ХРАНИТСЯ** в базе — отправляется напрямую в Telegram bot через API Route.

### Структура Данных

**Client-side форма** (`ContactForm.tsx`):

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string; // Опционально
  message: string;
  service: "legal" | "tech"; // Направление интереса
  honeypot: string; // Скрытое поле (должно быть пустым)
}
```

### TypeScript Интерфейс

**Файл**: `src/types/forms.ts`

```typescript
export interface ContactFormSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service: "legal" | "tech";
  honeypot: string; // Защита от спама
}

export interface ContactFormResponse {
  success: boolean;
  error?: string;
}
```

### Валидация

**Zod схема** (используется на клиенте и сервере):

```typescript
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(100, "Имя слишком длинное"),
  email: z.string().email("Некорректный email адрес"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]+$/, "Некорректный номер телефона")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(1000, "Сообщение слишком длинное"),
  service: z.enum(["legal", "tech"], {
    errorMap: () => ({ message: "Выберите направление" }),
  }),
  honeypot: z.string().max(0, "Spam detected"), // Должно быть пустым
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

### Операции

**Клиент** (`src/components/forms/ContactForm.tsx`):

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormInput) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Показать success message
    } else {
      // Показать error message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Поля формы */}

      {/* Honeypot (скрыто через CSS) */}
      <input
        type="text"
        {...register('honeypot')}
        className="absolute left-[-9999px]"
        tabIndex={-1}
        autoComplete="off"
      />
    </form>
  );
}
```

**Сервер** (`app/api/contact/route.ts`): См. research.md, раздел 4.

---

## 6. MessengerContact (Контактные Данные Мессенджеров)

### Описание

Представляет контактные данные для ссылок на мессенджеры (WhatsApp, Telegram). Хранится в **Environment Variables** на Vercel.

### Структура Данных

**Environment Variables** (`.env.local`):

```env
WHATSAPP_PHONE=+79991234567
TELEGRAM_USERNAME=@uralliance_bot
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
```

### TypeScript Интерфейс

**Файл**: `src/types/content.ts`

```typescript
export interface MessengerContact {
  whatsappPhone: string; // Формат: +79991234567
  telegramUsername: string; // Формат: @uralliance_bot
  whatsappMessage: string; // Предзаполненное сообщение
  telegramMessage: string; // Предзаполненное сообщение
}
```

### Операции

**Генерация ссылок** (`src/lib/messenger.ts`):

```typescript
/**
 * Генерация ссылки на WhatsApp с предзаполненным текстом
 */
export function generateWhatsAppLink(
  message: string = "Здравствуйте! Интересует консультация."
): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE!.replace(/[^\d+]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Генерация ссылки на Telegram с предзаполненным текстом
 */
export function generateTelegramLink(
  message: string = "Здравствуйте! Хочу обсудить сотрудничество."
): string {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME!.replace("@", "");
  const encodedMessage = encodeURIComponent(message);
  return `https://t.me/${username}?text=${encodedMessage}`;
}
```

**Использование в компонентах**:

```typescript
import { generateWhatsAppLink, generateTelegramLink } from '@/lib/messenger';

export function Footer() {
  const whatsappLink = generateWhatsAppLink('Интересует юридическая консультация');
  const telegramLink = generateTelegramLink('Хочу обсудить IT-проект');

  return (
    <footer>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a href={telegramLink} target="_blank" rel="noopener noreferrer">
        Telegram
      </a>
    </footer>
  );
}
```

---

## Сводная Таблица Сущностей

| Сущность              | Хранилище   | Файл/Путь                               | TypeScript Тип          | Zod Схема                    |
| --------------------- | ----------- | --------------------------------------- | ----------------------- | ---------------------------- |
| Service               | Markdown    | `content/services/{category}/{slug}.md` | `Service`               | `serviceFrontmatterSchema`   |
| PriceItem             | JSON        | `content/prices.json`                   | `PriceItem`             | `priceItemSchema`            |
| CaseStudy             | Markdown    | `content/cases/{slug}.md`               | `CaseStudy`             | `caseStudyFrontmatterSchema` |
| BlogPost              | Markdown    | `content/blog/{slug}.md`                | `BlogPost`              | `blogPostFrontmatterSchema`  |
| ContactFormSubmission | Не хранится | Отправляется в Telegram                 | `ContactFormSubmission` | `contactFormSchema`          |
| MessengerContact      | Env Vars    | `.env.local`                            | `MessengerContact`      | N/A                          |

---

## Диаграмма Связей

```
Service (Markdown)
  └─> используется на /services/[category]/[slug]
  └─> упоминается в CaseStudy.technologies (Tech services)

PriceItem (JSON)
  └─> отображается на /price/
  └─> связан с Service через category

CaseStudy (Markdown)
  └─> отображается на /cases/
  └─> связан с Service через serviceType

BlogPost (Markdown)
  └─> отображается на /blog/[slug]
  └─> связан с другими BlogPost через relatedPosts

ContactFormSubmission (Runtime)
  └─> отправляется в Telegram Bot API
  └─> не хранится в файловой системе

MessengerContact (Env Vars)
  └─> используется в Footer, ContactCTA
  └─> генерирует ссылки с предзаполненным текстом
```

---

## Миграции и Обслуживание

### Добавление Новой Услуги

1. Создать файл `content/services/{category}/{slug}.md`
2. Заполнить frontmatter (title, description, price, icon, category, order, seo)
3. Написать контент в Markdown
4. Rebuild проекта → страница автоматически генерируется через динамический роут

### Обновление Прайс-Листа

1. Отредактировать `content/prices.json`
2. Rebuild проекта → /price/ автоматически обновляется

### Добавление Кейса

1. Создать файл `content/cases/{slug}.md`
2. Добавить изображение кейса в `public/images/cases/`
3. Rebuild проекта → /cases/ автоматически обновляется

### Публикация Статьи Блога

1. Создать файл `content/blog/{slug}.md`
2. Добавить изображение статьи в `public/images/blog/`
3. Rebuild проекта → /blog/ и sitemap.xml автоматически обновляются

---

## Следующие Шаги

1. **contracts/**: Определить API контракт для POST /api/contact
2. **quickstart.md**: Инструкции по запуску проекта
3. **designsystem.md**: Документация дизайн-системы (обязательно по конституции)
