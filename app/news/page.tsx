import TopSection from "@/components/shared/TopSection";
import { Post } from "../models/postModel";
import NewsList from "../../components/shared/posts/NewsList";
import { Metadata } from "next";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import { getPosts } from "../utils/querries/getPosts";

export const metadata: Metadata = {
  title: "Zjednoczeni | Aktualności",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

const NewsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const category = 6;
  const search = params.search?.trim() || "";

  const currentPage = Math.max(Number(params.page) || 1, 1);

  let posts: Post[] = [];
  let totalPages = 0;

  try {
    const result = await getPosts({
      category,
      page: currentPage,
      search,
    });

    posts = result.posts;
    totalPages = result.totalPages;
  } catch (error) {
    console.error("Błąd pobierania postów z WP:", error);

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
