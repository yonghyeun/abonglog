import type { Series } from "@/entities/series/model";

import { useTransitionInput } from "@/shared/lib";

export const useSeriesSelectToggle = () => {
  const [searchText, handleChangeSearchText] = useTransitionInput();
  const [newSeriesName, handleChangeNewSeriesName] = useTransitionInput();

  const isAvailableAddNewSeries = (sereisList: Series[]) => {
    return (
      newSeriesName.length > 0 &&
      sereisList.every(
        ({ name }) => name.toLowerCase() !== newSeriesName.toLowerCase()
      )
    );
  };

  const filterBySearchedText = (seriesList: Series[]) => {
    return seriesList.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  };

  return {
    searchText,
    newSeriesName,
    handleChangeSearchText,
    handleChangeNewSeriesName,
    isAvailableAddNewSeries,
    filterBySearchedText
  };
};
