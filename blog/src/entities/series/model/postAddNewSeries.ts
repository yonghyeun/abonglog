import { SERIES_QUERY_KEY } from "./seriesQueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";

interface PostAddNewSeriesRequest {
  name: string;
}

const postAddNewSeries = async ({ name }: PostAddNewSeriesRequest) => {
  const supabase = await createBrowserSupabase();
  const created_at = new Date().toISOString();

  const { error } = await supabase
    .from("series")
    .insert([{ name, created_at }]);

  if (error) {
    throw error;
  }

  return {
    status: 200,
    message: "success"
  };
};

/**
 * usePostAddNewSeries 는 새로운 시리즈를 추가하는 mutation 입니다.
 * 성공 시 series 를 구독하고 있는 모든 쿼리를 다시 불러옵니다.
 */
export const usePostAddNewSeries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAddNewSeries,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERIES_QUERY_KEY.default()
      });
    }
  });
};
