import ButtonLink from "./buttons/ButtonLink";

type Props = {
  message: string;
  subtitle: string;
  buttonMessage: "join" | "signIn";
};

const CallToAction = ({ message, subtitle, buttonMessage }: Props) => {
  return (
    <section className="bg-black border-t-6 border-accent">
      <div className="container py-20 flex flex-col lg:flex-row gap-20 justify-between items-center">
        <div className="mr-auto md:w-2/3">
          <h2 className="text-white text-xl mb-10">{message}</h2>
          <p className="text-gray">{subtitle}</p>
        </div>
        {buttonMessage === "join" && (
          <ButtonLink link={"join"} className="mr-auto" variant="primary">
            Dołącz&nbsp;do&nbsp;działań
          </ButtonLink>
        )}

        {buttonMessage === "signIn" && (
          <ButtonLink link={"sign-in"} className="mr-auto" variant="primary">
            Podpisz&nbsp;się
          </ButtonLink>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
