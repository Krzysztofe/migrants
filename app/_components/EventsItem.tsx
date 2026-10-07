import { Post } from "@/app/models/postModel";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
import { stripHtml } from "../utils/stripHtml";

type Props = {
  post: Post;
};

const EventsItem = ({ post }: Props) => {
  console.log("post", post);
  return (
    <li>
      <ButtonLink
        link={`/posts-list/${post.slug}`}
        className="group flex h-full flex-col gap-6 text-left
                   transition duration-200 ease-out
                   hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)]
                   motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div
          className={`relative flex h-full flex-col justify-end overflow-hidden bg-gray-light`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-500 ease-out
                       group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            // style={{
            //   backgroundImage: image
            //     ? `url(${image.source_url})`
            //     : "url('/icons/logo-black.png')",
            //   backgroundSize: image ? "cover" : "150px",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            // }}
          />

          <div className="relative flex flex-col z-10 bg-black/50 p-6 text-white h-full">
            <h2 className="text-lg mb-10">
              <span>{post.meta?.event_location}</span>{" "}
              <span>{post.meta?.event_date}</span>
            </h2>
            {/* <h2 className="my-4 text-lg transition-colors duration-200 group-hover:text-red-500">
              {post.title.rendered}
            </h2> */}
            <p>
              {stripHtml(post.excerpt.rendered).slice(0, 100)}
              ...
            </p>

            {/* {isFirst && (
              <p>
                {stripHtml(post.excerpt.rendered).slice(0, isFirst ? 400 : 100)}
                ...
              </p>
            )} */}
          </div>
        </div>
      </ButtonLink>
    </li>
  );
};

export default EventsItem;
