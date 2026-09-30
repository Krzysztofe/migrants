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

const categories = [
  {
    id: null,
    name: "Wszystkie",
  },
  {
    id: 1,
    name: "Szkoły i przedszkola",
  },
  {
    id: 3,
    name: "Spółki urzędu miasta",
  },
  {
    id: 4,
    name: "Elbest Security",
  },
  {
    id: 5,
    name: "Elektrownia Bełchatów",
  },
];

const NewsList = ({
  posts,
  currentCategory,
  currentPage,
  totalPages,
  search,
}: Props) => {
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

    return query ? `/news?${query}` : "/news";
  };

  return (
    <>
      {/* Categories */}
      <div className="flex gap-4 flex-wrap">
        {categories.map((category) => {
          const isActive = currentCategory === category.id;

          return (
            <ButtonLink
              key={category.name}
              link={createUrl(category.id, 1, search)}
              className={`
                ${isActive && "!bg-color-bg text-white"}
              `}
              variant="primary-empty"
            >
              {category.name}
            </ButtonLink>
          );
        })}
      </div>

      <SearchForm initialSearch={search} currentCategory={currentCategory} />

      {/* List */}
      <ul className="flex flex-col gap-4">
        {posts.map((post) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0];
          return <BlogListItem key={post.id} post={post} image={image} />;
        })}
      </ul>

      {/* No results */}
      {posts.length === 0 && (
        <p className="py-10 font-bold text-xl">Nie znaleziono wpisów.</p>
      )}

      {/* Pagination */}
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
