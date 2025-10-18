import { defaultLocale, locales } from "@/shared/lib";

import { SupportedLocale } from "@/shared/model";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();
  const localeCookie =
    (store.get("NEXT_LOCALE")?.value as SupportedLocale) || "";
  const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;

  return {
    locale,
    messages: (await import(`../../../../messages/${locale}.json`)).default,
  };
});
