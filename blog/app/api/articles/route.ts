import { deleteImages, getImageList } from "@backend/image/model";
import { NextRequest, NextResponse } from "next/server";

import { findImageUrl } from "@/features/article/lib/findImageUrl";

import type {
  PostNewArticleRequest,
  PostNewArticleResponse
} from "@/entities/article/model";

import { createServerSupabase } from "@/shared/model";
import { camelToSnake } from "@/shared/route";

const upsertNewArticle = (
  newArticle: Omit<PostNewArticleRequest, "tags">,
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  const currentTimeStamp = new Date().toISOString();

  return supabase.from("articles").upsert({
    ...camelToSnake(newArticle),
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  });
};

const deleteArticleTags = (
  articleId: PostNewArticleRequest["id"],
  supabsae: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  return supabsae.from("article_tags").delete().eq("article_id", articleId);
};

const insertArticleTag = (
  { id, tags }: Pick<PostNewArticleRequest, "tags" | "id">,
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
) => {
  return supabase.from("article_tags").insert(
    tags.map((tag) => ({
      tag_name: tag,
      article_id: id
    }))
  );
};

const deleteUnusedImages = async (articleId: number, content: string) => {
  const usedImages = findImageUrl(content)
    .map(({ src }) => src)
    .filter((src) => src.startsWith("/api/"))
    .map((url) => url.split("/").pop());

  const { data: storedImageList } = await getImageList(
    "article_image",
    `images/${articleId}`
  );

  if (!storedImageList) {
    return { error: null };
  }

  const unusedImages = storedImageList
    .map(({ name }) => name)
    .filter((name) => !usedImages.includes(name));

  if (unusedImages.length === 0) {
    return { error: null };
  }

  console.group(`🗑️ ${articleId} 저장 중 미사용 이미지 정리`);
  console.log(`📸 ${articleId}번 글에 사용된 이미지: ${usedImages.length}개`);
  console.log(
    `💾 ${articleId}번 글에 저장된 이미지: ${storedImageList.length}개`
  );

  const deleteUnusedImagesResponse = await deleteImages(
    "article_image",
    unusedImages.map((name) => `images/${articleId}/${name}`)
  );

  if (
    deleteUnusedImagesResponse.error &&
    deleteUnusedImagesResponse.error.message
  ) {
    console.error(`❌ 에러 발생: ${deleteUnusedImagesResponse.error.message}`);
  } else {
    console.log(
      `✅ ${articleId}번 글의 미사용 이미지 ${unusedImages.length}개 삭제 완료`
    );
  }
  console.groupEnd();

  return deleteUnusedImagesResponse;
};

const uploadArticle = async ({
  tags,
  ...articledata
}: PostNewArticleRequest) => {
  const supabase = await createServerSupabase();

  const [upsertNewArticleResponse, deleteArticleImagesResponse] =
    await Promise.all([
      upsertNewArticle(articledata, supabase),
      deleteUnusedImages(articledata.id, articledata.content)
    ]);

  const deleteArticleTagsResponse = await deleteArticleTags(
    articledata.id,
    supabase
  );

  const insertArticleTagResponse = await insertArticleTag(
    { id: articledata.id, tags },
    supabase
  );

  return [
    upsertNewArticleResponse,
    deleteArticleTagsResponse,
    insertArticleTagResponse,
    deleteArticleImagesResponse
  ];
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as PostNewArticleRequest;
  const response = await uploadArticle(data);

  const error = response.map(({ error }) => error).find((error) => error);

  if (error) {
    return NextResponse.json(
      {
        code: 500,
        message: error.message
      },
      {
        status: 500
      }
    );
  }

  return NextResponse.json<PostNewArticleResponse>({
    code: 200,
    message: "아티클이 성공적으로 저장 되었습니다",
    data: {
      type: data.status
    }
  });
};
