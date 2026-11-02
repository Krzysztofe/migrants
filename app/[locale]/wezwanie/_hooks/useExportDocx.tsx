import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const TEMPLATE_URL = "/templates/wezwanie-do-zaplaty-template.docx";

const useExportDocx = () => {
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [error, setError] = useState("");

  const handleExportDocx = async (data: Record<string, string>) => {
    if (isExportingDocx) return;

    setIsExportingDocx(true);
    setError("");

    try {
      const response = await fetch(TEMPLATE_URL);
      if (!response.ok) throw new Error("Nie udało się pobrać szablonu.");

      const doc = new Docxtemplater(new PizZip(await response.arrayBuffer()), {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.render(data);

      const blob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "wezwanie-do-zaplaty.docx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError("Nie udało się wygenerować dokumentu Word.");
    } finally {
      setIsExportingDocx(false);
    }
  };

  return { handleExportDocx, isExportingDocx, error };
};

export default useExportDocx;
