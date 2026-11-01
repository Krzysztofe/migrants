// "use client";

// import { useEffect, useRef, useState } from "react";
// import Docxtemplater from "docxtemplater";
// import PizZip from "pizzip";
// import { renderAsync } from "docx-preview";
// import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

// const emptyPlaceholders: Record<keyof WageFormSchema, string> = {
//   place: "Miejscowość",
//   date: "Data",

//   name: "Imię nadawcy",
//   surname: "Nazwisko nadawcy",
//   phone: "telefon",
//   email: "email",
//   userCity: "Miejscowość",
//   userStreet: "Ulica",
//   userHouseNomber: "nr budynku",
//   userFlatNomber: "nr lokalu",
//   userPostCode: "kod",
//   accountNumber: "Numer rachunku bankowego",

//   companyName: "Nazwa przedsiębiorstwa",
//   companyCity: "Miejscowość",
//   companyStreet: "Ulica",
//   companyHouseNomber: "Nr budynku",
//   companyFlatNomber: "nr lokalu",
//   companyPostCode: "kod",

//   contractType: "Rodzaj umowy",
//   contractStartDate: "Data rozpoczęcia",

//   workStart: "Od",
//   workEnd: "Do",
//   hours: "Liczba godzin",
//   money: "Kwota",
// };

// type Props = {
//   formData: Partial<WageFormSchema>;
// };

// const fields = Object.keys(emptyPlaceholders) as (keyof WageFormSchema)[];

// const previewMarkers = Object.fromEntries(
//   fields.map((field) => [field, `__PREVIEW_${field}__`]),
// ) as Record<keyof WageFormSchema, string>;

// type TextBinding = {
//   node: Text;
//   originalText: string;
// };

// function createDocumentBlob(
//   template: ArrayBuffer,
//   data: Record<string, string>,
// ): Blob {
//   const zip = new PizZip(template);

//   const doc = new Docxtemplater(zip, {
//     paragraphLoop: true,
//     linebreaks: true,
//   });

//   doc.render(data);

//   return doc.getZip().generate({
//     type: "blob",
//     mimeType:
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   });
// }

// export function ContractEditor({ formData }: Props) {
//   const [copied, setCopied] = useState(false);
//   const [isExportingPdf, setIsExportingPdf] = useState(false);
//   console.log("", formData);

//   const previewRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const bindingsRef = useRef<TextBinding[]>([]);
//   const currentDataRef = useRef(formData);

//   const [template, setTemplate] = useState<ArrayBuffer | null>(null);
//   const [previewReady, setPreviewReady] = useState(false);
//   const [scale, setScale] = useState(1);
//   const [error, setError] = useState("");

//   const handleCopyText = async () => {
//     try {
//       const content = previewRef.current?.innerText;

//       if (!content) return;

//       await navigator.clipboard.writeText(content);

//       setCopied(true);

//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       console.error(error);
//       setError("Nie udało się skopiować treści dokumentu.");
//     }
//   };

//   const handleExportPdf = async () => {
//     if (!previewReady || !previewRef.current) return;

//     const wrapper = previewRef.current.querySelector(
//       ".docx-wrapper",
//     ) as HTMLElement | null;

//     const previewContainer = previewRef.current.closest(
//       ".docx-preview-container",
//     ) as HTMLElement | null;

//     if (!wrapper) {
//       setError("Nie znaleziono podglądu dokumentu.");
//       return;
//     }

//     // Pobieramy poszczególne strony dokumentu.
//     // Pomijamy strony, które nie zawierają żadnej treści.
//     const pages = Array.from(
//       wrapper.querySelectorAll<HTMLElement>(":scope > section.docx"),
//     ).filter(
//       (page) =>
//         page.innerText.trim().length > 0 ||
//         page.querySelector("img, svg, canvas"),
//     );

//     if (!pages.length) {
//       setError("Dokument nie zawiera treści do eksportu.");
//       return;
//     }

//     const previousZoom = previewContainer?.style.zoom;

//     setIsExportingPdf(true);
//     setError("");

//     try {
//       const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
//         import("html2canvas"),
//         import("jspdf"),
//       ]);

//       // Przywracamy oryginalny rozmiar strony przed eksportem.
//       if (previewContainer) {
//         previewContainer.style.zoom = "1";
//       }

