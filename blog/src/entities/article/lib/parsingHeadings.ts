import { flatMap, isNil, map, pipe, split, toArray, when } from "@fxts/core";

export interface HeadingInfo {
  level: number;
  title: string;
}

type parsingHeadings = (content: string) => HeadingInfo[];

export const parsingHeadings: parsingHeadings = (content) => {
  return pipe(
    content.match(/^#{1,3}\s[^\n]+/gm),
    when(isNil, () => []),
    map((heading) => heading.trim()),
    map(split(" ")),
    flatMap(([sharps, ...title]) => ({
      level: sharps.length,
      title: title.join(" ")
    })),
    toArray
  );
};
