import { findImageUrl } from "@/features/article/lib";

type FindStoredImageName = (content: string) => string[];

export const findStoredImageName: FindStoredImageName = (content) => {
  return findImageUrl(content)
    .map(({ src }) => src)
    .filter((url) => url.startsWith("/api/"))
    .map((url) => url.split("/").pop())
    .filter((fileName) => fileName !== undefined) as string[];
};
