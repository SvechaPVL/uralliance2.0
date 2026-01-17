import { defaultOgImage } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Прайс-лист на ЭЦП и рутокены — все цены | Юральянс Владивосток",
  description:
    "Полный прайс-лист на электронные подписи: КЭП для ИП и юрлиц, ЭЦП для торгов, сотрудников, физлиц. Рутокены и лицензии КриптоПро. Удобная печать прайса.",
  keywords:
    "прайс эцп владивосток, цены на электронную подпись, стоимость кэп, рутокен цена, криптопро цена, эцп для торгов цена, эцп для ип цена",
  alternates: {
    canonical: "/ecp/price",
  },
  openGraph: {
    title: "Прайс-лист на ЭЦП — все виды и цены | Юральянс",
    description:
      "Полный прайс-лист на электронные подписи, рутокены и КриптоПро. Удобно для печати.",
    type: "website",
    locale: "ru_RU",
    url: "/ecp/price",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

export default function EcpPriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
