import { Post } from "@/app/models/postModel";
import BlogListItem from "@/components/shared/blogItem/BlogListItem";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
import SearchForm from "./SearchForm";

type Props = {
  posts: Post[];
  currentCategory: number | null;
  currentPage: number;
  totalPages: number;
  search: string;
};

const NewsList = ({
  posts,
  currentCategory,
  currentPage,
  totalPages,
  search,
}: Props) => {
  const listRoot = currentCategory === 6 ? "/news" : "/posts-list";

  const createUrl = (
    category: number | null,
    page: number = 1,
    searchValue: string = search,
  ) => {
    const params = new URLSearchParams();

    if (category !== null) {
      params.set("category", category.toString());
    }

    if (searchValue) {
      params.set("search", searchValue);
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    const query = params.toString();

    return query ? `${listRoot}?${query}` : listRoot;
  };

  return (
    <>
      <SearchForm initialSearch={search} currentCategory={currentCategory} />

      <ul className="flex flex-col gap-4">
        {posts.map((post, idx) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0];
          return (
            <BlogListItem
              key={post.id}
              post={post}
              image={image}
              listRoot={listRoot}
            />
          );
        })}
      </ul>

      {posts.length === 0 && (
        <p className="py-10 font-extrabold text-xl">Nie znaleziono wpisów</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 my-10">
          <ButtonLink
            variant="primary-empty"
            link={createUrl(currentCategory, currentPage - 1, search)}
          >
            Poprzednia
          </ButtonLink>

          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>

          <ButtonLink
            link={createUrl(currentCategory, currentPage + 1, search)}
            variant="primary-empty"
          >
            Następna
          </ButtonLink>
        </div>
      )}
    </>
  );
};

export default NewsList;
