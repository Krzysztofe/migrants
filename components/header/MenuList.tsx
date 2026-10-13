"use client";

import { menuItems } from "@/data/navLinks";
import MenuLink from "./MenuLink";
import { usePathname } from "next/navigation";
import Button from "../shared/buttons/Button";
import { useState } from "react";
import Icon from "@/components/shared/Icon";

type Props = {
  variant: "desktop" | "mobile";
  handleCloseMenu?: () => void;
};

const MenuList = ({ variant, handleCloseMenu }: Props) => {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const closeSubMenu = () => {
    setOpenSubMenu(null);
  };

  const handleLinkClick = () => {
    closeSubMenu();
    handleCloseMenu?.();
  };

  const ulClass =
    variant === "desktop"
      ? "flex w-full items-center justify-end"
      : "mt-24 flex flex-col px-6";

  const dropdownClass =
    variant === "desktop"
      ? "absolute left-1/2 top-full z-50 w-max -translate-x-1/2"
      : "";

  return (
    <>
      {openSubMenu && variant === "desktop" && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeSubMenu}
          aria-hidden="true"
        />
      )}

      <ul className={`${ulClass} relative z-40 gap-8`}>
        {menuItems.map((item) => {
          const hasChildren = "children" in item;
          const isOpen = openSubMenu === item.label;

          const isDropdownActive =
            hasChildren &&
            item.children.some(
              (child) =>
                pathname === child.href ||
                pathname.startsWith(`${child.href}/`),
            );

          return (
            <li key={item.label} className="relative">
              {hasChildren ? (
                <>
                  <Button
                    onClickAction={() =>
                      setOpenSubMenu((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    aria-expanded={isOpen}
                    aria-controls={`submenu-${item.label}`}
                    className={`m-auto relative !px-2 font-semibold text-white transition-transform duration-200 ${
                      isDropdownActive ? "!text-accent" : "hover:scale-110"
                    }`}
                  >
                    {item.label}

                    <Icon
                      icon="chevron"
                      size={20}
                      className={`transition-transform duration-300 ease-in-out ${
                        isDropdownActive ? "bg-accent" : "bg-white"
                      } ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </Button>

                  <div
                    id={`submenu-${item.label}`}
                    className={`${dropdownClass} grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-4 grid min-w-48 gap-8 bg-black p-4">
                        {item.children.map((child) => (
                          <MenuLink
                            key={child.label}
                            label={child.label}
                            href={child.href}
                            onClick={handleLinkClick}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <MenuLink
                  label={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MenuList;
