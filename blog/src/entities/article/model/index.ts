import { ITEM_PER_PAGE } from "../config";
import { ARTICLE_QUERY_KEY, type ArticleStatus } from "./articleQueryKey";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery
} from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export * from "./getPolularArticleList";
export * from "./postArticleImage";
export * from "./postArticleThumbnail";
export * from "./postNewArticle";

export const getArticleList = (status: ArticleStatus) => {
  const queryKey = ARTICLE_QUERY_KEY.list_all(status);

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

export const getArticleListBySeries = (
  status: ArticleStatus,
  seriesName: string
) => {
  const queryKey = ARTICLE_QUERY_KEY.list_series(status, seriesName);

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
      .eq("series_name", seriesName)
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

export const getLatestArticle = () => {
  const queryKey = ARTICLE_QUERY_KEY.default("published");
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
