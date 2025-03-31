import { map, pipe, toArray, uniqBy } from "@fxts/core";

const MARKDOWN_IMAGE_REGEX = /!\[(.*?)\]\(([\s\S]*?)\)/g;
const WHITESPACE_REGEX = /[\n\r\s]+/g;

export const findImageUrl = (markdown: string) => {
  return pipe(
    markdown.matchAll(MARKDOWN_IMAGE_REGEX),
    map(([_, alt, src]) => ({
      alt: alt.trim(),
      src: src.replace(WHITESPACE_REGEX, "")
    })),
    uniqBy(({ src }) => src),
    toArray
  );
};
