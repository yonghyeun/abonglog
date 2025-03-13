import { ARTICLE_ENDPOINT } from "../config";
import { useMutation } from "@tanstack/react-query";

const deleteArticle = async (articleId: string) => {
  const response = await fetch(ARTICLE_ENDPOINT.DELETE_ARTICLE(articleId), {
    method: "DELETE"
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
