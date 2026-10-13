"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSelect from "./LanguageSelect";
import MenuList from "./MenuList";
import MobileMenu from "./MobileMenu";

const categorySelectOptions = [
  { floatingLabel: "Polski", value: "pl" },
  { floatingLabel: "English", value: "en" },
  { floatingLabel: "Español", value: "es" },
  { floatingLabel: "Українська", value: "ru" },
  { floatingLabel: "Türkçe", value: "tr" },
  { floatingLabel: "ქართული", value: "ka" },
];

type HeaderFormValues = {
  language: string;
};

const Header = () => {
  return (
    <header className="sticky top-0 z-20 border-b-6 border-accent bg-black">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <Image
            src="/icons/logo-white.png"
            alt="Logo"
            width={150}
            height={100}
            className="mr-4 h-auto w-[70px]"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden w-full lg:block">
          <MenuList variant="desktop" />
        </nav>

        <MobileMenu />
      </div>

      <LanguageSelect />
    </header>
  );
};

export default Header;
