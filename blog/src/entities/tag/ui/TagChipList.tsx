import { Tag } from "../model";
import { TagChip } from "./TagChip";
import React from "react";

interface TagChipListProps {
  tags: Tag[];
  onEachTagClick?: (tag: Tag) => void;
}

export const TagChipList: React.FC<TagChipListProps> = ({
  tags,
  onEachTagClick
}) => {
  return (
    <ul className="flex flex-grow flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={`${tag.id}-selected-tagList`}>
          <TagChip name={tag.name} onClick={() => onEachTagClick?.(tag)} />
        </li>
      ))}
    </ul>
  );
};
