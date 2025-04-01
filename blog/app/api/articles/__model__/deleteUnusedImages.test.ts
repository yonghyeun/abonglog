import { deleteUnusedImages } from "./deleteUnusedImages";
import { deleteImages, getImageList } from "@backend/image/model";
import * as E from "@fp/either";

jest.mock("@backend/image/model", () => {
  return {
    deleteImages: jest.fn(),
    getImageList: jest.fn()
  };
});

describe("deleteUnusedImages test", () => {
  beforeEach(() => {
    (getImageList as jest.Mock).mockClear();
    (deleteImages as jest.Mock).mockClear();
  });

  const MOCK_ARTICLE_ID = 1;

  test("사용한 이미지가 없고 DB에 저장된 이미지도 없는 경우 반환값은 Promise<Right<[]>>이다.", async () => {
    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right([]))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const usedImagePaths: string[] = [];

    const result = await deleteUnusedImages(MOCK_ARTICLE_ID, usedImagePaths);
    const expected = E.right([]);
    expect(result).toEqual(expected);
  });

  test("사용한 이미지가 DB에 저장된 이미지와 1:1로 매칭되는 경우 반환값은 Promise<Right<[]>>이다.", async () => {
    const IMAGE_NAMES = ["image1.jpg", "image2.jpg"];

    const USED_IMAGE_PATHS = IMAGE_NAMES.map(
      (name) => `images/${MOCK_ARTICLE_ID}/${name}`
    );

    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right(IMAGE_NAMES.map((name) => ({ name }))))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const result = await deleteUnusedImages(MOCK_ARTICLE_ID, USED_IMAGE_PATHS);
    const expected = E.right([]);

    expect(result).toEqual(expected);
  });

  test("사용한 이미지가 DB에 저장된 이미지보다 많은 경우 반환값은 사용되지 않은 이미지를 제거한다.", async () => {
    const IMAGE_NAMES = ["image1.jpg", "image2.jpg", "image3.png"];

    const USED_IMAGE_PATHS = IMAGE_NAMES.slice(0, -1).map(
      (name) => `images/${MOCK_ARTICLE_ID}/${name}`
    );

    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right(IMAGE_NAMES.map((name) => ({ name }))))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const result = await deleteUnusedImages(MOCK_ARTICLE_ID, USED_IMAGE_PATHS);
    const expected = E.right([
      `images/${MOCK_ARTICLE_ID}/${IMAGE_NAMES[IMAGE_NAMES.length - 1]}`
    ]);

    expect(result).toEqual(expected);
  });

  test("DB에 저장된 이미지가 없으면 빈 배열을 반환한다.", async () => {
    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right([]))
    );

    const usedImagePaths: string[] = [];

    const result = await deleteUnusedImages(MOCK_ARTICLE_ID, usedImagePaths);
    const expected = E.right([]);
    expect(result).toEqual(expected);
  });

  test("모든 DB 이미지가 현재 사용중이면 아무 이미지도 삭제하지 않는다.", async () => {
    const IMAGE_NAMES = ["image1.jpg", "image2.jpg"];

    const USED_IMAGE_PATHS = IMAGE_NAMES.map(
      (name) => `images/${MOCK_ARTICLE_ID}/${name}`
    );

    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right(IMAGE_NAMES.map((name) => ({ name }))))
    );

    const result = await deleteUnusedImages(MOCK_ARTICLE_ID, USED_IMAGE_PATHS);
    const expected = E.right([]);

    expect(result).toEqual(expected);
  });

  test("사용하지 않는 DB 이미지가 있으면 해당 이미지들을 삭제한다.", async () => {
    const IMAGE_NAMES = ["image1.jpg", "image2.jpg", "image3.png"];

    const USED_IMAGE_PATHS = IMAGE_NAMES.slice(0, -1).map(
      (name) => `images/${MOCK_ARTICLE_ID}/${name}`
    );

    (getImageList as jest.Mock).mockResolvedValueOnce(
      Promise.resolve(E.right(IMAGE_NAMES.map((name) => ({ name }))))
    );

    (deleteImages as jest.Mock).mockImplementation((_, paths) =>
      E.right(paths)
    );

    const result = await deleteUnusedImages(MOCK_ARTICLE_ID, USED_IMAGE_PATHS);
    const expected = E.right([
      `images/${MOCK_ARTICLE_ID}/${IMAGE_NAMES[IMAGE_NAMES.length - 1]}`
    ]);

    expect(result).toEqual(expected);
  });

  describe("deleteUnusedImages 에러핸들링 테스트", () => {
    const GET_IMAGE_LIST_ERROR = E.left({ message: "getImageList error" });
    const DELETE_IMAGE_ERROR = E.left({ message: "deleteImage error" });

    (getImageList as jest.Mock).mockResolvedValue(
      Promise.resolve(GET_IMAGE_LIST_ERROR)
    );

    test("getImageList 에서 에러가 발생한 경우 getImageList의 에러 메시지를 반환한다.", async () => {
      const expected = E.left({ message: "getImageList error" });

      (getImageList as jest.Mock).mockResolvedValue(Promise.resolve(expected));

      const result = await deleteUnusedImages(MOCK_ARTICLE_ID, []);
      expect(result).toEqual(GET_IMAGE_LIST_ERROR);
    });

    test("deleteImages 에서 에러가 발생한 경우 deleteImages의 에러 메시지를 반환한다.", async () => {
      (getImageList as jest.Mock).mockResolvedValueOnce(
        Promise.resolve(E.right([{ name: "image1.jpg" }]))
      );

      (deleteImages as jest.Mock).mockResolvedValueOnce(DELETE_IMAGE_ERROR);

      const result = await deleteUnusedImages(MOCK_ARTICLE_ID, []);
      expect(result).toEqual(DELETE_IMAGE_ERROR);
    });

    test("이미지 목록 조회 중 에러가 발생하면 해당 에러를 전파한다.", async () => {
      const expected = E.left({ message: "getImageList error" });

      (getImageList as jest.Mock).mockResolvedValue(Promise.resolve(expected));

      const result = await deleteUnusedImages(MOCK_ARTICLE_ID, []);
      expect(result).toEqual(GET_IMAGE_LIST_ERROR);
    });

    test("이미지 삭제 중 에러가 발생하면 해당 에러를 전파한다.", async () => {
      (getImageList as jest.Mock).mockResolvedValueOnce(
        Promise.resolve(E.right([{ name: "image1.jpg" }]))
      );

      (deleteImages as jest.Mock).mockResolvedValueOnce(DELETE_IMAGE_ERROR);

      const result = await deleteUnusedImages(MOCK_ARTICLE_ID, []);
      expect(result).toEqual(DELETE_IMAGE_ERROR);
    });
  });
});
