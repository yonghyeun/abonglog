import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export const getLatestArticle = () => {
  const queryKey = ARTICLE_QUERY_KEY.latestArticle();
  const queryFn = async () => {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
          id , title , author , 
          series_name , description , 
          status , updated_at, thumbnail_url,
          article_tags(tag_name)
        `
      )
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()
      .then(snakeToCamel);

    if (error) {
      throw error;
    }

    const { articleTags, ...article } = data;

    return {
      ...article,
      tags: articleTags.map(({ tagName }) => tagName)
    };
  };

  return {
    queryKey,
    queryFn
  };
};

export const useGetLatestArticle = () => {
  return useSuspenseQuery(getLatestArticle());
};
