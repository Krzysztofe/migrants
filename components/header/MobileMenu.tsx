"use client";

import { useState } from "react";
import Button from "../shared/buttons/Button";
import Icon from "@/components/shared/Icon";
import MenuLink from "./MenuLink";
import { navLinks } from "@/data/navLinks";

const MobileMenu = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleClass = isOpen ? "translate-x-0" : "translate-x-full";

  return (
    <div className="relative lg:hidden h-full ml-auto">
      {isOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
      <Button
        className="ml-auto"
        icon={<Icon icon={"hamburger"} size={30} className={"bg-white"} />}
        onClickAction={() => setOpen((prev) => !prev)}
        variant="ghost"
        ariaLabel={isOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpen}
      />

      <nav
        className={`fixed bg-black top-0 right-0 z-40 h-screen  w-80 transform shadow-xl transition-transform duration-300 ease-in-out ${toggleClass} z-20 lg:hidden`}
      >
        {" "}
        <Button
          className="top-6 -right-60"
          icon={<Icon icon={"xmark"} size={30} className={"bg-white"} />}
          onClickAction={() => setOpen((prev) => !prev)}
          variant="ghost"
          ariaLabel={isOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isOpen}
        />
        <div className="overflow-y-auto h-full">
          <ul className="mt-24 flex flex-col gap-16 px-6">
            {navLinks.map(({ text, link }) => (
              <MenuLink
                key={link}
                text={text}
                link={link}
                onClick={() => setOpen(false)}
              />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
