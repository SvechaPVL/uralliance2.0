/**
 * YML Feed для Яндекс.Директ и других сервисов
 * Формат: https://yandex.ru/support/partnermarket/export/yml.html
 */

import { NextResponse } from "next/server";
import { contacts } from "@/lib/contacts";

interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  url: string;
  categoryId: string;
  picture?: string;
}

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru";
  const shopName = "Uralliance";
  const companyName = "Uralliance - Юридические услуги и IT-решения";

  // Категории услуг
  const categories: Category[] = [
    { id: "1", name: "Юридические услуги" },
    { id: "2", name: "IT-решения" },
    { id: "11", name: "Корпоративное право", parentId: "1" },
    { id: "12", name: "Арбитражные споры", parentId: "1" },
    { id: "13", name: "Договорное право", parentId: "1" },
    { id: "14", name: "ЭЦП и электронные подписи", parentId: "1" },
    { id: "15", name: "Публикация в Вестнике", parentId: "1" },
    { id: "16", name: "Федресурс", parentId: "1" },
    { id: "21", name: "Разработка сайтов", parentId: "2" },
    { id: "22", name: "CRM-системы", parentId: "2" },
    { id: "23", name: "Чат-боты", parentId: "2" },
    { id: "24", name: "Мобильные приложения", parentId: "2" },
    { id: "25", name: "Интеграции", parentId: "2" },
    { id: "26", name: "Такском ЭДО", parentId: "2" },
  ];

  // Услуги (офферы)
  const services: Service[] = [
    // Юридические услуги
    {
      id: "legal-1",
      categoryId: "11",
      name: "Корпоративное право",
      description:
        "Регистрация юридических лиц, реорганизация, ликвидация компаний, корпоративные споры",
      url: `${baseUrl}/services/legal/corporate-law`,
      price: "от 15000",
      picture: `${baseUrl}/services/legal-corporate.webp`,
    },
    {
      id: "legal-2",
      categoryId: "12",
      name: "Арбитражные споры",
      description: "Представительство в арбитражных судах, взыскание задолженности, защита бизнеса",
      url: `${baseUrl}/services/legal/arbitration`,
      price: "от 25000",
      picture: `${baseUrl}/services/legal-arbitration.webp`,
    },
    {
      id: "legal-3",
      categoryId: "13",
      name: "Договорное право",
      description: "Разработка и экспертиза договоров, сопровождение сделок",
      url: `${baseUrl}/services/legal/contracts`,
      price: "от 10000",
      picture: `${baseUrl}/services/legal-contracts.webp`,
    },
    {
      id: "legal-4",
      categoryId: "14",
      name: "ЭЦП - Электронная подпись",
      description:
        "Получение электронной цифровой подписи (ЭЦП) для юридических лиц и ИП. Квалифицированная электронная подпись для работы с госуслугами, торговыми площадками, электронным документооборотом",
      url: `${baseUrl}/services/legal/ecp`,
      price: "от 3000",
      picture: `${baseUrl}/services/legal-ecp.webp`,
    },
    {
      id: "legal-5",
      categoryId: "15",
      name: "Публикация в Вестнике государственной регистрации",
      description:
        "Публикация уведомлений о ликвидации, реорганизации юридических лиц в официальном издании Вестник государственной регистрации",
      url: `${baseUrl}/services/legal/vestnik`,
      price: "от 5000",
      picture: `${baseUrl}/services/legal-vestnik.webp`,
    },
    {
      id: "legal-6",
      categoryId: "16",
      name: "Публикация на Федресурсе",
      description:
        "Размещение сообщений о банкротстве в Едином федеральном реестре сведений о банкротстве (ЕФРСБ). Публикация обязательных уведомлений о процедурах банкротства",
      url: `${baseUrl}/services/legal/fedresurs`,
      price: "от 4000",
      picture: `${baseUrl}/services/legal-fedresurs.webp`,
    },

    // IT-решения
    {
      id: "tech-1",
      categoryId: "21",
      name: "Разработка сайтов",
      description: "Создание корпоративных сайтов, интернет-магазинов, лендингов под ключ",
      url: `${baseUrl}/services/tech/web-development`,
      price: "от 50000",
      picture: `${baseUrl}/services/tech-web.webp`,
    },
    {
      id: "tech-2",
      categoryId: "22",
      name: "Внедрение CRM-систем",
      description: "Настройка и автоматизация бизнес-процессов, интеграция с 1С, Битрикс24",
      url: `${baseUrl}/services/tech/crm-systems`,
      price: "от 80000",
      picture: `${baseUrl}/services/tech-crm.webp`,
    },
    {
      id: "tech-3",
      categoryId: "23",
      name: "Разработка чат-ботов",
      description: "Telegram, WhatsApp, VK боты для автоматизации общения с клиентами",
      url: `${baseUrl}/services/tech/chatbots`,
      price: "от 30000",
      picture: `${baseUrl}/services/tech-bots.webp`,
    },
    {
      id: "tech-4",
      categoryId: "24",
      name: "Мобильные приложения",
      description: "Разработка iOS и Android приложений для бизнеса",
      url: `${baseUrl}/services/tech/mobile-apps`,
      price: "от 150000",
      picture: `${baseUrl}/services/tech-mobile.webp`,
    },
    {
      id: "tech-5",
      categoryId: "25",
      name: "Интеграция систем",
      description: "Связывание разных программ и сервисов, автоматизация обмена данными",
      url: `${baseUrl}/services/tech/integration`,
      price: "от 40000",
      picture: `${baseUrl}/services/tech-integration.webp`,
    },
    {
      id: "tech-6",
      categoryId: "26",
      name: "Такском - Электронный документооборот",
      description:
        "Настройка и внедрение системы электронного документооборота Такском. ЭДО для обмена юридически значимыми документами с контрагентами. Интеграция с 1С и другими системами",
      url: `${baseUrl}/services/tech/taxcom-edo`,
      price: "от 25000",
      picture: `${baseUrl}/services/tech-taxcom.webp`,
    },
  ];

  // Генерация YML
  const yml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${new Date().toISOString()}">
  <shop>
    <name>${shopName}</name>
    <company>${companyName}</company>
    <url>${baseUrl}</url>
    <phone>${contacts.phone.main.raw}</phone>
    <email>${contacts.email.display}</email>

    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>

    <categories>
${categories
  .map(
    (cat) =>
      `      <category id="${cat.id}"${cat.parentId ? ` parentId="${cat.parentId}"` : ""}>${cat.name}</category>`
  )
  .join("\n")}
    </categories>

    <offers>
${services
  .map(
    (service) => `      <offer id="${service.id}" type="vendor.model" available="true">
        <url>${service.url}</url>
        <price>${service.price?.replace("от ", "") || "0"}</price>
        <currencyId>RUB</currencyId>
        <categoryId>${service.categoryId}</categoryId>
        ${service.picture ? `<picture>${service.picture}</picture>` : ""}
        <delivery>false</delivery>
        <name>${service.name}</name>
        <vendor>${shopName}</vendor>
        <model>${service.name}</model>
        <description><![CDATA[${service.description}]]></description>
        <sales_notes>Консультация бесплатно</sales_notes>
        <manufacturer_warranty>true</manufacturer_warranty>
        <country_of_origin>Россия</country_of_origin>
        <param name="Регион">Владивосток, Приморский край</param>
        <param name="Срок">от 1 недели</param>
      </offer>`
  )
  .join("\n")}
    </offers>
  </shop>
</yml_catalog>`;

  return new NextResponse(yml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
