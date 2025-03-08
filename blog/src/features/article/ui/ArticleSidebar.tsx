"use client";

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
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    headingId: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

        // rehype-slug 는  모든 특수문자를 제거하고 공백을 -로 변환하여 id 를 생성한다.
        // 이에 따라 특수문자를 제외한 모든 문자를 제거하고 공백을 -로 변환하여 id를 생성한다.
        const headingId = heading
          .replace(/\s+/g, "-")
          .replace(/[^\w\s가-힣-]/g, "");

        return (
          <li key={`${depth}-${index}-li`}>
            <Link
              href={`/article/${articleId}#${headingId}`}
              onClick={(event) => handleClick(event, headingId)}
            >
              {heading}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
