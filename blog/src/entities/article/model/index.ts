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

export const postArticleImage = async (files: File[], articleId: string) => {
  const form = new FormData();
  form.append("id", articleId);

  files.forEach((file) => {
    form.append("image", file);
  });

  const response = await fetch("/api/article/image", {
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
  articleId: string;
}) => {
  const compressedImage = await compressImage(file, {
    quantity: 2 ** 15
  });
  const formData = new FormData();
  formData.append("image", compressedImage);

  const response = await fetch(`/api/article/thumbnail/${articleId}`, {
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
