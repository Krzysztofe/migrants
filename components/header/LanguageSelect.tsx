"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale as useCurrentLocale } from "next-intl";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Locale, locales } from "../../data/locales";
import { SelectFieldController } from "../inputs/select-field/SelectFieldController";

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

const LanguageSelect = () => {
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
    if (!locales.includes(value as Locale)) return;

    router.replace(pathname, { locale: value });
  };

  return (
    <div>
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
    </div>
  );
};

export default LanguageSelect;
