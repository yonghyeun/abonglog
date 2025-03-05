import { NextRequest, NextResponse } from "next/server";

import type { PostNewArticleData } from "@/entities/article/model";

import { createServerSupabase } from "@/shared/model";
import { camelToSnake, createPostgressErrorResponse } from "@/shared/route";

const upsertNewArticle = (
  newArticle: Omit<PostNewArticleData, "tags">,
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  const currentTimeStamp = new Date().toISOString();

  return supabase.from("articles").upsert({
    ...camelToSnake(newArticle),
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  });
};

const deleteArticleTags = (
  articleId: PostNewArticleData["id"],
  supabsae: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  return supabsae.from("article_tags").delete().eq("article_id", articleId);
};

const insertArticleTag = (
  { id, tags }: Pick<PostNewArticleData, "tags" | "id">,
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  return supabase.from("article_tags").insert(
    tags.map((tag) => ({
      tag_name: tag.name,
      article_id: id
    }))
  );
};

const uploadArticle = async ({ tags, ...articledata }: PostNewArticleData) => {
  const supabase = await createServerSupabase();

  const upsertNewArticleResponse = await upsertNewArticle(
    articledata,
    supabase
  );

  const deleteArticleTagsResponse = await deleteArticleTags(
    articledata.id,
    supabase
  );

  const insertArticleTagResponse = await insertArticleTag(
    { id: articledata.id, tags },
    supabase
  );

  return [
    upsertNewArticleResponse,
    deleteArticleTagsResponse,
    insertArticleTagResponse
  ].find((response) => !!response.error);
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as PostNewArticleData;
  const errorResponse = await uploadArticle(data);

  if (errorResponse) {
    return NextResponse.json(...createPostgressErrorResponse(errorResponse));
  }

  return NextResponse.json({
    status: 200,
    message: "아티클이 성공적으로 저장 되었습니다"
  });
};
