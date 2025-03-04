import { NextRequest, NextResponse } from "next/server";

import type { PostNewArticleData } from "@/entities/article/model";

import { camelToSnake, createServerSupabase } from "@/shared/utils";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as PostNewArticleData;

  const currentTimeStamp = new Date().toISOString();
  const supabase = await createServerSupabase();

  const { error } = await supabase.from("articles").insert({
    ...camelToSnake(body),
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  });

  if (error) {
    return NextResponse.json({
      status: error.code,
      message: error.message
    });
  }

  return NextResponse.json({
    status: 200,
    message: "아티클이 성공적으로 저장 되었습니다"
  });
};
