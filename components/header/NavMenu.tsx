"use client";

import { Fragment, useState } from "react";
import { menuItems } from "@/data/navLinks";
import MenuLink from "./MenuLink";
import Button from "../shared/buttons/Button";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  return (
    <nav>
      {openMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenu(null)}
          aria-hidden="true"
        />
      )}

      <ul className="flex w-full items-center justify-end gap-8">
        {menuItems.map((item) => {
          const isDropdownActive =
            "children" in item &&
            item.children.some(
              (child) =>
                pathname === child.href ||
                pathname.startsWith(`${child.href}/`),
            );

          return (
            <Fragment key={item.label}>
              {"children" in item ? (
                <li className="relative">
                  <Button
                    onClickAction={() => toggleMenu(item.label)}
                    aria-expanded={openMenu === item.label}
                    className={`inline-block relative font-semibold text-white transition-transform duration-200 !px-2
                    ${isDropdownActive ? "!text-accent" : "hover:scale-110"}
                  `}
                  >
                    {" "}
                    {item.label}
                  </Button>

                  <div
                    id={`submenu-${item.label}`}
                    className={`absolute left-1/2 top-full z-50 grid w-max -translate-x-1/2 transition-[grid-template-rows] duration-300 ease-in-out ${
                      openMenu === item.label
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-4 min-w-48 bg-black p-4">
                        {item.children.map((child) => (
                          <MenuLink
                            key={child.label}
                            label={child.label}
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <MenuLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                />
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
