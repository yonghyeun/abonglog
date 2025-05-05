import { ITEM_PER_PAGE } from "../config";
import { ARTICLE_QUERY_KEY, type ArticleStatus } from "./articleQueryKey";
import { extractTagName } from "./utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";
import { snakeToCamel } from "@/shared/util";

const SELECT_ARTICLE_LIST_BY_SERIES_FILED = `
  id , title , author , 
  series_name , description , 
  status , created_at, thumbnail_url,
  article_tags(tag_name)
`;

const fetchArticleListBySeries = (
  status: ArticleStatus,
  seriesName: string,
  pageParam: number
) => {
  const supabase = createBrowserSupabase();

  return supabase
    .from("articles")
    .select(SELECT_ARTICLE_LIST_BY_SERIES_FILED)
    .eq("series_name", seriesName)
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(pageParam * ITEM_PER_PAGE, (pageParam + 1) * ITEM_PER_PAGE - 1);
};

export const getArticleListBySeries = (
  status: ArticleStatus,
  seriesName: string
) => {
  const queryKey = ARTICLE_QUERY_KEY.listSeries(status, seriesName);

  const queryFn = async ({ pageParam = 0 }) => {
    const { data, error } = await fetchArticleListBySeries(
      status,
      seriesName,
      pageParam
    );

    if (error) {
      throw error;
    }

    return {
      data: snakeToCamel(data).map(({ articleTags, ...article }) => ({
        tags: extractTagName(articleTags),
        ...article
      })),
      currentPage: pageParam
    };
  };

  return {
    queryKey,
    queryFn,
    initialPageParam: 0
  };
};

export const useGetInfiniteArticleListBySeries = (
  status: ArticleStatus,
  seriesName: string,
  numOfTotalArticles: number
) => {
  return useSuspenseInfiniteQuery({
    ...getArticleListBySeries(status, seriesName),
    getNextPageParam: ({ currentPage }) =>
      (currentPage + 1) * ITEM_PER_PAGE - 1 < numOfTotalArticles
        ? currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
    select: ({ pages, pageParams }) => ({
      pageParams,
      pages: pages.flatMap((page) => page.data)
    })
  });
};
