"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "../shared/buttons/Button";
import Icon from "@/components/shared/Icon";
import MenuLink from "./MenuLink";
import { menuItems } from "@/data/navLinks";

const MobileMenu = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((current) => (current === label ? null : label));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <div className="relative ml-auto h-full lg:hidden ">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Hamburger */}
      <Button
        className="ml-auto"
        onClickAction={() => setIsOpen((prev) => !prev)}
        variant="ghost"
        ariaLabel={isOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpen}
      >
        <Icon icon="hamburger" size={30} className="bg-white" />
      </Button>

      {/* Mobile menu */}
      <nav
        className={` fixed right-0 top-0 z-40 h-screen transform bg-black shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="h-full">
          <Button
            className="ml-auto mt-8 mr-8"
            onClickAction={closeMenu}
            variant="ghost"
            ariaLabel="Zamknij menu"
            aria-expanded={isOpen}
          >
            <Icon icon="xmark" size={30} className="bg-white a" />
          </Button>

          <div className="h-full overflow-y-auto p-20">
            <ul className="mt-24 flex flex-col gap-8 px-6">
              {menuItems.map((item) => {
                const isDropdownActive =
                  "children" in item &&
                  item.children.some(
                    (child) =>
                      pathname === child.href ||
                      pathname.startsWith(`${child.href}/`),
                  );

                return (
                  <li key={item.label}>
                    {"children" in item ? (
                      <>
                        <Button
                          onClickAction={() => toggleSubmenu(item.label)}
                          aria-expanded={openSubmenu === item.label}
                          className={`relative px-2 font-semibold text-white m-auto ${
                            isDropdownActive
                              ? "!text-accent"
                              : "hover:scale-110"
                          }`}
                        >
                          {item.label}{" "}
                          <Icon
                            icon="chevron"
                            size={20}
                            className={` transition-transform duration-300 ease-in-out ${isDropdownActive ? "bg-accent" : "bg-white"} ${openSubmenu ? "rotate-180 bg-wh" : "rotate-0"}`}
                          />
                        </Button>

                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                            openSubmenu === item.label
                              ? "grid-rows-[1fr]"
                              : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="mt-4 flex flex-col gap-4 bg-gray">
                              {item.children.map((child) => (
                                <MenuLink
                                  key={child.label}
                                  label={child.label}
                                  href={child.href}
                                  onClick={closeMenu}
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
                        onClick={closeMenu}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
