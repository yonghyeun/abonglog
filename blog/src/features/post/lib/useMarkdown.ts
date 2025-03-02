import { useRef, useState } from "react";

import { compressImage } from "@/entities/image/lib";
import { postArticleImage } from "@/entities/image/model";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

export const useMarkdown = (articleId: string, defaultValue?: string) => {
  const [text, setText] = useState<string>(() => defaultValue || "");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  /**
   * uploadArticleImage 함수는 이미지 파일을 업로드 하고, 업로드가 완료되면
   * textArea 에서 선택된 위치에 이미지를 표현하는 마크다운 문법을 삽입하는 역할을 합니다.
   */
  const uploadArticleImage = async (files: File[]) => {
    const textArea = textAreaRef.current;

    if (!textArea || files.length === 0) {
      return;
    }

    // 이미지 업로드 하는 동안 로딩 상태를 표현하기 위해 text의 상태를 수정 합니다.

    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;

    setText(
      `${text.slice(0, selectionStart)}[image](이미지 업로드 중...)${text.slice(
        selectionEnd
      )}`
    );

    const compressedFiles = await Promise.all(
      files.map((file) => compressImage(file))
    );

    const imageUrls = await postArticleImage(compressedFiles, articleId);

    // 이미지 업로드가 완료 되면 이전 이미지가 삽입된 selectionStart 와 selectionEnd 사이에
    // 이미지를 표현하는 마크다운 문법을 추가 합니다.

    const imageMarkdownTexts = imageUrls
      .flatMap((data) => data)
      .map(({ fullPath }) => `![image](${SUPABASE_STORAGE_URL}/${fullPath})`)
      .join("\n");

    setText(
      `${text.slice(0, selectionStart)}${imageMarkdownTexts}${text.slice(
        selectionEnd
      )}`
    );
  };

  /**
   * textarea의 값이 변경 될 때 마다 text 상태를 변경 합니다.
   */
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  /**
   * texArea 에서 다양한 키 다운 이벤트가 발생 했을 때
   * 이벤트를 처리하는 함수를 정의 합니다.
   */
  const handleKeyDownTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const textArea = textAreaRef.current;

      if (!textArea) {
        return;
      }

      const TAB_SIZE = 2;

      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;

      setText(
        `${text.slice(0, selectionStart)}${" ".repeat(TAB_SIZE)}${text.slice(selectionEnd)}`
      );

      setTimeout(() => {
        textArea.selectionStart = selectionStart + TAB_SIZE;
        textArea.selectionEnd = selectionStart + TAB_SIZE;
      }, 0);
    }
  };

  /**
   * textarea 에서 이미지를 붙여넣을 때 발생하는 이벤트를 처리 합니다.
   */
  const handleImagePaste = async (
    event: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const files = [...event.clipboardData.items]
      .filter(({ type }) => type.includes("image"))
      .flatMap((dataTransferItem) => dataTransferItem.getAsFile())
      .filter((file) => !!file);

    await uploadArticleImage(files);
  };

  /**
   * multiple file input 에서 이미지를 업로드 할 때 발생하는 이벤트를 처리 합니다.
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }
    uploadArticleImage([...files]);
  };

  return {
    text,
    handleChangeText,
    handleKeyDownTextArea,
    handleImagePaste,
    textAreaRef,
    handleImageUpload
  };
};
