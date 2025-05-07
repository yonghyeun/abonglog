import { ARTICLE_ENDPOINT } from "../config";
import { ArticleStatus } from "./articleQueryKey";
import { useMutation } from "@tanstack/react-query";

import { Tag } from "@/entities/tag/model";

export interface UpsertArticleRequest {
  articleData: {
    id: number;
    title: string;
    content: string;
    author: string;
    seriesName: string;
    description: string;
    tags: Tag["name"][];
    status: ArticleStatus;
    thumbnailUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
  tags: string[];
}

export interface UpsertArticleResponse {
  code: number;
  message: string;
  data: null;
}

export const useUpsertArticle = () => {
  return useMutation({
    mutationFn: async (body: UpsertArticleRequest) => {
      const response = await fetch(ARTICLE_ENDPOINT.UPSERT_ARTICLE(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("게시글 저장에 실패했습니다.");
      }
      const data = (await response.json()) as UpsertArticleResponse;

      return data;
    }
  });
};