//       await new Promise<void>((resolve) =>
//         requestAnimationFrame(() => resolve()),
//       );

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       for (let i = 0; i < pages.length; i++) {
//         const page = pages[i];

//         // Zapamiętujemy oryginalne style.
//         const previousStyles = {
//           backgroundColor: page.style.backgroundColor,
//           boxShadow: page.style.boxShadow,
//           margin: page.style.margin,
//         };

//         try {
//           // Usuwamy tło i cień strony.
//           page.style.backgroundColor = "#ffffff";
//           page.style.boxShadow = "none";
//           page.style.margin = "0";

//           const canvas = await html2canvas(page, {
//             scale: 2,
//             useCORS: true,
//             backgroundColor: "#ffffff",
//             logging: false,
//             scrollX: 0,
//             scrollY: 0,
//           });

//           // Dopasowujemy stronę do formatu A4.
//           const ratio = Math.min(
//             pdfWidth / canvas.width,
//             pdfHeight / canvas.height,
//           );

//           const width = canvas.width * ratio;
//           const height = canvas.height * ratio;

//           const x = (pdfWidth - width) / 2;
//           const y = (pdfHeight - height) / 2;

//           if (i > 0) {
//             pdf.addPage();
//           }

//           pdf.addImage(
//             canvas.toDataURL("image/jpeg", 0.95),
//             "JPEG",
//             x,
//             y,
//             width,
//             height,
//           );

//           // Zwalniamy pamięć zajmowaną przez canvas.
//           canvas.width = 0;
//           canvas.height = 0;
//         } finally {
//           // Przywracamy style podglądu.
//           page.style.backgroundColor = previousStyles.backgroundColor;
//           page.style.boxShadow = previousStyles.boxShadow;
//           page.style.margin = previousStyles.margin;
//         }
//       }

//       pdf.save("wezwanie-do-zaplaty.pdf");
//     } catch (error) {
//       console.error(error);
//       setError("Nie udało się wygenerować dokumentu PDF.");
//     } finally {
//       if (previewContainer) {
//         previewContainer.style.zoom = previousZoom || "1";
//       }

//       setIsExportingPdf(false);
//     }
//   };

//   // Zawsze aktualne dane formularza
//   currentDataRef.current = formData;

//   // Pobranie szablonu tylko raz
//   useEffect(() => {
//     let cancelled = false;

//     async function loadTemplate() {
//       try {
//         const response = await fetch(
//           "/templates/wezwanie-do-zaplaty-template.docx",
//         );

//         if (!response.ok) {
//           throw new Error("Nie udało się pobrać szablonu");
//         }

//         const buffer = await response.arrayBuffer();

//         if (!cancelled) {
//           setTemplate(buffer);
//         }
//       } catch (error) {
//         console.error(error);

//         if (!cancelled) {
//           setError("Nie udało się załadować dokumentu.");
//         }
//       }
//     }

//     loadTemplate();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Aktualizacja wyłącznie tekstu w istniejącym podglądzie
//   const updatePreview = (data: Partial<WageFormSchema>) => {
//     bindingsRef.current.forEach(({ node, originalText }) => {
//       let text = originalText;

//       fields.forEach((field) => {
//         const value = data[field]?.trim();

//         const replacement = value ? value : `[${emptyPlaceholders[field]}]`;

//         text = text.replaceAll(previewMarkers[field], replacement);
//       });

//       node.nodeValue = text;
//     });
//   };

//   // Renderowanie DOCX tylko jeden raz
//   useEffect(() => {
//     if (!template || !previewRef.current) return;

//     let cancelled = false;

//     async function initializePreview() {
//       try {
//         const blob = createDocumentBlob(template!, previewMarkers);

//         const container = previewRef.current;

//         if (!container) return;

//         await renderAsync(blob, container, container, {
//           className: "docx",
//           inWrapper: true,
//           breakPages: true,
//           ignoreWidth: false,
//           ignoreHeight: false,
//         });

//         if (cancelled) return;

//         const bindings: TextBinding[] = [];

//         const walker = document.createTreeWalker(
//           container,
//           NodeFilter.SHOW_TEXT,
//         );

//         let currentNode: Node | null;

//         while ((currentNode = walker.nextNode())) {
//           const node = currentNode as Text;

//           if (
//             fields.some((field) =>
//               node.nodeValue?.includes(previewMarkers[field]),
//             )
//           ) {
//             bindings.push({
//               node,
//               originalText: node.nodeValue ?? "",
//             });
//           }
//         }

//         bindingsRef.current = bindings;

//         updatePreview(currentDataRef.current);

//         setPreviewReady(true);
//       } catch (error) {
//         console.error(error);
//         setError("Nie udało się wygenerować podglądu.");
//       }
//     }

//     initializePreview();

//     return () => {
//       cancelled = true;
//     };
//   }, [template]);

//   // Aktualizacja danych bez ponownego renderowania DOCX
//   useEffect(() => {
//     if (!previewReady) return;

//     updatePreview(formData);
//   }, [formData, previewReady]);

//   // Automatyczne skalowanie kartki A4
//   useEffect(() => {
//     const container = containerRef.current;

//     if (!container || !previewReady) return;

//     const updateScale = () => {
//       const page = previewRef.current?.querySelector(
//         ".docx-wrapper > section.docx",
//       ) as HTMLElement | null;

//       if (!page) return;

//       const availableWidth = container.clientWidth;
//       const pageWidth = page.offsetWidth;

//       if (!availableWidth || !pageWidth) return;

//       setScale(Math.min(1, availableWidth / pageWidth));
//     };

//     const observer = new ResizeObserver(updateScale);

//     observer.observe(container);

//     requestAnimationFrame(updateScale);

//     return () => observer.disconnect();
//   }, [previewReady]);

//   // Pobieranie Worda
//   const handleExportWord = () => {
//     if (!template) return;

//     try {
//       const blob = createDocumentBlob(template, formData);
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;
//       link.download = "wezwanie-do-zaplaty.docx";
//       link.click();

//       setTimeout(() => URL.revokeObjectURL(url), 1000);
//     } catch (error) {
//       console.error(error);
//       setError("Nie udało się wygenerować dokumentu Word.");
//     }
//   };

//   return (
//     <div className="flex w-full min-w-0 flex-col gap-4">
//       <button
//         type="button"
//         onClick={handleCopyText}
//         disabled={!previewReady}
//         className="rounded-md border border-accent px-5 py-3 text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
//       >
//         {copied ? "Skopiowano!" : "Kopiuj treść pisma"}
//       </button>

//       <button
//         type="button"
//         onClick={handleExportWord}
//         disabled={!template}
//         className="w-fit rounded-md bg-accent px-5 py-3 text-white disabled:opacity-50"
//       >
//         Pobierz umowę Word
//       </button>

//       <button
//         type="button"
//         onClick={handleExportPdf}
//         disabled={!previewReady || isExportingPdf}
//         className="rounded-md bg-accent px-5 py-3 text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
//       >
//         {isExportingPdf ? "Generowanie PDF..." : "Pobierz PDF"}
//       </button>

//       {error && <p className="text-red-600">{error}</p>}

//       {!previewReady && !error && <p>Przygotowywanie podglądu dokumentu...</p>}

//       <div ref={containerRef} className="w-full min-w-0 overflow-hidden">
//         <div className="docx-preview-container w-full" style={{ zoom: scale }}>
//           <div ref={previewRef} />
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Docxtemplater from "docxtemplater";
// import PizZip from "pizzip";
// import { renderAsync } from "docx-preview";
// import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

// const emptyPlaceholders: Record<keyof WageFormSchema, string> = {
//   place: "Miejscowość",
//   date: "Data",

//   name: "Imię nadawcy",
//   surname: "Nazwisko nadawcy",
//   phone: "Telefon",
//   email: "Email",
//   userCity: "Miejscowość",
//   userStreet: "Ulica",
//   userHouseNomber: "Nr budynku",
//   userFlatNomber: "Nr lokalu",
//   userPostCode: "Kod pocztowy",
//   accountNumber: "Numer rachunku bankowego",

//   companyName: "Nazwa przedsiębiorstwa",
//   companyCity: "Miejscowość",
//   companyStreet: "Ulica",
//   companyHouseNomber: "Nr budynku",
//   companyFlatNomber: "Nr lokalu",
//   companyPostCode: "Kod pocztowy",

//   contractType: "Rodzaj umowy",
//   contractStartDate: "Data rozpoczęcia",

//   workStart: "Od",
//   workEnd: "Do",
//   hours: "Liczba godzin",
//   money: "Kwota",
// };

// type Props = {
//   formData: Partial<WageFormSchema>;
// };

// const fields = Object.keys(emptyPlaceholders) as (keyof WageFormSchema)[];

// type DocumentData = Record<keyof WageFormSchema, string>;

// function getDocumentData(formData: Partial<WageFormSchema>): DocumentData {
//   return Object.fromEntries(
//     fields.map((field) => [field, formData[field]?.trim() ?? ""]),
//   ) as DocumentData;
// }

// function createDocumentBlob(
//   template: ArrayBuffer,
//   data: Record<string, string>,
// ): Blob {
//   const zip = new PizZip(template.slice(0));

//   const doc = new Docxtemplater(zip, {
//     paragraphLoop: true,
//     linebreaks: true,
//   });

//   doc.render(data);

//   return doc.getZip().generate({
//     type: "blob",
//     mimeType:
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   });
// }

