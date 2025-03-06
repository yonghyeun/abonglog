"use client";

import Link from "next/link";

import { useGetSeriesList } from "@/entities/series/model";
import { SeriesItem } from "@/entities/series/ui";

import { Grid } from "@/shared/ui/Grid";
import { HoverLink } from "@/shared/ui/HoverLink";

export const SeriesListWidget = () => {
  const { data: seriesList } = useGetSeriesList();

  return (
    <>
      <h1 className="mb-2">시리즈별로 보기</h1>
      <div className="flex justify-end">
        <Link href="/article" className="text-gray-500 hover:text-bright-blue">
          전체 게시글 보기
        </Link>
      </div>

      <Grid>
        {seriesList.map((data) => (
          <Grid.Item key={data.seriesName}>
            <HoverLink
              href={{
                pathname: "/article",
                search: `?series=${data.seriesName}`
              }}
            >
              <SeriesItem {...data} />
            </HoverLink>
          </Grid.Item>
        ))}
      </Grid>
    </>
  );
};
