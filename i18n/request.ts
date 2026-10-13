import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "../data/locales";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale = hasLocale(locales, requestedLocale) ? requestedLocale : null;

  if (!locale) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
