import { type HeadingInfo } from "@/entities/article/lib";

export type NestedHeadingList = (string | string[] | NestedHeadingList)[];

type CreateNestedHeadings = (
  headings: HeadingInfo[],
  level?: number
) => NestedHeadingList;

export const createNestedHeadings: CreateNestedHeadings = (
  headings,
  level = 1
) => {
  const currentLevelHeadings: NestedHeadingList = [];

  if (headings.length === 0) {
    return currentLevelHeadings;
  }

  while (headings.length > 0) {
    const heading = headings.shift()!;

    if (heading.level === level) {
      currentLevelHeadings.push(heading.title);
      continue;
    }

    if (heading.level < level) {
      headings.unshift(heading);
      return currentLevelHeadings;
    }

    headings.unshift(heading);
    currentLevelHeadings.push(createNestedHeadings(headings, level + 1));
  }

  return currentLevelHeadings;
};
