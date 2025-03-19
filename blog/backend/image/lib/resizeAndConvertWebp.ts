import sharp from "sharp";

type ResizeAndConvertToWebp = (
  imageBuffer: ArrayBuffer,
  targetWidth: number,
  quality?: number
) => Promise<Buffer<ArrayBufferLike>>;

export const resizeAndConvertToWebp: ResizeAndConvertToWebp = async (
  imageBuffer,
  targetWidth,
  quality = 80
) => {
  return sharp(imageBuffer)
    .resize(targetWidth, null, {
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({ quality })
    .toBuffer();
};
