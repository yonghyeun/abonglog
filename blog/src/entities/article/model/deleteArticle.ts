import { ARTICLE_ENDPOINT } from "../config";
import { useMutation } from "@tanstack/react-query";

export interface DeleteArticleResponse {
  code: number;
  message: string;
}

const deleteArticle = async (articleId: string) => {
  const response = await fetch(ARTICLE_ENDPOINT.DELETE_ARTICLE(articleId), {
    method: "DELETE"
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data = (await response.json()) as DeleteArticleResponse;
  return data;
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: deleteArticle
  });
};
