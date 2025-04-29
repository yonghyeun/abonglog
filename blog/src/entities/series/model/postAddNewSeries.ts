import { SERIES_END_POINT } from "../config";
import { SERIES_QUERY_KEY } from "./seriesQueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface PostAddNewSeriesRequest {
  name: string;
}

const postAddNewSeries = async ({ name }: PostAddNewSeriesRequest) => {
  const response = await fetch(SERIES_END_POINT.POST_NEW_SERIES, {
    method: "POST",
    body: JSON.stringify({ name })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
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
