export const ARTICLE_ENDPOINT = {
  POST_ARTICLE_IMAGE: () => "/api/articles/images" as const,
  POST_ARTICLE_THUMBNAIL: () => "/api/articles/thumbnails" as const,
  POST_NEW_ARTICLE: () => "/api/articles" as const,
  DELETE_ARTICLE: (articleId: string) => `/api/articles/${articleId}` as const
} as const;
