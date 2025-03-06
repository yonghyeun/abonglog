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

export const ARTICLE_QUERY_KEY = {
  default: ["article"] as const,
  published: ["article", "published"] as const,
  draft: ["article", "draft"] as const,
  list_all: () => [...ARTICLE_QUERY_KEY.published, "all"] as const,
  list_series: (seriesName: string) =>
    [...ARTICLE_QUERY_KEY.published, seriesName] as const
};

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

export const postArticleImage = async (files: File[], articleId: number) => {
  const form = new FormData();
  form.append("id", articleId.toString());

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

interface PostArticleThumbnailData {
  file: File;
  articleId: number;
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

const postArticleThumbnail = async ({
  file,
  articleId
}: PostArticleThumbnailData) => {
  const compressedImage = await compressImage(file, {
    quantity: 2 ** 15
  });
  const formData = new FormData();
  formData.append("image", compressedImage);
  formData.append("articleId", articleId.toString());

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

export const usePostArticleThumbnail = () => {
  return useMutation({
    mutationFn: postArticleThumbnail
  });
};

/**
 * created_at , updated_at은 서버에서 자동으로 생성
 */
export interface PostNewArticleData {
  // articleId
  id: number;
  title: string;
  content: string;
  author: string;
  seriesName: string;
  description: string;
  tags: Tag[];
  status: "published" | "draft";
  thumbnailUrl: string | null;
}

export interface PostNewArticleResponse {
  status: number;
  message: string;
  data: {
    type: PostNewArticleData["status"];
  };
}

const postNewArticle = async (body: PostNewArticleData) => {
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

export const usePostNewArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postNewArticle,
    onSuccess: ({ data: { type } }) => {
      const queryKey =
        type === "published"
          ? ARTICLE_QUERY_KEY.published
          : ARTICLE_QUERY_KEY.draft;

      queryClient.invalidateQueries({
        queryKey
      });
    }
  });
};

export const getArticleList = () => {
  const queryKey = ARTICLE_QUERY_KEY.list_all();

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
      .eq("status", "published")
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

export const useGetInfiniteArticleList = (numOfTotalArticles: number) => {
  return useSuspenseInfiniteQuery({
    ...getArticleList(),
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

export const getArticleListBySeries = (seriesName: string) => {
  const queryKey = ARTICLE_QUERY_KEY.list_series(seriesName);

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
      .eq("status", "published")
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
  seriesName: string,
  numOfTotalArticles: number
) => {
  return useSuspenseInfiniteQuery({
    ...getArticleListBySeries(seriesName),
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