// export function ContractEditor({ formData }: Props) {
//   const previewRef = useRef<HTMLDivElement>(null);

//   const [template, setTemplate] = useState<ArrayBuffer | null>(null);
//   const [error, setError] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [isExportingPdf, setIsExportingPdf] = useState(false);

//   // Aktualne dane dokumentu
//   const documentData = getDocumentData(formData);

//   // Pobranie szablonu DOCX
//   useEffect(() => {
//     let cancelled = false;

//     async function loadTemplate() {
//       try {
//         const response = await fetch(
//           "/templates/wezwanie-do-zaplaty-template.docx",
//         );

//         if (!response.ok) {
//           throw new Error("Nie udało się pobrać szablonu.");
//         }

//         const buffer = await response.arrayBuffer();

//         if (!cancelled) {
//           setTemplate(buffer);
//         }
//       } catch (error) {
//         console.error(error);

//         if (!cancelled) {
//           setError("Nie udało się załadować dokumentu.");
//         }
//       }
//     }

//     loadTemplate();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Pobieranie wartości lub placeholdera
//   const getValue = (field: keyof WageFormSchema) => {
//     const value = formData[field]?.trim();

//     return value || `[${emptyPlaceholders[field]}]`;
//   };

//   // Wyświetlanie brakujących danych
//   const PreviewValue = ({ field }: { field: keyof WageFormSchema }) => {
//     const value = formData[field]?.trim();

