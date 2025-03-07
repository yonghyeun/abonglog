import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import React, { Suspense } from "react";

import { ArticleWritePage } from "@/views/write/ui";

import { getSeriesList } from "@/entities/series/model";
import { TAG_QUERY_KEY, getTags } from "@/entities/tag/model";

const WritePage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: TAG_QUERY_KEY.default(),
      queryFn: getTags
    }),
    queryClient.prefetchQuery(getSeriesList())
  ]);

  // TODO ISR 시 아티클 아이디 생성하기
  const randomArticleId = Math.floor(Math.random() * 10 ** 7);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={"loading..."}>
        <ArticleWritePage articleId={randomArticleId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
