"use client";

import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";
import { useFormContext } from "react-hook-form";

const FormErrorNotification = () => {
  const { translations } = useWageLanguage();
  const { errorsButton } = translations;
  const {
    formState: { errors },
  } = useFormContext();

  const goToFirstError = () => {
    const firstError = Object.keys(errors)[0];

    if (!firstError) return;

    document.getElementById(firstError)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="h-[3.2rem] mt-4">
      {errorCount !== 0 && (
        <Button
          variant="empty-accent"
          onClickAction={goToFirstError}
          className=" w-full"
        >
          {errorsButton} - {errorCount}
        </Button>
      )}
    </div>
  );
};

export default FormErrorNotification;
