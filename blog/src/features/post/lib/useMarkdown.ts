import { useState } from "react";

import { compressImage } from "@/entities/image/lib";
import { postArticleImage } from "@/entities/image/model";

export const useMarkdown = (articleId: string, defaultValue?: string) => {
  const [text, setText] = useState<string>(() => defaultValue || "");

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImagePaste = async (
    event: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const files = [...event.clipboardData.items]
      .filter(({ type }) => type.includes("image"))
      .map((dataTransferItem) => dataTransferItem.getAsFile())
      .filter((file) => !!file);

    if (files.length === 0) {
      return;
    }

    // image 용량 압축
    const compressedFiles = await Promise.all(
      files.map((file) => compressImage(file))
    );

    const imageUrls = await Promise.all(
      compressedFiles.map((file) => postArticleImage(file, articleId))
    );

    console.log(imageUrls);

    // imaeg 업로드 후 url 반환

    // url , alt text 로 마크다운 텍스트 변경하기
  };

  return {
    text,
    handleChangeText,
    handleImagePaste
  };
};
