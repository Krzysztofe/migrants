"use client";

import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";

const WageLanguageSwitcher = () => {
  const { language, setLanguage } = useWageLanguage();

  return (
    <div className="flex gap-4">
      <Button
        variant="empty-accent"
        onClickAction={() => setLanguage("pl")}
        className={`font-bold ${
          language === "pl" ? "!bg-accent !text-white" : ""
        }`}
      >
        PL
      </Button>

      <Button
        variant="empty-accent"
        onClickAction={() => setLanguage("en")}
        className={`font-bold ${
          language === "en" ? "!bg-accent !text-white" : ""
        }`}
      >
        EN
      </Button>
    </div>
  );
};

export default WageLanguageSwitcher;
