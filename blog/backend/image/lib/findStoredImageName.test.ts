import { findStoredImageName } from "./findStoredImageName";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

describe("findStoredImageName", () => {
  it("줄 바꿈이 되어있는 이미지 경로도 올바르게 인식한다.", () => {
    const imageAlt = "alt";
    const imageName = "1.png";
    //  줄바꿈이 되어있는 imagePath
    const imagePath = `${SUPABASE_STORAGE_URL}
    /blahblah/blahblah/${imageName}
    `;
    const content = `![${imageAlt}](${imagePath})`;

    const expected = [imageName];
    expect(findStoredImageName(content)).toEqual(expected);
  });
});
