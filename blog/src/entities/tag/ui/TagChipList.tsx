import { TagChip } from "./TagChip";
import React from "react";

interface TagChipListProps {
  tags: string[];
  onEachTagClick?: (tagName: string) => void;
}

export const TagChipList: React.FC<TagChipListProps> = ({
  tags,
  onEachTagClick
}) => {
  return (
    <ul className="flex flex-grow flex-wrap gap-2">
      {tags.map((tagName) => (
        <li key={tagName}>
          <TagChip name={tagName} onClick={() => onEachTagClick?.(tagName)} />
        </li>
      ))}
    </ul>
  );
};
