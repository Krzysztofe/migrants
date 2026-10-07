import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";
import { Post } from "../models/postModel";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import NewsList from "../../components/shared/posts/NewsList";
import { getPosts } from "../utils/querries/getPosts";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "Dość zakazu strajków | Wpisy",
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

  const category = 7;
  const currentPage = Math.max(Number(params.page) || 1, 1);

  let posts: Post[] = [];
  let totalPages = 0;

  try {
    const result = await getPosts({
      category,
      page: currentPage,
      search,
    });

    const today = new Date().toISOString().split("T")[0];

    posts = result.posts
      .filter((post) => {
        const eventDate = post.meta?.event_date;

        return eventDate && eventDate >= today;
      })
      .sort((a, b) => {
        return (a.meta?.event_date ?? "").localeCompare(
          b.meta?.event_date ?? "",
        );
      });

    totalPages = result.totalPages;
  } catch (error) {
    console.error("Błąd pobierania postów z WP:", error);

    return <div>Nie udało się pobrać postów.</div>;
  }
  return (
    <>
      <TopSection
        header="Gdzie nas znajdziesz"
        paragraph="Najnowsze informacje o kampanii dość zakazu strajków."
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
      />{" "}
    </>
  );
};

export default PostsListPage;
