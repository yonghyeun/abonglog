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
    <footer className="flex flex-col justify-between gap-4 text-lg sm:flex-row sm:justify-between">
      {/* 하단 네비게이션 버튼 */}
      <div className="flex-1">
        {prevArticleData && (
          <Link
            href={`/article/${prevArticleData.id}`}
            className="flex h-full flex-1 items-center justify-start gap-2 rounded-lg border border-purple-700 p-2 text-purple-700 hover:text-purple-500 dark:border-purple-300 dark:text-purple-300 hover:dark:text-purple-200"
          >
            <BiSolidLeftArrowCircle />
            {prevArticleData.title}
          </Link>
        )}
      </div>
      <div className="flex flex-1">
        {nextArticleData && (
          <Link
            href={`/article/${nextArticleData.id}`}
            className="flex h-full flex-1 items-center justify-end gap-2 rounded-lg border border-purple-700 p-2 text-purple-700 hover:text-purple-500 dark:border-purple-300 dark:text-purple-300 hover:dark:text-purple-200"
          >
            {nextArticleData.title}
            <BiSolidRightArrowCircle />
          </Link>
        )}
      </div>
    </footer>
  );
};
