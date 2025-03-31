import { filter, isUndefined, map, pipe, prop, toArray } from "@fxts/core";

import { findImageUrl } from "@/features/article/lib";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

type FindStoredImageName = (content: string) => string[];

const isStartsWith = (prefix: string) => (str: string) =>
  str.startsWith(prefix);

const splitPop = (spliter: string) => (str: string) => str.split(spliter).pop();

export const findStoredImageName: FindStoredImageName = (content) => {
  return pipe(
    content,
    findImageUrl,
    map(prop("src")),
    filter(isStartsWith(SUPABASE_STORAGE_URL)),
    map(splitPop("/")),
    filter((url) => !isUndefined(url)),
    toArray
  );
};
