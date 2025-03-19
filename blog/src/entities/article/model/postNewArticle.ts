import { ARTICLE_ENDPOINT } from "../config";
import { ARTICLE_QUERY_KEY, type ArticleStatus } from "./articleQueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Tag } from "@/entities/tag/@x/article";

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
  tags: Tag["name"][];
  status: ArticleStatus;
  thumbnailUrl: string | null;
}

export interface PostNewArticleResponse {
  code: number;
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

    const { code, message, data } =
      (await response.json()) as PostNewArticleResponse;

    if (code > 200) {
      throw new Error(message);
    }
    return {
      code,
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
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({
        queryKey: ARTICLE_QUERY_KEY.default(status)
      });
    }
  });
};
