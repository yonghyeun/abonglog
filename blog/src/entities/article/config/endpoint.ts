export const ARTICLE_ENDPOINT = {
  POST_ARTICLE_IMAGE: () => "/api/articles/images" as const,
  POST_ARTICLE_THUMBNAIL: () => "/api/articles/thumbnails" as const,
  UPSERT_ARTICLE: () => "/api/articles" as const,
  DELETE_ARTICLE: () => "/api/articles" as const
} as const;
