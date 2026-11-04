"use client";

import Button from "@/components/shared/buttons/Button";
import { useWageLanguage } from "@/context/WageLanguageContext";
import { emptyPlaceholders } from "@/lib/dataCollections/wageDocumentPlaceholders";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useExportDocx from "../_hooks/useExportDocx";
import useExportPdf from "../_hooks/useExportPdf";
import CopyTextBtn from "./CopyTextBtn";
import FormErrorNotification from "./FormErrorNotification";
import PdfTemplate from "./PdfTemplate";
import Captcha from "./Captcha";

type DocumentField = keyof typeof emptyPlaceholders;

const fields = Object.keys(emptyPlaceholders) as DocumentField[];

const WageDocumentEditor = () => {
  const { translations } = useWageLanguage();
  const { downloadWord, downloadPDF } = translations;

  const { trigger, getValues, getFieldState } =
    useFormContext<WageFormSchema>();

  const previewRef = useRef<HTMLDivElement>(null);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const {
    handleExportPdf,
    isExportingPdf,
    error: pdfError,
  } = useExportPdf({ previewRef });

  const {
    handleExportDocx,
    isExportingDocx,
    error: docxError,
  } = useExportDocx();

  const validateBeforeExport = async () => {
    const isValid = await trigger(undefined, { shouldFocus: true });

    const invalid = fields.filter((field) => getFieldState(field).invalid);

    setInvalidFields(invalid.map((field) => emptyPlaceholders[field]));

    return isValid;
  };

  const getDocumentData = () => {
    const values = getValues();

    return Object.fromEntries(
      fields.map((field) => {
        const value = values[field];

        return [field, typeof value === "string" ? value.trim() : ""];
      }),
    ) as Record<DocumentField, string>;
  };

  const handlePdfDownload = async () => {
    if (!(await validateBeforeExport())) return;

    await handleExportPdf();
  };

  const handleDocxDownload = async () => {
    if (!(await validateBeforeExport())) return;

    await handleExportDocx(getDocumentData());
  };

  const error = pdfError || docxError;

  return (
    <div className="w-full">
      <FormErrorNotification />
      <div className="flex flex-wrap gap-4 ml-auto w-fit">
        <CopyTextBtn previewRef={previewRef} />

        <Button
          type="button"
          onClickAction={handleDocxDownload}
          disabled={isExportingDocx || isExportingPdf}
          variant="primary-rounded"
          isLoading={isExportingDocx}
        >
          {downloadWord}
        </Button>

        <Button
          type="button"
          onClickAction={handlePdfDownload}
          disabled={isExportingPdf || isExportingDocx}
          variant="primary-rounded"
          isLoading={isExportingPdf}
        >
          {downloadPDF}
        </Button>
        <Captcha />
      </div>

      {error && <p className="mt-3 text-error text-sm">{error}</p>}

      <PdfTemplate previewRef={previewRef} />
    </div>
  );
};

export default WageDocumentEditor;
