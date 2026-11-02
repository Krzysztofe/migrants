"use client";

import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useExportDocx from "../_hooks/useExportDocx";
import useExportPdf from "../_hooks/useExportPdf";
import CopyTextBtn from "./CopyTextBtn";
import PdfTemplate from "./PdfTemplate";
import { emptyPlaceholders } from "@/lib/dataCollections/wageDocumentPlaceholders";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/buttons/Button";

type DocumentField = keyof typeof emptyPlaceholders;

const fields = Object.keys(emptyPlaceholders) as DocumentField[];

const WageDocumentEditor = () => {
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
      <div className="flex flex-wrap gap-3">
        <CopyTextBtn previewRef={previewRef} />

        <Button
          type="button"
          onClickAction={handleDocxDownload}
          disabled={isExportingDocx || isExportingPdf}
          variant="primary-rounded"
        >
          {isExportingDocx
            ? "Generowanie Word..."
            : "Pobierz jako Word (.docx)"}
        </Button>

        <Button
          type="button"
          onClickAction={handlePdfDownload}
          disabled={isExportingPdf || isExportingDocx}
          variant="primary-rounded"
        >
          {isExportingPdf ? "Generowanie PDF..." : "Pobierz PDF"}
        </Button>
      </div>

      {invalidFields.length > 0 && (
        <Card className="mt-4 rounded-md !border-error text-error">
          <p className="mb-2 font-semibold">Uzupełnij następujące pola:</p>

          <ul className="list-inside list-disc">
            {invalidFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </Card>
      )}

      {error && <p className="mt-3 text-error">{error}</p>}

      <PdfTemplate previewRef={previewRef} />
    </div>
  );
};

export default WageDocumentEditor;
