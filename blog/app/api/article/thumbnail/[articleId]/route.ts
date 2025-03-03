import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import type { PostArticleThumbnailResponse } from "@/entities/article/model";

import { SUPABASE_STORAGE_URL } from "@/shared/config";
import { createServerSupabase } from "@/shared/utils";

export const POST = async (req: NextRequest) => {
  const url = new URL(req.url);
  const articleId = url.pathname.split("/").pop();

  const file = (await req.formData()).get("image") as File;

  const supabse = await createServerSupabase();

  const imageId = randomUUID();
  const imageName = `${imageId}.${file.type.split("/")[1]}`;

  try {
    const { data, error } = await supabse.storage
      .from("article_thumbnail")
      .upload(`${articleId}/${imageName}`, file);

    if (error) {
      throw error;
    }

    return NextResponse.json<PostArticleThumbnailResponse>({
      status: 200,
      message: "썸네일 업로드에 성공했습니다.",
      data: {
        ...data,
        imageUrl: `${SUPABASE_STORAGE_URL}/${data.fullPath}`
      }
    });
  } catch (error) {
    console.log(error);

    const typedError = error as { statusCode?: number; message?: string };

    return NextResponse.json(
      {
        status: typedError.statusCode || 500,
        data: typedError.message || "예기치 못한 에러가 발생 했습니다."
      },
      {
        status: typedError.statusCode || 500
      }
    );
  }
};
