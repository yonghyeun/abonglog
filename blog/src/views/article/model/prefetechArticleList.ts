import { QueryClient, dehydrate } from "@tanstack/react-query";

import {
  getArticleList,
  getArticleListBySeries
} from "@/entities/article/model";

export const prefetechArticleList = async (seriesName?: string) => {
  const queryClient = new QueryClient();

  if (seriesName !== undefined) {
    await queryClient.prefetchInfiniteQuery(getArticleListBySeries(seriesName));
  } else {
    await queryClient.prefetchInfiniteQuery(getArticleList());
  }

  return dehydrate(queryClient);
};
