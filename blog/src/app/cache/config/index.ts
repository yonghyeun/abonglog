export const REVALIDATE_OPTIONS = {
  ARTICLE: (status: "published" | "draft") => `article-${status}` as const
};
