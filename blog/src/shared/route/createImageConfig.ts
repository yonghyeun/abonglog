import { randomUUID } from "crypto";

export const createImageConfig = (file: File) => {
  const imageId = randomUUID();
  const type = file.type.split("/")[1];
  const imageName = `${imageId}.${type}`;

  return {
    file,
    imageId,
    type,
    imageName
  };
};
