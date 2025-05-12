import { deleteUnusedImages, deleteUnusedThumbnail } from "./__model__";
import {
  camelToSnake,
  createErrorResponse,
  createSuccessResponse
} from "@backend/shared/lib";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

import { findImageUrl } from "@/features/article/lib";

import type {
  ArticleDataRequest,
  DeleteArticleRequest,
  TempArticleDataRequest
} from "@/entities/article/model";

import { createServerSupabase } from "@/shared/lib";

type ArticleData = TempArticleDataRequest | ArticleDataRequest;

const upsertArticleAction = async ({ articleData, tags }: ArticleData) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.rpc("upsertarticle", {
    article_data: camelToSnake(articleData),
    tags
  });

  if (error) {
    console.error("Error upserting article:", error);

    return E.left(error);
  }

  const unusedImages = findImageUrl(articleData.content).map(({ src }) => src);

  // TODO 현재 Either 의 타입 시그니처가 올바르지 않아 분기문을 사용하고 있음
  // 추후 Either 의 타입 시그니처가 올바르게 변경되면 분기문을 제거할 수 있음
  await Promise.all([
    deleteUnusedImages(articleData.id, unusedImages).then((response) => {
      if (E.isLeft(response)) {
        console.error(
          `🤖 upsertArticle - ${articleData.id} 에서 사용하지 않은 이미지 삭제 중 오류:`,
          response.value
        );
      } else {
        console.log(
          `🤖 upsertArticle - ${articleData.id} 에서 사용하지 않은 이미지 ${response.value.length}개 삭제 완료`
        );
      }
    }),
    deleteUnusedThumbnail(articleData.id, articleData.thumbnailUrl).then(
      (response) => {
        if (E.isLeft(response)) {
          console.error(
            `🤖 upsertArticle - ${articleData.id} 에서 사용하지 않은 썸네일 삭제 중 오류:`,
            response.value
          );
        } else {
          console.log(
            `🤖 upsertArticle - ${articleData.id} 에서 사용하지 않은 썸네일 ${response.value.length}개 삭제 완료`
          );
        }
      }
    )
  ]);

  return E.right(null);
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
  const { articleData, tags } = (await req.json()) as ArticleData;

  return pipe(
    upsertArticleAction({ articleData, tags }),
    E.tapRight(revalidateArticlePath(articleData.id, articleData.seriesName)),
    E.fold(
      createErrorResponse,
      createSuccessResponse(MESSAGE.POST_ARTICLE_SUCCESS)
    )
  );
};

const deleteArticleAction = async (articleId: number) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.rpc("delete_article", {
    delete_article_id: articleId
  });

  if (error) {
    console.error("Error deleting article:", error);

    return E.left(error);
  }

  // TODO 현재 Either 의 타입 시그니처가 올바르지 않아 분기문을 사용하고 있음
  // 추후 Either 의 타입 시그니처가 올바르게 변경되면 분기문을 제거할 수 있음
  await Promise.all([
    deleteUnusedImages(articleId, []).then((response) => {
      if (E.isLeft(response)) {
        console.error(
          `🤖 deleteArticle - ${articleId} 에서 사용하지 않은 이미지 삭제 중 오류:`,
          response.value
        );
      } else {
        console.log(
          `🤖 deleteArticle - ${articleId} 에서 사용하지 않은 이미지 ${response.value.length}개 삭제 완료`
        );
      }
    }),
    deleteUnusedThumbnail(articleId, null).then((response) => {
      if (E.isLeft(response)) {
        console.error(
          `🤖 deleteArticle - ${articleId} 에서 사용하지 않은 썸네일 삭제 중 오류:`,
          response.value
        );
      } else {
        console.log(
          `🤖 deleteArticle - ${articleId} 에서 사용하지 않은 썸네일 ${response.value.length}개 삭제 완료`
        );
      }
    })
  ]);

  return E.right(null);
};

export const DELETE = async (req: NextRequest) => {
  const { articleId, seriesName } = (await req.json()) as DeleteArticleRequest;

  return pipe(
    deleteArticleAction(articleId),
    E.tapRight(revalidateArticlePath(articleId, seriesName)),
    E.fold(
      createErrorResponse,
      createSuccessResponse(MESSAGE.DELETE_ARTICLE_SUCCESS)
    )
  );
};
