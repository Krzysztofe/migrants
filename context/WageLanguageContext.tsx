"use client";

import {
  WageLanguage,
  wageTranslations,
} from "@/lib/dataCollections/wageTranslations";
import { createContext, useContext, useState, ReactNode } from "react";

type WageLanguageContextType = {
  language: WageLanguage;
  setLanguage: (language: WageLanguage) => void;
  translations: (typeof wageTranslations)[WageLanguage];
};

const WageLanguageContext = createContext<WageLanguageContextType | undefined>(
  undefined,
);

export const WageLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<WageLanguage>("pl");

  const value = {
    language,
    setLanguage,
    translations: wageTranslations[language],
  };

  return (
    <WageLanguageContext.Provider value={value}>
      {children}
    </WageLanguageContext.Provider>
  );
};

export const useWageLanguage = () => {
  const context = useContext(WageLanguageContext);

  if (!context) {
    throw new Error(
      "useWageLanguage musi być użyty wewnątrz WageLanguageProvider",
    );
  }

  return context;
};
