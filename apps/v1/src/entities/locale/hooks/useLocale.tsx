"use client";

import type { SupportedLocale } from "../model/types";
import { setLocale } from "../api/set-locale";
import { useLocale as useNextIntlLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function useLocale() {
  const locale = useNextIntlLocale() as SupportedLocale;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (newLocale: SupportedLocale) => {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  const toggleLocale = () => {
    changeLocale(locale === "en" ? "ko" : "en");
  };

  return {
    locale,
    toggleLocale,
    isPending,
  };
}
