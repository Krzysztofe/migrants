"use client";

import { usePathname } from "next/navigation";
import ButtonLink from "../shared/buttons/ButtonLink";

type Props = {
  label: string;
  href: string;
  onClick?: () => void;
};

const MenuLink = ({ label, href, onClick }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li onClick={onClick} className="flex justify-center">
      <ButtonLink
        link={href}
        className={`inline-block relative font-semibold text-white transition-transform duration-200 !px-2
    ${isActive ? "!text-accent" : "hover:scale-110"}
  `}
      >
        {label}
      </ButtonLink>
    </li>
  );
};

export default MenuLink;
