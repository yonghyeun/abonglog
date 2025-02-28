import { tagStyleArray } from "../config";
import { capitalizeFirstLetter } from "../lib";
import React from "react";

interface TagProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "children"
  > {
  tagId: number;
  name: string;
  onClick?: (tagName: string) => void;
}

export const TagChip: React.FC<TagProps> = ({
  tagId,
  name,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`${tagStyleArray[tagId % tagStyleArray.length]} rounded-full px-4 py-1 text-sm`}
      onClick={() => onClick?.(name)}
      {...props}
    >
      {capitalizeFirstLetter(name)}
    </button>
  );
};
