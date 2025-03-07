import { ARTICLE_ENDPOINT, ITEM_PER_PAGE } from "../config";
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";

import { compressImage } from "@/entities/image/lib";
import { Tag } from "@/entities/tag/@x/article";

import { createBrowserSupabase } from "@/shared/model";
import { snakeToCamel } from "@/shared/util";

export type ArticleStatus = "published" | "draft";

export const ARTICLE_QUERY_KEY = {
  default: (status: ArticleStatus) => ["article", status] as const,

  list_all: (status: ArticleStatus) =>
    [...ARTICLE_QUERY_KEY.default(status), "all"] as const,
  list_series: (status: ArticleStatus, seriesName: string) =>
    [...ARTICLE_QUERY_KEY.default(status), seriesName] as const
};

export interface PostArticleImageRequest {
  files: File[];
  articleId: string;
}

export interface PostArticleImageResponse {
  status: number;
  message: string;
  data: {
    path: string;
    fullPath: string;
    id: string;
    imageUrl: string;
  }[];
}

// TODO useMarkdown 훅 리팩토링 할 때 수정하기
export const postArticleImage = async ({
  files,
  articleId
}: PostArticleImageRequest) => {
  const form = new FormData();

  form.append("articleId", articleId);

  files.forEach((file) => {
    form.append("image", file);
  });

  const response = await fetch(ARTICLE_ENDPOINT.POST_ARTICLE_IMAGE(), {
    method: "POST",
    body: form
  });

  const { status, data, message } =
    (await response.json()) as PostArticleImageResponse;

  if (status > 200) {
    throw new Error(message);
  }

  return data;
};

export interface PostArticleThumbnailRequest {
  file: File;
  articleId: string;
}

export interface PostArticleThumbnailResponse {
  status: number;
  message: string;
  data: {
    path: string;
    fullPath: string;
    id: string;
    imageUrl: string;
  };
}

const postArticleThumbnail = () => {
  const mutationFn = async ({
    file,
    articleId
  }: PostArticleThumbnailRequest) => {
    const compressedImage = await compressImage(file, {
      quantity: 2 ** 15
    });

    const formData = new FormData();
    formData.append("image", compressedImage);
    formData.append("articleId", articleId);

    const response = await fetch(ARTICLE_ENDPOINT.POST_ARTICLE_THUMBNAIL(), {
      method: "POST",
      body: formData
    });

    const { status, data, message } =
      (await response.json()) as PostArticleThumbnailResponse;

    if (status > 200) {
      throw new Error(message);
    }

    return data;
  };

  return { mutationFn };
};

export const usePostArticleThumbnail = () => {
  return useMutation(postArticleThumbnail());
};

/**
 * created_at , updated_at은 서버에서 자동으로 생성
 */
export interface PostNewArticleRequest {
  // articleId
  id: number;
  title: string;
  content: string;
  author: string;
  seriesName: string;
  description: string;
  tags: Tag[];
  status: ArticleStatus;
  thumbnailUrl: string | null;
}

export interface PostNewArticleResponse {
  status: number;
  message: string;
  data: {
    type: PostNewArticleRequest["status"];
  };
}

const postNewArticle = () => {
  const mutationFn = async (body: PostNewArticleRequest) => {
    const response = await fetch(ARTICLE_ENDPOINT.POST_NEW_ARTICLE(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const { status, message, data } =
      (await response.json()) as PostNewArticleResponse;

    if (status > 200) {
      throw new Error(message);
    }
    return {
      status,
      message,
      data
    };
  };

  return { mutationFn };
};

export const usePostNewArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...postNewArticle(),
    onSuccess: ({ data: { type } }) => {
      const queryKey = ARTICLE_QUERY_KEY.default(type);
      queryClient.invalidateQueries({
        queryKey
      });
    }
  });
};

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