//     return (
//       <span className={value ? "text-slate-900" : "italic text-red-500"}>
//         {getValue(field)}
//       </span>
//     );
//   };

//   // Kopiowanie treści podglądu HTML
//   const handleCopyText = async () => {
//     try {
//       const content = previewRef.current?.innerText;

//       if (!content) return;

//       await navigator.clipboard.writeText(content);

//       setCopied(true);

//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       console.error(error);
//       setError("Nie udało się skopiować treści dokumentu.");
//     }
//   };

//   // Eksport DOCX
//   const handleExportWord = () => {
//     if (!template) return;

//     try {
//       setError("");

//       const blob = createDocumentBlob(template, documentData);
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;
//       link.download = "wezwanie-do-zaplaty.docx";
//       link.click();

//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error(error);
//       setError("Nie udało się wygenerować dokumentu Word.");
//     }
//   };

//   // Eksport PDF na podstawie wygenerowanego DOCX
//   const handleExportPdf = async () => {
//     if (!template || isExportingPdf) return;

//     let exportContainer: HTMLDivElement | null = null;

//     setIsExportingPdf(true);
//     setError("");

//     try {
//       const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
//         import("html2canvas"),
//         import("jspdf"),
//       ]);

//       // Najpierw generujemy DOCX z aktualnymi danymi
//       const docxBlob = createDocumentBlob(template, documentData);

//       // Tymczasowy kontener tylko do eksportu PDF
//       exportContainer = document.createElement("div");

//       exportContainer.style.position = "fixed";
//       exportContainer.style.left = "-10000px";
//       exportContainer.style.top = "0";
//       exportContainer.style.width = "900px";
//       exportContainer.style.background = "#ffffff";

