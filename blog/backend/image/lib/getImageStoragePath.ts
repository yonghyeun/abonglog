import { randomUUID } from "crypto";

type RootFolderName = "images" | "thumbnails";

type GetImageStoragePath = (
  rootFolderName: RootFolderName,
  articleId: string,
  type: string
) => string;

export const getImageStoragePath: GetImageStoragePath = (
  rootFolderName,
  articleId: string,
  type: string
) => {
  return `${rootFolderName}/${articleId}/${randomUUID()}.${type}`;
};
