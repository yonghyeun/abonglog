import type { HeadingInfo } from "@/entities/article/lib";

export interface ArticlePageProps {
  articleData: {
    thumbnailUrl: string | null;
    title: string;
    tags: string[];
    author: string;
    createdAt: string;
    seriesName: string;
    content: string;
    headings: HeadingInfo[];
    html: string;
    previousArticle: {
      id: number;
      title: string;
    } | null;
    nextArticle: {
      id: number;
      title: string;
    } | null;
  };
  articleId: string;
}
