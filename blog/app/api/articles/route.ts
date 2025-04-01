import { deleteUnusedImages, deleteUnusedThumbnail } from "./__model__";
import { deleteArticle } from "@backend/article/model";
import { upsertNewArticle } from "@backend/article/model/upsertNewArticle";
import { upsertArticleTags } from "@backend/image/model";
import { createErrorResponse } from "@backend/shared/lib";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { findImageUrl } from "@/features/article/lib";

import type {
  DeleteArticleRequest,
  PostNewArticleRequest,
  PostNewArticleResponse
} from "@/entities/article/model";

const uploadArticle = async ({
  tags,
  ...articleData
}: PostNewArticleRequest) => {
  const { id } = articleData;

  const upsertArticleResponse = await Promise.all([
    // 아티클 삽입
    upsertNewArticle(articleData),
    // 사용하지 않은 이미지 제거
    deleteUnusedImages(
      id,
      findImageUrl(articleData.content).map(({ src }) => src)
    ),
    // 사용하지 않은 썸네일 제거
    deleteUnusedThumbnail(id, articleData.thumbnailUrl),
    // 아티클 태그 삽입
    upsertArticleTags(id, tags)
  ]);

  return [...upsertArticleResponse];
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as PostNewArticleRequest;
  const uploadArticleEithers = await uploadArticle(data);

  const error = uploadArticleEithers.find((either) => either._tag === "left");

  if (error) {
    return createErrorResponse(error.value);
  }

  revalidatePath("/");
  if (data.status === "published") {
    revalidatePath("/article/list/all");
    revalidatePath(`/article/${encodeURI(data.seriesName)}`);
    revalidatePath(`/article/${data.id}`);
  }

  return NextResponse.json<PostNewArticleResponse>({
    code: 200,
    message: "아티클이 성공적으로 저장 되었습니다",
    data: {
      type: data.status
    }
  });
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
