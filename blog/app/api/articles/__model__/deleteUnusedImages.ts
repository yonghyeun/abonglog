import { deleteImages, getImageList } from "@backend/image/model";
import * as E from "@fp/either";
import { filter, map, not, pipe, toArray } from "@fxts/core";

export const deleteUnusedImages = async (
  articleId: number,
  usedImagePaths: string[]
) => {
  const response = await getImageList("article_image", `images/${articleId}`);

  const filterUnusedImages = (storedImage: { name: string }) =>
    not(
      usedImagePaths.some((usedImagePath) =>
        usedImagePath.includes(storedImage.name)
      )
    );

  return pipe(
    response,
    E.map((storedImageList) =>
      pipe(
        storedImageList,
        filter(filterUnusedImages),
        map((storedImage) => storedImage.name),
        toArray
      )
    ),

    E.flatMap((unusedImageNames) =>
      deleteImages(
        "article_image",
        unusedImageNames.map((name) => `images/${articleId}/${name}`)
      )
    )
  );
};
