import { SERIES_END_POINT } from "../config";
import { SERIES_QUERY_KEY } from "./seriesQueryKey";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const SeriesErrorMessage = {
  EMPTY: "시리즈 이름은 최소 1자 이상이어야 합니다",
  ALREADY_EXIST: "이미 존재하는 시리즈 이름입니다"
};

const SeriesSchema = z.object({
  name: z.string().min(1, SeriesErrorMessage.EMPTY)
});

export type SeriesRequest = z.infer<typeof SeriesSchema>;

const isExistingSeries =
  (newSeries: SeriesRequest) => (existingSeriesItem: SeriesRequest) =>
    newSeries.name.toLowerCase() === existingSeriesItem.name.toLowerCase();

export const parseSeriesSchema = (
  data: { name: string },
  existingSeriesList: SeriesRequest[] = []
) => {
  return pipe(
    SeriesSchema.safeParse(data),
    (validationResult) =>
      validationResult.success
        ? E.right(validationResult.data)
        : E.left(validationResult.error.errors[0].message),
    E.flatMap((newSeries) =>
      existingSeriesList.some(isExistingSeries(newSeries))
        ? E.left(SeriesErrorMessage.ALREADY_EXIST)
        : E.right(newSeries)
    )
  );
};

const postAddNewSeries = async ({ name }: SeriesRequest) => {
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
