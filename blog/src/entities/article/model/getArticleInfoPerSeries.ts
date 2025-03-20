import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";
import { snakeToCamel } from "@/shared/util";

export const getArticleInfoPerSeries = () => {
  const queryKey = ARTICLE_QUERY_KEY.infoPerSeries();

  const queryFn = async () => {
    const supabase = createBrowserSupabase();

    const { data, error } = await supabase.from("series_articles").select("*");

    if (error) {
      throw error;
    }

    return snakeToCamel(data);
  };

  return { queryKey, queryFn };
};

export const useGetArticleInfoPerSeries = () => {
  return useSuspenseQuery(getArticleInfoPerSeries());
};
