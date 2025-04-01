import { deleteImages, getImageList } from "@backend/image/model";
import * as E from "@fp/either";
import { filter, map, not, pipe, toArray } from "@fxts/core";

export const deleteUnusedThumbnail = async (
  articleId: number,
  usedThumbnailUrl: string | null
) => {
  const response = await getImageList(
    "article_thumbnail",
    `thumbnails/${articleId}`
  );

  const filterUnusedThumbnail = (storedImage: { name: string }) =>
    not((usedThumbnailUrl || "").includes(storedImage.name));

  return pipe(
    response,
    E.map((storedImageList) =>
      pipe(
        storedImageList,
        filter(filterUnusedThumbnail),
        map((storedImage) => storedImage.name),
        toArray
      )
    ),

    E.flatMap((unusedThumbnails) =>
      deleteImages(
        "article_thumbnail",
        unusedThumbnails.map((name) => `thumbnails/${articleId}/${name}`)
      )
    )
  );
};
