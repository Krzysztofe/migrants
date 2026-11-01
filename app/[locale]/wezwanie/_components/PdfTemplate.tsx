"use client";

import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";
import { ContractEditor } from "./DocumentEditor";

const PdfTemplate = () => {
  const { control } = useFormContext<WageFormSchema>();

  const formValues = useWatch({
    control,
  });

  const { errors } = useFormState({ control });

  const validValues: Partial<WageFormSchema> = Object.fromEntries(
    Object.entries(formValues).filter(([name, value]) => {
      const hasError = !!errors[name as keyof WageFormSchema];

      return !hasError && typeof value === "string" && value.trim() !== "";
    }),
  );

  return (
    <div className="flex-1  min-w-0">
      <p className="text-bold">Twoje pismo</p>
      <ContractEditor formData={validValues} />
    </div>
  );
};

export default PdfTemplate;
