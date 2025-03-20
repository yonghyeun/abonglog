import { resizeAndConvertToWebp } from "./resizeAndConvertWebp";

type ResizeFilesAndConvertWebpFile = (
  files: File[],
  targetWidth: number
) => Promise<File[]>;

export const resizeFilesAndConvertWebpFile: ResizeFilesAndConvertWebpFile =
  async (files, targetWidth) => {
    const processFile = async (file: File) => {
      // GIF 파일은 변환하지 않고 그대로 반환
      if (file.type === "image/gif") {
        return file;
      }

      // 이미지 리사이징 및 webp 변환
      const resizedImage = await resizeAndConvertToWebp(file, targetWidth);

      return new File([resizedImage], `${file.name}.webp`, {
        type: "image/webp"
      });
    };

    // 모든 파일 동시 처리
    return Promise.all(files.map(processFile));
  };
