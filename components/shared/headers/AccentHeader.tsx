type Props = {
  message: string | React.ReactNode;
  className?: string;
};

const AccentHeader = ({ message, className }: Props) => {
  return (
    <h2
      className={`h-fit mb-22 pl-10 border-l-10 border-accent text-xl font-extrabold whitespace-normal break-words ${className}`}
    >
      {message}
    </h2>
  );
};

export default AccentHeader;
