import { TAG_QUERY_KEY } from "./tagQueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBrowserSupabase } from "@/shared/model";

interface PostAddNewTagRequest {
  name: string;
}

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
