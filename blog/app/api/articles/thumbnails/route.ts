import {
  getImageStoragePath,
  resizeFilesAndConvertWebpFile
} from "@backend/image/lib";
import { uploadImage } from "@backend/image/model";
import { createErrorResponse } from "@backend/shared/lib";
import { NextRequest, NextResponse } from "next/server";

import type { PostArticleThumbnailResponse } from "@/entities/article/model";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

const ARTICLE_IMAGE_STORAGE_NAME = "article_thumbnail";
const IMAGE_PATH = `${SUPABASE_STORAGE_URL}/public/${ARTICLE_IMAGE_STORAGE_NAME}`;

const MAX_IMAGE_WIDTH = 1000;

export const POST = async (req: NextRequest) => {
  const form = await req.formData();

  const articleId = form.get("articleId") as string;
  const file = form.get("image") as File;

  const [resizedImage] = await resizeFilesAndConvertWebpFile(
    [file],
    MAX_IMAGE_WIDTH
  );

  const url = getImageStoragePath(
    "thumbnails",
    articleId,
    resizedImage.type.split("/")[1]
  );

  const response = await uploadImage(
    ARTICLE_IMAGE_STORAGE_NAME,
    url,
    resizedImage
  );

  if (response.error) {
    return createErrorResponse(response.error);
  }

  return NextResponse.json<PostArticleThumbnailResponse>({
    code: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: `${IMAGE_PATH}/${url}`
  });
};
