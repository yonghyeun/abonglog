"use client";

import Link from "next/link";
import React from "react";
import {
  BiSolidLeftArrowCircle,
  BiSolidRightArrowCircle
} from "react-icons/bi";

import { useGetArticleGraph } from "@/entities/article/model";

interface ArticleFooterProps {
  articleId: string;
  seriesName: string;
}

export const ArticleFooter: React.FC<ArticleFooterProps> = ({
  articleId,
  seriesName
}) => {
  const {
    data: { prevArticleData, nextArticleData }
  } = useGetArticleGraph(Number(articleId), seriesName);

  return (
    <footer className="mt-12 flex flex-col justify-between gap-6 sm:flex-row">
      {/* 이전 글 */}
      <div className="flex flex-1">
        {prevArticleData ? (
          <Link
            href={`/article/${prevArticleData.id}`}
            className="group flex w-full flex-col gap-1 rounded-xl bg-surface-2 px-6 py-4 text-left transition-all hover:bg-surface-3 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2 text-xs font-medium text-secondary group-hover:text-brand-primary">
              <BiSolidLeftArrowCircle className="text-lg" />
              이전 포스트
            </span>
            <span className="text-base font-bold text-primary group-hover:text-brand-primary">
              {prevArticleData.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" className="flex-1 opacity-0" />
        )}
      </div>

      {/* 다음 글 */}
      <div className="flex flex-1">
        {nextArticleData ? (
          <Link
            href={`/article/${nextArticleData.id}`}
            className="group flex w-full flex-col items-end gap-1 rounded-xl bg-surface-2 px-6 py-4 text-right transition-all hover:bg-surface-3 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2 text-xs font-medium text-secondary group-hover:text-brand-primary">
              다음 포스트
              <BiSolidRightArrowCircle className="text-lg" />
            </span>
            <span className="text-base font-bold text-primary group-hover:text-brand-primary">
              {nextArticleData.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" className="flex-1 opacity-0" />
        )}
      </div>
    </footer>
  );
};
