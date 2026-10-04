import { navLinks } from "@/data/navLinks";
import MenuLink from "./MenuLink";

const NavMenu = () => {
  return (
    <nav>
      <ul className="flex items-center justify-end gap-8 w-full">
        {navLinks.map(({ text, link }) => (
          <div className="" key={link}>
            <MenuLink key={link} {...{ text, link }} />
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
