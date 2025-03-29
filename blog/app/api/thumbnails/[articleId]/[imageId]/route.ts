import { downloadImage } from "@backend/image/model";
import { createErrorResponse } from "@backend/shared/lib";
import { NextRequest, NextResponse } from "next/server";

const STORAGE_NAME = "article_thumbnail";

const getStoragePath = (articleId: string, imageId: string) => {
  return `thumbnails/${articleId}/${imageId}`;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string; imageId: string }> }
) => {
  const { articleId, imageId } = await params;

  const url = new URL(req.url);
  const width = new URLSearchParams(url.search).get("width") || "1000";

  const storagePath = getStoragePath(articleId, imageId);

  const { data: imageData, error } = await downloadImage(
    STORAGE_NAME,
    storagePath
  );

  if (error) {
    return createErrorResponse(error);
  }

  const contentType = imageData.type;
  if (contentType === "image/gif") {
    return createErrorResponse({
      status: 400,
      message: "GIF 이미지는 리사이징할 수 없습니다."
    });
  }

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

  return new NextResponse(imageData, {
    status: 200,
    headers: cacheHeaders
  });
};
