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
