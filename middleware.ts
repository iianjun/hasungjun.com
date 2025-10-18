import { NextRequest, NextResponse } from "next/server";
import { SupportedLocale, defaultLocale, locales } from "@/shared/lib";

export function middleware(request: NextRequest) {
  const localeCookie =
    (request.cookies.get("NEXT_LOCALE")?.value as SupportedLocale) || "";
  const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;

  const response = NextResponse.next();

  if (!localeCookie || !locales.includes(localeCookie)) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
