import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidatePayload = {
  post_id: number;
  post_type: string;
  slug: string;
  permalink: string;
  action: "publish" | "update" | "delete";
  home_url: string;
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-headlessnext-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: RevalidatePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { post_type, slug } = body;

  revalidateTag("posts-latest", "max");
  revalidateTag("posts-all", "max");

  if (slug) {
    revalidatePath(`/news/${slug}`);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
