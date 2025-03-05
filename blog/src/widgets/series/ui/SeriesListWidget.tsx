"use client";

import { useGetSeriesList } from "@/entities/series/model";
import { SeriesItem } from "@/entities/series/ui";

import { Grid } from "@/shared/ui/Grid";
import { HoverLink } from "@/shared/ui/HoverLink";

export const SeriesListWidget = () => {
  const { data: seriesList } = useGetSeriesList();

  return (
    <>
      <h1 className="mb-2">시리즈 목록 보기</h1>

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
