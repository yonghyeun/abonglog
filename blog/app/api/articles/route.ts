import { deleteUnusedImages, deleteUnusedThumbnail } from "./__model__";
import {
  deleteArticleTags,
  removeArticle,
  upsertArticle
} from "@backend/article/model";
import { upsertArticleTags } from "@backend/image/model";
import {
  createErrorResponse,
  createSuccessResponse
} from "@backend/shared/lib";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

import { findImageUrl } from "@/features/article/lib";

import type {
  DeleteArticleRequest,
  PostNewArticleRequest
} from "@/entities/article/model";

const postArticleAction = async ({
  tags,
  ...articleData
}: PostNewArticleRequest) => {
  const usedImages = findImageUrl(articleData.content).map(({ src }) => src);

  const responses = await Promise.all([
    upsertArticle(articleData),
    deleteUnusedImages(articleData.id, usedImages),
    deleteUnusedThumbnail(articleData.id, articleData.thumbnailUrl),
    upsertArticleTags(articleData.id, tags)
  ]);

  const error = responses.find((response) => response._tag === "left");

  return error ? E.left(error.value) : E.right({ type: articleData.status });
};

const revalidateArticlePath =
  (articleId: number, seriesName?: string) => () => {
    revalidatePath("/");
    revalidatePath(`/article/list/all`);
    revalidatePath(`/article/${articleId}`);
    if (seriesName) {
      revalidatePath(`/article/list/${encodeURI(seriesName)}`);
    }
  };

const MESSAGE = {
  POST_ARTICLE_SUCCESS: "아티클이 성공적으로 저장 되었습니다",
  DELETE_ARTICLE_SUCCESS: "아티클이 성공적으로 삭제 되었습니다"
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as PostNewArticleRequest;

  return pipe(
    postArticleAction(data),
    E.matchRight(revalidateArticlePath(data.id, data.seriesName)),
    E.fold(
      createErrorResponse,
      createSuccessResponse(MESSAGE.POST_ARTICLE_SUCCESS)
    )
  );
};

const deleteArticleAction = async (articleId: number) => {
  const response = await Promise.all([
    removeArticle(articleId),
    deleteArticleTags(articleId),
    deleteUnusedImages(articleId, []),
    deleteUnusedThumbnail(articleId, null)
  ]);

  const error = response.find((response) => response._tag === "left");

  return error ? E.left(error.value) : E.right(null);
};

export const DELETE = async (req: NextRequest) => {
  const { articleId, seriesName } = (await req.json()) as DeleteArticleRequest;

  return pipe(
    deleteArticleAction(Number(articleId)),
    E.matchRight(revalidateArticlePath(Number(articleId), seriesName)),
    E.fold(
      createErrorResponse,
      createSuccessResponse(MESSAGE.DELETE_ARTICLE_SUCCESS)
    )
  );
};
