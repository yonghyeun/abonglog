import { ARTICLE_ENDPOINT } from "../config";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { compressImage } from "@/entities/image/lib";
import { Tag } from "@/entities/tag/@x/article";

import { createBrowserSupabase } from "@/shared/model";

const ARTICLE_QUERY_KEY = {
  default: ["article"]
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
}

interface PostNewArticleResponse {
  status: number;
  message: string;
}

const postNewArticle = async (body: PostNewArticleData) => {
  const response = await fetch(ARTICLE_ENDPOINT.POST_NEW_ARTICLE(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const { status, message } = (await response.json()) as PostNewArticleResponse;

  if (status > 200) {
    throw new Error(message);
  }
  return {
    status,
    message
  };
};

export const usePostNewArticle = () => {
  return useMutation({
    mutationFn: postNewArticle
  });
};

interface GetArticleListParams {
  series: string;
}

export const getArticleList = async ({ pageParam }: { pageParam: number }) => {
  const supabase = createBrowserSupabase();

  const data = await supabase
    .from("articles")
    .select("*")
    .range(pageParam, pageParam + 10);
};

export const useGetArticleList = () => {
  return useInfiniteQuery({
    queryKey: ARTICLE_QUERY_KEY.default,
    queryFn: getArticleList,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24
  });
};
