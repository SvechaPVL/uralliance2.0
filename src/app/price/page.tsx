import Script from "next/script";
import type { Metadata } from "next";
import { getServicesForPricePage } from "@/lib/content";
import { generateOfferCatalogSchema } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import PriceExperience from "./PriceExperience";

export const metadata: Metadata = {
  title: "Прайс-лист Legal + Tech | Uralliance",
  description:
    "Прозрачные цены на юридические услуги, интеграции и digital-продукты Uralliance. Legal + Tech экспертиза в одной команде.",
  keywords: [
    "прайс юридические услуги",
    "стоимость интеграции crm",
    "цены на разработку сайта",
    "uralliance прайс",
  ],
};

export default async function PricePage() {
  // Single source of truth: read from markdown files
  const priceItems = await getServicesForPricePage();
  const offerCatalogSchema = generateOfferCatalogSchema(priceItems);

  return (
    <>
      <Script id="ld-json-offer-catalog" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(offerCatalogSchema)}
      </Script>
      <BreadcrumbJsonLd
        items={[{ name: "Главная", url: "https://uralliance.ru" }, { name: "Прайс" }]}
      />

      <PriceExperience prices={priceItems} />
    </>
  );
}
