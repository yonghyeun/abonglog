export const ARTICLE_ENDPOINT = {
  POST_ARTICLE_IMAGE: () => "/api/articles/image" as const,
  POST_ARTICLE_THUMBNAIL: () => "/api/articles/thumbnail" as const,
  POST_NEW_ARTICLE: () => "/api/articles" as const,
  POST_ARTICLE_TAGS: () => "/api/articles" as const
} as const;
