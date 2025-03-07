import { useRef, useState } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringfy from "rehype-stringify";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import { unified } from "unified";

import { postArticleImage } from "@/entities/article/model";
import { compressImage } from "@/entities/image/lib";

export const useMarkdown = (articleId: number, defaultValue?: string) => {
  const [markdown, setMarkdown] = useState<string>(() => defaultValue || "");
  const [html, setHtml] = useState<string>("");

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

    setMarkdown(
      `${markdown.slice(0, selectionStart)}[image](이미지 업로드 중...)${markdown.slice(
        selectionEnd
      )}`
    );

    const compressedFiles = await Promise.all(
      files.map((file) => compressImage(file))
    );

    const imageUrls = await postArticleImage({
      files: compressedFiles,
      articleId: articleId.toString()
    });

    // 이미지 업로드가 완료 되면 이전 이미지가 삽입된 selectionStart 와 selectionEnd 사이에
    // 이미지를 표현하는 마크다운 문법을 추가 합니다.

    const imageMarkdownTexts = imageUrls
      .flatMap(({ imageUrl }) => `![image](${imageUrl})`)
      .join("\n");

    setMarkdown(
      `${markdown.slice(0, selectionStart)}${imageMarkdownTexts}${markdown.slice(
        selectionEnd
      )}`
    );
  };

  /**
   * textarea의 값이 변경 될 때 마다 text 상태를 변경 합니다.
   */
  const handleChangeMarkdown = async ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = target.value;

    setMarkdown(text);

    const vfileObject = await unified()
      // 마크다운 텍스트를 AST 형태로 파싱 합니다.
      .use(remarkParse)
      // AST 형태로 파싱된 마크다운 텍스트를 HTML로 변환 합니다.
      .use(remark2rehype)
      // HTML로 변환된 AST를 문자열로 변환 합니다.
      .use(rehypeStringfy)
      // 코드 블럭을 예쁘게 표현하기 위한 설정을 추가 합니다.
      .use(
        rehypePrettyCode,

        {
          grid: true,
          theme: "nord",
          keepBackground: true,
          bypassInlineCode: false,
          defaultLang: {
            block: "typescript"
          },
          filterMetaString: (str) => str.replace(/some-pattern/g, ""),
          onVisitLine: (element) => {
            console.log("Visiting line:", element);
          },
          onVisitHighlightedLine: (element, id) => {
            console.log("Visiting highlighted line:", element, id);
          },
          onVisitHighlightedChars: (element, id) => {
            console.log("Visiting highlighted chars:", element, id);
          },
          onVisitTitle: (element) => {
            console.log("Visiting title:", element);
          },
          onVisitCaption: (element) => {
            console.log("Visiting caption:", element);
          }
        }
      )
      .process(text);

    // TODO : 추후 스타일링 할 때 css 설정하기
    const html = `
  ${vfileObject.toString()}
    `;

    setHtml(html);
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

      setMarkdown(
        `${markdown.slice(0, selectionStart)}${" ".repeat(TAB_SIZE)}${markdown.slice(selectionEnd)}`
      );

      setTimeout(() => {
        textArea.selectionStart = selectionStart + TAB_SIZE;
        textArea.selectionEnd = selectionStart + TAB_SIZE;
      }, 0);
    }

    if (event.key === "Enter") {
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
    markdown,
    html,
    handleChangeMarkdown,
    handleKeyDownTextArea,
    handleImagePaste,
    textAreaRef,
    handleImageUpload
  };
};
