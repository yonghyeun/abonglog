import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { extractTagName } from "./utils";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";
import { snakeToCamel } from "@/shared/util";

const ARTICLE_SELECT_FIELDS = `
  id, title, author, 
  series_name, description, 
  status, created_at, thumbnail_url,
  article_tags(tag_name)
`;

const fetchLatestArticle = () => {
  const supabase = createBrowserSupabase();

  return supabase
    .from("articles")
    .select(ARTICLE_SELECT_FIELDS)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
};

export const getLatestArticle = () => {
  const queryKey = ARTICLE_QUERY_KEY.latestArticle();

  const queryFn = async () => {
    const { data, error } = await fetchLatestArticle();

    if (error) {
      throw error;
    }

    const { articleTags, ...articleData } = snakeToCamel(data);

    return {
      tags: extractTagName(articleTags),
      ...articleData
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
