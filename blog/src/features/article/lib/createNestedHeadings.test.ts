import {
  type HeadingInfo,
  type NestedHeadingList,
  createNestedHeadings,
  parsingHeading
} from "./createNestedHeadings";

describe("parsingHeading", () => {
  test("heading 이 존재하지 않는 경우 빈 배열을 반환한다.", () => {
    const markdown = `마크다운 
    마크다운 테스트 
    마크다운`;

    const expected: HeadingInfo[] = [];

    const result = parsingHeading(markdown);
    expect(result).toEqual(expected);
  });

  test("heading 이 존재하는 경우 정상적으로 파싱한다.", () => {
    const markdown = `
# heading1
## heading2
### heading3
    
마크다운 테스트
    `;

    const expected = [
      { level: 1, title: "heading1" },
      { level: 2, title: "heading2" },
      { level: 3, title: "heading3" }
    ];

    const result = parsingHeading(markdown);
    expect(result).toEqual(expected);
  });
});

describe("createNestedHeadings", () => {
  test("빈 배열이 들어온 경우 빈 배열을 반환한다.", () => {
    const headings: HeadingInfo[] = [];
    const expected: NestedHeadingList = [];

    const result = createNestedHeadings(headings);
    expect(result).toEqual(expected);
  });

  test("올바른 Headings 가 들어왔을 때 계층적인 배열을 반환한다.", () => {
    const headings: HeadingInfo[] = [
      { level: 1, title: "heading1" },
      { level: 2, title: "heading2" },
      { level: 3, title: "heading3" },
      { level: 3, title: "heading4" },
      { level: 2, title: "heading5" },
      { level: 1, title: "heading6" }
    ];

    const expected: NestedHeadingList = [
      "heading1",
      ["heading2", ["heading3", "heading4"], "heading5"],
      "heading6"
    ];

    const result = createNestedHeadings(headings);
    expect(result).toEqual(expected);
  });

  test("단일 레벨의 Headings 가 들어왔을 때 올바르게 반환한다.", () => {
    const headings: HeadingInfo[] = [
      { level: 1, title: "heading1" },
      { level: 1, title: "heading2" },
      { level: 1, title: "heading3" }
    ];

    const expected: NestedHeadingList = ["heading1", "heading2", "heading3"];

    const result = createNestedHeadings(headings);
    expect(result).toEqual(expected);
  });

  test("다양한 레벨의 Headings 가 들어왔을 때 올바르게 계층 구조를 반환한다.", () => {
    const headings: HeadingInfo[] = [
      { level: 1, title: "heading1" },
      { level: 2, title: "heading2" },
      { level: 3, title: "heading3" },
      { level: 2, title: "heading4" },
      { level: 1, title: "heading5" },
      { level: 2, title: "heading6" }
    ];

    const expected: NestedHeadingList = [
      "heading1",
      ["heading2", ["heading3"], "heading4"],
      "heading5",
      ["heading6"]
    ];

    const result = createNestedHeadings(headings);
    expect(result).toEqual(expected);
  });

  test("중첩된 레벨의 Headings 가 들어왔을 때 올바르게 계층 구조를 반환한다.", () => {
    const headings: HeadingInfo[] = [
      { level: 1, title: "heading1" },
      { level: 2, title: "heading2" },
      { level: 3, title: "heading3" },
      { level: 4, title: "heading4" },
      { level: 5, title: "heading5" }
    ];

    const expected: NestedHeadingList = [
      "heading1",
      ["heading2", ["heading3", ["heading4", ["heading5"]]]]
    ];

    const result = createNestedHeadings(headings);
    expect(result).toEqual(expected);
  });
});
