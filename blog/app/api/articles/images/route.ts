import {
  getImageStoragePath,
  resizeFilesAndConvertWebpFile
} from "@backend/image/lib";
import { uploadMultipleImages } from "@backend/image/model";
import { createErrorResponse, findError } from "@backend/shared/lib";
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

  const storagePath = resizedImages.map((image) =>
    getImageStoragePath(articleId, image.type.split(".")[1])
  );

  const response = await uploadMultipleImages(
    storagePath.map((path, index) => ({ path, image: resizedImages[index] })),
    ARTICLE_IMAGE_STORAGE_NAME
  );

  const error = findError(response);

  if (error) {
    return createErrorResponse(error);
  }

  return NextResponse.json<PostArticleImageResponse>({
    code: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: storagePath.map((path) => `/api/${path}`)
  });
};
