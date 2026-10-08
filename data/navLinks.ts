export type MenuItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      children: {
        label: string;
        href: string;
      }[];
    };

export const menuItems: MenuItem[] = [
  {
    label: "Prawa pracownicze",
    href: "/labour-law",
  },
  {
    label: "Życie w Polsce",
    children: [
      {
        label: "Pobyt i sprawy migracyjne",
        href: "/residence",
      },
      {
        label: "Mieszkanie",
        href: "/housing",
      },
      {
        label: "Życie codzienne",
        href: "/life",
      },
      {
        label: "Pierwsze kroki",
        href: "/steps",
      },
      {
        label: "Prawo",
        href: "/right",
      },
      {
        label: "Materiały",
        href: "/library",
      },
    ],
  },
  {
    label: "Dołącz",
    href: "/join",
  },

  {
    label: "Aktualności",
    href: "/news",
  },
  {
    label: "Zapowiedzi",
    href: "/upcoming",
  },
  {
    label: "O nas",
    href: "/about",
  },
  {
    label: "Kontakt",
    href: "/contact",
  },
];
