import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import type { SeriesRequest } from "@/entities/series/model";

import { createServerSupabase } from "@/shared/lib";

export const POST = async (req: NextRequest) => {
  const supabase = await createServerSupabase();
  const { name } = (await req.json()) as SeriesRequest;

  const { error } = await supabase.from("series").insert([
    {
      name,
      created_at: new Date().toISOString()
    }
  ]);

  if (error) {
    return NextResponse.json({
      status: 500,
      message: error.message
    });
  }
  // 시리즈 셀렉터 토글을 사용하는 모든 경로를 revalidate
  revalidatePath("/write");
  revalidatePath("/write/[articleId]");

  return NextResponse.json({
    status: 200,
    message: `${name} 시리즈가 추가되었습니다 !`
  });
};
