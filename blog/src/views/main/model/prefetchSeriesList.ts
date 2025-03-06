import { QueryClient, dehydrate } from "@tanstack/react-query";

import { getSeriesList } from "@/entities/series/model";

export const prefetechSeriesList = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getSeriesList());

  return dehydrate(queryClient);
};
