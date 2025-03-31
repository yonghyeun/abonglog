import { summarizeTextCode } from "./summarizeTextCode";

describe("summarizeTextCode", () => {
  test("영문 텍스트의 charCode 합을 반환한다", () => {
    expect(summarizeTextCode("abc")).toBe(
      "a".charCodeAt(0) + "b".charCodeAt(0) + "c".charCodeAt(0)
    );
    expect(summarizeTextCode("hello")).toBe(532); // 'h'.charCodeAt(0) + 'e'.charCodeAt(0) + ... = 532
  });

  test("빈 문자열의 경우 0을 반환한다", () => {
    expect(summarizeTextCode("")).toBe(0);
  });

  test("한글 텍스트의 charCode 합을 반환한다", () => {
    expect(summarizeTextCode("가나다")).toBe(
      "가".charCodeAt(0) + "나".charCodeAt(0) + "다".charCodeAt(0)
    );
    expect(summarizeTextCode("한글")).toBe(54620 + 44544); // '한'.charCodeAt(0) + '글'.charCodeAt(0)
  });

  test("특수문자의 charCode 합을 반환한다", () => {
    expect(summarizeTextCode("!@#")).toBe(
      "!".charCodeAt(0) + "@".charCodeAt(0) + "#".charCodeAt(0)
    );
    expect(summarizeTextCode("$%^")).toBe(167); // '$'(36) + '%'(37) + '^'(94) = 167
  });
});
