import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";

export const getNumberOfArticles = (series?: string) => {
  const queryKey = ARTICLE_QUERY_KEY.numberOfArticles(
    "published",
    series || "all"
  );

  const queryFn = async () => {
    const supabase = await createBrowserSupabase();

    // 전체 보기인 경우

    if (series === undefined) {
      const { count, error } = await supabase
        .from("articles")
        .select("id", { count: "exact" })
        .eq("status", "published");

      if (error) {
        throw new Error(error.message);
      }

      return count ?? 0;
    }

    // 특정 시리즈가 존재하는 경우

    const { count, error } = await supabase
      .from("articles")
      .select("id", { count: "exact" })
      .eq("status", "published")
      .eq("series_name", series);

    if (error) {
      throw new Error(error.message);
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
    const supabase = await createBrowserSupabase();

    const { count, error } = await supabase
      .from("articles")
      .select("id", { count: "exact" })
      .eq("status", "draft");

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
