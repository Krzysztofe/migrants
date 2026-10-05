import ButtonLink from "./shared/buttons/ButtonLink";
import Icon from "./shared/Icon";

const Footer = () => {
  return (
    <footer className="bg-gray-light    border-t-6 border-accent">
      <div className="container bg-gray-light  py-26 flex flex-col gap-20 md:flex-row">
        <div className="md:w-1/2">
          <div className="">
            Stronę strajkuj.pl prowadzimy jako oddolna grupa działaczy i
            działaczek związków zawodowych oraz organizacji społecznych, od
            wiosny 2026 roku zaangażowanych w kampanię na rzecz zniesienia
            restrykcji na strajk. Od września 2026 aktywnie wspieramy
            <ButtonLink
              link={"https://komitet-seven.vercel.app/"}
              className="!inline-flex items-center gap-4 text-left font-bold border-b border-transparent hover:text-accent"
              variant="ghost"
            >
              Komitet Inicjatywy Ustawodawczej “Dość zakazów strajku –
              przywróćmy wolność strajkowania"
            </ButtonLink>
          </div>
        </div>
        <div className="">
          <div className="font-bold text-lg">Kontakt</div>
          <div className="lg:flex gap-16 items-center">
            <div className="[&>*]:mt-6">
              <ButtonLink
                link={"https://www.facebook.com/MzzpZjednoczeni"}
                className="flex gap-2 items-center"
              >
                {<Icon icon={"facebook"} size={20} className={`bg-black`} />}
                strajkuj.pl
              </ButtonLink>
              <ButtonLink
                link={"https://www.facebook.com/MzzpZjednoczeni"}
                className="flex gap-2 items-center"
              >
                {<Icon icon={"instagram"} size={20} className={`bg-black`} />}
                @strajkuj.pl
              </ButtonLink>
            </div>
            <div className="[&>*]:mt-6">
              <div className=" flex gap-2 items-center">
                {" "}
                <Icon icon={"phone"} size={20} className={`bg-black`} />
                514 252 205
              </div>
              <div className=" flex gap-2 items-center">
                {" "}
                <Icon icon={"envelope"} size={20} className={`bg-black`} />
                strajkuj.pl@proton.me
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