//       document.body.appendChild(exportContainer);

//       // Renderowanie wygenerowanego DOCX
//       await renderAsync(docxBlob, exportContainer, exportContainer, {
//         className: "docx",
//         inWrapper: true,
//         breakPages: true,
//         ignoreWidth: false,
//         ignoreHeight: false,
//       });

//       const pages = Array.from(
//         exportContainer.querySelectorAll<HTMLElement>(
//           ".docx-wrapper > section.docx",
//         ),
//       ).filter(
//         (page) =>
//           page.innerText.trim().length > 0 ||
//           page.querySelector("img, svg, canvas"),
//       );

//       if (!pages.length) {
//         throw new Error("Dokument nie zawiera treści.");
//       }

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       // Każda strona DOCX zostaje osobną stroną PDF
//       for (let i = 0; i < pages.length; i++) {
//         const page = pages[i];

//         const canvas = await html2canvas(page, {
//           scale: 2,
//           useCORS: true,
//           backgroundColor: "#ffffff",
//           logging: false,
//           scrollX: 0,
//           scrollY: 0,
//         });

//         const ratio = Math.min(
//           pdfWidth / canvas.width,
//           pdfHeight / canvas.height,
//         );

//         const width = canvas.width * ratio;
//         const height = canvas.height * ratio;

//         const x = (pdfWidth - width) / 2;
//         const y = (pdfHeight - height) / 2;

//         if (i > 0) {
//           pdf.addPage();
//         }

//         pdf.addImage(
//           canvas.toDataURL("image/jpeg", 0.95),
//           "JPEG",
//           x,
//           y,
//           width,
//           height,
//         );

//         canvas.width = 0;
//         canvas.height = 0;
//       }

//       pdf.save("wezwanie-do-zaplaty.pdf");
//     } catch (error) {
//       console.error(error);
//       setError("Nie udało się wygenerować dokumentu PDF.");
//     } finally {
//       exportContainer?.remove();
//       setIsExportingPdf(false);
//     }
//   };

//   return (
//     <div className="flex w-full min-w-0 flex-col gap-4">
//       {/* Przyciski */}
//       <div className="flex flex-wrap gap-3">
//         <button
//           type="button"
//           onClick={handleCopyText}
//           className="rounded-md border border-accent px-5 py-3 text-accent transition-colors hover:bg-accent/10"
//         >
//           {copied ? "Skopiowano!" : "Kopiuj treść pisma"}
//         </button>

//         <button
//           type="button"
//           onClick={handleExportWord}
//           disabled={!template}
//           className="rounded-md bg-accent px-5 py-3 text-white disabled:opacity-50"
//         >
//           Pobierz Word
//         </button>

//         <button
//           type="button"
//           onClick={handleExportPdf}
//           disabled={!template || isExportingPdf}
//           className="rounded-md bg-accent px-5 py-3 text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
//         >
//           {isExportingPdf ? "Generowanie PDF..." : "Pobierz PDF"}
//         </button>
//       </div>

//       {error && <p className="text-red-600">{error}</p>}

//       {!template && !error && <p>Przygotowywanie dokumentu...</p>}

//       {/* RESPONSYWNY PODGLĄD HTML */}
//       <div className="w-full min-w-0 overflow-hidden rounded-lg bg-slate-100 p-2 sm:p-4">
//         <article
//           ref={previewRef}
//           className="mx-auto min-h-[900px] w-full max-w-[794px] bg-white p-5 text-[14px] leading-relaxed text-slate-900 shadow-md sm:p-10 md:p-14"
//         >
//           {/* Miejscowość i data */}
//           <div className="mb-10 text-right">
//             <p>
//               <PreviewValue field="place" />, <PreviewValue field="date" />
//             </p>
//           </div>

//           {/* Nadawca */}
//           <div className="mb-8 ml-auto w-full max-w-[320px]">
//             <p className="font-semibold">
//               <PreviewValue field="name" /> <PreviewValue field="surname" />
//             </p>

//             <p>
//               <PreviewValue field="userStreet" />{" "}
//               <PreviewValue field="userHouseNomber" />
//               {formData.userFlatNomber && (
//                 <>
//                   {" "}
//                   / <PreviewValue field="userFlatNomber" />
//                 </>
//               )}
//             </p>

