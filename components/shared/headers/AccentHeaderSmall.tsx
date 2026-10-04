type Props = {
  message: string;
};

const AccentHeaderSmall = ({ message }: Props) => {
  return (
    <h3 className="bg-gray-light font-bold px-10 py-6 border-l-10 border-accent">
      {message}
    </h3>
  );
};

export default AccentHeaderSmall;
