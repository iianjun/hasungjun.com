import { getLocale, locales, setLocale } from "@/entities/locale";

import { NextResponse } from "next/server";

export async function middleware() {
  const locale = await getLocale();

  const response = NextResponse.next();

  if (!locale || !locales.includes(locale)) {
    await setLocale(locale);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
