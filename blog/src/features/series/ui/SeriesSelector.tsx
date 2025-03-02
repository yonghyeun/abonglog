"use client";

import React from "react";

import type { Series } from "@/entities/series/model";

import { SearchIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";

interface SeriesSelectorProps {
  series: Series[];
  onEachSeriesClick: (series: Series) => void;
  onAddNewSeries: (seriesName: string) => void;
  className?: string;
}

export const SeriesSelector: React.FC<SeriesSelectorProps> = ({
  series,
  onEachSeriesClick,
  onAddNewSeries,
  className = ""
}) => {
  // 시리즈 검색어
  const [searchText, handleChangeSearchText] = useTransitionInput();
  const searchedSeries = series.filter(({ name }) => name.includes(searchText));
  // 시리즈 추가
  const [newSeriesName, handleChangeNewSeriesName] = useTransitionInput();
  const isAvailableNewSeries =
    newSeriesName.length > 0 &&
    series.every(({ name }) => name !== newSeriesName);

  return (
    <section
      className={`flex flex-col gap-4 rounded-lg border bg-primary p-4 ${className}`}
    >
      {/* Search Input */}
      <div className="flex items-center justify-start gap-2">
        <label htmlFor="search-series" aria-label="series 검색어로 찾기">
          <SearchIcon size={24} className="text-gray-300" />
        </label>
        <input
          id="search-series"
          className="flex-grow rounded-md bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
          placeholder="시리즈명을 입력해주세요"
          onChange={handleChangeSearchText}
        />
      </div>

      {/* Series List */}
      {series.length > 0 ? (
        <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto">
          {searchedSeries.map((series) => (
            <li
              key={series.name}
              className="flex cursor-pointer items-center justify-between text-sm text-gray-600 hover:text-sky-blue"
              onClick={() => onEachSeriesClick(series)}
            >
              {series.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center px-2 py-4 text-gray-400">
          현재 시리즈가 존재하지 않습니다.
        </div>
      )}

      {/* Series Add Form */}
      <form
        className="flex items-end justify-start gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          onAddNewSeries(newSeriesName);
        }}
      >
        <label htmlFor="create-series" className="sr-only">
          새로운 시리즈 추가하기
        </label>
        <input
          id="create-series"
          className="rounded-lg bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
          placeholder="새로운 시리즈명을 입력해주세요"
          name="series"
          onChange={handleChangeNewSeriesName}
        />
        <Button
          variant="outlined"
          size="sm"
          type="submit"
          disabled={!isAvailableNewSeries}
        >
          추가하기
        </Button>
      </form>
    </section>
  );
};
