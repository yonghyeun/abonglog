"use client";

import React from "react";

import type { Sereis } from "@/entities/series/model";

import { SearchIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Selector } from "@/shared/ui/Selector";

interface SereisSelectToggleProps {
  series: Sereis[];
  onEachSeriesClick: (series: Sereis) => void;
  onAddNewSeries: (seriesName: string) => void;
}

export const SeriesSelectToggle: React.FC<SereisSelectToggleProps> = ({
  series,
  onEachSeriesClick,
  onAddNewSeries
}) => {
  // 시리즈 검색어
  const [searchText, handleChangeSearchText] = useTransitionInput();
  const [newSeriesName, handleChangeNewSeriesName] = useTransitionInput();

  const isAvailableNewSeries =
    newSeriesName.length > 0 &&
    series.every(
      ({ name }) => name.toLowerCase() !== newSeriesName.toLowerCase()
    );

  const filterSeries = (seriesList: Sereis[]) =>
    seriesList.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <details className="cursor-pointer">
      <summary className="text-sm text-gray-400 hover:text-blue-700">
        시리즈 선택
      </summary>
      <Selector className="absolute left-0 top-12 z-50">
        <div className="flex items-center justify-start gap-2">
          <Selector.Label
            value={<SearchIcon size={24} />}
            htmlFor="search-series"
            aria-label="series 검색어로 찾기"
          />
          <Selector.Input
            id="search-series"
            placeholder="시리즈명을 입력해주세요"
            onChange={handleChangeSearchText}
          />
        </div>
        {/* Series List */}
        {series.length > 0 ? (
          <ol className="flex max-h-48 flex-col gap-2 overflow-y-auto">
            {filterSeries(series).map((series) => (
              <li
                key={series.name}
                className="flex cursor-pointer list-disc items-center justify-between text-sm text-gray-600 hover:text-blue-700"
                onClick={() => onEachSeriesClick(series)}
              >
                {series.name}
              </li>
            ))}
          </ol>
        ) : (
          <div className="flex items-center justify-center px-2 py-4 text-gray-400">
            현재 시리즈가 존재하지 않습니다.
          </div>
        )}

        <Selector.Form
          onSubmit={(event) => {
            event.preventDefault();
            onAddNewSeries(newSeriesName);
          }}
        >
          <Selector.Label className="sr-only" value="새로운 시리즈 추가하기" />
          <Selector.Input
            placeholder="새로운 시리즈명을 입력해주세요"
            onChange={handleChangeNewSeriesName}
          />
          <Selector.SubmitButton disabled={!isAvailableNewSeries}>
            시리즈 추가
          </Selector.SubmitButton>
        </Selector.Form>
      </Selector>
    </details>
  );
};
