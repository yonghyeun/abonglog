import { ARTICLE_ENDPOINT } from "../config";
import { useMutation } from "@tanstack/react-query";

export interface DeleteArticleRequest {
  articleId: string;
  seriesName?: string;
}

const deleteArticle = async ({
  articleId,
  seriesName
}: DeleteArticleRequest) => {
  const response = await fetch(ARTICLE_ENDPOINT.DELETE_ARTICLE(), {
    method: "DELETE",
    body: JSON.stringify({ articleId, seriesName })
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: deleteArticle
  });
};
