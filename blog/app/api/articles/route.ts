import { deleteArticle } from "@backend/article/model";
import { deleteImages, getImageList } from "@backend/image/model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { findImageUrl } from "@/features/article/lib/findImageUrl";

import type {
  DeleteArticleRequest,
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
    .map((url) => url.split("/").pop())
    .filter((fileName) => fileName !== undefined);

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

  const deleteUnusedImagesResponse = await deleteImages(
    "article_image",
    unusedImages.map((name) => `images/${articleId}/${name}`)
  );

  return deleteUnusedImagesResponse;
};

const deleteUnusedThumbnail = async (
  articleId: number,
  thumbnailUrl: string
) => {
  const { data: storedImageList } = await getImageList(
    "article_thumbnail",
    `thumbnails/${articleId}`
  );

  if (!storedImageList) {
    return { error: null };
  }

  const thumbnailImageName = thumbnailUrl.split("/").pop();
  const unusedThumbnails = storedImageList
    .map(({ name }) => name)
    .filter((name) => name !== thumbnailImageName);

  if (unusedThumbnails.length === 0) {
    return { error: null };
  }

  const deleteUnusedThumbnailResponse = await deleteImages(
    "article_thumbnail",
    unusedThumbnails.map((name) => `thumbnails/${articleId}/${name}`)
  );

  return deleteUnusedThumbnailResponse;
};

const uploadArticle = async ({
  tags,
  ...articleData
}: PostNewArticleRequest) => {
  const supabase = await createServerSupabase();

  const upsertArticleResponse = await Promise.all([
    upsertNewArticle(articleData, supabase),
    deleteUnusedImages(articleData.id, articleData.content),
    articleData.thumbnailUrl
      ? deleteUnusedThumbnail(articleData.id, articleData.thumbnailUrl)
      : { error: null }
  ]);

  const deleteArticleTagsResponse = await deleteArticleTags(
    articleData.id,
    supabase
  );

  const insertArticleTagResponse = await insertArticleTag(
    { id: articleData.id, tags },
    supabase
  );

  return [
    deleteArticleTagsResponse,
    insertArticleTagResponse,
    ...upsertArticleResponse
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

  revalidatePath("/");
  if (data.status === "published") {
    revalidatePath("/article/list/all");
    revalidatePath(`/article/${data.seriesName}`);
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

  revalidatePath("/");
  revalidatePath(`/article/list/all`);
  if (seriesName) {
    revalidatePath(`/article/list/${seriesName}`);
  }

  return error
    ? NextResponse.json(
        {
          code: 500,
          message: error.message
        },
        {
          status: 500
        }
      )
    : NextResponse.json({
        code: 200,
        message: "게시글이 성공적으로 삭제되었습니다."
      });
};
