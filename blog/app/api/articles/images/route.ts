import { resizeFilesAndConvertWebpFile } from "@backend/image/lib";
import { uploadImage } from "@backend/image/model";
import { createErrorResponse } from "@backend/shared/utils";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import type { PostArticleImageResponse } from "@/entities/article/model";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";
const MAX_IMAGE_WIDTH = 1200;

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const images = formData.getAll("image") as File[];
  const articleId = formData.get("articleId") as string;

  const resizedImages = await resizeFilesAndConvertWebpFile(
    images,
    MAX_IMAGE_WIDTH
  );

  const urls = resizedImages.map((image) => {
    const type = image.type.split("/")[1];
    return `images/${articleId}/${randomUUID()}.${type}`;
  });

  const response = await Promise.all(
    urls.map((url, index) => {
      return uploadImage(ARTICLE_IMAGE_STORAGE_NAME, url, resizedImages[index]);
    })
  );

  const error = response.map(({ error }) => error).find((error) => !!error);

  if (error) {
    return createErrorResponse(error);
  }

  return NextResponse.json<PostArticleImageResponse>({
    code: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: urls.map((url) => `/api/${url}`)
  });
};
