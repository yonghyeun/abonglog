"use client";

import { useState } from "react";

import type { Tag } from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui/TagChip";

import { CloseIcon, SearchIcon } from "@/shared/config";
import { Button } from "@/shared/ui/Button";

interface ArticleTagEditorProps {
  tags: Tag[];
  onEachTagClick: (tag: Tag) => void;
  onEachTagRemove: (tag: Tag) => void;
  onAddNewTagAction: (formData: FormData) => void;
  className?: string;
}

export const ArticleTagEditor: React.FC<ArticleTagEditorProps> = ({
  tags,
  onEachTagClick,
  onEachTagRemove,
  onAddNewTagAction,
  className = ""
}) => {
  const [search, setSearch] = useState<string>("");

  const searchedTags = tags.filter(({ name }) => name.includes(search));

  return (
    <section
      className={`flex flex-col gap-4 rounded-sm border p-4 ${className}`}
    >
      {/* Tag Search Input */}
      <div className="flex w-full items-center justify-start gap-2">
        <label htmlFor="search-tag" aria-label="tag 검색어로 찾기">
          <SearchIcon size={24} className="text-gray-300" />
        </label>
        <input
          id="search-tag"
          className="flex-grow rounded-md bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
          placeholder="태그명을 입력해주세요"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>

      {/* Tag List */}
      {searchedTags.length > 0 ? (
        <ul className="flex max-h-12 flex-col gap-2 overflow-y-auto">
          {searchedTags.map((tag) => (
            <li key={tag.name} className="flex items-center justify-between">
              <TagChip
                key={tag.name}
                tagId={tag.id}
                name={tag.name}
                onClick={() => onEachTagClick(tag)}
              />
              {/* Tag Remove Button */}
              <button
                aria-label={`${tag.name} 태그 제거하기`}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-200"
                onClick={() => onEachTagRemove(tag)}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-center text-sm text-gray-400">
          사용 가능한 태그가 없습니다.
        </p>
      )}

      {/* Add New Tag */}
      <form
        className="flex items-end justify-start gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onAddNewTagAction(formData);
        }}
      >
        <label htmlFor="create-tag" className="sr-only">
          새로운 태그 추가하기
        </label>
        <input
          id="search-tag"
          className="rounded-lg bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
          placeholder="태그명을 입력해주세요"
          name="tag"
        />
        <Button
          variant="outlined"
          size="sm"
          type="submit"
          className="flex-shrink-0"
        >
          추가하기
        </Button>
      </form>
    </section>
  );
};
