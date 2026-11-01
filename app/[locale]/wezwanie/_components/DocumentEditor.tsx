"use client";

import { useEffect, useRef, useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { renderAsync } from "docx-preview";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

const emptyPlaceholders: Record<keyof WageFormSchema, string> = {
  place: "Miejscowość",
  date: "Data",

  name: "Imię nadawcy",
  surname: "Nazwisko nadawcy",
  phone: "telefon",
  email: "email",
  userCity: "Miejscowość",
  userStreet: "Ulica",
  userHouseNomber: "nr budynku",
  userFlatNomber: "nr lokalu",
  userPostCode: "kod",
  accountNumber: "Numer rachunku bankowego",

  companyName: "Nazwa przedsiębiorstwa",
  companyCity: "Miejscowość",
  companyStreet: "Ulica",
  companyHouseNomber: "Nr budynku",
  companyFlatNomber: "nr lokalu",
  companyPostCode: "kod",

  contractType: "Rodzaj umowy",
  contractStartDate: "Data rozpoczęcia",

  workStart: "Od",
  workEnd: "Do",
  hours: "Liczba godzin",
  money: "Kwota",
};

type Props = {
  formData: Partial<WageFormSchema>;
};

const fields = Object.keys(emptyPlaceholders) as (keyof WageFormSchema)[];

const previewMarkers = Object.fromEntries(
  fields.map((field) => [field, `__PREVIEW_${field}__`]),
) as Record<keyof WageFormSchema, string>;

type TextBinding = {
  node: Text;
  originalText: string;
};

function createDocumentBlob(
  template: ArrayBuffer,
  data: Record<string, string>,
): Blob {
  const zip = new PizZip(template);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);

  return doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

export function ContractEditor({ formData }: Props) {
  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  console.log("", formData);

  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const bindingsRef = useRef<TextBinding[]>([]);
  const currentDataRef = useRef(formData);

  const [template, setTemplate] = useState<ArrayBuffer | null>(null);
  const [previewReady, setPreviewReady] = useState(false);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState("");

  const handleCopyText = async () => {
    try {
      const content = previewRef.current?.innerText;

      if (!content) return;

      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      setError("Nie udało się skopiować treści dokumentu.");
    }
  };

  const handleExportPdf = async () => {
    if (!previewReady || !previewRef.current) return;

    const wrapper = previewRef.current.querySelector(
      ".docx-wrapper",
    ) as HTMLElement | null;

    const previewContainer = previewRef.current.closest(
      ".docx-preview-container",
    ) as HTMLElement | null;

    if (!wrapper) {
      setError("Nie znaleziono podglądu dokumentu.");
      return;
    }

    // Pobieramy poszczególne strony dokumentu.
    // Pomijamy strony, które nie zawierają żadnej treści.
    const pages = Array.from(
      wrapper.querySelectorAll<HTMLElement>(":scope > section.docx"),
    ).filter(
      (page) =>
        page.innerText.trim().length > 0 ||
        page.querySelector("img, svg, canvas"),
    );

    if (!pages.length) {
      setError("Dokument nie zawiera treści do eksportu.");
      return;
    }

    const previousZoom = previewContainer?.style.zoom;

    setIsExportingPdf(true);
    setError("");

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Przywracamy oryginalny rozmiar strony przed eksportem.
      if (previewContainer) {
        previewContainer.style.zoom = "1";
      }

      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        // Zapamiętujemy oryginalne style.
        const previousStyles = {
          backgroundColor: page.style.backgroundColor,
          boxShadow: page.style.boxShadow,
          margin: page.style.margin,
        };

        try {
          // Usuwamy tło i cień strony.
          page.style.backgroundColor = "#ffffff";
          page.style.boxShadow = "none";
          page.style.margin = "0";

          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
            scrollX: 0,
            scrollY: 0,
          });

          // Dopasowujemy stronę do formatu A4.
          const ratio = Math.min(
            pdfWidth / canvas.width,
            pdfHeight / canvas.height,
          );

          const width = canvas.width * ratio;
          const height = canvas.height * ratio;

          const x = (pdfWidth - width) / 2;
          const y = (pdfHeight - height) / 2;

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(
            canvas.toDataURL("image/jpeg", 0.95),
            "JPEG",
            x,
            y,
            width,
            height,
          );

          // Zwalniamy pamięć zajmowaną przez canvas.
          canvas.width = 0;
          canvas.height = 0;
        } finally {
          // Przywracamy style podglądu.
          page.style.backgroundColor = previousStyles.backgroundColor;
          page.style.boxShadow = previousStyles.boxShadow;
          page.style.margin = previousStyles.margin;
        }
      }

      pdf.save("wezwanie-do-zaplaty.pdf");
    } catch (error) {
      console.error(error);
      setError("Nie udało się wygenerować dokumentu PDF.");
    } finally {
      if (previewContainer) {
        previewContainer.style.zoom = previousZoom || "1";
      }

      setIsExportingPdf(false);
    }
  };

  // Zawsze aktualne dane formularza
  currentDataRef.current = formData;

  // Pobranie szablonu tylko raz
  useEffect(() => {
    let cancelled = false;

    async function loadTemplate() {
      try {
        const response = await fetch(
          "/templates/wezwanie-do-zaplaty-template.docx",
        );

        if (!response.ok) {
          throw new Error("Nie udało się pobrać szablonu");
        }

        const buffer = await response.arrayBuffer();

        if (!cancelled) {
          setTemplate(buffer);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setError("Nie udało się załadować dokumentu.");
        }
      }
    }

    loadTemplate();

    return () => {
      cancelled = true;
    };
  }, []);

  // Aktualizacja wyłącznie tekstu w istniejącym podglądzie
  const updatePreview = (data: Partial<WageFormSchema>) => {
    bindingsRef.current.forEach(({ node, originalText }) => {
      let text = originalText;

      fields.forEach((field) => {
        const value = data[field]?.trim();

        const replacement = value ? value : `[${emptyPlaceholders[field]}]`;

        text = text.replaceAll(previewMarkers[field], replacement);
      });

      node.nodeValue = text;
    });
  };

  // Renderowanie DOCX tylko jeden raz
  useEffect(() => {
    if (!template || !previewRef.current) return;

    let cancelled = false;

    async function initializePreview() {
      try {
        const blob = createDocumentBlob(template!, previewMarkers);

        const container = previewRef.current;

        if (!container) return;

        await renderAsync(blob, container, container, {
          className: "docx",
          inWrapper: true,
          breakPages: true,
          ignoreWidth: false,
          ignoreHeight: false,
        });

        if (cancelled) return;

        const bindings: TextBinding[] = [];

        const walker = document.createTreeWalker(
          container,
          NodeFilter.SHOW_TEXT,
        );

        let currentNode: Node | null;

        while ((currentNode = walker.nextNode())) {
          const node = currentNode as Text;

          if (
            fields.some((field) =>
              node.nodeValue?.includes(previewMarkers[field]),
            )
          ) {
            bindings.push({
              node,
              originalText: node.nodeValue ?? "",
            });
          }
        }

        bindingsRef.current = bindings;

        updatePreview(currentDataRef.current);

        setPreviewReady(true);
      } catch (error) {
        console.error(error);
        setError("Nie udało się wygenerować podglądu.");
      }
    }

    initializePreview();

    return () => {
      cancelled = true;
    };
  }, [template]);

  // Aktualizacja danych bez ponownego renderowania DOCX
  useEffect(() => {
    if (!previewReady) return;

    updatePreview(formData);
  }, [formData, previewReady]);

  // Automatyczne skalowanie kartki A4
  useEffect(() => {
    const container = containerRef.current;

    if (!container || !previewReady) return;

    const updateScale = () => {
      const page = previewRef.current?.querySelector(
        ".docx-wrapper > section.docx",
      ) as HTMLElement | null;

      if (!page) return;

      const availableWidth = container.clientWidth;
      const pageWidth = page.offsetWidth;

      if (!availableWidth || !pageWidth) return;

      setScale(Math.min(1, availableWidth / pageWidth));
    };

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    requestAnimationFrame(updateScale);

    return () => observer.disconnect();
  }, [previewReady]);

  // Pobieranie Worda
  const handleExportWord = () => {
    if (!template) return;

    try {
      const blob = createDocumentBlob(template, formData);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "wezwanie-do-zaplaty.docx";
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
      setError("Nie udało się wygenerować dokumentu Word.");
    }
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <button
        type="button"
        onClick={handleCopyText}
        disabled={!previewReady}
        className="rounded-md border border-accent px-5 py-3 text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
      >
        {copied ? "Skopiowano!" : "Kopiuj treść pisma"}
      </button>

      <button
        type="button"
        onClick={handleExportWord}
        disabled={!template}
        className="w-fit rounded-md bg-accent px-5 py-3 text-white disabled:opacity-50"
      >
        Pobierz umowę Word
      </button>

      <button
        type="button"
        onClick={handleExportPdf}
        disabled={!previewReady || isExportingPdf}
        className="rounded-md bg-accent px-5 py-3 text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
      >
        {isExportingPdf ? "Generowanie PDF..." : "Pobierz PDF"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {!previewReady && !error && <p>Przygotowywanie podglądu dokumentu...</p>}

      <div ref={containerRef} className="w-full min-w-0 overflow-hidden">
        <div className="docx-preview-container w-full" style={{ zoom: scale }}>
          <div ref={previewRef} />
        </div>
      </div>
    </div>
  );
}
