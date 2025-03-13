import { ARTICLE_ENDPOINT } from "../config";
import { useMutation } from "@tanstack/react-query";

import { compressImage } from "@/entities/image/lib";

export interface PostArticleThumbnailRequest {
  file: File;
  articleId: string;
}

export interface PostArticleThumbnailResponse {
  code: number;
  message: string;
  data: {
    path: string;
    fullPath: string;
    id: string;
    imageUrl: string;
  };
}

const postArticleThumbnail = () => {
  const mutationFn = async ({
    file,
    articleId
  }: PostArticleThumbnailRequest) => {
    const compressedImage = await compressImage(file, {
      quantity: 2 ** 15
    });

    const formData = new FormData();
    formData.append("image", compressedImage);
    formData.append("articleId", articleId);

    const response = await fetch(ARTICLE_ENDPOINT.POST_ARTICLE_THUMBNAIL(), {
      method: "POST",
      body: formData
    });

    const { data, message } =
      (await response.json()) as PostArticleThumbnailResponse;

    if (!response.ok) {
      throw new Error(message);
    }

    return data;
  };

  return { mutationFn };
};

export const usePostArticleThumbnail = () => {
  return useMutation(postArticleThumbnail());
};
