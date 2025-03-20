type FilterUnusedImageNames = (
  storedImages: { name: string }[],
  usedImages: string[]
) => string[];

export const filterUnusedImageNames: FilterUnusedImageNames = (
  storedImages,
  usedImages
) => {
  return storedImages
    .filter((image) => !usedImages.includes(image.name))
    .map((image) => image.name);
};
