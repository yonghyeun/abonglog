import { NextRequest, NextResponse } from "next/server";

import type {
  PostArticleThumbnailRequest,
  PostArticleThumbnailResponse
} from "@/entities/article/model";

import { createServerSupabase } from "@/shared/model";
import { attachIamgeUrl, createImageConfig } from "@/shared/route";

const uploadThumbnail = async ({
  file,
  articleId
}: PostArticleThumbnailRequest) => {
  const supabase = await createServerSupabase();

  const { imageName } = createImageConfig(file);

  const response = await supabase.storage
    .from("article_thumbnail")
    .upload(`${articleId}/${imageName}`, file);

  return response;
};

export const POST = async (req: NextRequest) => {
  const form = await req.formData();

  const articleId = form.get("articleId") as string;
  const file = form.get("image") as File;

  const response = await uploadThumbnail({ file, articleId });

  if (response.error) {
    return NextResponse.json({
      status: 500,
      message: "이미지 업로드에 실패했습니다."
    });
  }
  return NextResponse.json<PostArticleThumbnailResponse>({
    status: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: attachIamgeUrl(response.data)
  });
};
