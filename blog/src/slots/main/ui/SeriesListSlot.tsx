"use client";

import Link from "next/link";

import { useGetArticleMetaListPerSeries } from "@/entities/article/model";
import { SeriesItem } from "@/entities/series/ui";

import { Grid } from "@/shared/ui/Grid";

export const SeriesListSlot = () => {
  const { data: articleMetaInfoList } = useGetArticleMetaListPerSeries();

  return (
    <>
      <h1 className="mb-2">시리즈별로 보기</h1>
      <div className="flex justify-end">
        <Link
          href="/article/list/all"
          className="text-purple-700 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
        >
          전체 게시글 보기
        </Link>
      </div>

      <Grid>
        {Object.entries(articleMetaInfoList).map(
          ([seriesName, articleMetaList], index) => (
            <Grid.Item key={index}>
              <Link href={`/article/list/${seriesName}`}>
                <SeriesItem
                  seriesName={seriesName}
                  numOfArticles={articleMetaList.length}
                  createdAt={articleMetaList[0].createdAt}
                />
              </Link>
            </Grid.Item>
          )
        )}
      </Grid>
    </>
  );
};
