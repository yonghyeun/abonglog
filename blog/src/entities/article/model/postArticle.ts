import { ARTICLE_ENDPOINT } from "../config";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const ARTICLE_DATA_ERROR_MESSAGE = {
  title: "제목을 입력해주세요.",
  content: "내용을 입력해주세요.",
  seriesName: "시리즈 이름을 입력해주세요.",
  description: "설명을 입력해주세요.",
  thumbnailUrl: "썸네일을 추가해주세요",
  tags: "태그를 1개 이상 추가해주세요"
};

const ArticleDataSchema = z.object({
  articleData: z.object({
    id: z.number(),
    title: z.string().min(1, ARTICLE_DATA_ERROR_MESSAGE.title),
    content: z.string().min(1, ARTICLE_DATA_ERROR_MESSAGE.content),
    author: z.string(),
    seriesName: z.string().min(1, ARTICLE_DATA_ERROR_MESSAGE.seriesName),
    description: z.string().min(1, ARTICLE_DATA_ERROR_MESSAGE.description),
    status: z.enum(["draft", "published"]),
    thumbnailUrl: z.string({
      invalid_type_error: ARTICLE_DATA_ERROR_MESSAGE.thumbnailUrl
    }),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  tags: z.array(z.string()).min(1, ARTICLE_DATA_ERROR_MESSAGE.tags)
});

export type ArticleDataRequest = z.infer<typeof ArticleDataSchema>;

export const parseArticleData = (
  data: unknown
): E.Either<string, ArticleDataRequest> => {
  return pipe(ArticleDataSchema.safeParse(data), ({ success, data, error }) =>
    success ? E.right(data) : E.left(error.errors[0].message)
  );
};

interface UpsertArticleResponse {
  code: number;
  message: string;
  data: null;
}

export const usePostArticle = () => {
  return useMutation({
    mutationFn: async (body: ArticleDataRequest) => {
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
