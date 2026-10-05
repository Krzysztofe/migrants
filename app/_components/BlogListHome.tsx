import { Post } from "@/app/models/postModel";
import { formatDate } from "@/app/utils/formatDate";
import ButtonLink from "../../components/shared/buttons/ButtonLink";
import { stripHtml } from "@/app/utils/stripHtml";

type Props = {
  post: Post;
  image:
    | {
        source_url: string;
        alt_text: string;
      }
    | undefined;
  idx: number;
};

const BlogListHome = ({ post, image, idx }: Props) => {
  const isFirst = !idx;

  return (
    <li
      className={
        isFirst ? "lg:row-span-2 lg:col-span-3" : "h-[28vh] lg:col-span-2"
      }
    >
      <ButtonLink
        link={`/news/${post.slug}`}
        className="group flex h-full flex-col gap-6 text-left
                   transition duration-200 ease-out
                   hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)]
                   motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div
          className={`relative flex h-full flex-col justify-end overflow-hidden bg-gray-light ${
            isFirst ? "h-full" : ""
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-500 ease-out
                       group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            style={{
              backgroundImage: image
                ? `url(${image.source_url})`
                : "url('/icons/logo-black.png')",
              backgroundSize: image ? "cover" : "150px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />

          <div className="relative flex flex-col z-10 bg-black/50 p-6 text-white h-full">
            <p className="text-xs text-gray mt-auto">{formatDate(post.date)}</p>

            <h2 className="my-4 text-lg-plus transition-colors duration-200 group-hover:text-red-500">
              {post.title.rendered}
            </h2>

            <p>
              {stripHtml(post.excerpt.rendered).slice(0, isFirst ? 410 : 100)}
              ...
            </p>
          </div>
        </div>
      </ButtonLink>
    </li>
  );
};

export default BlogListHome;
