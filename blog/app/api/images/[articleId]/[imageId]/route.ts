import { resizeAndConvertToWebp } from "@backend/image/lib";
import { createErrorResponse } from "@backend/shared/utils";
import { NextRequest, NextResponse } from "next/server";

import { createServerSupabase } from "@/shared/model";

const STORAGE_NAME = "article_image";
const BASE_IMAGE_WIDTH = 1000;
const getStoragePath = (articleId: string, imageId: string) => {
  return `images/${articleId}/${imageId}`;
};

/**
 * images/[articleId]/[imageId] 라우트의 GET요청은
 * 이미지를 리사이징하여 반환합니다.
 *
 * 이 때 주의해야 할 점은 resizing을 하지 않을 이미지 타입 (image/gif) 의 경우엔
 * 해당 라우트를 통해 이미지를 서빙하지 않도록 해야 합니다.
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string; imageId: string }> }
) => {
  const { articleId, imageId } = await params;

  const supabase = await createServerSupabase();

  const url = new URL(req.url);
  const width = new URLSearchParams(url.search).get("width") || "1000";

  const storagePath = getStoragePath(articleId, imageId);

  const { data: imageData, error } = await supabase.storage
    .from(STORAGE_NAME)
    .download(storagePath);

  if (error) {
    return createErrorResponse(error);
  }

  const contentType = imageData.type;
  if (contentType === "image/gif") {
    return NextResponse.json(
      {
        code: 400,
        message: "GIF 이미지는 리사이징할 수 없습니다."
      },
      {
        status: 400
      }
    );
  }

  const resizedImage = await resizeAndConvertToWebp(
    imageData,
    parseInt(width, 10) || BASE_IMAGE_WIDTH,
    100
  );

  const cacheKey = `${articleId}-${imageId}-${width}`;
  const cacheHeaders = {
    "Cache-Control": "public, max-age=31536000, immutable",
    "CDN-Cache-Control": "public, max-age=31536000, immutable",
    "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
    "Content-Type": "image/webp",
    ETag: cacheKey,
    "Last-Modified": new Date().toUTCString(),
    Vary: "Accept-Encoding"
  };

  return new NextResponse(resizedImage, {
    status: 200,
    headers: cacheHeaders
  });
};
