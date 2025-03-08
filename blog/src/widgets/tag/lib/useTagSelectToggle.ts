import { Tag } from "@/entities/tag/model";

import { useTransitionInput } from "@/shared/lib";

export const useTagSelectToggle = () => {
  const [searchText, handleChangeSearchText] = useTransitionInput();
  const [newTagName, handleChangeNewTagName] = useTransitionInput();

  const isAvailableNewTag = (tags: Tag[]) => {
    return (
      newTagName.length > 0 &&
      tags.every(({ name }) => name.toLowerCase() !== newTagName.toLowerCase())
    );
  };

  const filterTags = (tags: Tag[]) => {
    return tags.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return {
    searchText,
    handleChangeSearchText,
    newTagName,
    handleChangeNewTagName,
    isAvailableNewTag,
    filterTags
  };
};
