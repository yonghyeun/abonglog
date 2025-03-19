import { deleteImages, getImageList } from "@backend/image/model";
import { NextRequest, NextResponse } from "next/server";

import { type ServerSupabase, createServerSupabase } from "@/shared/model";

const deleteArticle = async (articleId: string, supabase: ServerSupabase) => {
  return supabase.from("articles").delete().eq("id", +articleId);
};

const deleteThumbnail = async (articleId: string) => {
  const { data: thumbnailList } = await getImageList(
    "article_thumbnail",
    `thumbnails/${articleId}`
  );

  if (!thumbnailList || thumbnailList.length === 0) {
    return null;
  }

  return deleteImages(
    "article_thumbnail",
    thumbnailList.map(
      (thumbnail) => `thumbnails/${articleId}/${thumbnail.name}`
    )
  );
};

const deleteArticleTags = async (
  articleId: string,
  supabase: ServerSupabase
) => {
  return supabase.from("article_tags").delete().eq("article_id", +articleId);
};

const deleteArticleImages = async (articleId: string) => {
  const { data: imageList } = await getImageList(
    "article_image",
    `images/${articleId}`
  );

  if (!imageList || imageList.length === 0) {
    return null;
  }

  return deleteImages(
    "article_image",
    imageList.map((image) => `images/${articleId}/${image.name}`)
  );
};

export const DELETE = async (req: NextRequest) => {
  const articleId = (await req).url.split("/").pop() || "";
  const supabase = await createServerSupabase();

  const deleteResponse = await Promise.all([
    deleteArticle(articleId, supabase),
    deleteThumbnail(articleId),
    deleteArticleImages(articleId),
    deleteArticleTags(articleId, supabase)
  ]);

  const errorResponse = deleteResponse.find(
    (response) => response && response.error
  );

  if (errorResponse && errorResponse.error) {
    console.error(
      `${articleId} 의 게시글을 제거하던 중 오류가 발생했습니다. ${errorResponse.error.message}`
    );

    return NextResponse.json({
      code: 500,
      message: errorResponse.error.message
    });
  }

  return NextResponse.json({
    code: 200,
    message: "게시글이 성공적으로 삭제되었습니다."
  });
};
