import "@/app/styles/globals.css";

import { IBM_Plex_Mono, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { LOCALE_HASH } from "@/entities/locale";
import { NextIntlClientProvider } from "next-intl";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StoreProvider } from "@/app/providers";
import { cn } from "@/shared/lib";
import { getLocale } from "@/entities/locale";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t, common] = await Promise.all([
    getLocale(),
    getTranslations("metadata.home"),
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
      url: "https://www.hasungjun.com",
      siteName: common("siteName"),
      images: [
        {
          url: "https://www.hasungjun.com/og-image.png",
          width: 420,
          height: 420,
          alt: common("siteName"),
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

export const viewport: Viewport = {
  themeColor: "#232431",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={cn(inter.variable, mono.variable)}>
      <body className={"bg-background overflow-x-hidden antialiased"}>
        <NextIntlClientProvider locale={locale}>
          <StoreProvider>{children}</StoreProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
