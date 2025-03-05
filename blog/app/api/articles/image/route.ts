import { type NextRequest, NextResponse } from "next/server";

import type { PostArticleImageResponse } from "@/entities/article/model";

import { SUPABASE_STORAGE_URL } from "@/shared/config";
import { createImageConfig, createServerSupabase } from "@/shared/utils";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";

const uploadImageAction = async (file: File, postId: string) => {
  const supabase = await createServerSupabase();

  const { imageName } = createImageConfig(file);

  const { data, error } = await supabase.storage
    .from(ARTICLE_IMAGE_STORAGE_NAME)
    .upload(`public/${postId}/${imageName}`, file);

  if (error) {
    throw error;
  }

  return data;
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const images = formData.getAll("image") as File[];
    const postId = formData.get("id") as string;
    const imageUrls = await Promise.all(
      images.map((file) => uploadImageAction(file, postId))
    );

    return NextResponse.json<PostArticleImageResponse>({
      status: 200,
      message: "이미지 업로드에 성공했습니다.",
      data: imageUrls.map((urlObj) => ({
        ...urlObj,
        imageUrl: `${SUPABASE_STORAGE_URL}/${urlObj.fullPath}`
      }))
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
