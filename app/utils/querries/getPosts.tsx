import { Post } from "@/app/models/postModel";

type GetPostsParams = {
  category?: number;
  page?: number;
  search?: string;
};

type GetPostsResult = {
  posts: Post[];
  totalPages: number;
};

export async function getPosts({
  category,
  page = 1,
  search = "",
}: GetPostsParams): Promise<GetPostsResult> {
  const queryParams = new URLSearchParams({
    per_page: "20",
    page: page.toString(),
    _embed: "true",
  });

  if (category !== undefined) {
    queryParams.set("categories", category.toString());
  }

  if (search.trim()) {
    queryParams.set("search", search.trim());
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}/posts?${queryParams.toString()}`,
    {
      next: {
        revalidate: 60,
        tags: [
          "posts",
          category !== undefined ? `posts-cat-${category}` : "posts-all",
        ],
      },
    },
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać postów");
  }

  const posts: Post[] = await response.json();

  const totalPages = Number(response.headers.get("X-WP-TotalPages") || 0);

  return {
    posts,
    totalPages,
  };
}
