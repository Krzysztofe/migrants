import { Post } from "@/app/models/postModel";
import { formatDate } from "@/app/utils/formatDate";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
import Icon from "@/components/shared/Icon";
import { mapBlogCategories } from "@/data/mapBlogCategiries";

type Props = {
  postSlug: string;
  link: string;
};

const PostContent = async ({ postSlug, link }: Props) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/posts?slug=${postSlug}&_fields=id,slug,date,title,content,author,tags,categories`,
    {
      next: {
        revalidate: false,
        tags: [`post-${postSlug}`],
      },
    },
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać wpisu.");
  }

  const posts: Post[] = await response.json();
  const post = posts[0];

  if (!post) {
    return <div>Wpis nie istnieje</div>;
  }

  return (
    <>
      <ButtonLink
        link={`/${link}`}
        className="w-fit font-extrabold h-fit mb-10 text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
        variant="ghost"
      >
        <Icon icon="arrow" size={15} className="bg-accent rotate-90" />
        Wróć do listy aktualności
      </ButtonLink>

      <p className="text-xs text-gray mb-2">
        {formatDate(post.date)} /{" "}
        {mapBlogCategories[post.categories[0]] ?? "Inne"}
      </p>

      <h1 className="font-bold text-2xl">{post.title.rendered}</h1>

      <div
        className="
          mt-10
          mb-30
          md:w-2/3
          [&_p]:mb-6
          [&_h2]:text-2xl
          [&_h2]:font-bold
          [&_h2]:mt-8
          [&_ul]:list-disc
          [&_ul]:pl-6
          [&_ol]:list-decimal
          [&_ol]:pl-6
        "
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />
    </>
  );
};

export default PostContent;
