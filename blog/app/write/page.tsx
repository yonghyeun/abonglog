import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import React, { Suspense } from "react";

import { ArticleWriteWidget } from "@/widgets/article/ui";

import { getTags, tagQueryKey } from "@/entities/tag/model";

const WritePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: tagQueryKey.default,
    queryFn: getTags
  });

  const randomArticleId = Math.floor(Math.random() * 10 ** 7).toString();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={"loading..."}>
        <ArticleWriteWidget articleId={randomArticleId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
