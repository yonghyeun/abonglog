import { tagStyleArray } from "../config";
import { capitalizeFirstLetter, summarizeTextCode } from "../lib";
import React from "react";

interface TagProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "children"
  > {
  name: string;
  onClick?: (tagName: string) => void;
}

export const TagChip: React.FC<TagProps> = ({ name, onClick, ...props }) => {
  return (
    <button
      className={`${
        tagStyleArray[summarizeTextCode(name) % tagStyleArray.length]
      } rounded-full px-4 py-1 text-sm`}
      onClick={() => onClick?.(name)}
      {...props}
    >
      {capitalizeFirstLetter(name)}
    </button>
  );
};
