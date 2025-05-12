import { ARTICLE_ENDPOINT } from "../config";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const TempArticleDataSchema = z.object({
  articleData: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    author: z.string(),
    seriesName: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published"]),
    thumbnailUrl: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  tags: z.array(z.string())
});

export type TempArticleDataRequest = z.infer<typeof TempArticleDataSchema>;

export const parseTempArticleData = (
  data: unknown
): E.Either<string, TempArticleDataRequest> => {
  return pipe(
    TempArticleDataSchema.safeParse(data),
    ({ success, data, error }) =>
      success ? E.right(data) : E.left(error.errors[0].message)
  );
};

export type TempArticleData = z.infer<typeof TempArticleDataSchema>;

interface UpsertArticleResponse {
  code: number;
  message: string;
  data: null;
}

export const usePostTempArticle = () => {
  return useMutation({
    mutationFn: async (body: TempArticleData) => {
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
