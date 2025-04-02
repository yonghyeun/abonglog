import { deleteUnusedImages, deleteUnusedThumbnail } from "./__model__";
import { deleteArticle } from "@backend/article/model";
import { upsertNewArticle } from "@backend/article/model/upsertNewArticle";
import { upsertArticleTags } from "@backend/image/model";
import {
  createErrorResponse,
  createSuccessResponse
} from "@backend/shared/lib";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { findImageUrl } from "@/features/article/lib";

import type {
  DeleteArticleRequest,
  PostNewArticleRequest
} from "@/entities/article/model";

const uploadArticleAction = async ({
  tags,
  ...articleData
}: PostNewArticleRequest) => {
  const responses = await Promise.all([
    // 아티클 삽입
    upsertNewArticle(articleData),
    // 사용하지 않은 이미지 제거
    deleteUnusedImages(
      articleData.id,
      findImageUrl(articleData.content).map(({ src }) => src)
    ),
    // 사용하지 않은 썸네일 제거
    deleteUnusedThumbnail(articleData.id, articleData.thumbnailUrl),
    // 아티클 태그 삽입
    upsertArticleTags(articleData.id, tags)
  ]);

  const error = responses.find((response) => response._tag === "left");
  return error ? E.left(error.value) : E.right({ type: articleData.status });
};

const revalidateArticlePath = (data: PostNewArticleRequest) => () => {
  revalidatePath("/");
  revalidatePath(`/article/list/all`);
  revalidatePath(`/article/${data.id}`);
  if (data.seriesName) {
    revalidatePath(`/article/list/${encodeURI(data.seriesName)}`);
  }
};

const MESSAGE = {
  POST_ARTICLE_SUCCESS: "아티클이 성공적으로 저장 되었습니다"
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as PostNewArticleRequest;
  const response = await uploadArticleAction(data);

  return pipe(
    response,
    E.matchRight(revalidateArticlePath(data)),
    E.fold(
      createErrorResponse,
      createSuccessResponse(MESSAGE.POST_ARTICLE_SUCCESS)
    )
  );
};

export const DELETE = async (req: NextRequest) => {
  const { articleId, seriesName } = (await req.json()) as DeleteArticleRequest;

  const error = await deleteArticle(articleId);

  if (error) {
    return createErrorResponse(error);
  }

  revalidatePath("/");
  revalidatePath(`/article/list/all`);
  revalidatePath(`/article/${articleId}`);
  if (seriesName) {
    revalidatePath(`/article/list/${encodeURI(seriesName)}`);
  }

  return NextResponse.json({
    code: 200,
    message: "게시글이 성공적으로 삭제되었습니다."
  });
};
