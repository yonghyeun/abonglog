export interface HeadingInfo {
  level: number;
  title: string;
}

export const parsingHeading = (markdown: string): HeadingInfo[] => {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^#{1,3}\s/.test(line)) // '#' 문자가 1개 이상 3개 이하로 반복되고, 그 뒤에 공백이 있는 경우에만 필터링
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1; // '#'의 개수를 레벨로 설정
      const title = line.replace(/^#+\s*/, "").trim(); // '#'과 공백을 제거한 제목
      return { level, title };
    });
};
