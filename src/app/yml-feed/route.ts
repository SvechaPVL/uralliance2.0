/**
 * YML Feed для Яндекс.Директ и других сервисов
 * Формат: https://yandex.ru/support/partnermarket/export/yml.html
 * Данные: prices.json — единый источник правды
 */

import { NextResponse } from "next/server";
import { contacts } from "@/lib/contacts";
import pricesData from "@/content/prices.json";

interface PriceItem {
  id: string;
  practice: "legal" | "tech" | "both";
  category: string;
  title: string;
  description: string;
  price: number;
  priceLabel?: string;
  priceFrom?: boolean;
  unit: string;
  featured?: boolean;
  features: string[];
}

// Маппинг id услуги -> путь к картинке
const pictureMap: Record<string, string> = {
  // Legal (webp - existing, png - new)
  "legal-liquidation": "legal-liquidation.png",
  "legal-ecp": "legal-ecp.webp",
  "legal-registration": "legal-registration.png",
  "legal-accounting": "legal-accounting.png",
  "legal-arbitrazh": "legal-arbitration.webp",
  "legal-corporate": "legal-corporate.webp",
  "legal-bankruptcy": "legal-bankruptcy.png",
  "legal-tax": "legal-tax.png",
  "legal-vestnik": "legal-vestnik.webp",
  "legal-fedresurs": "legal-fedresurs.webp",
  "legal-contracts": "legal-contracts.webp",
  "legal-claims": "legal-claims.png",
  "legal-consultation": "legal-consultation.png",
  "legal-inheritance": "legal-inheritance.png",
  "legal-trademark": "legal-trademark.png",
  // Tech (webp - existing, png - new)
  "tech-crm": "tech-crm.webp",
  "tech-web": "tech-web.webp",
  "tech-bot": "tech-bots.webp",
  "tech-1c": "tech-integration.webp",
  "tech-taxcom-edo": "tech-taxcom.webp",
  "tech-seo": "tech-seo.png",
  "tech-analytics": "tech-analytics.png",
  "tech-mobile": "tech-mobile.webp",
  "tech-context": "tech-context.png",
  "tech-marketplace": "tech-marketplace.png",
  "tech-consultation": "tech-consultation.png",
  "tech-support": "tech-support.png",
  "tech-audit": "tech-audit.png",
  "tech-improvements": "tech-improvements.png",
  "tech-analytics-setup": "tech-analytics-setup.png",
  // Combo
  "combo-startup": "combo-startup.png",
  "combo-contracts": "combo-contracts.png",
  "combo-compliance": "combo-compliance.png",
};

// Маппинг id услуги -> URL страницы (специальные случаи)
const urlMap: Record<string, string> = {
  "legal-ecp": "/ecp",
  "legal-vestnik": "/services/legal/vestnik",
  "legal-fedresurs": "/services/legal/fedresurs",
  "tech-taxcom-edo": "/edo",
};

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru";
  const shopName = "Uralliance";
  const companyName = "Uralliance - Юридические услуги и IT-решения";

  const prices = pricesData as PriceItem[];

  // Генерируем категории из данных
  const categorySet = new Map<string, { id: string; name: string; parentId?: string }>();

  // Родительские категории
  categorySet.set("legal", { id: "1", name: "Юридические услуги" });
  categorySet.set("tech", { id: "2", name: "IT-решения" });
  categorySet.set("both", { id: "3", name: "Комплексные решения" });

  // Подкатегории из prices.json
  let categoryId = 10;
  prices.forEach((item) => {
    const key = `${item.practice}-${item.category}`;
    if (!categorySet.has(key)) {
      const parentId = item.practice === "both" ? "3" : item.practice === "legal" ? "1" : "2";
      categorySet.set(key, {
        id: String(++categoryId),
        name: item.category,
        parentId,
      });
    }
  });

  const categories = Array.from(categorySet.values());

  // Генерируем офферы
  const offers = prices.map((item) => {
    const categoryKey = `${item.practice}-${item.category}`;
    const cat = categorySet.get(categoryKey);
    const picture = pictureMap[item.id];

    // URL: если есть в маппинге, используем его, иначе генерируем
    let url = urlMap[item.id];
    if (!url) {
      const practice = item.practice === "both" ? "combo" : item.practice;
      const slug = item.id.replace(`${item.practice}-`, "").replace("combo-", "");
      url = `/services/${practice}/${slug}`;
    }

    // Цена
    const priceValue = item.price;
    const priceStr = item.priceLabel || (item.priceFrom ? `от ${item.price}` : String(item.price));

    return {
      id: item.id,
      categoryId: cat?.id || "1",
      name: item.title,
      description: item.description,
      url: `${baseUrl}${url}`,
      price: priceValue,
      priceStr,
      picture: picture ? `${baseUrl}/services/${picture}` : undefined,
      features: item.features,
      unit: item.unit,
    };
  });

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
${offers
  .map(
    (offer) => `      <offer id="${offer.id}" type="vendor.model" available="true">
        <url>${offer.url}</url>
        <price>${offer.price || 0}</price>
        <currencyId>RUB</currencyId>
        <categoryId>${offer.categoryId}</categoryId>
        ${offer.picture ? `<picture>${offer.picture}</picture>` : ""}
        <delivery>false</delivery>
        <name>${escapeXml(offer.name)}</name>
        <vendor>${shopName}</vendor>
        <model>${escapeXml(offer.name)}</model>
        <description><![CDATA[${offer.description}${offer.features?.length ? "\n\n" + offer.features.join("\n") : ""}]]></description>
        <sales_notes>Консультация бесплатно</sales_notes>
        <manufacturer_warranty>true</manufacturer_warranty>
        <country_of_origin>Россия</country_of_origin>
        <param name="Регион">Владивосток, Приморский край</param>
        <param name="Единица">1 ${offer.unit}</param>
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

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
