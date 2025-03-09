import { NextRequest, NextResponse } from "next/server";

import type { PostNewArticleResponse } from "@/entities/article/model";

import { createServerSupabase } from "@/shared/model";
import { createPostgressErrorResponse } from "@/shared/route";

export const DELETE = async (req: NextRequest) => {
  const articleId = (await req).url.split("/").pop() || "";

  const supabase = await createServerSupabase();

  const response = await supabase
    .from("articles")
    .delete()
    .eq("id", +articleId);

  if (response.error) {
    return NextResponse.json(...createPostgressErrorResponse(response));
  }

  return NextResponse.json<PostNewArticleResponse>({
    status: 200,
    message: "아티클이 성공적으로 삭제 되었습니다",
    data: {
      type: "published"
    }
  });
};
