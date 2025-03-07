import { QueryClient, dehydrate } from "@tanstack/react-query";

import { getSeriesArticleList } from "@/entities/series/model";

export const prefetechSeriesList = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getSeriesArticleList());

  return dehydrate(queryClient);
};
