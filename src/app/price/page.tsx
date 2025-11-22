import Script from "next/script";
import type { Metadata } from "next";
import priceItemsData from "@/../content/prices.json";
import type { PriceItem } from "@/types/content";
import { generateOfferCatalogSchema } from "@/lib/seo";
import PriceExperience from "./PriceExperience";

const priceItems = priceItemsData as PriceItem[];
const offerCatalogSchema = generateOfferCatalogSchema(priceItems);

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

export default function PricePage() {
  return (
    <>
      <Script
        id="ld-json-offer-catalog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />

      <PriceExperience prices={priceItems} />
    </>
  );
}
