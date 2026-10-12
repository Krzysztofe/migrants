"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale as useCurrentLocale } from "next-intl";
import MobileMenu from "./MobileMenu";
import MenuList from "./MenuList";
import { SelectFieldController } from "../inputs/select-field/SelectFieldController";

const categorySelectOptions = [
  { floatingLabel: "Polski", value: "pl" },
  { floatingLabel: "English", value: "en" },
  { floatingLabel: "Espagnole", value: "es" },
  { floatingLabel: "Turecki", value: "tu" },
];

const languages = ["pl", "en", "es", "tu"];

type HeaderFormValues = {
  language: string;
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<HeaderFormValues>({
    defaultValues: {
      language: "pl",
    },
    mode: "onTouched",
  });

  const currentLocale = useCurrentLocale();

  useEffect(() => {
    methods.setValue("language", currentLocale);
  }, [currentLocale, methods]);

  const handleLanguageChange = (_name: string, value: string) => {
    if (!languages.includes(value)) return;

    router.replace(pathname, { locale: value });
  };

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

      <FormProvider {...methods}>
        <form className="w-1/3" onSubmit={(e) => e.preventDefault()}>
          <SelectFieldController
            name="language"
            options={categorySelectOptions.map(({ value, floatingLabel }) => ({
              value,
              label: floatingLabel,
            }))}
            onChangeAction={handleLanguageChange}
          />
        </form>
      </FormProvider>
    </header>
  );
};

export default Header;
