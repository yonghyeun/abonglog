import { deleteUnusedThumbnail } from "./deleteUnusedThumbnail";
import { deleteImages, getImageList } from "@backend/image/model";
import * as E from "@fp/either";

jest.mock("@backend/image/model", () => {
  return {
    deleteImages: jest.fn(),
    getImageList: jest.fn()
  };
});

describe("deleteUnusedThumbnail test", () => {
  beforeEach(() => {
    (getImageList as jest.Mock).mockClear();
    (deleteImages as jest.Mock).mockClear();
  });

  const MOCK_ARTICLE_ID = 1;

  test("DB에 저장된 썸네일이 없으면 빈 배열을 반환한다.", async () => {
    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right([]))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const result = await deleteUnusedThumbnail(
      MOCK_ARTICLE_ID,
      "new-thumbnail.jpg"
    );
    const expected = E.right([]);
    expect(result).toEqual(expected);
  });

  test("현재 사용중인 썸네일이 DB의 썸네일과 동일하면 아무 썸네일도 삭제하지 않는다.", async () => {
    const THUMBNAIL_NAME = "thumbnail.jpg";
    const THUMBNAIL_PATH = `thumbnails/${MOCK_ARTICLE_ID}/${THUMBNAIL_NAME}`;

    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right([{ name: THUMBNAIL_NAME }]))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const result = await deleteUnusedThumbnail(MOCK_ARTICLE_ID, THUMBNAIL_PATH);
    const expected = E.right([]);

    expect(result).toEqual(expected);
  });

  test("현재 사용중인 썸네일이 DB의 썸네일과 다르면 기존 썸네일을 삭제한다.", async () => {
    const OLD_THUMBNAIL = "old-thumbnail.jpg";
    const NEW_THUMBNAIL = "new-thumbnail.jpg";

    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right([{ name: OLD_THUMBNAIL }]))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const result = await deleteUnusedThumbnail(
      MOCK_ARTICLE_ID,
      `thumbnails/${MOCK_ARTICLE_ID}/${NEW_THUMBNAIL}`
    );

    const expected = E.right([
      `thumbnails/${MOCK_ARTICLE_ID}/${OLD_THUMBNAIL}`
    ]);
    expect(result).toEqual(expected);
  });

  describe("deleteUnusedThumbnail 에러핸들링 테스트", () => {
    const GET_IMAGE_LIST_ERROR = E.left({ message: "getImageList error" });
    const DELETE_IMAGE_ERROR = E.left({ message: "deleteImage error" });

    test("이미지 목록 조회 중 에러가 발생하면 해당 에러를 전파한다.", async () => {
      (getImageList as jest.Mock).mockResolvedValue(GET_IMAGE_LIST_ERROR);

      const result = await deleteUnusedThumbnail(
        MOCK_ARTICLE_ID,
        "thumbnail.jpg"
      );
      expect(result).toEqual(GET_IMAGE_LIST_ERROR);
    });

    test("이미지 삭제 중 에러가 발생하면 해당 에러를 전파한다.", async () => {
      (getImageList as jest.Mock).mockResolvedValueOnce(
        Promise.resolve(E.right([{ name: "old-thumbnail.jpg" }]))
      );

      (deleteImages as jest.Mock).mockResolvedValueOnce(DELETE_IMAGE_ERROR);

      const result = await deleteUnusedThumbnail(
        MOCK_ARTICLE_ID,
        "new-thumbnail.jpg"
      );
      expect(result).toEqual(DELETE_IMAGE_ERROR);
    });
  });
});
