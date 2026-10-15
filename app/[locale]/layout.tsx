import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { locales } from "@/data/locales";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Suspense>
        <Header />
      </Suspense>

      <main id="main-content">{children}</main>

      <Footer />
    </NextIntlClientProvider>
  );
}
