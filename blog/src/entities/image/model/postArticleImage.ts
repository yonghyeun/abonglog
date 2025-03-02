interface PostArticleImageResponse {
  status: number;
  message: string;
  data: {
    url: string;
    fullPath: string;
    id: string;
  };
}

export const postArticleImage = async (file: File, articleId: string) => {
  const form = new FormData();
  form.append("id", articleId);
  form.append("image", file);

  const response = await fetch("/api/article/image", {
    method: "POST",
    body: form
  });

  const data = await response.json();

  if (data.status > 200) {
    throw new Error(data.message);
  }

  return data as PostArticleImageResponse;
};
