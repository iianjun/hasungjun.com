"use server";

import { LOCALE_COOKIE_NAME, defaultLocale } from "../config/constants";

import type { SupportedLocale } from "../model/types";
import { cookies } from "next/headers";

export async function getLocale() {
  const stores = await cookies();
  return (
    (stores.get(LOCALE_COOKIE_NAME)?.value as SupportedLocale) || defaultLocale
  );
}
