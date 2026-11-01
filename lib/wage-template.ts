import type { Value } from "platejs";

export const contractTemplate: Value = [
  {
    type: "h1",
    children: [{ text: "UMOWA" }],
  },
  {
    type: "p",
    children: [
      { text: "Zawarta w dniu " },
      { text: "{date}", bold: true },
      { text: " pomiędzy:" },
    ],
  },
  {
    type: "p",
    children: [
      { text: "Panem/Panią " },
      { text: "{firstName} {lastName}", bold: true },
      { text: ", zamieszkałym/ą pod adresem " },
      { text: "{address}" },
      { text: ", PESEL: " },
      { text: "{pesel}" },
    ],
  },
  {
    type: "p",
    children: [
      { text: "Numer rachunku bankowego: " },
      { text: "{bankAccount}", bold: true },
    ],
  },
  {
    type: "p",
    children: [{ text: "Strony ustalają następujące warunki współpracy..." }],
  },
];
