import { type HeadingInfo, parsingHeading } from "@/entities/article/lib";

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
