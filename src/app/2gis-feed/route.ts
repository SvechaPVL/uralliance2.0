/**
 * YML Feed для 2ГИС
 * Формат аналогичен Яндекс.Маркет YML
 * Данные: prices.json — единый источник правды
 */

import { NextResponse } from "next/server";
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
  // Legal
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
  // Tech
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

// Маппинг id услуги -> URL страницы
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

  // Генерируем категории
  const categorySet = new Map<string, { id: string; name: string }>();

  categorySet.set("legal", { id: "1", name: "Юридические услуги" });
  categorySet.set("tech", { id: "2", name: "IT-решения" });
  categorySet.set("both", { id: "3", name: "Комплексные решения" });

  const categories = Array.from(categorySet.values());

  // Генерируем офферы
  const offers = prices.map((item, index) => {
    const categoryId = item.practice === "both" ? "3" : item.practice === "legal" ? "1" : "2";
    const picture = pictureMap[item.id];

    // URL
    let url = urlMap[item.id];
    if (!url) {
      const practice = item.practice === "both" ? "combo" : item.practice;
      const slug = item.id.replace(`${item.practice}-`, "").replace("combo-", "");
      url = `/services/${practice}/${slug}`;
    }

    return {
      id: String(index + 1),
      categoryId,
      name: item.title,
      description: item.description,
      url: `${baseUrl}${url}`,
      price: item.price,
      priceFrom: item.priceFrom,
      picture: picture ? `${baseUrl}/services/${picture}` : undefined,
      features: item.features,
      unit: item.unit,
    };
  });

  // Формируем дату в формате 2ГИС
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // Генерация YML для 2ГИС
  const yml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${dateStr}">
  <shop>
    <name>${shopName}</name>
    <company>${companyName}</company>
    <url>${baseUrl}</url>

    <categories>
${categories.map((cat) => `      <category id="${cat.id}">${cat.name}</category>`).join("\n")}
    </categories>

    <offers>
${offers
  .map(
    (offer) => `      <offer id="${offer.id}" available="true">
        <categoryId>${offer.categoryId}</categoryId>
        <price${offer.priceFrom ? ' from="true"' : ""}>${offer.price}</price>
        <name>${escapeXml(offer.name)}</name>
        ${offer.picture ? `<picture>${offer.picture}</picture>` : ""}
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
