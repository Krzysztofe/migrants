"use client";

import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { FormProvider, useForm } from "react-hook-form";
import { SelectFieldController } from "../inputs/select-field/SelectFieldController";

import { useRouter, useSearchParams } from "next/navigation";
import MenuList from "./MenuList";

const categorySelectOptions = [
  { floatingLabel: "Polski", value: "pl" },
  { floatingLabel: "English", value: "eng" },
  { floatingLabel: "Turecki", value: "tur" },
  { floatingLabel: "Espagnole", value: "esp" },
];

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm({
    defaultValues: { language: "pl" },
    mode: "onTouched",
  });

  const handleLanguageChange = (_: string, value: string) => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/").filter(Boolean);

    const languages = ["pl", "eng", "tur", "esp"];

    if (languages.includes(segments[0])) {
      segments.shift();
    }

    const newPath =
      value === "pl"
        ? `/${segments.join("/")}`
        : `/${value}/${segments.join("/")}`;

    router.push(newPath.replace(/\/+$/, "") || "/");
  };

  return (
    <header className="sticky top-0 z-20 bg-black border-b-6 border-accent">
      <div className="container flex items-center justify-between py-4 ">
        <Link href="/">
          <Image
            src="/icons/logo-white.png"
            alt="Logo"
            width={150}
            height={100}
            className="w-[70px] h-auto mr-4"
            priority
            unoptimized
          />
        </Link>

        <nav className=" hidden lg:block w-full">
          <MenuList variant="desktop" />
        </nav>

        <MobileMenu />
      </div>
      <FormProvider {...methods}>
        <form>
          <SelectFieldController
            name="category"
            options={categorySelectOptions.map(({ value, floatingLabel }) => ({
              value,
              label: floatingLabel,
            }))}
            onChangeAction={handleLanguageChange}
            defaultValue={"pl"}
          />
          <div className="mt-6 flex gap-8"></div>
        </form>
      </FormProvider>
    </header>
  );
};

export default Header;
