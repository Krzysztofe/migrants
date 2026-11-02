"use client";

import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";
import { useRef } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import useExportDocx from "../_hooks/useExportDocx";
import useExportPdf from "../_hooks/useExportPdf";
import CopyTextBtn from "./CopyTextBtn";
import PdfTemplate from "./PdfTemplate";
import { emptyPlaceholders } from "@/lib/dataCollections/wageDocumentPlaceholders";

const fields = Object.keys(emptyPlaceholders) as (keyof WageFormSchema)[];

const WageDocumentEditor = () => {
  const { control } = useFormContext<WageFormSchema>();
  const formValues = useWatch({
    control,
  });
  const { errors } = useFormState({ control });
  const previewRef = useRef<HTMLDivElement>(null);

  const {
    handleExportPdf,
    isExportingPdf,
    error: pdfError,
  } = useExportPdf({
    previewRef,
  });
  const {
    handleExportDocx,
    isExportingDocx,
    error: docxError,
  } = useExportDocx();

  const documentData = Object.fromEntries(
    fields.map((field) => {
      const value = formValues[field];
      const isValid = !errors[field] && typeof value === "string";
      return [field, isValid ? value.trim() : ""];
    }),
  ) as Record<keyof WageFormSchema, string>;

  const error = pdfError || docxError;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        <CopyTextBtn previewRef={previewRef} />

        <button
          type="button"
          onClick={() => handleExportDocx(documentData)}
          disabled={isExportingDocx}
          className="rounded-md bg-accent px-5 py-3 text-white disabled:opacity-50"
        >
          {isExportingDocx
            ? "Generowanie Word..."
            : "Pobierz jako Word (.docx)"}
        </button>

        <button
          type="button"
          onClick={handleExportPdf}
          disabled={isExportingPdf}
          className="rounded-md bg-accent px-5 py-3 text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
        >
          {isExportingPdf ? "Generowanie PDF..." : "Pobierz PDF"}
        </button>
      </div>

      {error && <p className="text-error">{error}</p>}

      <PdfTemplate previewRef={previewRef} />
    </div>
  );
};

export default WageDocumentEditor;
