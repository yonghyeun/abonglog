"use client";

import {
  ArticleWriteStoreContext,
  createArticleWriteStore,
  useArticleWriteStore
} from "../model";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";
import { SeriesSelectToggle } from "@/widgets/series/ui";
import { TagSelectToggle } from "@/widgets/tag/ui";

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

  articleId: number;
};

const Wrapper: React.FC<React.PropsWithChildren<ArticleWriteViewProps>> = ({
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
        tags={data.filter((tag) => !selectedTags.includes(tag.name))}
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
  const { data } = useGetSeriesList();
  const selectedSereis = useArticleWriteStore((state) => state.selectedSereis);
  const setSelectedSeries = useArticleWriteStore(
    (state) => state.setSelectedSeries
  );

  return (
    <div className="flex flex-grow gap-2">
      {/* 시리즈 셀렉트 토글 */}
      <SeriesSelectToggle
        seriesList={data.filter((series) => series.name !== selectedSereis)}
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

const ImageUploadInput: React.FC = () => {
  const { mutate: uploadImage, isPending } = usePostArticleImage();

  const articleId = useArticleWriteStore((state) => state.articleId);
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

const MarkdownEditor = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const blobImageStack = useRef<string[]>([]);

  const { mutate: uploadImage } = usePostArticleImage();

  const markdown = useArticleWriteStore((state) => state.markdown);
  const articleId = useArticleWriteStore((state) => state.articleId);
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

const TempSaveButton = () => {
  const router = useRouter();
  const { mutate: addNewArticle } = usePostNewArticle();
  const store = useContext(ArticleWriteStoreContext)!;

  const handleSave = () => {
    const {
      title,
      markdown,
      selectedTags,
      selectedSereis,
      articleId,
      thumbnailUrl,
      description
    } = store.getState();

    addNewArticle(
      {
        title: title || `${articleId} 의 임시 저장된 글`,
        content: markdown,
        tags: selectedTags,
        seriesName: selectedSereis,
        status: "draft",
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
  const markdown = useArticleWriteStore((state) => state.markdown);

  const imageUrlsInMarkdown = findImageUrl(markdown);

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
      markdown,
      selectedTags,
      selectedSereis,
      articleId,
      thumbnailUrl,
      description
    } = store.getState();

    if (
      !title ||
      !markdown ||
      !selectedTags.length ||
      !selectedSereis ||
      !thumbnailUrl ||
      !description
    ) {
      alert("입력되지 않은 정보가 있습니다.");
      return;
    }

    addNewArticle(
      {
        title: title,
        content: markdown,
        tags: selectedTags,
        seriesName: selectedSereis,
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
  const { title, selectedTags, selectedSereis, thumbnailUrl, description } =
    useArticleWriteStore((state) => state);

  return (
    <ArticlePreviewCard
      updatedAt={new Date().toLocaleString()}
      title={title}
      tags={selectedTags}
      seriesName={selectedSereis}
      thumbnailUrl={thumbnailUrl}
      description={description}
    />
  );
};

export const ArticleWriteView = Object.assign(Wrapper, {
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
