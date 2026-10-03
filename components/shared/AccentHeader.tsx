type Props = {
  message: string;
};

const AccentHeader = ({ message }: Props) => {
  return (
    <h2 className="text-xl font-extrabold  h-fit mb-22 pl-10 border-l-10 border-accent">
      {message}
    </h2>
  );
};

export default AccentHeader;
