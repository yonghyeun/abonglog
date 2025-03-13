import { useState } from "react";

import type { Tag } from "@/entities/tag/model";

export const useTagSelecToggle = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  const handleUnSelectTag = (tagName: string) => {
    setSelectedTags((prev) => prev.filter(({ name }) => name !== tagName));
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
