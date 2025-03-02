import { useState } from "react";

import type { Tag } from "@/entities/tag/model";

export const useTagSelector = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  const handleUnSelectTag = (tag: Tag) => {
    setSelectedTags((prev) => prev.filter(({ id }) => id !== tag.id));
  };

  const filterUnSelectedTags = (tags: Tag[]) => {
    return tags.filter(
      (tag) => !selectedTags.map(({ id }) => id).includes(tag.id)
    );
  };

  return {
    selectedTags,
    handleSelectTag,
    handleUnSelectTag,
    filterUnSelectedTags
  };
};
