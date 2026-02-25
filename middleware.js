import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

// 'bng' এর পরিবর্তে 'bn' ব্যবহার করুন
let locals = ["bn", "en"];
let defaultLocale = "en";

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptLanguage };

  // Negotiator আপনার ব্রাউজারের ল্যাঙ্গুয়েজ প্রায়োরিটি বের করে (যেমন: ['bn', 'en-US'])
  let languages = new Negotiator({ headers }).languages();

  // match ফাংশনটি এখন 'bn' খুঁজে পাবে
  return match(languages, locals, defaultLocale);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Static ফাইল এবং API চেক (অতিরিক্ত সতর্কতা)
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") // ইমেজ বা অন্যান্য ফাইলের জন্য
  ) {
    return;
  }

  const pathnameIsMissingLocale = locals.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // নতুন URL তৈরি করে রিডাইরেক্ট করা
    const url = new URL(request.url);
    url.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(url);
  }
}

export const config = {
  // matcher-এ পাবলিক ফোল্ডারের ফাইলগুলো বাদ রাখা ভালো
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
