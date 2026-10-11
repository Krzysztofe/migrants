"use client";

import Icon from "@/components/shared/Icon";
import { useState } from "react";
import Button from "../shared/buttons/Button";
import MenuList from "./MenuList";

const MobileMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className="relative ml-auto h-full lg:hidden ">
      {/* Overlay */}
      {isOpenMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Hamburger */}
      <Button
        className="ml-auto"
        onClickAction={() => setIsOpenMenu((prev) => !prev)}
        variant="ghost"
        ariaLabel={isOpenMenu ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpenMenu}
      >
        <Icon icon="hamburger" size={30} className="bg-white" />
      </Button>

      {/* Mobile menu */}
      <nav
        className={` fixed right-0 top-0 z-40 h-screen transform bg-black shadow-xl transition-transform duration-300 ease-in-out ${
          isOpenMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="h-full">
          <Button
            className="ml-auto mt-8 mr-8"
            onClickAction={closeMenu}
            variant="ghost"
            ariaLabel="Zamknij menu"
            aria-expanded={isOpenMenu}
          >
            <Icon icon="xmark" size={30} className="bg-white a" />
          </Button>

          <div className="h-full overflow-y-auto p-20 ">
            <MenuList variant="mobile" handleCloseMenu={closeMenu} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
