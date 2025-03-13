import { capitalizeFirstLetter, summarizeTextCode } from "../lib";

import { Chip } from "@/shared/ui/Chip";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const TagChip: React.FC<ChipProps> = ({ children, ...props }) => {
  return (
    <Chip theme={summarizeTextCode(children)} {...props}>
      {capitalizeFirstLetter(children)}
    </Chip>
  );
};
