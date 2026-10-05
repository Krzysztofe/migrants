import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";
import { Post } from "../models/postModel";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import NewsList from "../news/_components/NewsList";
import { getPosts } from "../utils/querries/getPosts";

export const metadata: Metadata = {
  title: "Zjednoczeni | Nasza działalność ",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

const PostsListPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const search = params.search?.trim() || "";

  const category = 5;
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
        header="Prawo do strajku to fikcja"
        paragraph="Na papierze strajk jest legalny, w praktyce przejście całej procedury jest niemal niemożliwe. Zbieramy analizy, wyjaśnienia i historie pracowników."
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
