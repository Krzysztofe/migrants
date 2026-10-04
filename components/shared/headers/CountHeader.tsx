import SideBorder from "../SideBorder";

type Props = {
  message: string;
  idx: number;
};

const CountHeader = ({ message, idx }: Props) => {
  return (
    <>
      <div className="flex items-center">
        <div className="text-accent text-xl font-extrabold h-fit w-[9rem]">
          {idx}
        </div>
        <h3 className="text-lg font-extrabold  h-fit pl-10 py-14">{message}</h3>
      </div>
      <SideBorder />
    </>
  );
};

export default CountHeader;
