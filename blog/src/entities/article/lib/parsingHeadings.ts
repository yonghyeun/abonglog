import { flatMap, isNil, pipe, toArray, when } from "@fxts/core";

export interface HeadingInfo {
  level: number;
  title: string;
}

type parsingHeadings = (content: string) => HeadingInfo[];

export const parsingHeadings: parsingHeadings = (content) => {
  return pipe(
    content.match(/^#{1,3}\s[^\n]+/gm),
    when(isNil, () => []),
    flatMap((heading) => {
      const [sharps, ...title] = heading.trim().split(" ");
      return {
        level: sharps.length,
        title: title.join(" ")
      };
    }),
    toArray
  );
};
