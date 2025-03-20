import { randomUUID } from "crypto";

export const getImageStoragePath = (articleId: string, type: string) => {
  return `images/${articleId}/${randomUUID()}.${type}`;
};
