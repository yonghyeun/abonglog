import { HeadingInfo } from "@/entities/article/lib";

export type Heading = {
  level: number;
  title: string;
};

export type NestedHeadingList = (string | string[] | NestedHeadingList)[];
export const createNestedHeadings = (headings: HeadingInfo[]) => {
  if (headings.length === 0) {
    return [];
  }

  const createNested = (
    headings: HeadingInfo[],
    level: number,
    start: number,
    end: number
  ) => {
    const result: NestedHeadingList = [];

    let currentIndex = start;
    while (currentIndex < end) {
      const current = headings[currentIndex];

      if (current.level < level) {
        return result;
      }

      if (current.level === level) {
        result.push(current.title);
        currentIndex++;
      } else {
        result.push(createNested(headings, level + 1, currentIndex, end));
        while (currentIndex < end && headings[currentIndex].level > level) {
          currentIndex++;
        }
      }
    }

    return result;
  };

  return createNested(headings, headings[0].level, 0, headings.length);
};
