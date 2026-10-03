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
};

const BlogListItem = ({ post, image }: Props) => {
  return (
    <li key={post.id} className="py-16 border-b !border-gray-light">
      <ButtonLink
        link={`/news/${post.slug}`}
        className="text-left flex flex-col md:flex-row gap-6 group"
      >
        <PostImage alt={image?.alt_text || post.title.rendered} image={image} />

        <div className="pb-20 md:w-1/2">
          <div></div>
          <p className="text-xs text-gray">
            {formatDate(post.date)} /{" "}
            {mapBlogCategories[post.categories[0]] ?? "Inne"}
          </p>{" "}
          <h2 className="font-bold text-xl group-hover:text-accent transition-colors">
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
