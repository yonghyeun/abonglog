import sharp from "sharp";

type ResizeAndConvertToWebp = (
  file: File,
  targetWidth: number,
  quality?: number
) => Promise<File>;

export const resizeAndConvertToWebp: ResizeAndConvertToWebp = async (
  file,
  targetWidth,
  quality = 80
) => {
  const buffer = await file.arrayBuffer();

  const resizedBuffer = await sharp(buffer)
    .resize(targetWidth, null, {
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({ quality })
    .toBuffer();

  return new File([resizedBuffer], `${targetWidth}.webp`, {
    type: "image/webp"
  });
};
