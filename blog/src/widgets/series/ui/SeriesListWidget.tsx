"use client";

import { useGetSeriesList } from "@/entities/series/model";
import { SeriesItem } from "@/entities/series/ui";

import { HoverLink } from "@/shared/ui/HoverLink";

export const SeriesListWidget = () => {
  const { data: seriesList } = useGetSeriesList();

  return (
    <>
      <h1 className="mb-2">시리즈 목록 보기</h1>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {seriesList.map((data) => (
          <HoverLink
            href={{
              pathname: "/article",
              search: `?series=${data.seriesName}`
            }}
            key={data.seriesName}
          >
            <SeriesItem {...data} />
          </HoverLink>
        ))}
      </section>
    </>
  );
};
