import TopSection from "@/components/shared/TopSection";
import { Post } from "../models/postModel";
import NewsList from "../../components/shared/posts/NewsList";
import { Metadata } from "next";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import { getPosts } from "../utils/querries/getPosts";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "Dość zakazu strajków | Aktualności",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

const NewsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const category = 5;
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
      aktualności - wpisy
      {/* <TopSection
        header="Aktualności"
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
      <CallToAction
        message="Prawo do strajku nie może być fikcją"
        subtitle="Zmieńmy to razem z Tobą"
        buttonMessage="signIn"
      />{" "} */}
    </>
  );
};

export default NewsPage;
