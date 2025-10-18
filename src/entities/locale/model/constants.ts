import { SupportedLocale } from "./types";

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const locales = ["en", "ko"] as const;
export const defaultLocale = "ko" as const;

export const LOCALE_HASH: Record<SupportedLocale, string> = {
  en: "en_US",
  ko: "ko_KR",
} as const;
