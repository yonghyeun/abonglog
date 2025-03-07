/**
 * tags entitie 와 관련된 모든 CRUD 는 index.ts 파일 하나에서 관리합니다.
 * tags entities 와 관련된 CRUD 들을 서로간의 크고 작은 의존성이 존재 할 수 밖에 없습니다.
 * 예를 들어 새로운 태그가 추가 된다면 태그를 가져오는 모든 쿼리문들은 invalidate 되어야 합니다.
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

export const TAG_QUERY_KEY = {
  default: () => ["tags"] as const
};

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

type PostAddNewTagRequest = NonOptional<Pick<Tag, "name">>;

const postAddNewTag = async ({ name }: PostAddNewTagRequest) => {
  const supabase = await createBrowserSupabase();
  const created_at = new Date().toISOString();

  const { error } = await supabase.from("tags").insert([{ name, created_at }]);
  if (error) {
    throw error;
  }

  return {
    status: 200,
    message: "success"
  };
};

/**
 * usePostAddNewTag 는 새로운 태그를 추가하는 mutation 입니다.
 * 성공 시 tag 를 구독하고 있는 모든 쿼리를 다시 불러옵니다.
 */
export const usePostAddNewTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAddNewTag,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TAG_QUERY_KEY.default()
      });
    }
  });
};
