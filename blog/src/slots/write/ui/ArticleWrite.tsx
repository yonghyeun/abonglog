"use client";

import {
  ArticleWriteStoreContext,
  createArticleWriteStore,
  useArticleWriteStore
} from "../model";
import { SeriesSelectToggle, TagSelectToggle } from "./items";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { findImageUrl } from "@/features/article/lib/findImageUrl";

import { rehypeMarkdown } from "@/entities/article/lib";
import {
  usePostArticleImage,
  usePostArticleThumbnail,
  usePostNewArticle
} from "@/entities/article/model";
import { compressImage } from "@/entities/image/lib";
import {
  ImageGrid,
  ImageUploadInput as _ImageUploadInput
} from "@/entities/image/ui";
import { useGetSeriesList } from "@/entities/series/model";
import { useGetTagList } from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { PenIcon } from "@/shared/config";
import { Button } from "@/shared/ui/Button";
import { List } from "@/shared/ui/List";

type ArticleWriteProps = {
  initialState?: Partial<{
    // step 1 state
    title: string;
    tags: string[];
    seriesName: string;
    content: string;
    html: string;

    // step 2 state
    description: string;
    thumbnailUrl: string | null;
  }>;

  articleId: number;
};

const Wrapper: React.FC<React.PropsWithChildren<ArticleWriteProps>> = ({
  children,
  initialState,
  articleId
}) => {
  const store = useRef(
    createArticleWriteStore({ ...initialState, articleId })
  ).current;

  return (
    <ArticleWriteStoreContext value={store}>
      {children}
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
  const { data } = useGetTagList();
  const tags = useArticleWriteStore((state) => state.tags);
  const setSelectedTags = useArticleWriteStore((state) => state.setTags);

  return (
    <div className="relative mt-4 flex items-center gap-2 border bg-gray-100 p-2">
      {/* 태그 셀렉트 토글 */}
      <TagSelectToggle
        onEachTagClick={(tag) => {
          setSelectedTags((prev) => [...prev, tag.name]);
        }}
        tags={data.filter((tag) => !tags.includes(tag.name))}
      />
      {/* 선택된 태그 리스트 */}
      <List.UnOrder>
        {tags.map((name) => (
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
  const { data } = useGetSeriesList();
  const seriesName = useArticleWriteStore((state) => state.seriesName);
  const setSeriesName = useArticleWriteStore((state) => state.setSeriesName);

  return (
    <div className="flex flex-grow gap-2">
      {/* 시리즈 셀렉트 토글 */}
      <SeriesSelectToggle
        seriesList={data.filter((series) => series.name !== seriesName)}
        onEachSeriesClick={({ name }) => setSeriesName(name)}
      />
      {/* 선택된 시리즈 명 */}
      <p
        className="flex-grow cursor-pointer text-ellipsis text-blue-700"
        onClick={() => {
          setSeriesName("");
        }}
      >
        {seriesName || ""}
      </p>
    </div>
  );
};

const ImageUploadInput: React.FC = () => {
  const { mutate: uploadImage, isPending } = usePostArticleImage();

  const articleId = useArticleWriteStore((state) => state.articleId);
  const setContent = useArticleWriteStore((state) => state.setContent);

  const blobImageStack = useRef<string[]>([]);

  const handleImageUpload = async ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    // API 요청 전 blob url 주소로 이미지를 미리 표현하기 위해 content 상태를 변경 합니다.

    blobImageStack.current = [...files].map(
      (file) => `![image](${URL.createObjectURL(file)})`
    );

    setContent((prev) => `${prev}\n${blobImageStack.current.join("\n")}`);

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
          setContent((prev) => {
            blobImageStack.current.forEach((blobUrl, index) => {
              prev = prev.replace(blobUrl, `![image](${data[index].imageUrl})`);
            });

            blobImageStack.current = [];
            return prev;
          });
        },
        onError: () => {
          setContent((prev) => {
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
        onChange: handleImageUpload,
        disabled: isPending,
        multiple: true
      }}
    />
  );
};

const MarkdownEditor = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const blobImageStack = useRef<string[]>([]);

  const { mutate: uploadImage } = usePostArticleImage();

  const content = useArticleWriteStore((state) => state.content);
  const articleId = useArticleWriteStore((state) => state.articleId);
  const setContent = useArticleWriteStore((state) => state.setContent);
  const setHtml = useArticleWriteStore((state) => state.setHtml);
  const setScrollOffset = useArticleWriteStore(
    (state) => state.setScrollOffset
  );

  const handleChangeMarkdown = async ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(target.value);

    const newHtml = await rehypeMarkdown(target.value);
    setHtml(newHtml);

    setScrollOffset(target.scrollTop);
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

      setContent(
        (content) =>
          `${content.slice(0, selectionStart)}${" ".repeat(TAB_SIZE)}${content.slice(selectionEnd)}`
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

    if (files.length === 0) {
      return;
    }

    blobImageStack.current = [...files].map(
      (file) => `![image](${URL.createObjectURL(file)})`
    );

    setContent((prev) => `${prev}\n${blobImageStack.current.join("\n")}`);

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
          setContent((prev) => {
            blobImageStack.current.forEach((blobUrl, index) => {
              prev = prev.replace(blobUrl, `![image](${data[index].imageUrl})`);
            });

            textAreaRef.current!.value = prev;

            blobImageStack.current = [];
            return prev;
          });
        },
        onError: () => {
          setContent((prev) => {
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
      value={content}
      onChange={handleChangeMarkdown}
      onKeyDown={handleKeyDownTextArea}
      onPaste={handleImagePaste}
      ref={textAreaRef}
    />
  );
};

const MarkdownPreview = () => {
  const html = useArticleWriteStore((state) => state.html);
  const scrollHeight = useArticleWriteStore((state) => state.scrollOffset);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview) {
      return;
    }

    preview.scrollTo({
      top: scrollHeight,
      behavior: "smooth"
    });
  }, [scrollHeight]);

  return (
    <article
      className={
        "hidden flex-grow overflow-auto border p-2 text-sm md:block md:w-1/2"
      }
      dangerouslySetInnerHTML={{ __html: html }}
      ref={previewRef}
    />
  );
};

const TempSaveButton = () => {
  const router = useRouter();
  const { mutate: addNewArticle } = usePostNewArticle();
  const store = useContext(ArticleWriteStoreContext)!;

  const handleSave = () => {
    const {
      title,
      content,
      tags,
      seriesName,
      articleId,
      thumbnailUrl,
      description
    } = store.getState();

    addNewArticle(
      {
        title: title || `${articleId} 의 임시 저장된 글`,
        content: content,
        tags: tags,
        seriesName: seriesName,
        status: "draft",
        id: articleId,
        author: "yonghyeun",
        description,
        thumbnailUrl
      },
      {
        onSuccess: (data) => {
          alert(data.message);
          router.push("/temp");
        }
      }
    );
  };

  return (
    <Button variant="outlined" size="sm" onClick={handleSave}>
      임시 저장
    </Button>
  );
};

const DescriptionTextArea = () => {
  const setDescription = useArticleWriteStore((state) => state.setDescription);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="article-description"
        className="flex cursor-pointer items-center gap-1 text-gray-400 hover:text-blue-700"
      >
        <PenIcon size={18} />
        <span>소개글 등록</span>
      </label>
      <textarea
        id="article-description"
        className="resize-none border p-2 text-gray-600 outline-none"
        placeholder="아티클에 대한 소개글을 작성해 주세요"
        onChange={({ target }) => setDescription(target.value)}
      />
    </div>
  );
};

const ThumbnailUploadInput = () => {
  const thumbnailUrl = useArticleWriteStore((state) => state.thumbnailUrl);
  const { mutate: uploadNewThumbnail, isPending: isThumbnailUploading } =
    usePostArticleThumbnail();
  const articleId = useArticleWriteStore((state) => state.articleId);
  const setThumbnailUrl = useArticleWriteStore(
    (state) => state.setThumbnailUrl
  );

  const handleUploadThumbnail = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;

    if (!files || !files.length) {
      return;
    }

    uploadNewThumbnail(
      {
        file: files[0],
        articleId: articleId.toString()
      },
      {
        onSuccess: ({ imageUrl }) => setThumbnailUrl(imageUrl)
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <_ImageUploadInput
        id="article-thumbnail-upload"
        labelTitle="썸네일 등록"
        inputProps={{
          onChange: handleUploadThumbnail
        }}
      />
      {/* 선택된 썸네일 주소 표현 컴포넌트 */}
      <p className="mb-0 line-clamp-1 flex-grow text-ellipsis text-blue-700">
        {isThumbnailUploading ? "썸네일 업로드 중..." : thumbnailUrl}
      </p>
    </div>
  );
};

const ArticleImageGrid = () => {
  const content = useArticleWriteStore((state) => state.content);

  const imageUrlsInMarkdown = findImageUrl(content);

  const thumbnailUrl = useArticleWriteStore((state) => state.thumbnailUrl);
  const setThumbnailUrl = useArticleWriteStore(
    (state) => state.setThumbnailUrl
  );

  return (
    <>
      {imageUrlsInMarkdown.length > 0 ? (
        <ImageGrid>
          <ImageGrid.Title>아티클에 사용된 이미지들</ImageGrid.Title>
          <ImageGrid.Container>
            {imageUrlsInMarkdown.map((image, idx) => (
              <ImageGrid.Item
                key={idx}
                image={image}
                selectedImageUrl={thumbnailUrl}
                onSelectImage={setThumbnailUrl}
              />
            ))}
          </ImageGrid.Container>
        </ImageGrid>
      ) : (
        <p className="flex items-center justify-center border px-2 py-12 text-gray-600">
          아티클 본문에서 사용된 이미지가 없습니다.
        </p>
      )}
    </>
  );
};

const SubmitButton = () => {
  const router = useRouter();
  const { mutate: addNewArticle } = usePostNewArticle();
  const store = useContext(ArticleWriteStoreContext)!;

  const handleSaveArticle = () => {
    const {
      title,
      content,
      tags,
      seriesName,
      articleId,
      thumbnailUrl,
      description
    } = store.getState();

    if (
      !title ||
      !content ||
      !tags.length ||
      !seriesName ||
      !thumbnailUrl ||
      !description
    ) {
      alert("입력되지 않은 정보가 있습니다.");
      return;
    }

    addNewArticle(
      {
        title: title,
        content: content,
        tags: tags,
        seriesName: seriesName,
        status: "published",
        id: articleId,
        author: "yonghyeun",
        description,
        thumbnailUrl
      },
      {
        onSuccess: (data) => {
          alert(data.message);
          router.push("/");
        }
      }
    );
  };

  return (
    <Button
      variant="filled"
      size="sm"
      className="mt-4"
      onClick={() => handleSaveArticle()}
    >
      게시글 발행하기
    </Button>
  );
};

const PreviewCard = () => {
  const { title, tags, seriesName, thumbnailUrl, description } =
    useArticleWriteStore((state) => state);

  return (
    <ArticlePreviewCard
      updatedAt={new Date().toLocaleString()}
      title={title}
      tags={tags}
      seriesName={seriesName}
      thumbnailUrl={thumbnailUrl}
      description={description}
    />
  );
};

export const ArticleWrite = Object.assign(Wrapper, {
  TitleInput,
  TagList,
  SeriesList,
  ImageUploadInput,
  MarkdownEditor,
  MarkdownPreview,
  TempSaveButton,
  DescriptionTextArea,
  ThumbnailUploadInput,
  ArticleImageGrid,
  SubmitButton,
  PreviewCard
});
