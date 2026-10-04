import ButtonLink from "@/components/shared/buttons/ButtonLink";
import Icon from "@/components/shared/Icon";

const DocumentsTable = () => {
  return (
    <div className="w-full overflow-auto">
      <table className="m-auto w-full mb-10 text-lg font-bold">
        {/* <thead className="border-b-2">
        <tr>
          <th className="p-10 pt-0"></th>
          <th className="text-left p-10 pt-0">Dokument</th>{" "}
          <th className="p-10 pt-0"></th>
        </tr>
      </thead> */}
        <tbody className="border-t-2">
          <tr className="hover:bg-gray-light border-b border-gray">
            {" "}
            <td className="p-10 text-accent">CZYTAJ</td>
            <td className="p-10">Jak zbierać podpisy?</td>
            <td>
              <ButtonLink
                link={"/files/zjednoczeni-deklaracja.odt"}
                className="w-fit h-fit mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
                variant="ghost"
              >
                Pobierz{" "}
                {
                  <Icon
                    icon={"arrow"}
                    size={15}
                    className={`bg-accent -rotate-90`}
                  />
                }
              </ButtonLink>
            </td>
          </tr>
          <tr className="hover:bg-gray-light border-b border-gray">
            {" "}
            <td className="p-10 text-accent">CZYTAJ</td>
            <td className="p-10">
              Aktualny projekt zmiany prawnej proponowanej przez Komitet
            </td>
            <td>
              <ButtonLink
                link={"/files/zjednoczeni-historia.odt"}
                className="w-fit h-fit mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
                variant="ghost"
              >
                Pobierz{" "}
                {
                  <Icon
                    icon={"arrow"}
                    size={15}
                    className={`bg-accent -rotate-90`}
                  />
                }
              </ButtonLink>
            </td>
          </tr>
          <tr className="hover:bg-gray-light border-b border-gray">
            {" "}
            <td className="p-10 text-accent">DRUKUJ</td>
            <td className="p-10">Lista podpisów</td>
            <td>
              <ButtonLink
                link={"/files/zjednoczeni-deklaracja.odt"}
                className="w-fit h-fit mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
                variant="ghost"
              >
                Pobierz{" "}
                {
                  <Icon
                    icon={"arrow"}
                    size={15}
                    className={`bg-accent -rotate-90`}
                  />
                }
              </ButtonLink>
            </td>
          </tr>
          <tr className="hover:bg-gray-light border-b border-gray">
            {" "}
            <td className="p-10 text-accent">DRUKUJ</td>
            <td className="p-10">Klauzula RODO</td>
            <td>
              <ButtonLink
                link={"/files/zjednoczeni-deklaracja.odt"}
                className="w-fit h-fit mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
                variant="ghost"
              >
                Pobierz{" "}
                {
                  <Icon
                    icon={"arrow"}
                    size={15}
                    className={`bg-accent -rotate-90`}
                  />
                }
              </ButtonLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
