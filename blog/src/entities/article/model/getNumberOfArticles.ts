import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";

const fetchNumberOfArticles = (series?: string) => {
  const supabase = createBrowserSupabase();

  return series === undefined
    ? supabase
        .from("articles")
        .select("id", { count: "exact" })
        .eq("status", "published")
    : supabase
        .from("articles")
        .select("id", { count: "exact" })
        .eq("status", "published")
        .eq("series_name", series);
};

export const getNumberOfArticles = (series?: string) => {
  const queryKey = ARTICLE_QUERY_KEY.numberOfArticles(
    "published",
    series || "all"
  );

  const queryFn = async () => {
    const { count, error } = await fetchNumberOfArticles(series);

    if (error) {
      throw error;
    }

    return count ?? 0;
  };

  return {
    queryKey,
    queryFn
  };
};

export const getNumberOfTempArticles = () => {
  const queryKey = ARTICLE_QUERY_KEY.numberOfArticles("draft", "all");

  const queryFn = async () => {
    const { count, error } = await fetchNumberOfArticles();
    if (error) {
      throw error;
    }

    return count ?? 0;
  };

  return {
    queryKey,
    queryFn
  };
};

export const useGetNumberOfArticles = (series?: string) => {
  return useSuspenseQuery(getNumberOfArticles(series));
};

export const useGetNumberOfTempArticles = () => {
  return useSuspenseQuery(getNumberOfTempArticles());
};
