"use client";

import { usePathname } from "next/navigation";
import ButtonLink from "../shared/buttons/ButtonLink";

type Props = {
  text: string;
  link: string;
  onClick?: () => void;
};

const MenuLink = ({ text, link, onClick }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === link || pathname.startsWith(`${link}/`);

  return (
    <li onClick={onClick} className="flex justify-center">
      <ButtonLink
        link={link}
        className={`inline-block relative font-semibold text-white transition-transform duration-200 !px-2
    ${isActive ? "!text-accent" : "hover:scale-110"}
  `}
      >
        {text}
      </ButtonLink>
    </li>
  );
};

export default MenuLink;
