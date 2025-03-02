"use client";

import { ArticleTitleInput, MarkdownRenderer } from "./write";
import { useState } from "react";

import { MarkdownEditor } from "@/features/post/ui";
import { TagSelector } from "@/features/tag/ui";

import {
  type Tag,
  useGetAllTags,
  usePostAddNewTag
} from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { useTransitionInput } from "@/shared/lib";

export const ArticleWriteWidget = () => {
  const { data: allTags } = useGetAllTags();
  const { mutate: addNewTag } = usePostAddNewTag();

  const [title, handleChangeTitle] = useTransitionInput();
  // tag editor 에서 선택된 태그들
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  // tag Editor 에서 선택되지 않은 태그들
  const unSelectedTags = allTags.filter(
    (tag) => !selectedTags.map(({ id }) => id).includes(tag.id)
  );

  return (
    <section className="media-padding-x flex h-screen rounded-md">
      {/* 글 작성 위젯 */}
      <div className="h-full w-full p-2 md:w-1/2">
        {/* 글 제목 */}
        <ArticleTitleInput
          placeholder="제목을 입력해주세요"
          name="title"
          type="text"
          id="title"
          onChange={handleChangeTitle}
        />
        <div className="relative mt-4 flex gap-2 rounded-md border bg-gray-100 p-2">
          {/* 태그 에디터 토글 */}
          <details open className="cursor-pointer">
            <summary className="text-gray-400">태그 선택</summary>
            <TagSelector
              className="absolute left-0 top-12 z-50"
              tags={unSelectedTags}
              onEachTagClick={(tag) => setSelectedTags([...selectedTags, tag])}
              onAddNewTag={addNewTag}
            />
          </details>
          {/* 선택된 태그 리스트 */}
          <SelectedTagList
            selectedTags={selectedTags}
            onEachTagClick={(tag) =>
              setSelectedTags(selectedTags.filter(({ id }) => id !== tag.id))
            }
          />
        </div>
        <MarkdownEditor />
      </div>
      {/* 마크다운 렌더러 위젯 */}
      <MarkdownRenderer />
    </section>
  );
};

interface SelectedTagListProps {
  selectedTags: Tag[];
  onEachTagClick: (tag: Tag) => void;
}

const SelectedTagList: React.FC<SelectedTagListProps> = ({
  selectedTags,
  onEachTagClick
}) => {
  return (
    <ul className="flex flex-grow flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <li key={`${tag.id}-selected-tagList`}>
          <TagChip name={tag.name} onClick={() => onEachTagClick(tag)} />
        </li>
      ))}
    </ul>
  );
};
