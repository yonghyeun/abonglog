"use client";

import { useTagSelectToggle } from "../lib";
import * as E from "@fp/either";
import { pipe } from "@fxts/core";

import {
  type Tag,
  parseTagSchema,
  usePostAddNewTag
} from "@/entities/tag/model";
import { TagChip } from "@/entities/tag/ui";

import { SearchIcon } from "@/shared/config";
import { Selector } from "@/shared/ui/Selector";
import { useNotify } from "@/shared/ui/notify";

interface TagSelectToggleProps {
  tags: Tag[];
  onEachTagClick: (tag: Tag) => void;
}

export const TagSelectToggle: React.FC<TagSelectToggleProps> = ({
  tags,
  onEachTagClick
}) => {
  const {
    newTagName,
    handleChangeNewTagName,
    handleChangeSearchText,
    isAvailableAddNewTag,
    filterBySearchedText
  } = useTagSelectToggle();
  const { mutate: onAddNewTag } = usePostAddNewTag();
  const { notifyTopLeft } = useNotify();

  const searchedTag = filterBySearchedText(tags);

  return (
    <details className="cursor-pointer">
      <summary className="text-sm text-gray-400 hover:text-purple-700">
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
        {searchedTag.length > 0 ? (
          <ul className="flex flex-row flex-wrap gap-2">
            {searchedTag.map((tag) => (
              <li key={tag.name} className="flex items-center justify-between">
                <TagChip key={tag.name} onClick={() => onEachTagClick(tag)}>
                  {tag.name}
                </TagChip>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center px-2 py-4 text-gray-400">
            현재 사용 가능한 태그가 존재하지 않습니다.
          </div>
        )}

        <Selector.Form
          onSubmit={(event) => {
            event.preventDefault();
            pipe(
              parseTagSchema({ name: newTagName }, tags),
              E.match(notifyTopLeft.error, (data) => {
                onAddNewTag(data, {
                  onSuccess: (_, { name }) =>
                    notifyTopLeft.success(`${name} 태그가 추가되었습니다`),
                  onError: ({ message }) => notifyTopLeft.error(message)
                });
              })
            );
          }}
        >
          <Selector.Label className="sr-only" value="새로운 태그 추가하기" />
          <Selector.Input
            placeholder="새로운 태그명을 입력해주세요"
            onChange={handleChangeNewTagName}
          />
          <Selector.SubmitButton disabled={!isAvailableAddNewTag(tags)}>
            태그 추가
          </Selector.SubmitButton>
        </Selector.Form>
      </Selector>
    </details>
  );
};
