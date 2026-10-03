import { navLinks } from "@/data/navLinks";
import MenuLink from "./MenuLink";

const NavMenu = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-6 sm:gap-12 w-full">
        {navLinks.map(({ text, link }) => (
          <div className="flex-1" key={link}>
            <MenuLink key={link} {...{ text, link }} />
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
