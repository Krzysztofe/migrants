import { Post } from "@/app/models/postModel";
import { formatEventDate } from "@/app/utils/formatDate";
import { stripHtml } from "@/app/utils/stripHtml";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
type Props = {
  post: Post;
  comming: boolean;
};

const EventsItem = ({ post, comming }: Props) => {
  const eventDate = post.meta?.event_date
    ? formatEventDate(post.meta.event_date)
    : null;

  return (
    <li>
      <ButtonLink
        link={`/posts-list/${post.slug}`}
        className="group  
                   transition duration-200 ease-out 
                   hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] 
                   motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div
          className={`relative border border-gray ${comming ? "bg-white" : "bg-gray-light"}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-500 ease-out 
                       group-hover:scale-105 motion-reduce:transform-none flex"
          />

          <div className="relative z-10 flex h-full ">
            {eventDate && (
              <div
                className={`py-6 grid gap-2 w-[11rem] shrink-0 border-r
                  ${comming ? "bg-accent text-white border-accent" : "bg-gray-light text-gray border-gray"} `}
              >
                <span className="text-lg-plus font-bold text-center">
                  {eventDate.day}
                </span>

                <span className="text-center">{eventDate.month}</span>

                <span className="text-center">{eventDate.weekday}</span>
              </div>
            )}
            <div
              className={`p-5 flex items-center ${comming ? "text-black" : "text-gray"}`}
            >
              <div>
                <h2 className="text-xl text-left mb-4">
                  {post.meta?.event_location}
                </h2>

                <p className="text-left">
                  {stripHtml(post.excerpt.rendered).slice(0, 100)}
                  ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </ButtonLink>
    </li>
  );
};
export default EventsItem;
