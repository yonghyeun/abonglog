"use client";

import type { Tag } from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { SearchIcon } from "@/shared/config";
import { useTransitionInput } from "@/shared/lib";
import { Selector } from "@/shared/ui/Selector";

interface TagSelectToggleProps {
  tags: Tag[];
  onEachTagClick: (tag: Tag) => void;
  onAddNewTag: (tagName: string) => void;
}

export const TagSelectToggle: React.FC<TagSelectToggleProps> = ({
  tags,
  onEachTagClick,
  onAddNewTag
}) => {
  const [searchText, handleChangeSearchText] = useTransitionInput();
  const [newTagName, handleChangeNewTagName] = useTransitionInput();

  const isAvailableNewTag =
    newTagName.length > 0 &&
    tags.every(({ name }) => name.toLowerCase() !== newTagName.toLowerCase());

  const filterTags = (tags: Tag[]) =>
    tags.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <details className="cursor-pointer">
      <summary className="text-sm text-gray-400 hover:text-blue-700">
        태그 선택
      </summary>
      <Selector className="absolute left-0 top-12 z-50">
        <div className="flex items-center justify-start gap-2">
          <Selector.Label
            value={<SearchIcon size={24} />}
            htmlFor="search-tag"
            aria-label="tag 검색어로 찾기"
          />
          <Selector.Input
            id="search-tag"
            placeholder="태그명을 입력해주세요"
            onChange={handleChangeSearchText}
          />
        </div>
        {/* Tag List */}
        {tags.length > 0 ? (
          <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto">
            {filterTags(tags).map((tag) => (
              <li key={tag.name} className="flex items-center justify-between">
                <TagChip key={tag.name} onClick={() => onEachTagClick(tag)}>
                  {tag.name}
                </TagChip>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center px-2 py-4 text-gray-400">
            현재 태그가 존재하지 않습니다.
          </div>
        )}

        <Selector.Form
          onSubmit={(event) => {
            event.preventDefault();
            onAddNewTag(newTagName);
          }}
        >
          <Selector.Label className="sr-only" value="새로운 태그 추가하기" />
          <Selector.Input
            placeholder="새로운 태그명을 입력해주세요"
            onChange={handleChangeNewTagName}
          />
          <Selector.SubmitButton disabled={!isAvailableNewTag}>
            태그 추가
          </Selector.SubmitButton>
        </Selector.Form>
      </Selector>
    </details>
  );
};
