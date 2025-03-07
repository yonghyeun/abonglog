/**
 * series entitie 와 관련된 모든 CRUD 는 index.ts 파일 하나에서 관리합니다.
 * series entities 와 관련된 CRUD 들을 서로간의 크고 작은 의존성이 존재 할 수 밖에 없습니다.
 * 예를 들어 새로운 시리즈가 추가 된다면 시리즈를 가져오는 모든 쿼리문들은 invalidate 되어야 합니다.
 * 이러한 의존성을 관리하기 위해 index.ts 파일 하나에서 관리합니다.
 */
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import type { Database } from "@/shared/model/database.types";
import { NonOptional } from "@/shared/type";
import { snakeToCamel } from "@/shared/util";

export const SERIES_QUERY_KEY = {
  default: () => ["series"] as const
} as const;

export type Series = Database["public"]["Tables"]["series"]["Row"];

export const getSeriesList = () => {
  const queryKey = SERIES_QUERY_KEY.default();
  const queryFn = async () => {
    const supabase = await createBrowserSupabase();
    const { data, error } = await supabase.from("series").select("*");

    if (error) {
      throw error;
    }

    return data;
  };

  return { queryKey, queryFn };
};

/**
 * useGetAllSeries 쿼리는 public.series 에 존재하는 모든 시리즈를 가져옵니다.
 */
export const useGetSeriesList = () => {
  return useSuspenseQuery(getSeriesList());
};

type PostAddNewSeriesRequest = Pick<
  NonOptional<Database["public"]["Tables"]["series"]["Insert"]>,
  "name"
>;

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

export const getSeriesArticleList = () => {
  const queryKey = SERIES_QUERY_KEY.default();

  const queryFn = async () => {
    const supabase = await createBrowserSupabase();

    const { data, error } = await supabase.from("series_articles").select("*");

    if (error) {
      throw error;
    }

    return snakeToCamel(data);
  };

  return { queryKey, queryFn };
};

export const useGetSeriesArticleList = () => {
  return useSuspenseQuery(getSeriesArticleList());
};
