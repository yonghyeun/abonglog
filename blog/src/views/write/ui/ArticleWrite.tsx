"use client";

import {
  ArticleWriteStoreContext,
  createArticleWriteStore,
  useArticleWriteStore
} from "../model";
import React, { useContext, useRef } from "react";

import { SeriesSelectToggle } from "@/widgets/series/ui";
import { TagSelectToggle } from "@/widgets/tag/ui";

import { rehypeMarkdown } from "@/entities/article/lib";
import { usePostArticleImage } from "@/entities/article/model";
import { compressImage } from "@/entities/image/lib";
import { ImageUploadInput as _ImageUploadInput } from "@/entities/image/ui";
import { TagChip } from "@/entities/tag/ui";

import { List } from "@/shared/ui/List";

type ArticleWriteViewProps = {
  initialState?: Partial<{
    // step 1 state
    title: string;
    selectedTags: string[];
    selectedSereis: string;
    markdown: string;
    html: string;

    // step 2 state
    description: string;
    thumbnailUrl: string;
  }>;
};

const Wrapper: React.FC<React.PropsWithChildren<ArticleWriteViewProps>> = ({
  children,
  initialState
}) => {
  const store = createArticleWriteStore(initialState);

  return (
    <ArticleWriteStoreContext value={store}>
      <section className="media-padding-x h-screen">{children}</section>
    </ArticleWriteStoreContext>
  );
};

const TitleInput = () => {
  const store = useContext(ArticleWriteStoreContext)!;
  const setTitle = useArticleWriteStore((state) => state.setTitle);

  return (
    <div>
      <label htmlFor="title" className="sr-only">
        제목
      </label>
      <input
        placeholder="제목을 입력해주세요"
        name="title"
        type="text"
        id="title"
        defaultValue={store?.getState().title}
        onChange={({ target }) => setTitle(target.value)}
        className="w-full p-2 text-3xl outline-none focus:outline-none"
      />
      <div className="h-2 w-32 bg-secondary" />
    </div>
  );
};

const TagList = () => {
  const selectedTags = useArticleWriteStore((state) => state.selectedTags);
  const setSelectedTags = useArticleWriteStore(
    (state) => state.setSelectedTags
  );

  return (
    <div className="relative mt-4 flex items-center gap-2 border bg-gray-100 p-2">
      {/* 태그 셀렉트 토글 */}
      <TagSelectToggle
        onEachTagClick={(tag) => {
          setSelectedTags((prev) => [...prev, tag.name]);
        }}
      />
      {/* 선택된 태그 리스트 */}
      <List.UnOrder>
        {selectedTags.map((name) => (
          <List.Item
            key={name}
            onClick={() =>
              setSelectedTags((prev) => prev.filter((tag) => tag !== name))
            }
          >
            <TagChip>{name}</TagChip>
          </List.Item>
        ))}
      </List.UnOrder>
    </div>
  );
};

const SeriesList = () => {
  const selectedSereis = useArticleWriteStore((state) => state.selectedSereis);
  const setSelectedSeries = useArticleWriteStore(
    (state) => state.setSelectedSeries
  );

  return (
    <div className="flex flex-grow gap-2">
      {/* 시리즈 셀렉트 토글 */}
      <SeriesSelectToggle
        onEachSeriesClick={({ name }) => setSelectedSeries(name)}
      />
      {/* 선택된 시리즈 명 */}
      <p
        className="flex-grow cursor-pointer text-ellipsis text-blue-700"
        onClick={() => {
          setSelectedSeries("");
        }}
      >
        {selectedSereis || ""}
      </p>
    </div>
  );
};

interface ImageUploadProps {
  articleId: number;
}

