import { ITEM_PER_PAGE } from "../config";
import { ARTICLE_QUERY_KEY, type ArticleStatus } from "./articleQueryKey";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export const getArticleList = (status: ArticleStatus) => {
  const queryKey = ARTICLE_QUERY_KEY.listAll(status);

  const queryFn = async ({ pageParam = 0 }) => {
    const supabase = await createBrowserSupabase();

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
      .eq("status", status)
      .order("updated_at", { ascending: false })
      .range(pageParam * ITEM_PER_PAGE, (pageParam + 1) * ITEM_PER_PAGE - 1)
      .then(snakeToCamel);

    if (error) {
      throw error;
    }

    return {
      data: data.map(({ articleTags, ...article }) => ({
        tags: articleTags.map(({ tagName }) => tagName!),
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

export const useGetInfiniteArticleList = (
  status: ArticleStatus,
  numOfTotalArticles: number
) => {
  return useSuspenseInfiniteQuery({
    ...getArticleList(status),
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
