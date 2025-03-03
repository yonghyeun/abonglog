import { useState } from "react";

import type { Series } from "@/entities/series/model";

export const useSeriesSelectToggle = () => {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>();

  const handleSelectSeries = (series: Series) => {
    setSelectedSeries(series);
  };

  const handleUnSelectSeries = () => {
    setSelectedSeries(null);
  };

  const filterUnSelectedSeries = (seriesList: Series[]) => {
    return seriesList.filter((series) => series.id !== selectedSeries?.id);
  };

  return {
    selectedSeries,
    handleSelectSeries,
    handleUnSelectSeries,
    filterUnSelectedSeries
  };
};
