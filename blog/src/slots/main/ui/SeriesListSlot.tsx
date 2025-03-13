"use client";

import Link from "next/link";

import { useGetArticleInfoPerSeries } from "@/entities/article/model";
import { SeriesItem } from "@/entities/series/ui";

import { Grid } from "@/shared/ui/Grid";

export const SeriesListSlot = () => {
  const { data: articleInfoList } = useGetArticleInfoPerSeries();

  return (
    <>
      <h1 className="mb-2">시리즈별로 보기</h1>
      <div className="flex justify-end">
        <Link href="/article" className="text-secondary hover:text-blue-500">
          전체 게시글 보기
        </Link>
      </div>

      <Grid>
        {articleInfoList.map((data) => (
          <Grid.Item key={data.seriesName}>
            <Link
              href={{
                pathname: "/article",
                search: `?series=${data.seriesName}`
              }}
            >
              <SeriesItem {...data} />
            </Link>
          </Grid.Item>
        ))}
      </Grid>
    </>
  );
};
