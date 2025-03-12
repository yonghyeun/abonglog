import type { HeadingInfo } from "@/entities/article/lib";

export interface ArticlePageProps {
  articleData: {
    thumbnailUrl: string | null;
    title: string;
    tags: string[];
    author: string;
    updatedAt: string;
    seriesName: string;
    content: string;
    headings: HeadingInfo[];
    html: string;
  };
  articleId: string;
}
