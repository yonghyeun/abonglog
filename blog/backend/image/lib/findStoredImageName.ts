import { filter, isUndefined, map, pipe, prop, toArray } from "@fxts/core";

import { findImageUrl } from "@/features/article/lib";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

type FindStoredImageName = (content: string) => string[];

const isStoredImage = () => (url: string) =>
  url.startsWith(SUPABASE_STORAGE_URL);

const popLastHref = (url: string) => url.split("/").pop();

export const findStoredImageName: FindStoredImageName = (content) => {
  return pipe(
    content,
    findImageUrl,
    map(prop("src")),
    filter(isStoredImage),
    map(popLastHref),
    filter((url) => !isUndefined(url)),
    toArray
  );
};
