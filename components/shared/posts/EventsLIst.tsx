import { Post } from "@/app/models/postModel";
import EventsItem from "./EventsItem";

type Props = {
  upcomingEvents: Post[];
  pastEvents: Post[];
};

const EventsLIst = ({ upcomingEvents, pastEvents }: Props) => {
  return (
    <div>
      <h2 className="text-lg-plus pb-4 mb-4  border-b-2 border-accent">
        Nadchodzące
      </h2>
      <ul className="grid gap-8 ">
        {upcomingEvents.map((post) => {
          return <EventsItem key={post.id} post={post} comming={true} />;
        })}
      </ul>
      <h2 className=" text-lg-plus mb-4 pb-4 mt-20 border-b-2 border-gray">
        Minione
      </h2>
      <ul className="grid gap-8">
        {pastEvents.map((post) => {
          return <EventsItem key={post.id} post={post} comming={false} />;
        })}
      </ul>
    </div>
  );
};

export default EventsLIst;
