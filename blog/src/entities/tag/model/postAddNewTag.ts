import { TAG_END_POINT } from "../config";
import { TAG_QUERY_KEY } from "./tagQueryKey";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const TagErrorMessage = {
  EMPTY: "태그는 최소 1자 이상이어야 합니다",
  ALREADY_EXIST: "이미 존재하는 태그입니다"
};

const TagSchema = z.object({
  name: z.string().min(1, TagErrorMessage.EMPTY)
});

export type TagRequest = z.infer<typeof TagSchema>;

const isExistingTag = (newTag: TagRequest) => (existingTag: TagRequest) =>
  newTag.name.toLowerCase() === existingTag.name.toLowerCase();

export const parseTagSchema = (
  data: TagRequest,
  existingTags: TagRequest[]
) => {
  return pipe(
    TagSchema.safeParse(data),
    ({ success, data, error }) =>
      success ? E.right(data) : E.left(error.errors[0].message),
    E.flatMap((newTag) =>
      existingTags.some(isExistingTag(newTag))
        ? E.left(TagErrorMessage.ALREADY_EXIST)
        : E.right(newTag)
    )
  );
};

const postAddNewTag = async ({ name }: TagRequest) => {
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
