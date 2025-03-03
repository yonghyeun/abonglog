"use client";

import React, { useState } from "react";

import { useMarkdown } from "@/features/post/lib";
import { findImageUrl } from "@/features/post/lib/findImageUrl";
import { MarkdownEditor } from "@/features/post/ui";
import { useSeriesSelectToggle } from "@/features/series/lib";
import { SeriesSelectToggle } from "@/features/series/ui";
import { useTagSelecToggle } from "@/features/tag/lib";
import { TagSelectToggle } from "@/features/tag/ui";

import { usePostArticleThumbnail } from "@/entities/article/model";
import { useGetAllSeries, usePostAddNewSeries } from "@/entities/series/model";
import {
  type Tag,
  useGetAllTags,
  usePostAddNewTag
} from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { BackwardIcon, FileClipIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { Profile } from "@/shared/ui/Profile";

interface ArticleWriteWidgetProps {
  articleId: string;
  defaultValue?: string;
}

const MOCK_MARKDOWN = `
룰루라라 입니다 

라랄ㄹ라 한잊 
ㄹ라랄라 두입 


`;

export const ArticleWriteWidget: React.FC<ArticleWriteWidgetProps> = ({
  articleId,
  defaultValue = ""
}) => {
  const [step, setStep] = useState<1 | 2>(2);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const { data: allTags } = useGetAllTags();
  const { data: allSeries } = useGetAllSeries();
  const { mutate: addNewTag } = usePostAddNewTag();
  const { mutate: addNewSeries } = usePostAddNewSeries();
  const { mutate: uploadNewThumbnail, isPending: isThumbnailUploading } =
    usePostArticleThumbnail();

  const [title, handleChangeTitle] = useTransitionInput();
  const markdownHook = useMarkdown(articleId, MOCK_MARKDOWN);
  const tagSelectToggleHook = useTagSelecToggle();
  const seriesSelectToggleHook = useSeriesSelectToggle();

  const imageUrlsInMarkdown = findImageUrl(markdownHook.markdown);

  const handleStepPublish = () => {
    if (
      !title ||
      !markdownHook.markdown ||
      !tagSelectToggleHook.selectedTags.length ||
      !seriesSelectToggleHook.selectedSeries
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
        articleId
      },
      {
        onSuccess: ({ imageUrl }) => setThumbnailUrl(imageUrl)
      }
    );
  };

  // step 1. 글 쓰기 페이지
  if (step === 1) {
    return (
      <section className="media-padding-x">
        <div className="mb-2 flex h-screen">
          {/* 글 작성 위젯 */}
          <div className="flex h-full w-full flex-col p-2 md:w-1/2">
            {/* 글 제목 */}
            <ArticleTitleInput
              placeholder="제목을 입력해주세요"
              name="title"
              type="text"
              id="title"
              onChange={handleChangeTitle}
            />
            <div className="relative mt-4 flex gap-2 rounded-md border bg-gray-100 p-2">
              {/* 태그 셀렉트 토글 */}
              <TagSelectToggle
                tags={tagSelectToggleHook.filterUnSelectedTags(allTags)}
                onEachTagClick={tagSelectToggleHook.handleSelectTag}
                onAddNewTag={addNewTag}
              />
              {/* 선택된 태그 리스트 */}
              <TagList
                tags={tagSelectToggleHook.selectedTags}
                onEachTagClick={tagSelectToggleHook.handleUnSelectTag}
              />
            </div>

            <section className="relative flex justify-between p-2 text-sm">
              <div className="flex flex-grow gap-2">
                {/* 시리즈 셀렉트 토글 */}
                <SeriesSelectToggle
                  series={seriesSelectToggleHook.filterUnSelectedSeries(
                    allSeries
                  )}
                  onEachSeriesClick={seriesSelectToggleHook.handleSelectSeries}
                  onAddNewSeries={addNewSeries}
                />
                {/* 선택된 시리즈 명 */}
                <p
                  className="flex-grow cursor-pointer text-ellipsis text-sky-blue"
                  onClick={seriesSelectToggleHook.handleUnSelectSeries}
                >
                  {seriesSelectToggleHook.selectedSeries?.name}
                </p>
              </div>

              {/* 이미지 업로드 인풋 */}
              <ImageUploadInput
                onChange={markdownHook.handleImageUpload}
                label="파일 첨부"
              />
            </section>

            {/* 마크다운 에디터 */}
            <MarkdownEditor
              className="flex-grow"
              value={markdownHook.markdown}
              ref={markdownHook.textAreaRef}
              onPaste={markdownHook.handleImagePaste}
              onChange={markdownHook.handleChangeMarkdown}
              onKeyDown={markdownHook.handleKeyDownTextArea}
            />
          </div>
          {/* 마크다운 렌더러 */}
          <section
            className={
              "hidden flex-grow rounded-lg border p-2 text-sm md:block md:w-1/2"
            }
            dangerouslySetInnerHTML={{ __html: markdownHook.html }}
          />
        </div>

        <footer className="mb-2 flex justify-end gap-2">
          <Button variant="outlined" size="md">
            임시 저장
          </Button>
          <Button variant="filled" size="md" onClick={handleStepPublish}>
            게시글 발행
          </Button>
        </footer>
      </section>
    );
  }

  //  step 2. 게시글 발행 페이지
  return (
    <section className="media-padding-x flex h-screen flex-col">
      <header>
        <button
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-200"
          aria-label="글 쓰기 단계로 돌아가기"
          onClick={() => setStep(1)}
        >
          <BackwardIcon size={24} />
        </button>
      </header>
      <section className="flex w-full flex-grow flex-col gap-2 md:flex-row">
        {/* 썸네일 등록 컴포넌트 */}
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {/* iamge input 컴포넌트 */}
          <div className="flex items-center gap-2 border-b py-2">
            <div className="flex-shrink-0 text-gray-400">
              <label
                htmlFor="article-thumbnail-upload"
                className="flex cursor-pointer items-center gap-1 hover:text-sky-blue"
                aria-labelledby="article-thumbnail-upload"
              >
                <FileClipIcon size={20} />
                <span aria-labelledby="article-thumbnail-upload">
                  썸네일 등록
                </span>
              </label>
              <input
                type="file"
                className="sr-only"
                id="article-thumbnail-upload"
                name="image"
                onChange={handleUploadThumbnail}
              />
            </div>

            <p className="mb-0 line-clamp-1 flex-grow text-ellipsis text-sky-blue">
              {isThumbnailUploading ? "썸네일 업로드 중..." : thumbnailUrl}
            </p>
          </div>
          {/* 사용된 image 선택 컴포넌트 */}

          {imageUrlsInMarkdown.length > 0 ? (
            <ul className="flex-grow overflow-y-auto py-2">
              <p className="text-gray-400">아티클에 사용된 이미지 목록</p>
              <li className="grid grid-cols-3 gap-2">
                {imageUrlsInMarkdown.map(({ src, alt }) => (
                  <Button
                    variant="outlined"
                    size="sm"
                    key={src}
                    onClick={() => setThumbnailUrl(src)}
                    className={`flex flex-col justify-between ${
                      src === thumbnailUrl
                        ? "border-sky-blue"
                        : "border-gray-200"
                    } `}
                  >
                    {/* TODO 이미지 최적화 직접 구현하기 */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={alt} className="w-full object-cover" />
                    <p className="text-ellipsis text-sm text-gray-400">{alt}</p>
                  </Button>
                ))}
              </li>
            </ul>
          ) : (
            <p className="flex items-center justify-center rounded-lg border px-2 py-12 text-gray-600">
              아티클에 사용된 이미지가 없습니다.
            </p>
          )}
        </div>
        {/* 소개글 등록 컴포넌트 */}
        <div className="flex flex-grow justify-center py-12">
          <div className="w-96">
            <section className="flex aspect-video flex-col gap-2 rounded-lg border px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
              {/* 이미지 컴포넌트 */}
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="article-thumbnail"
                  className="aspect-video h-2/3 w-full object-cover"
                />
              ) : (
                <div className="aspect-video h-2/3 w-full bg-gray-200" />
              )}
              {/* 태그들 */}
              <TagList
                tags={tagSelectToggleHook.selectedTags}
                onEachTagClick={() => {}}
              />
              <div>
                {/* 제목 */}
                <h3>{title}</h3>
                {/* 시리즈명 */}
                <p className="text-sm text-gray-500">
                  {seriesSelectToggleHook.selectedSeries?.name}
                </p>
              </div>
              <div className="flex flex-col gap-4 text-sm text-gray-500">
                {/* 소개글 textarea */}
                <textarea
                  className="resize-none border outline-none"
                  placeholder="아티클에 대한 소개글을 작성해 주세요"
                  onChange={({ target }) => setDescription(target.value)}
                />
                {/* 프로필 , 프로필명 , 작성시간 */}
                <div className="flex gap-2">
                  <Profile
                    size="sm"
                    src="/images/profile.jpg"
                    alt="프로필 이미지"
                  />
                  <div className="text-xs">
                    <p>yonghyeun</p>
                    <p>{new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

interface TagListProps {
  tags: Tag[];
  onEachTagClick: (tag: Tag) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onEachTagClick }) => {
  return (
    <ul className="flex flex-grow flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={`${tag.id}-selected-tagList`}>
          <TagChip name={tag.name} onClick={() => onEachTagClick(tag)} />
        </li>
      ))}
    </ul>
  );
};

const ImageUploadInput: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}> = ({ onChange, label }) => {
  return (
    <div className="text-gray-400">
      <label
        htmlFor="article-file-upload"
        className="flex cursor-pointer items-center gap-1 hover:text-sky-blue"
        aria-labelledby="article-file-upload"
      >
        <FileClipIcon size={20} />
        <span aria-labelledby="article-file-upload">{label}</span>
      </label>
      <input
        type="file"
        multiple
        className="sr-only"
        id="article-file-upload"
        name="image"
        onChange={onChange}
      />
    </div>
  );
};

interface MarkdownRendererProps {
  html: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  html,
  className
}) => {
  return (
    <section
      className={`p-2 text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const ArticleTitleInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        제목
      </label>
      <input
        id={id}
        {...props}
        className="w-full p-2 text-3xl outline-none focus:outline-none"
      />
      <div className="h-2 w-32 bg-secondary" />
    </div>
  );
};
