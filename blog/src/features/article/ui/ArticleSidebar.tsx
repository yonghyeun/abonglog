import React from "react";

type Heading = string | Heading[];

interface ArticleSidebarProps {
  headings: Heading[];
  depth?: number;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  headings,
  depth = 1
}) => {
  return (
    <ul className="pl-2">
      {headings.map((heading, index) => {
        if (Array.isArray(heading)) {
          return (
            <ArticleSidebar
              headings={heading}
              depth={depth + 1}
              key={`${depth}-${index}-ul`}
            />
          );
        }
        return <li key={`${depth}-${index}-li`}>{heading}</li>;
      })}
    </ul>
  );
};
