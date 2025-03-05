import { NextRequest, NextResponse } from "next/server";

import type { PostNewArticleData } from "@/entities/article/model";

import { camelToSnake, createServerSupabase } from "@/shared/utils";

const insertNewArticle = async (
  newArticle: Omit<PostNewArticleData, "tags">,
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  const currentTimeStamp = new Date().toISOString();

  return supabase.from("articles").insert({
    ...camelToSnake(newArticle),
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  });
};

const inesrtArticleTags = async (
  { id, tags }: Pick<PostNewArticleData, "tags" | "id">,
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  return supabase.from("article_tags").insert(
    tags.map(({ name }) => ({
      tag_name: name,
      article_id: id
    }))
  );
};

export const POST = async (req: NextRequest) => {
  const { tags, ...articleData } = (await req.json()) as PostNewArticleData;
  const supabase = await createServerSupabase();

  const supabaseResponseArray = await Promise.all([
    insertNewArticle(articleData, supabase),
    inesrtArticleTags({ id: articleData.id, tags }, supabase)
  ]);

  const errorResponse = supabaseResponseArray.find(
    (response) => !!response.error
  );

  if (errorResponse) {
    return NextResponse.json(
      {
        status: errorResponse.error.code,
        message: errorResponse.error.message
      },
      {
        status: errorResponse.status,
        statusText: errorResponse.statusText
      }
    );
  }

  return NextResponse.json({
    status: 200,
    message: "아티클이 성공적으로 저장 되었습니다"
  });
};
