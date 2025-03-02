"use client";

import { ArticleTitleInput } from "./write";
import React from "react";

import { useMarkdown } from "@/features/post/lib";
import { MarkdownEditor } from "@/features/post/ui";
import { useSeriesSelector } from "@/features/series/lib";
import { SeriesSelector } from "@/features/series/ui";
import { TagSelector } from "@/features/tag/ui";
import { useTagSelector } from "@/features/tag/ui/lib";

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
  const { data: allTags } = useGetAllTags();
  const { data: allSeries } = useGetAllSeries();
  const { mutate: addNewTag } = usePostAddNewTag();
  const { mutate: addNewSeries } = usePostAddNewSeries();

  const {
    markdown,
    html,
    textAreaRef,
    handleImagePaste,
    handleChangeMarkdown,
    handleKeyDownTextArea,
    handleImageUpload
  } = useMarkdown(articleId, defaultValue);

  const [title, handleChangeTitle] = useTransitionInput();

  const {
    selectedTags,
    filterUnSelectedTags,
    handleSelectTag,
    handleUnSelectTag
  } = useTagSelector();

  const {
    selectedSeries,
    filterUnSelectedSeries,
    handleSelectSeries,
    handleUnSelectSeries
  } = useSeriesSelector();

  return (
    <section className="media-padding-x mb-2 flex flex-col gap-2">
      <div className="flex h-screen">
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
            {/* 태그 셀렉터 토글 */}
            <details className="cursor-pointer">
              <summary className="text-sm text-gray-400 hover:text-sky-blue">
                태그 선택
              </summary>
              <TagSelector
                className="absolute left-0 top-12 z-50"
                tags={filterUnSelectedTags(allTags)}
                onEachTagClick={handleSelectTag}
                onAddNewTag={addNewTag}
              />
            </details>
            {/* 선택된 태그 리스트 */}
            <TagList tags={selectedTags} onEachTagClick={handleUnSelectTag} />
          </div>

          <section className="relative flex justify-between p-2 text-sm">
            <div className="flex flex-grow gap-2">
              {/* 시리즈 셀렉터 토글 */}
              <details className="cursor-pointer">
                <summary className="text-gray-400 hover:text-sky-blue">
                  시리즈 목록
                </summary>
                <SeriesSelector
                  className="absolute left-0 top-12 z-50"
                  series={filterUnSelectedSeries(allSeries)}
                  onEachSeriesClick={handleSelectSeries}
                  onAddNewSeries={addNewSeries}
                />
              </details>
              {/* 선택된 시리즈 명 */}
              <p
                className="flex-grow cursor-pointer text-ellipsis text-gray-600"
                onClick={handleUnSelectSeries}
              >
                {selectedSeries?.name}
              </p>
            </div>

            {/* 이미지 업로드 인풋 */}
            <ImageUploadInput onChange={handleImageUpload} />
          </section>

          {/* 마크다운 에디터 */}
          <MarkdownEditor
            className="flex-grow"
            value={markdown}
            ref={textAreaRef}
            onPaste={handleImagePaste}
            onChange={handleChangeMarkdown}
            onKeyDown={handleKeyDownTextArea}
          />
        </div>
        {/* 마크다운 렌더러 */}
        <section
          className={
            "hidden flex-grow rounded-lg border p-2 text-sm md:block md:w-1/2"
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <footer className="flex justify-end gap-2">
        <Button variant="outlined" size="md">
          임시 저장
        </Button>
        <Button variant="filled" size="md">
          게시글 발행
        </Button>
      </footer>
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
