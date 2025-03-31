"use client";

import { forEach } from "@fxts/core";
import { useEffect, useState } from "react";

const MARKDOWN_WHITESPACE_REGEX = /\s+/g;
const MARKDOWN_SPECIAL_CHARS_REGEX = /[^\w\s가-힣-]/g;
const HEADING_SELECTORS = "h1, h2, h3";

export const useArticleSidebar = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const transformIdToSlug = (id: string) => {
    return id
      .replace(MARKDOWN_WHITESPACE_REGEX, "-")
      .replace(MARKDOWN_SPECIAL_CHARS_REGEX, "")
      .toLowerCase();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(transformIdToSlug(entry.target.id));
          }
        });
      },

      { rootMargin: "0% 0% -80% 0%" }
    );
    const headings = document.querySelectorAll(HEADING_SELECTORS);

    forEach((heading) => observer.observe(heading), headings);
    return () => {
      forEach((heading) => observer.unobserve(heading), headings);
      observer.disconnect();
    };
  }, []);

  const handleHeadingScroll =
    (headingId: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const element = document.getElementById(headingId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

  return { activeId, handleHeadingScroll, transformIdToSlug };
};
