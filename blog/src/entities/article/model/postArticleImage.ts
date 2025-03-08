import { ARTICLE_ENDPOINT } from "../config";
import { useMutation } from "@tanstack/react-query";

export interface PostArticleImageRequest {
  files: File[];
  articleId: string;
}

export interface PostArticleImageResponse {
  code: number;
  message: string;
  data: {
    path: string;
    fullPath: string;
    id: string;
    imageUrl: string;
  }[];
}

// TODO useMarkdown 훅 리팩토링 할 때 수정하기
export const postArticleImage = async ({
  files,
  articleId
}: PostArticleImageRequest) => {
  const form = new FormData();

  form.append("articleId", articleId);

  files.forEach((file) => {
    form.append("image", file);
  });

  const response = await fetch(ARTICLE_ENDPOINT.POST_ARTICLE_IMAGE(), {
    method: "POST",
    body: form
  });

  const { data, message } = (await response.json()) as PostArticleImageResponse;

  if (!response.ok) {
    throw new Error(message);
  }

  return data;
};

export const usePostArticleImage = () => {
  return useMutation({
    mutationFn: postArticleImage
  });
};
