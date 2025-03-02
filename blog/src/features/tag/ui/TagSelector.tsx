"use client";

import type { Tag } from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { SearchIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";

interface TagSelectorProps {
  tags: Tag[];
  onEachTagClick: (tag: Tag) => void;
  onAddNewTag: (tagName: string) => void;
  className?: string;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  onEachTagClick,
  onAddNewTag,
  className = ""
}) => {
  // 태그 검색어
  const [searchText, handleChangeSearchText] = useTransitionInput();
  const searchedTags = tags.filter(({ name }) => name.includes(searchText));
  // 태그 추가
  const [newTagName, handleChangeNewTagName] = useTransitionInput();
  const isAvailableNewTag =
    newTagName.length > 0 && tags.every(({ name }) => name !== newTagName);

  return (
    <section
      className={`flex flex-col gap-4 rounded-lg border bg-primary p-4 ${className}`}
    >
      {/* search input */}
      <div className="flex items-center justify-start gap-2">
        <label htmlFor="search-tag" aria-label="tag 검색어로 찾기">
          <SearchIcon size={24} className="text-gray-300" />
        </label>
        <input
          id="search-tag"
          className="flex-grow rounded-md bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
          placeholder="태그명을 입력해주세요"
          onChange={handleChangeSearchText}
        />
      </div>

      {/* Tag List */}
      {tags.length > 0 ? (
        <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto">
          {searchedTags.map((tag) => (
            <li key={tag.name} className="flex items-center justify-between">
              <TagChip
                key={tag.name}
                name={tag.name}
                onClick={() => onEachTagClick(tag)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center px-2 py-4 text-gray-400">
          현재 태그가 존재하지 않습니다.
        </div>
      )}

      {/* Tag Add Form */}
      <form
        className="flex items-end justify-start gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          onAddNewTag(newTagName);
        }}
      >
        <label htmlFor="create-tag" className="sr-only">
          새로운 태그 추가하기
        </label>
        <input
          id="search-tag"
          className="rounded-lg bg-secondary p-2 text-sm text-gray-400 outline-none focus:outline-sky-blue"
          placeholder="새로운 태그명을 입력해주세요"
          name="tag"
          onChange={handleChangeNewTagName}
        />
        <Button
          variant="outlined"
          size="sm"
          type="submit"
          disabled={!isAvailableNewTag}
        >
          추가하기
        </Button>
      </form>
    </section>
  );
};
