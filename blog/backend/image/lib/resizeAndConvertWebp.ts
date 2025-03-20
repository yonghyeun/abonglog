import sharp from "sharp";

type ResizeAndConvertToWebp = (
  file: Blob,
  targetWidth: number,
  quality?: number
) => Promise<Buffer<ArrayBufferLike>>;

export const resizeAndConvertToWebp: ResizeAndConvertToWebp = async (
  file,
  targetWidth,
  quality = 80
) => {
  const arrayBuffer = await file.arrayBuffer();

  return sharp(arrayBuffer)
    .resize(targetWidth, null, {
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({ quality })
    .toBuffer();
};
