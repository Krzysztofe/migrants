import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const haettenschweiler = localFont({
  src: [
    {
      path: "../public/fonts/HATTEN.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-haettenschweiler",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dość zakazu strajków",
  description:
    "Kampania na rzecz zmiany ustawy o rozwiązywaniu sporów zbiorowych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${haettenschweiler.variable} h-full antialiased`}
    >
      <body>
        <a
          href="#main-content"
          className="absolute top-0 left-4 z-[999] -translate-y-20 rounded-md bg-white px-4 py-2 text-black transition-transform focus:translate-y-0"
        >
          Przejdź do treści
        </a>

        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
