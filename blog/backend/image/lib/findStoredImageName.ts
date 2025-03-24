import { findImageUrl } from "@/features/article/lib";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

type FindStoredImageName = (content: string) => string[];

export const findStoredImageName: FindStoredImageName = (content) => {
  return findImageUrl(content)
    .map(({ src }) => src)
    .filter((url) => url.startsWith(SUPABASE_STORAGE_URL))
    .map((url) => url.split("/").pop())
    .filter((fileName) => fileName !== undefined) as string[];
};
