import { findImageUrl } from "./findImageUrl";
import { describe, it } from "@jest/globals";

describe("findImageUrl test", () => {
  it("이미지 문구가 없는 경우 findImageUrl 은 빈 배열을 반환한다.", () => {
    const text = `
      test 문구
    `;
    const result = findImageUrl(text);
    expect(result).toEqual([]);
  });

  it("이미지 문구가 하나 이상 있는 경우 findImageUrl 은 입력된 순으로 이미지 src ,alt를 담은 객체를 반환한다.", () => {
    const text = `
      test 문구
      ![image1](https://image1.com)
      ![image2](https://image2.com)
    `;
    const result = findImageUrl(text);
    expect(result).toEqual([
      { alt: "image1", src: "https://image1.com" },
      { alt: "image2", src: "https://image2.com" }
    ]);
  });

  it("동일한 이미지가 두 개 이상 있어도 입력된 순으로 하나만 반환한다.", () => {
    const text = `
      test 문구
      ![alt1_1](https://image1.com)
      ![alt2_1](https://image2.com)
      ![alt2_2](https://image1.com)
      ![alt3_1](https://image3.com)
      ![alt3_2](https://image3.com)
      ![alt1_2](https://image1.com)
    `;

    const result = findImageUrl(text);
    expect(result).toEqual([
      { alt: "alt1_1", src: "https://image1.com" },
      { alt: "alt2_1", src: "https://image2.com" },
      { alt: "alt3_1", src: "https://image3.com" }
    ]);
  });
});
