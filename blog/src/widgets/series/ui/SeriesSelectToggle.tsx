import { useSeriesSelectToggle } from "../lib";

import { type Series, usePostAddNewSeries } from "@/entities/series/model";

import { SearchIcon } from "@/shared/config";
import { Selector } from "@/shared/ui/Selector";

interface SeriesSelectToggleProps {
  seriesList: Series[];
  onEachSeriesClick: (series: Series) => void;
}

export const SeriesSelectToggle: React.FC<SeriesSelectToggleProps> = ({
  seriesList,
  onEachSeriesClick
}) => {
  const {
    newSeriesName,
    handleChangeNewSeriesName,
    handleChangeSearchText,
    isAvailableNewSeries,
    searchSeries
  } = useSeriesSelectToggle();

  const { mutate: onAddNewSeries } = usePostAddNewSeries();
  const searchedSeries = searchSeries(seriesList);

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
        {searchedSeries.length > 0 ? (
          <ol className="flex max-h-48 flex-col gap-2 overflow-y-auto">
            {searchedSeries.map((series) => (
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
            현재 사용 가능한 시리즈가 존재하지 않습니다.
          </div>
        )}

        <Selector.Form
          onSubmit={(event) => {
            event.preventDefault();
            onAddNewSeries({
              name: newSeriesName
            });
          }}
        >
          <Selector.Label className="sr-only" value="새로운 시리즈 추가하기" />
          <Selector.Input
            placeholder="새로운 시리즈명을 입력해주세요"
            onChange={handleChangeNewSeriesName}
          />
          <Selector.SubmitButton disabled={!isAvailableNewSeries(seriesList)}>
            시리즈 추가
          </Selector.SubmitButton>
        </Selector.Form>
      </Selector>
    </details>
  );
};
