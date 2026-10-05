import TopSection from "@/components/shared/TopSection";
import { Post } from "../models/postModel";
import NewsList from "./_components/NewsList";
import { Metadata } from "next";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

export const metadata: Metadata = {
  title: "Zjednoczeni | Aktualności",
};

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
};

const NewsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const category = params.category ? Number(params.category) : null;

  const search = params.search?.trim() || "";

  const currentPage = Math.max(Number(params.page) || 1, 1);

  const queryParams = new URLSearchParams({
    per_page: "5",
    page: currentPage.toString(),
    _embed: "true",
  });

  if (category !== null) {
    queryParams.set("categories", category.toString());
  }

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
          tags: ["posts", category ? `posts-cat-${category}` : "posts-all"],
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
        header="Aktualności"
        paragraph="Najnowsze informacje o kampanii dość zakazku strajków "
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

export default NewsPage;
