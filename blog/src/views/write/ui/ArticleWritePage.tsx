"use client";

import { ArticleWriteView } from "./ArticleWrite";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { ArticlePreviewCard } from "@/widgets/article/ui";
import { SeriesSelectToggle } from "@/widgets/series/ui";
import { TagSelectToggle } from "@/widgets/tag/ui";

import { useMarkdown } from "@/features/article/lib";
import { findImageUrl } from "@/features/article/lib/findImageUrl";
import { MarkdownEditor } from "@/features/article/ui";
import { useTagSelecToggle } from "@/features/tag/lib";

import {
  usePostArticleThumbnail,
  usePostNewArticle
} from "@/entities/article/model";
import { ImageGrid, ImageUploadInput } from "@/entities/image/ui";
import { Series } from "@/entities/series/model";
import type { Tag } from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { BackwardIcon, PenIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { List } from "@/shared/ui/List";

interface ArticleWritePageProps {
  articleId: number;
  defaultValue?: string;
}

export const ArticleWritePage: React.FC<ArticleWritePageProps> = ({
  articleId,
  defaultValue = ""
}) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, handleChangeTitle] = useTransitionInput();
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { mutate: uploadNewThumbnail, isPending: isThumbnailUploading } =
    usePostArticleThumbnail();
  const { mutate: addNewArticle } = usePostNewArticle();

  const markdownHook = useMarkdown(articleId, defaultValue);
  const tagSelectToggleHook = useTagSelecToggle();
  const imageUrlsInMarkdown = findImageUrl(markdownHook.markdown);

  const handleStepPublish = () => {
    if (
      !title ||
      !markdownHook.markdown ||
      !tagSelectToggleHook.selectedTags.length ||
      !selectedSeries
    ) {
      // TODO toast 로 변경
      alert("필수 항목을 입력해 주세요");
      return;
    }
    setStep(2);
  };

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

  const handleSaveArticle = (status: "published" | "draft") => {
    if (
      !title ||
      !markdownHook.markdown ||
      !tagSelectToggleHook.selectedTags.length ||
      !selectedSeries
    ) {
      // TODO toast 로 변경
      alert("필수 항목을 입력해 주세요");
      return;
    }

    addNewArticle(
      {
        title,
        content: markdownHook.markdown,
        id: articleId,
        author: "yonghyeun",
        seriesName: setSelectedSeries.name,
        description,
        tags: tagSelectToggleHook.selectedTags,
        status,
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

  // step 1. 글 쓰기 페이지
  if (step === 1) {
    return (
      <ArticleWriteView articleId={articleId}>
        <section className="media-padding-x">
          <div className="mb-2 flex h-screen">
            {/* 글 작성 위젯 */}
            <div className="flex h-full w-full flex-col p-2 md:w-1/2">
              {/* 글 제목 */}
              <ArticleWriteView.TitleInput />
              <ArticleWriteView.TagList />
              <section className="relative flex justify-between p-2 text-sm">
                <ArticleWriteView.SeriesList />
                <ArticleWriteView.ImageUploadInput />
              </section>
              {/* 마크다운 에디터 */}
              <ArticleWriteView.MarkdownEditor />
            </div>
            {/* 마크다운 렌더러 */}
            <ArticleWriteView.MarkdownPreview />
          </div>
          <footer className="mb-2 flex justify-end gap-2">
            <ArticleWriteView.TempSaveButton />
            <Button
              variant="filled"
              size="sm"
              onClick={() => {
                setStep(2);
              }}
            >
              다음 단계
            </Button>
          </footer>
        </section>
      </ArticleWriteView>
    );
  }

  //  step 2. 게시글 발행 페이지
  return (
    <section className="media-padding-x flex h-screen flex-col">
      <header>
        <button
          className="p-2 text-gray-400 hover:bg-gray-200"
          aria-label="글 쓰기 단계로 돌아가기"
          onClick={() => setStep(1)}
        >
          <BackwardIcon size={24} />
        </button>
      </header>
      <section className="flex w-full flex-grow flex-col gap-2 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {/* 아티클 소개글 등록 컴포넌트 */}
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

          {/* 썸네일 등록 컴포넌트 */}
          <div className="flex items-center gap-2">
            <ImageUploadInput
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

          {/* 사용된 image 선택 컴포넌트 */}
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
        </div>

        <div className="flex flex-grow justify-center py-12">
          <div className="w-96">
            {/* 아티클 카드 컴포넌트 */}
            <ArticlePreviewCard
              thumbnailUrl={thumbnailUrl}
              tags={tagSelectToggleHook.selectedTags.map(({ name }) => name)}
              seriesName={selectedSeries?.name || "시리즈 선택"}
              title={title}
              description={description}
              updatedAt={new Date().toLocaleDateString()}
            />

            <div className="flex justify-end">
              <Button
                variant="filled"
                size="sm"
                className="mt-4"
                onClick={() => handleSaveArticle("published")}
              >
                게시글 발행하기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
