import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";
import { Post } from "../models/postModel";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import NewsList from "../news/_components/NewsList";

export const metadata: Metadata = {
  title: "Zjednoczeni | Nasza działalność ",
};

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
};

const PostsListPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  // const category = params.category ? Number(params.category) : null;
  const category = 5;

  const search = params.search?.trim() || "";

  const currentPage = Math.max(Number(params.page) || 1, 1);

  const queryParams = new URLSearchParams({
    per_page: "5",
    page: currentPage.toString(),
    _embed: "true",
    categories: category.toString(),
  });

  if (search) {
    queryParams.set("search", search);
  }

  let posts: Post[] = [];
  let totalPages = 0;
  let fetchFailed = false;

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/posts?${queryParams.toString()}`,
      {
        next: {
          revalidate: 60,
          tags: ["posts", `posts-cat-${category}`],
        },
      },
    );

    if (!response.ok) {
      fetchFailed = true;
    } else {
      posts = await response.json();
      totalPages = Number(response.headers.get("X-WP-TotalPages") || 0);
    }
  } catch (error) {
    console.error("Błąd pobierania postów z WP:", error);
    fetchFailed = true;
  }

  if (fetchFailed) {
    return <div>Nie udało się pobrać postów.</div>;
  }

  return (
    <>
      <TopSection
        header="Prawo do strajku to fikcja"
        paragraph="Na papierze strajk jest legalny, w praktyce przejście całej procedury jest niemal niemożliwe. Zbieramy tu analizy, wyjaśnienia i historie pracowników."
      />
      <SuspenseErrorBoundary
        size="lg"
        errorMessage="Błąd ładowania aktualności"
        loadingMessage="Ładowanie aktualności"
      >
        <section>
          <div className="container mt-20">
            <NewsList
              posts={posts}
              currentCategory={category}
              currentPage={currentPage}
              totalPages={totalPages}
              search={search}
            />
          </div>
        </section>
      </SuspenseErrorBoundary>
      Prawo do strajku nie może być fikcją
    </>
  );
};

export default PostsListPage;
