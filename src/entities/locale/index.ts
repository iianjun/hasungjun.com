export { defaultLocale, locales } from "./model/constants";
export { LOCALE_COOKIE_NAME, LOCALE_COOKIE_MAX_AGE } from "./model/constants";
export type { SupportedLocale } from "./model/types";

export { getLocale } from "./lib/get-locale";
export { setLocale } from "./api/set-locale";

export { useLocale } from "./hooks/useLocale";
