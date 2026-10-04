type Props = {
  day: string;
  month: string;
  children: React.ReactNode;
};

const TimelineWrapper = ({ day, month, children }: Props) => {
  return (
    <div className=" relative pb-30 [&>p]:mt-10 border-l-4 border-accent pl-20 sm:pl-30 ml-10 sm:ml-16 lg:ml-20 ">
      <div className="absolute top-0 left-[-40px] lg:left-[-54px] bg-accent h-32 w-32 lg:w-40 lg:h-40 text-white font-extrabold text-center">
        <div className="text-xl">{day}</div>
        <div className="text-sm">{month}</div>
      </div>{" "}
      {children}
    </div>
  );
};

export default TimelineWrapper;
