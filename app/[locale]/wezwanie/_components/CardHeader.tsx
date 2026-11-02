type Props = {
  message: string;
};

const CardHeader = ({ message }: Props) => {
  return <div className="py-4 mb-4 border-b-2  font-bold ">{message}</div>;
};

export default CardHeader;
