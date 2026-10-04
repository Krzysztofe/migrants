import SideBorder from "./SideBorder";

type Props = {
  header: string;
  paragraph: string;
};

const TopSection = ({ header, paragraph }: Props) => {
  return (
    <section className="text-white bg-accent">
      <div className="container py-32">
        <h1 className="text-2xl font-bold mb-20">{header}</h1>
        <p className="md:w-2/3 text-lg">{paragraph}</p>
      </div>
    </section>
  );
};

export default TopSection;
