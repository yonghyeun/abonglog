"use client";

import Link from "next/link";

import { useGetSeriesArticleList } from "@/entities/series/model";
import { SeriesItem } from "@/entities/series/ui";

import { Grid } from "@/shared/ui/Grid";

export const SeriesListView = () => {
  const { data: seriesList } = useGetSeriesArticleList();

  return (
    <>
      <h1 className="mb-2">시리즈별로 보기</h1>
      <div className="flex justify-end">
        <Link href="/article" className="text-gray-500 hover:text-blue-900">
          전체 게시글 보기
        </Link>
      </div>

      <Grid>
        {seriesList.map((data, idx) => (
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
