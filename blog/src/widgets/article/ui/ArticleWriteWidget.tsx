"use client";

import React, { useState } from "react";

import { useMarkdown } from "@/features/post/lib";
import { MarkdownEditor } from "@/features/post/ui";
import { useSeriesSelectToggle } from "@/features/series/lib";
import { SeriesSelectToggle } from "@/features/series/ui";
import { useTagSelecToggle } from "@/features/tag/lib";
import { TagSelectToggle } from "@/features/tag/ui";

import { useGetAllSeries, usePostAddNewSeries } from "@/entities/series/model";
import {
  type Tag,
  useGetAllTags,
  usePostAddNewTag
} from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { FileClipIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";

interface ArticleWriteWidgetProps {
  articleId: string;
  defaultValue?: string;
}

export const ArticleWriteWidget: React.FC<ArticleWriteWidgetProps> = ({
  articleId,
  defaultValue = ""
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const { data: allTags } = useGetAllTags();
  const { data: allSeries } = useGetAllSeries();
  const { mutate: addNewTag } = usePostAddNewTag();
  const { mutate: addNewSeries } = usePostAddNewSeries();

  const [title, handleChangeTitle] = useTransitionInput();
  const markdownHook = useMarkdown(articleId, defaultValue);
  const tagSelectToggleHook = useTagSelecToggle();
  const seriesSelectToggleHook = useSeriesSelectToggle();

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
              <ImageUploadInput onChange={markdownHook.handleImageUpload} />
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
          <Button variant="filled" size="md" onClick={() => setStep(2)}>
            게시글 발행
          </Button>
        </footer>
      </section>
    );
  }

  return <section className="media-padding-x">2</section>;
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
}> = ({ onChange }) => {
  return (
    <div className="text-gray-400">
      <label
        htmlFor="article-file-upload"
        className="flex cursor-pointer items-center gap-1 hover:text-sky-blue"
      >
        <FileClipIcon size={20} />
        <span>파일 첨부</span>
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
