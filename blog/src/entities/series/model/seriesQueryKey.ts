export const SERIES_QUERY_KEY = {
  default: () => ["series"] as const,
  seriesArticle: () => [...SERIES_QUERY_KEY.default(), "articles"] as const
} as const;
