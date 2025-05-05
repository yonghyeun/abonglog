import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";
import { snakeToCamel } from "@/shared/util";

export const getArticleMetaListPerSeries = () => {
  const queryFn = async () => {
    const supabase = createBrowserSupabase();

    const { data, error } = await supabase
      .from("articles")
      .select("series_name, title,id, created_at")
      .eq("status", "published")
      .order("series_name", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(snakeToCamel).reduce(
      (acc, cur) => {
        if (!acc[cur.seriesName]) {
          acc[cur.seriesName] = [];
        }

        acc[cur.seriesName].push({
          title: cur.title,
          id: cur.id,
          createdAt: cur.createdAt
        });

        return acc;
      },
      {} as Record<string, { title: string; id: number; createdAt: string }[]>
    );
  };

  return {
    queryFn,
    queryKey: ARTICLE_QUERY_KEY.metaListPerSeries()
  };
};

export const useGetArticleMetaListPerSeries = () => {
  return useSuspenseQuery(getArticleMetaListPerSeries());
};
