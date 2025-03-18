import { resizeAndConvertToWebp } from "@backend/image/lib";
import { uploadImage } from "@backend/image/model";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";
const MAX_IMAGE_WIDTH = 1200;

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const images = formData.getAll("image") as File[];
  const articleId = formData.get("articleId") as string;

  const resizedImages = await Promise.all(
    images.map((image) => {
      return image.type === "image/gif"
        ? image
        : resizeAndConvertToWebp(image, MAX_IMAGE_WIDTH);
    })
  );

  const uris = resizedImages.map((image) => {
    const type = image.type.split("/")[1];
    return `${articleId}/image/${randomUUID()}.${type}`;
  });

  const response = await Promise.all(
    uris.map((uri, index) => {
      return uploadImage(ARTICLE_IMAGE_STORAGE_NAME, uri, resizedImages[index]);
    })
  );

  const error = response.map(({ error }) => error).find((error) => !!error);

  if (error) {
    return NextResponse.json(
      {
        code: 500,
        message: error.message
      },
      {
        status: 500
      }
    );
  }

  return NextResponse.json({
    code: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: uris.map((uri) => `/api/${uri}`)
  });
};
