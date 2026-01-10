"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import { ArticleRowCard } from "@/widgets/article/ui";

import { getArticleList } from "@/entities/article/model";

export const RecentArticleListSlot = () => {
  const { data } = useSuspenseInfiniteQuery(getArticleList("published"));

  const articleList = data.pages.flatMap((page) => page.data);

  return (
    <div className="flex flex-col gap-8">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
        Recent Articles
      </span>

      <div className="flex flex-col gap-6">
        {articleList.map((article) => (
          <Link href={`article/${article.id}`} key={article.id}>
            <ArticleRowCard {...article} />
          </Link>
        ))}
      </div>
    </div>
  );
};
