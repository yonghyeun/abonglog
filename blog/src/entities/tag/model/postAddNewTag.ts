import { TAG_END_POINT } from "../config";
import { TAG_QUERY_KEY } from "./tagQueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface PostAddNewTagRequest {
  name: string;
}

const postAddNewTag = async ({ name }: PostAddNewTagRequest) => {
  const response = await fetch(TAG_END_POINT.POST_NEW_TAG, {
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
