import ButtonLink from "./shared/buttons/ButtonLink";
import Icon from "./shared/Icon";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container text-white py-26 flex flex-col gap-20 md:flex-row">
        <div className="md:w-1/2">
          <div className="">
            Stronę strajkuj.pl prowadzimy w gronie osób zaangażowanych w
            kampanię o wolność strajkowania od wiosny 2026 roku oraz
            popierających Obywatelską Inicjatywę Ustawodawczą Komitetu. O
            Komitecie dowiesz się więcej na jego stronie internetowej: [link do
            strony komitetu]
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
                {<Icon icon={"facebook"} size={20} className={`bg-white`} />}
                strajkuj.pl
              </ButtonLink>
              <ButtonLink
                link={"https://www.facebook.com/MzzpZjednoczeni"}
                className="flex gap-2 items-center"
              >
                {<Icon icon={"instagram"} size={20} className={`bg-white`} />}
                @strajkuj.pl
              </ButtonLink>
            </div>
            <div className="[&>*]:mt-6">
              <div className=" flex gap-2 items-center">
                {" "}
                <Icon icon={"phone"} size={20} className={`bg-white`} />
                999 999 999
              </div>
              <div className=" flex gap-2 items-center">
                {" "}
                <Icon icon={"envelope"} size={20} className={`bg-white`} />
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
