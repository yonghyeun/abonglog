import { resizeAndConvertToWebp } from "@backend/image/lib";
import { uploadImage } from "@backend/image/model";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import type { PostArticleThumbnailResponse } from "@/entities/article/model";

const ARTICLE_IMAGE_STORAGE_NAME = "article_thumbnail";
const MAX_IMAGE_WIDTH = 1000;

export const POST = async (req: NextRequest) => {
  const form = await req.formData();

  const articleId = form.get("articleId") as string;
  const file = form.get("image") as File;

  const resizedImage = await file
    .arrayBuffer()
    .then((buffer) => {
      return resizeAndConvertToWebp(buffer, MAX_IMAGE_WIDTH);
    })
    .then(
      (resizedImageBuffer) =>
        new File([resizedImageBuffer], `${file.name}.webp`, {
          type: "image/webp"
        })
    );

  const uri = `thumbnails/${articleId}/${randomUUID()}.webp`;

  const response = await uploadImage(
    ARTICLE_IMAGE_STORAGE_NAME,
    uri,
    resizedImage
  );

  if (response.error) {
    return NextResponse.json(
      {
        code: 500,
        message: response.error.message
      },
      {
        status: 500
      }
    );
  }

  return NextResponse.json<PostArticleThumbnailResponse>({
    code: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: `/api/${uri}`
  });
};
