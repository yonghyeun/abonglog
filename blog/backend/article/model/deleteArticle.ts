import { deleteImages, getImageList } from "@backend/image/model";

import { type ServerSupabase, createServerSupabase } from "@/shared/model";

const deleteThumbnail = async (articleId: string) => {
  const { data: thumbnailList } = await getImageList(
    "article_thumbnail",
    `thumbnails/${articleId}`
  );

  if (!thumbnailList || thumbnailList.length === 0) {
    return { error: null };
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
    return { error: null };
  }

  return deleteImages(
    "article_image",
    imageList.map((image) => `images/${articleId}/${image.name}`)
  );
};

export const deleteArticle = async (articleId: string) => {
  const supabase = await createServerSupabase();

  const response = await Promise.all([
    supabase.from("articles").delete().eq("id", +articleId),
    deleteThumbnail(articleId),
    deleteArticleImages(articleId),
    deleteArticleTags(articleId, supabase)
  ]);

  const error = response.map((res) => res.error).find((error) => !!error);

  return error;
};
