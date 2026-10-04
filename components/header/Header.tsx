import Link from "next/link";
import Image from "next/image";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-20 bg-black 
   border-b-6 border-accent"
    >
      <div className="container flex items-center justify-between py-4 ">
        <Link href="/">
          <Image
            src="/icons/logo-white.png"
            alt="Logo"
            width={150}
            height={100}
            className="w-[70px] h-auto mr-4"
            priority
            unoptimized
          />
        </Link>

        <div className=" hidden lg:block w-full">
          <NavMenu />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
