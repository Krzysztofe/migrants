"use client";

import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

const PdfTemplate = () => {
  const { control } = useFormContext<WageFormSchema>();

  const formValues = useWatch({
    control,
  });

  const { errors } = useFormState({ control });

  const validValues = Object.fromEntries(
    Object.entries(formValues).filter(([name, value]) => {
      const hasError = !!errors[name as keyof WageFormSchema];

      return !hasError && typeof value === "string" && value.trim() !== "";
    }),
  );

  return (
    <div className="flex-1">
      <p className="text-bold">Twoje pismo</p>
      <pre>{JSON.stringify(validValues, null, 2)}</pre>
    </div>
  );
};

export default PdfTemplate;
