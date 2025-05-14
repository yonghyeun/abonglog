import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";

const getArticleGraph = async (articleId: number, seriesName: string) => {
  const supabase = createBrowserSupabase();

  const { data, error } = await supabase
    .from("articles")
    .select("id, title")
    .eq("series_name", seriesName)
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return { prevArticleData: null, nextArticleData: null };
  }

  const currentIndex = data.findIndex((article) => article.id === articleId);

  const prevArticleData = currentIndex > 0 ? data[currentIndex - 1] : null;
  const nextArticleData =
    currentIndex < data.length - 1 ? data[currentIndex + 1] : null;

  return { prevArticleData, nextArticleData };
};

export const useGetArticleGraph = (articleId: number, seriesName: string) => {
  return useSuspenseQuery({
    queryKey: ARTICLE_QUERY_KEY.graph(articleId),
    queryFn: () => getArticleGraph(articleId, seriesName)
  });
};
