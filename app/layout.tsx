import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./[locale]/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="pl" className={`${inter.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
