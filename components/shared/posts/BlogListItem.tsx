import { Post } from "@/app/models/postModel";
import { formatDate } from "@/app/utils/formatDate";
import { mapBlogCategories } from "@/data/mapBlogCategiries";
import ButtonLink from "../buttons/ButtonLink";
import PostImage from "./PostImage";

type Props = {
  post: Post;
  image:
    | {
        source_url: string;
        alt_text: string;
      }
    | undefined;
  listRoot: string;
};

const BlogListItem = ({ post, image, listRoot }: Props) => {
  return (
    <li key={post.id} className="py-4 border-b !border-gray">
      <ButtonLink
        link={`${listRoot}/${post.slug}`}
        className="p-10 text-left flex flex-col md:flex-row gap-6 group
        transition duration-200 ease-out
        hover:-translate-y-1
        hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.45)]
        motion-reduce:transform-none motion-reduce:transition-none"
      >
        <PostImage alt={image?.alt_text || post.title.rendered} image={image} />

        <div className=" md:w-1/2">
          <p className="text-xs text-gray">
            {formatDate(post.date)} /{" "}
            {mapBlogCategories[post.categories[0]] ?? "Inne"}
          </p>{" "}
          <h2 className=" text-xl my-6 group-hover:text-accent transition-colors">
            {post.title.rendered}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
      </ButtonLink>
    </li>
  );
};

export default BlogListItem;
