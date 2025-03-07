export type ArticleStatus = "published" | "draft";

export const ARTICLE_QUERY_KEY = {
  default: (status: ArticleStatus) => ["article", status] as const,

  list_all: (status: ArticleStatus) =>
    [...ARTICLE_QUERY_KEY.default(status), "all"] as const,
  list_series: (status: ArticleStatus, seriesName: string) =>
    [...ARTICLE_QUERY_KEY.default(status), seriesName] as const,

  // 인기글 같은 경우엔 자주 invalidate 될 필요 없다.
  // 인기글의 invalidate 는 ISR과 GA 를 통해 변경하도록 한다.
  popular: (period: "daily" | "weekly" | "monthly") =>
    [`popular article ${period}`] as const
};
