import { TAG_QUERY_KEY } from "./tagQueryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";
import type { Database } from "@/shared/model/database.types";

export type Tag = Database["public"]["Tables"]["tags"]["Row"];

export const getTagList = () => {
  const queryKey = TAG_QUERY_KEY.default();
  const queryFn = async () => {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase.from("tags").select("*");

    if (error) {
      throw error;
    }

    return data;
  };

  return {
    queryKey,
    queryFn
  };
};

/**
 * useGetTagList 쿼리는 public.tags 에 존재하는 모든 태그를 가져옵니다.
 */
export const useGetTagList = () => {
  return useSuspenseQuery(getTagList());
};
