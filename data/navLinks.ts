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
    label: "labourLaw",
    href: "/labour-law",
  },
  {
    label: "lifeInPoland",
    children: [
      {
        label: "residence",
        href: "/residence",
      },
      {
        label: "housing",
        href: "/housing",
      },
      {
        label: "life",
        href: "/life",
      },
      {
        label: "steps",
        href: "/steps",
      },
      {
        label: "right",
        href: "/right",
      },
      {
        label: "library",
        href: "/library",
      },
    ],
  },
  {
    label: "join",
    href: "/join",
  },

  {
    label: "news",
    href: "/news",
  },
  {
    label: "upcoming",
    href: "/upcoming",
  },
  {
    label: "community",
    href: "/comunity",
  },
  {
    label: "about",
    href: "/about",
  },

  {
    label: "callToAction",
    href: "/wezwanie",
  },
];
