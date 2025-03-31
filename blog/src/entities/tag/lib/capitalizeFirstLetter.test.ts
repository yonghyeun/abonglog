import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  test("첫 글자가 소문자인 경우 대문자로 변환한다", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
    expect(capitalizeFirstLetter("world")).toBe("World");
  });

  test("이미 첫 글자가 대문자인 경우 그대로 반환한다", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
    expect(capitalizeFirstLetter("World")).toBe("World");
  });

  test("빈 문자열의 경우 빈 문자열을 반환한다", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  test("한글로 시작하는 문자열은 변화 없이 그대로 반환한다", () => {
    expect(capitalizeFirstLetter("안녕하세요")).toBe("안녕하세요");
    expect(capitalizeFirstLetter("한글")).toBe("한글");
  });

  test("숫자로 시작하는 문자열은 변화 없이 그대로 반환한다", () => {
    expect(capitalizeFirstLetter("123abc")).toBe("123abc");
    expect(capitalizeFirstLetter("1st")).toBe("1st");
  });
});
