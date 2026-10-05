import { Metadata } from "next";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import PostContent from "../../../components/shared/posts/PostContent";

type Props = {
  params: Promise<{ postSlug: string }>;
};

export const metadata: Metadata = {
  title: "Zjednoczeni | Aktualności",
};

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.API_BASE_URL}/posts?per_page=100&_fields=slug`,
    { next: { revalidate: false, tags: ["posts-all"] } },
  );

  if (!response.ok) {
    return [];
  }

  const posts: { slug: string }[] = await response.json();

  return posts.map((post) => ({
    postSlug: post.slug,
  }));
}

const NewsPage = async ({ params }: Props) => {
  const { postSlug } = await params;

  return (
    <section className="mt-20">
      <div className="container">
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Błąd ładowania wpisu"
          loadingMessage="Ładowanie wpisu"
        >
          <PostContent postSlug={postSlug} link="news" />
        </SuspenseErrorBoundary>
      </div>
    </section>
  );
};

export default NewsPage;
