import { useState } from "react";

type Props = {
  previewRef: React.RefObject<HTMLDivElement | null>;
};

const useExportPdf = ({ previewRef }: Props) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [error, setError] = useState("");

  const handleExportPdf = async () => {
    const source = previewRef.current;

    if (!source || isExportingPdf) return;

    setIsExportingPdf(true);
    setError("");

    const CONTENT_WIDTH_PX = 642;
    let container: HTMLDivElement | null = null;

    try {
      const { default: html2pdf } = await import("html2pdf.js");

      container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-10000px";
      container.style.top = "0";
      container.style.width = `${CONTENT_WIDTH_PX}px`;
      container.style.background = "#fff";

      const clone = source.cloneNode(true) as HTMLElement;

      clone.style.width = "100%";
      clone.style.maxWidth = "none";
      clone.style.margin = "0";
      clone.style.padding = "0";
      clone.style.boxShadow = "none";

      clone
        .querySelectorAll<HTMLElement>(".text-red-600")
        .forEach((el) => (el.style.color = "#000"));

      container.appendChild(clone);
      document.body.appendChild(container);

      await html2pdf()
        .set({
          margin: 20,
          filename: "wezwanie-do-zaplaty.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
        })
        .from(clone)
        .save();
    } catch (e) {
      console.error(e);
      setError("Nie udało się wygenerować dokumentu PDF.");
    } finally {
      container?.remove();
      setIsExportingPdf(false);
    }
  };

  return {
    handleExportPdf,
    isExportingPdf,
    error,
  };
};

export default useExportPdf;
