import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";

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

    return data.reduce(
      (acc, cur) => {
        if (!acc[cur.series_name]) {
          acc[cur.series_name] = [];
        }

        acc[cur.series_name].push({
          title: cur.title,
          id: cur.id
        });

        return acc;
      },
      {} as Record<string, { title: string; id: number }[]>
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
