import { type NextRequest, NextResponse } from "next/server";

import type {
  PostArticleImageRequest,
  PostArticleImageResponse
} from "@/entities/article/model";

import { createServerSupabase } from "@/shared/model";
import { attachIamgeUrl, createImageConfig } from "@/shared/route";

const ARTICLE_IMAGE_STORAGE_NAME = "article_image";

const uploadImageAction = async ({
  file,
  articleId
}: {
  file: File;
  articleId: string;
}) => {
  const supabase = await createServerSupabase();

  const { imageName } = createImageConfig(file);

  const response = await supabase.storage
    .from(ARTICLE_IMAGE_STORAGE_NAME)
    .upload(`public/${articleId}/${imageName}`, file);

  return response;
};

/**
 * TODO : 이미지 업로드에 실패한 URL 만 response 로 보내서 에러 처리하기
 */
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const images = formData.getAll("image") as PostArticleImageRequest["files"];
  const articleId = formData.get(
    "articleId"
  ) as PostArticleImageRequest["articleId"];

  const responseArray = await Promise.all(
    images.map((file) => uploadImageAction({ file, articleId }))
  );

  const errorResponse = responseArray.find((response) => !!response.error);

  if (errorResponse) {
    return NextResponse.json(
      {
        code: 500,
        message: errorResponse.error.message
      },
      {
        status: 500,
        statusText: errorResponse.error.message
      }
    );
  }

  const successResponses = responseArray.filter((response) => !!response.data);

  return NextResponse.json<PostArticleImageResponse>({
    code: 200,
    message: "이미지 업로드에 성공했습니다.",
    data: successResponses.map(({ data }) => attachIamgeUrl(data))
  });
};