const ImageUploadInput: React.FC<ImageUploadProps> = ({ articleId }) => {
  const { mutate: uploadImage, isPending } = usePostArticleImage();
  const setMarkdown = useArticleWriteStore((state) => state.setMarkdown);

  const blobImageStack = useRef<string[]>([]);

  const handleImageUplaod = async ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    // API 요청 전 blob url 주소로 이미지를 미리 표현하기 위해 markdown 상태를 변경 합니다.

    blobImageStack.current = [...files].map(
      (file) => `![image](${URL.createObjectURL(file)})`
    );

    setMarkdown((prev) => `${prev}\n${blobImageStack.current.join("\n")}`);

    const compressedFiles = await Promise.all(
      [...files].map((file) => compressImage(file))
    );

    uploadImage(
      {
        files: compressedFiles,
        articleId: articleId.toString()
      },
      // API 요청 성공 혹은 실패 후 마크다운 상태를 변경 합니다.
      {
        onSuccess: (data) => {
          setMarkdown((prev) => {
            blobImageStack.current.forEach((blobUrl, index) => {
              prev = prev.replace(blobUrl, `![image](${data[index].imageUrl})`);
            });

            blobImageStack.current = [];
            return prev;
          });
        },
        onError: () => {
          setMarkdown((prev) => {
            blobImageStack.current.forEach((blobUrl) => {
              prev = prev.replace(blobUrl, "이미지 업로드에 실패했습니다.");
            });

            blobImageStack.current = [];
            return prev;
          });
        }
      }
    );
  };

  return (
    <_ImageUploadInput
      id="article-file-upload"
      labelTitle="이미지 업로드"
      inputProps={{
        onChange: handleImageUplaod,
        disabled: isPending,
        multiple: true
      }}
    />
  );
};

interface MarkdownEditorProps {
  articleId: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ articleId }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const blobImageStack = useRef<string[]>([]);

  const { mutate: uploadImage } = usePostArticleImage();

  const markdown = useArticleWriteStore((state) => state.markdown);
  const setMarkdown = useArticleWriteStore((state) => state.setMarkdown);
  const setHtml = useArticleWriteStore((state) => state.setHtml);

  const handleChangeMarkdown = async ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(target.value);

    const newHtml = await rehypeMarkdown(target.value);
    setHtml(newHtml);
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
        (markdown) =>
          `${markdown.slice(0, selectionStart)}${" ".repeat(TAB_SIZE)}${markdown.slice(selectionEnd)}`
      );

      setTimeout(() => {
        textArea.selectionStart = selectionStart + TAB_SIZE;
        textArea.selectionEnd = selectionStart + TAB_SIZE;
      }, 0);
    }

    // TODO 리팩토링 후 엔터처리 하기
    if (event.key === "Enter") {
    }
  };

  const handleImagePaste = async (
    event: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const files = [...event.clipboardData.items]
      .filter(({ type }) => type.includes("image"))
      .flatMap((dataTransferItem) => dataTransferItem.getAsFile())
      .filter((file) => !!file);

    blobImageStack.current = [...files].map(
      (file) => `![image](${URL.createObjectURL(file)})`
    );

    setMarkdown((prev) => `${prev}\n${blobImageStack.current.join("\n")}`);

    const compressedFiles = await Promise.all(
      [...files].map((file) => compressImage(file))
    );

    uploadImage(
      {
        files: compressedFiles,
        articleId: articleId.toString()
      },
      // API 요청 성공 혹은 실패 후 마크다운 상태를 변경 합니다.
      {
        onSuccess: (data) => {
          setMarkdown((prev) => {
            blobImageStack.current.forEach((blobUrl, index) => {
              prev = prev.replace(blobUrl, `![image](${data[index].imageUrl})`);
            });

            textAreaRef.current!.value = prev;

            blobImageStack.current = [];
            return prev;
          });
        },
        onError: () => {
          setMarkdown((prev) => {
            blobImageStack.current.forEach((blobUrl) => {
              prev = prev.replace(blobUrl, "이미지 업로드에 실패했습니다.");
            });

            blobImageStack.current = [];

            textAreaRef.current!.value = prev;

            return prev;
          });
        }
      }
    );
  };

  return (
    <textarea
      className="flex-grow resize-none border p-2 text-sm focus:outline-none"
      placeholder="게시글 내용을 입력해 주세요"
      autoCorrect="off"
      value={markdown}
      onChange={handleChangeMarkdown}
      onKeyDown={handleKeyDownTextArea}
      onPaste={handleImagePaste}
      ref={textAreaRef}
    />
  );
};

const MarkdownPreview = () => {
  const html = useArticleWriteStore((state) => state.html);
  return (
    <article
      className={
        "hidden flex-grow overflow-auto border p-2 text-sm md:block md:w-1/2"
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const ArticleWriteView = Object.assign(Wrapper, {
  TitleInput,
  TagList,
  SeriesList,
  ImageUploadInput,
  MarkdownEditor,
  MarkdownPreview
});