//             <p>
//               <PreviewValue field="userPostCode" />{" "}
//               <PreviewValue field="userCity" />
//             </p>

//             <p>
//               Tel.: <PreviewValue field="phone" />
//             </p>

//             <p>
//               Email: <PreviewValue field="email" />
//             </p>
//           </div>

//           {/* Adresat */}
//           <div className="mb-12 ml-auto w-full max-w-[320px]">
//             <p className="font-semibold">
//               <PreviewValue field="companyName" />
//             </p>

//             <p>
//               <PreviewValue field="companyStreet" />{" "}
//               <PreviewValue field="companyHouseNomber" />
//               {formData.companyFlatNomber && (
//                 <>
//                   {" "}
//                   / <PreviewValue field="companyFlatNomber" />
//                 </>
//               )}
//             </p>

//             <p>
//               <PreviewValue field="companyPostCode" />{" "}
//               <PreviewValue field="companyCity" />
//             </p>
//           </div>

//           {/* Tytuł */}
//           <h2 className="mb-8 text-center text-xl font-bold uppercase">
//             Wezwanie do zapłaty
//           </h2>

//           {/* Dane dotyczące umowy */}
//           <section className="mb-8">
//             <h3 className="mb-3 font-bold">Informacje dotyczące umowy</h3>

//             <p>
//               Rodzaj umowy: <PreviewValue field="contractType" />
//             </p>

//             <p>
//               Data rozpoczęcia umowy: <PreviewValue field="contractStartDate" />
//             </p>

//             <p>
//               Okres pracy: od <PreviewValue field="workStart" /> do{" "}
//               <PreviewValue field="workEnd" />
//             </p>

//             <p>
//               Liczba godzin: <PreviewValue field="hours" />
//             </p>
//           </section>

//           {/* Kwota */}
//           <section className="mb-8">
//             <h3 className="mb-3 font-bold">Informacje o wynagrodzeniu</h3>

//             <p>
//               Kwota:{" "}
//               <span className="font-semibold">
//                 <PreviewValue field="money" />
//               </span>
//             </p>
//           </section>

//           {/* Rachunek bankowy */}
//           <section className="mb-8">
//             <h3 className="mb-3 font-bold">Dane do przelewu</h3>

//             <p>
//               Numer rachunku bankowego: <PreviewValue field="accountNumber" />
//             </p>
//           </section>
//         </article>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

type Props = {
  formData: Partial<WageFormSchema>;
};

const emptyPlaceholders: Record<keyof WageFormSchema, string> = {
  place: "Miejscowość",
  date: "Data",
  name: "Imię nadawcy",
  surname: "Nazwisko nadawcy",
  phone: "Telefon",
  email: "Email",
  userCity: "Miejscowość",
  userStreet: "Ulica",
  userHouseNomber: "Nr budynku",
  userFlatNomber: "Nr lokalu",
  userPostCode: "Kod pocztowy",
  accountNumber: "Numer rachunku bankowego",
  companyName: "Nazwa przedsiębiorstwa",
  companyCity: "Miejscowość firmy",
  companyStreet: "Ulica firmy",
  companyHouseNomber: "Nr budynku firmy",
  companyFlatNomber: "Nr lokalu firmy",
  companyPostCode: "Kod pocztowy firmy",
  contractType: "Rodzaj umowy",
  contractStartDate: "Data zawarcia umowy",
  workStart: "Data rozpoczęcia",
  workEnd: "Data zakończenia",
  hours: "Liczba godzin",
  money: "Kwota",
};

