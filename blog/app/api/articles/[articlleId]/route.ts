import { NextRequest, NextResponse } from "next/server";

import { type ServerSupabase, createServerSupabase } from "@/shared/model";

const deleteArticle = async (articleId: string, supabase: ServerSupabase) => {
  return supabase.from("articles").delete().eq("id", +articleId);
};

const deleteThumbnail = async (articleId: string, supabase: ServerSupabase) => {
  const storageListResponse = await supabase.storage
    .from("article_thumbnail")
    .list(String(articleId));

  if (storageListResponse.error) {
    return storageListResponse;
  }

  const files = storageListResponse.data;

  if (files.length > 0) {
    const deleteThumbnailResponse = await supabase.storage
      .from("article_thumbnail")
      .remove(files.map((file) => `${articleId}/${file.name}`));

    if (!deleteThumbnailResponse.error) {
      console.log(
        `🗑️  ${articleId}에서 사용한 썸네일을 삭제했습니다.\n` +
          `🗂️  제거된 썸네일 목록:\n` +
          deleteThumbnailResponse.data
            .map((file) => `  - ${file.name}`)
            .join("\n")
      );
    }

    return deleteThumbnailResponse;
  }

  return null;
};

const deleteArticleTags = async (
  articleId: string,
  supabase: ServerSupabase
) => {
  return supabase.from("article_tags").delete().eq("article_id", +articleId);
};

const deleteArticleImages = async (
  articleId: string,
  supabase: ServerSupabase
) => {
  const articleImagesResponse = await supabase.storage
    .from("article_image")
    .list(`public/${articleId}`);

  const files = articleImagesResponse.data || [];

  if (files.length > 0) {
    const deleteArticleImagesResponse = await supabase.storage
      .from("article_image")
      .remove(files.map((file) => `public/${articleId}/${file.name}`));

    if (!deleteArticleImagesResponse.error) {
      console.log(
        `🗑️  ${articleId}에서 사용한 ${files.length}개의 이미지를 삭제했습니다.\n` +
          `🗂️  제거된 이미지 파일 목록:\n` +
          deleteArticleImagesResponse.data
            .map((file) => `  - ${file.name}`)
            .join("\n")
      );
    }

    return deleteArticleImagesResponse;
  }
  return null;
};

export const DELETE = async (req: NextRequest) => {
  const articleId = (await req).url.split("/").pop() || "";
  const supabase = await createServerSupabase();

  const deleteResponse = await Promise.all([
    deleteArticle(articleId, supabase),
    deleteThumbnail(articleId, supabase),
    deleteArticleTags(articleId, supabase),
    deleteArticleImages(articleId, supabase)
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
