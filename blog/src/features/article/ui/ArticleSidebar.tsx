"use client";

import { useArticleSidebar } from "../lib";
import Link from "next/link";
import React from "react";

type Heading = string | Heading[];

interface ArticleSidebarProps {
  articleId: string;
  headings: Heading[];
  depth?: number;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  articleId,
  headings,
  depth = 1
}) => {
  const { activeId, handleHeadingScroll, transformIdToSlug } =
    useArticleSidebar();

  return (
    <ul className="pl-2">
      {headings.map((heading, index) => {
        if (Array.isArray(heading)) {
          return (
            <ArticleSidebar
              articleId={articleId}
              headings={heading}
              depth={depth + 1}
              key={`${depth}-${index}-ul`}
            />
          );
        }

        const headingId = transformIdToSlug(heading);

        return (
          <li className="my-2" key={`${depth}-${index}-li`}>
            <Link
              href={`/article/${articleId}#${headingId}`}
              className={`transition-all duration-200 ${
                activeId === headingId
                  ? "font-bold text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={(event) => handleHeadingScroll(event, headingId)}
            >
              {heading}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
