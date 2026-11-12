"use server";

import { LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME } from "../config/constants";

import type { SupportedLocale } from "../model/types";
import { cookies } from "next/headers";

export async function setLocale(locale: SupportedLocale) {
  const stores = await cookies();
  stores.set(LOCALE_COOKIE_NAME, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}
