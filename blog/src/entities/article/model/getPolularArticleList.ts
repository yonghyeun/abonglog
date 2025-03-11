import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { extractTagName } from "./utils";
import { useQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

const SELECT_POPULAR_ARTICLE_FIELDS = `
  id , title , author , 
  series_name , description , 
  status , updated_at, thumbnail_url,
  article_tags(tag_name)
`;

const NUMBER_OF_POPULAR_ARTICLE = 12;

// TODO : 추후 GA와 연동하여 인기글을 변경하도록 한다.
// 2025/03/07 현재 작업에선 단순히 전체 테이블에서 12개의 데이터만 슬라이싱 하여 사용하는거로 처리한다.
const fetchPopularArticleList = (_period: "daily" | "weekly" | "monthly") => {
  const supabase = createBrowserSupabase();

  return supabase
    .from("articles")
    .select(SELECT_POPULAR_ARTICLE_FIELDS)
    .limit(NUMBER_OF_POPULAR_ARTICLE)
    .eq("status", "published")
    .order("updated_at", { ascending: false });
};

export const getPopularArticleList = (
  period: "daily" | "weekly" | "monthly"
) => {
  const queryKey = ARTICLE_QUERY_KEY.popular(period);

  const queryFn = async () => {
    const { data, error } = await fetchPopularArticleList(period);
    if (error) {
      throw error;
    }

    return {
      articleList: snakeToCamel(data).map(({ articleTags, ...article }) => ({
        tags: extractTagName(articleTags),
        ...article
      }))
    };
  };

  return {
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 60 * 24
  };
};

export const useGetPopularArticleList = (
  period: "daily" | "weekly" | "monthly"
) => {
  return useQuery(getPopularArticleList(period));
};
