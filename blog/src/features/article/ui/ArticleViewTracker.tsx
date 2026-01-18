"use client";

import { useEffect } from "react";

import { trackEvent } from "@/shared/lib";

interface ArticleViewTrackerProps {
  articleId: string;
  title: string;
  seriesName: string;
  tags: string[];
}

export const ArticleViewTracker = ({
  articleId,
  title,
  seriesName,
  tags
}: ArticleViewTrackerProps) => {
  useEffect(() => {
    trackEvent("article_view", {
      article_id: articleId,
      article_title: title,
      article_series: seriesName,
      article_tags: tags.join(",")
    });
  }, [articleId, title, seriesName, tags]);

  return null;
};
