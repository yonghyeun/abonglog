export type ArticleStatus = "published" | "draft";

export const ARTICLE_QUERY_KEY = {
  default: (status: ArticleStatus) => ["article", status] as const,

  numberOfArticles: (status: ArticleStatus, series: string) =>
    [
      ...ARTICLE_QUERY_KEY.default(status),
      "numberOfArticles",
      { series }
    ] as const,

  latestArticle: () =>
    [...ARTICLE_QUERY_KEY.default("published"), "latestArticle"] as const,

  listAll: (status: ArticleStatus) =>
    [
      ...ARTICLE_QUERY_KEY.default(status),
      "list",
      {
        series: "all"
      }
    ] as const,
  listSeries: (status: ArticleStatus, series: string) =>
    [...ARTICLE_QUERY_KEY.default(status), "list", { series }] as const,

  popularDefault: () => ["popular"] as const,

  // 인기글 같은 경우엔 자주 invalidate 될 필요 없다.
  // 인기글의 invalidate 는 ISR과 GA 를 통해 변경하도록 한다.
  popular: (period: "daily" | "weekly" | "monthly") =>
    [...ARTICLE_QUERY_KEY.popularDefault(), period] as const,

  infoPerSeries: () =>
    [...ARTICLE_QUERY_KEY.default("published"), "perSeries"] as const
};
