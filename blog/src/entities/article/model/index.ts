import { ARTICLE_ENDPOINT } from "../config";
import { useMutation } from "@tanstack/react-query";

import { compressImage } from "@/entities/image/lib";

export interface PostArticleImageResponse {
  status: number;
  message: string;
  data: {
    path: string;
    fullPath: string;
    id: string;
    imageUrl: string;
  }[];
}

export const postArticleImage = async (files: File[], articleId: number) => {
  const form = new FormData();
  form.append("id", articleId.toString());

  files.forEach((file) => {
    form.append("image", file);
  });

  const response = await fetch(ARTICLE_ENDPOINT.POST_ARTICLE_IMAGE(), {
    method: "POST",
    body: form
  });

  const { status, data, message } =
    (await response.json()) as PostArticleImageResponse;

  if (status > 200) {
    throw new Error(message);
  }

  return data;
};

export interface PostArticleThumbnailResponse {
  status: number;
  message: string;
  data: {
    path: string;
    fullPath: string;
    id: string;
    imageUrl: string;
  };
}

const postArticleThumbnail = async ({
  file,
  articleId
}: {
  file: File;
  articleId: number;
}) => {
  const compressedImage = await compressImage(file, {
    quantity: 2 ** 15
  });
  const formData = new FormData();
  formData.append("image", compressedImage);
  formData.append("articleId", articleId.toString());

  const response = await fetch(ARTICLE_ENDPOINT.POST_ARTICLE_THUMBNAIL(), {
    method: "POST",
    body: formData
  });

  const { status, data, message } =
    (await response.json()) as PostArticleThumbnailResponse;

  if (status > 200) {
    throw new Error(message);
  }

  return data;
};

export const usePostArticleThumbnail = () => {
  return useMutation({
    mutationFn: postArticleThumbnail
  });
};

/**
 * created_at , updated_at은 서버에서 자동으로 생성
 */
export interface PostNewArticleBody {
  // articleId
  id: number;
  title: string;
  content: string;
  author: string;
  seriesName: string;
  description: string;
}
