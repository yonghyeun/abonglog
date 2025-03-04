export const ARTICLE_ENDPOINT = {
  POST_ARTICLE_IMAGE: () => "/api/article/image" as const,
  // TODO : Restfull API 를 위해 articleId 를 파라미터로 넣지 않도록 수정
  POST_ARTICLE_THUMBNAIL: () => `/api/article/thumbnail` as const,
  POST_NEW_ARTICLE: () => "/api/articles" as const,
  POST_ARTICLE_TAGS: () => "/api/articles" as const
} as const;
