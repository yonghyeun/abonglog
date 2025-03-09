import { ARTICLE_ENDPOINT } from "../config";
import { ARTICLE_QUERY_KEY } from "./articleQueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteArticleResponse {
  code: number;
  message: string;
  data: {
    type: "published" | "draft";
  };
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ARTICLE_QUERY_KEY.default(data.type)
      });
    }
  });
};
