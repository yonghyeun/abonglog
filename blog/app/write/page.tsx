import { ArticleWriteSlot } from "@/slots/write/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

import { getSeriesList } from "@/entities/series/model";
import { getTagList } from "@/entities/tag/model";

import { prefetchQueryInServer } from "@/shared/model";

const WritePage = async () => {
  const articleWriteState = await prefetchQueryInServer(
    getTagList,
    getSeriesList
  );

  return (
    <HydrationBoundary state={articleWriteState}>
      <Suspense fallback={"loading..."}>
        <ArticleWriteSlot />
      </Suspense>
    </HydrationBoundary>
  );
};

export default WritePage;
