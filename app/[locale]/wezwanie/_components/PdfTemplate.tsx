"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

const PdfTemplate = () => {
  const { control } = useFormContext<WageFormSchema>();

  const formValues = useWatch({
    control,
  });

  return (
    <div className="flex-1">
      <p className="text-bold">Twoje pismo</p>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </div>
  );
};

export default PdfTemplate;
