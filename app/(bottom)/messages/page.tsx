import { getLocale } from "@/entities/locale";
import { LOCALE_HASH } from "@/entities/locale";
import { MessagePage } from "@/pages/messages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t, common] = await Promise.all([
    getLocale(),
    getTranslations("metadata.messages"),
    getTranslations("metadata.common"),
  ]);

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: common("name") }],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://www.hasungjun.com/messages",
      siteName: common("siteName"),
      images: [
        {
          url: "https://www.hasungjun.com/og-image.png",
          width: 420,
          height: 420,
          alt: t("ogImageAlt"),
        },
      ],
      locale: LOCALE_HASH[locale],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["https://www.hasungjun.com/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page() {
  return <MessagePage />;
}
