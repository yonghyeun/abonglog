import { QueryClient, dehydrate } from "@tanstack/react-query";

import {
  getArticleList,
  getArticleListBySeries
} from "@/entities/article/model";
import type { ArticleStatus } from "@/entities/article/model";

export const prefetchArticleList = async (
  status: ArticleStatus,
  seriesName?: string
) => {
  const queryClient = new QueryClient();

  if (seriesName !== undefined) {
    await queryClient.prefetchInfiniteQuery(
      getArticleListBySeries(status, seriesName)
    );
  } else {
    await queryClient.prefetchInfiniteQuery(getArticleList(status));
  }

  return dehydrate(queryClient);
};
