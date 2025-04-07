"use client";

import { useDebounce } from "../lib";
import {
  ArticleWriteStoreContext,
  createArticleWriteStore,
  useArticleWriteStore
} from "../model";
import { SeriesSelectToggle } from "./SeriesSelectToggle";
import { TagSelectToggle } from "./TagSelectToggle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useRef } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";

import { findImageUrl } from "@/features/article/lib";

import { rehypeMarkdown } from "@/entities/article/lib";
import {
  usePostArticleImage,
  usePostArticleThumbnail,
  usePostNewArticle
} from "@/entities/article/model";
import { ARTICLE_QUERY_KEY } from "@/entities/article/model/articleQueryKey";
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
import { useNotify } from "@/shared/ui/notify";

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
        className="w-full rounded-md border bg-secondary p-2 text-3xl text-primary outline-none focus:outline-none"
      />
    </div>
  );
};

const TagList = () => {
  const { data } = useGetTagList();
  const tags = useArticleWriteStore((state) => state.tags);
  const setSelectedTags = useArticleWriteStore((state) => state.setTags);

  return (
    <div className="relative mt-4 flex items-center gap-2 rounded-md border bg-secondary p-2">
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

    uploadImage(
      {
        files: [...files],
        articleId: articleId.toString()
      },
      // API 요청 성공 혹은 실패 후 마크다운 상태를 변경 합니다.
      {
        onSuccess: (data) => {
          setContent((prev) => {
            blobImageStack.current.forEach((blobUrl, index) => {
              prev = prev.replace(blobUrl, `![image](${data[index]})`);
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
  const setIsPreviewNeedScroll = useArticleWriteStore(
    (state) => state.setIsPreviewNeedScroll
  );
  const setHtmlWithDebounce = useDebounce(async () => {
    const target = textAreaRef.current;

    if (!target) {
      return;
    }

    const newHtml = await rehypeMarkdown(target.value);
    setHtml(newHtml);

    const isWritingAtBottom =
      target.value.length >= content.length &&
      target.value.length === target.selectionStart;

    setIsPreviewNeedScroll(isWritingAtBottom);
  }, 10);

  const handleChangeMarkdown = async ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(target.value);
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

    uploadImage(
      {
        files: [...files],
        articleId: articleId.toString()
      },
      // API 요청 성공 혹은 실패 후 마크다운 상태를 변경 합니다.
      {
        onSuccess: (data) => {
          setContent((prev) => {
            blobImageStack.current.forEach((blobUrl, index) => {
              prev = prev.replace(blobUrl, `![image](${data[index]})`);
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

  useEffect(() => {
    setHtmlWithDebounce();
  }, [content, setHtmlWithDebounce]);

  return (
    <textarea
      className="flex-grow resize-none rounded-md border bg-secondary p-2 text-lg text-primary focus:outline-none"
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
  const previewRef = useRef<HTMLDivElement | null>(null);
  const isPreviewNeedScroll = useArticleWriteStore(
    (state) => state.isPreviewNeedScroll
  );

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview || !isPreviewNeedScroll) {
      return;
    }

    preview.scrollTo({
      top: preview.scrollHeight,
      behavior: "smooth"
    });
  }, [html, isPreviewNeedScroll]);

  return (
    <article
      className={
        "hidden flex-grow overflow-auto rounded-md border p-2 text-sm text-primary md:block md:w-1/2"
      }
      ref={previewRef}
    >
      {html}
    </article>
  );
};

const TempSaveButton = () => {
  const { mutate: addNewArticle } = usePostNewArticle();
  const store = useContext(ArticleWriteStoreContext)!;
  const { notifyTopLeft } = useNotify();

  const handleSave = useCallback(() => {
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
          notifyTopLeft.success(data.message);
        }
      }
    );
  }, [notifyTopLeft, addNewArticle, store]);

  useEffect(() => {
    const interval = setInterval(handleSave, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, [handleSave]);

  return (
    <Button variant="outlined" size="md" onClick={handleSave}>
      임시 저장
    </Button>
  );
};

const DescriptionTextArea = () => {
  const description = useArticleWriteStore((state) => state.description);
  const setDescription = useArticleWriteStore((state) => state.setDescription);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="article-description"
        className="flex cursor-pointer items-center gap-1 text-secondary hover:text-blue-500"
      >
        <PenIcon size={18} />
        <span>소개글 등록</span>
      </label>
      <textarea
        value={description}
        id="article-description"
        className="border-radius resize-none rounded-md border bg-secondary p-2 text-secondary outline-none"
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
        file: files[files.length - 1],
        articleId: articleId.toString()
      },
      {
        onSuccess: setThumbnailUrl
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <_ImageUploadInput
        id="article-thumbnail-upload"
        labelTitle="썸네일 등록"
        inputProps={{
          onChange: handleUploadThumbnail,
          accept: "image/webp,image/jpeg,image/png,image/avif"
        }}
      />
      {/* 선택된 썸네일 주소 표현 컴포넌트 */}
      <p className="mb-0 line-clamp-1 flex-grow text-ellipsis text-blue-500 text-secondary">
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
        <ImageGrid className="rounded-md">
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
        <p className="flex items-center justify-center rounded-md border px-2 py-12 text-secondary">
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
  const queryClient = useQueryClient();
  const { notifyTopLeft } = useNotify();

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
      notifyTopLeft.error("입력되지 않은 정보가 있습니다.");
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
          notifyTopLeft.success(data.message);

          queryClient.invalidateQueries({
            queryKey: ARTICLE_QUERY_KEY.popularDefault()
          });
          router.push("/");
        }
      }
    );
  };

  return (
    <Button
      variant="filled"
      size="md"
      className="mt-4"
      onClick={handleSaveArticle}
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
