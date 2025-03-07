import { type NextRequest, NextResponse } from "next/server";

import type {
  PostArticleImageRequest,
  PostArticleImageResponse
} from "@/entities/article/model";

import { createServerSupabase } from "@/shared/model";
import { attachIamgeUrl, createImageConfig } from "@/shared/route";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";

const uploadImageAction = async (file: File, postId: string) => {
  const supabase = await createServerSupabase();

  const { imageName } = createImageConfig(file);

  const response = await supabase.storage
    .from(ARTICLE_IMAGE_STORAGE_NAME)
    .upload(`public/${postId}/${imageName}`, file);

  return response;
};

/**
 * TODO : 이미지 업로드에 실패한 URL 만 response 로 보내서 에러 처리하기
 */
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const images = formData.getAll("image") as PostArticleImageRequest["files"];
  const postId = formData.get("id") as PostArticleImageRequest["id"];

  const responseArray = await Promise.all(
    images.map((file) => uploadImageAction(file, postId))
  );

  const uploadedImages = responseArray.filter((response) => !response.error);

  if (uploadedImages.length < responseArray.length) {
    return NextResponse.json({
      status: 500,
      message: "이미지 업로드에 실패했습니다."
    });
  }

  return NextResponse.json<PostArticleImageResponse>({
    status: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: uploadedImages.map(({ data }) => attachIamgeUrl(data))
  });
};
