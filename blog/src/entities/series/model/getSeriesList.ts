import { SERIES_QUERY_KEY } from "./seriesQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/lib";
import type { Database } from "@/shared/model/database.types";
import { SnakeToCamel, snakeToCamel } from "@/shared/util";

export type Series = SnakeToCamel<
  Database["public"]["Tables"]["series"]["Row"]
>;

export const getSeriesList = () => {
  const queryKey = SERIES_QUERY_KEY.default();
  const queryFn = async (): Promise<Series[]> => {
    const supabase = await createBrowserSupabase();
    const { data, error } = await supabase.from("series").select("*");

    if (error) {
      throw error;
    }

    return snakeToCamel(data);
  };

  return { queryKey, queryFn, staleTime: 1000 * 60 * 60 * 24 * 7 };
};

/**
 * useGetAllSeries 쿼리는 public.series 에 존재하는 모든 시리즈를 가져옵니다.
 */
export const useGetSeriesList = () => {
  return useSuspenseQuery(getSeriesList());
};
