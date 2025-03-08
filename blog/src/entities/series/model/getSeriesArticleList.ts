import { SERIES_QUERY_KEY } from "./seriesQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export const getSeriesArticleList = () => {
  const queryKey = SERIES_QUERY_KEY.seriesArticle();

  const queryFn = async () => {
    const supabase = await createBrowserSupabase();

    const { data, error } = await supabase.from("series_articles").select("*");

    if (error) {
      throw error;
    }

    return snakeToCamel(data);
  };

  return { queryKey, queryFn };
};

export const useGetSeriesArticleList = () => {
  return useSuspenseQuery(getSeriesArticleList());
};