const ContractEditor = ({ formData }: Props) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const value = (field: keyof WageFormSchema) => {
    const fieldValue = formData[field];

    return typeof fieldValue === "string" && fieldValue.trim()
      ? fieldValue
      : "";
  };

  const PreviewValue = ({ field }: { field: keyof WageFormSchema }) => {
    const fieldValue = value(field);

    return fieldValue ? (
      <span>{fieldValue}</span>
    ) : (
      <span className="font-medium italic text-red-600">
        [{emptyPlaceholders[field]}]
      </span>
    );
  };

  const handleCopyText = async () => {
    if (!previewRef.current) return;

    await navigator.clipboard.writeText(previewRef.current.innerText);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={handleCopyText}
          className="rounded-md bg-accent px-4 py-2 text-white"
        >
          Kopiuj tekst
        </button>
      </div>

      <article
        ref={previewRef}
        className="mx-auto w-full max-w-[794px] bg-white px-5 py-8 text-[14px] leading-relaxed text-black shadow-md sm:px-12 sm:py-12 md:px-[80px] md:py-[70px]"
      >
        {/* Miejscowość i data */}
        <p className="mb-8 text-right">
          <PreviewValue field="place" />, <PreviewValue field="date" />
        </p>

        {/* Nadawca */}
        <div className="mb-6">
          <p>
            <PreviewValue field="name" /> <PreviewValue field="surname" />
          </p>
          <p>
            <PreviewValue field="userStreet" />{" "}
            <PreviewValue field="userHouseNomber" />
            {value("userFlatNomber") && (
              <>
                {" "}
                / <PreviewValue field="userFlatNomber" />
              </>
            )}
          </p>
          <p>
            <PreviewValue field="userPostCode" />{" "}
            <PreviewValue field="userCity" />
          </p>
        </div>

        {/* Adresat */}
        <div className="mb-10 text-right">
          <p>
            <PreviewValue field="companyName" />
          </p>
          <p>
            <PreviewValue field="companyStreet" />{" "}
            <PreviewValue field="companyHouseNomber" />
            {value("companyFlatNomber") && (
              <>
                {" "}
                / <PreviewValue field="companyFlatNomber" />
              </>
            )}
          </p>
          <p>
            <PreviewValue field="companyPostCode" />{" "}
            <PreviewValue field="companyCity" />
          </p>
        </div>

        {/* Tytuł */}
        <h2 className="mb-8 text-center text-base font-bold uppercase">
          OSTATECZNE PRZEDSĄDOWE WEZWANIE DO ZAPŁATY
        </h2>

        {/* Treść */}
        <div className="space-y-5 text-justify">
          <p className="indent-8">
            Niniejszym, w imieniu własnym, wzywam Państwa do zapłaty kwoty{" "}
            <PreviewValue field="money" /> zł (słownie:{" "}
            <span className="font-medium italic text-red-600">
              [Kwota słownie]
            </span>
            ), tytułem zaległego wynagrodzenia z tytułu{" "}
            <PreviewValue field="contractType" /> zawartej w dniu{" "}
            <PreviewValue field="contractStartDate" /> roku. Wynagrodzenie to
            jest należne za <PreviewValue field="hours" /> godzin,
            przepracowanych przeze mnie w okresie od dnia{" "}
            <PreviewValue field="workStart" /> roku do dnia{" "}
            <PreviewValue field="workEnd" /> roku.
          </p>

          <p className="indent-8">
            Należność proszę uregulować w nieprzekraczalnym terminie 7 dni od
            dnia otrzymania niniejszego pisma. Kwotę należy uiścić na rachunek
            bankowy nr <PreviewValue field="accountNumber" />.
          </p>

          <p>Odpowiedź na niniejsze pismo proszę przesłać na mój adres:</p>

          <p>
            <PreviewValue field="name" />, <PreviewValue field="surname" />,{" "}
            <PreviewValue field="userCity" />
          </p>

          <p className="indent-8">
            Jednocześnie informuję, iż nieuregulowanie należności w wyżej
            wskazanym terminie spowoduje skierowanie sprawy do sądu, co narazi
            Państwa firmę na dodatkowe koszty związane z koniecznością
            prowadzenia postępowania sądowego, a następnie egzekucyjnego.
          </p>

          <p className="indent-8">
            Dodatkowo skierowany zostanie wniosek o objęcie niniejszej sprawy
            nadzorem przez Ogólnopolski Związek Zawodowy Inicjatywa Pracownicza.
          </p>

          <p className="indent-8">
            Niniejsze pismo należy traktować jako próbę polubownego rozwiązania
            sporu w rozumieniu art. 187 §1 punkt 3 k.p.c.
          </p>
        </div>

        {/* Zakończenie */}
        <div className="mt-12 text-right">
          <p>Z poważaniem,</p>
          <p className="mt-6">……………………………</p>
        </div>
      </article>
    </div>
  );
};

export default ContractEditor;
