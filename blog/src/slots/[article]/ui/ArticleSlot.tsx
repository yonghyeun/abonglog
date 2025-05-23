import { AdminArticleHeader } from "./AdminArticleHeader";
import { ArticleFooter } from "./ArticleFooter";
import { ProgressBar } from "./ProgressBar";
import type { ArticlePageProps } from "./type";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { createNestedHeadings } from "@/features/article/lib/createNestedHeadings";
import { ArticleSidebar } from "@/features/article/ui";

import { TagChip } from "@/entities/tag/ui";
import { AdminProfile } from "@/entities/user/ui";

import { List } from "@/shared/ui/List";

export const ArticleSlot: React.FC<ArticlePageProps> = async ({
  articleData,
  articleId
}) => {
  const {
    thumbnailUrl,
    title,
    tags,
    author,
    createdAt,
    seriesName,
    html,
    headings
  } = articleData;

  return (
    <section>
      <ProgressBar />
      <header>
        {/* 썸네일 이미지 */}
        {thumbnailUrl ? (
          <div className="relative h-96">
            <Image
              src={thumbnailUrl}
              alt={`${title} 의 썸네일`}
              fill
              className="object-cover"
              priority={true}
              quality={100}
            />
          </div>
        ) : (
          <div className="h-96 w-full bg-gray-200" />
        )}
        <div className="mx-auto w-fit py-12">
          {/* 제목 */}
          <h1 className="text-center font-bold">{title}</h1>
          {/* 시리즈명 */}
          <Link
            href={`/article/list/${seriesName}`}
            className="flex justify-center text-purple-500 hover:text-purple-400 dark:text-purple-300 dark:hover:text-purple-200"
          >
            {seriesName}
          </Link>
          {/* 태그 리스트 */}
          <List.UnOrder className="py-2">
            {tags.map((tag) => (
              <List.Item key={tag}>
                <TagChip>{tag}</TagChip>
              </List.Item>
            ))}
          </List.UnOrder>
          {/* 저자와 마지막 업데이트일 */}
          <div className="flex items-center gap-2">
            <AdminProfile size="sm" />
            <div className="flex flex-col gap-1 text-sm text-tertiary">
              <span>{author}</span>
              <time dateTime={createdAt}>
                {new Date(createdAt).toLocaleString()}
              </time>
            </div>
          </div>
        </div>
      </header>

      <AdminArticleHeader articleId={articleId} seriesName={seriesName} />

      <section className="mx-auto flex min-h-screen max-w-screen-xl gap-2 px-4">
        {/* 본문 */}
        <article className="w-full pb-32 lg:flex-grow xl:max-w-[75%]">
          {html}
          {/* 아티클 footer  */}
          <Suspense
            fallback={<div className="h-96 w-full animate-pulse rounded-lg" />}
          >
            <ArticleFooter articleId={articleId} seriesName={seriesName} />
          </Suspense>
        </article>
        {/* 사이드바 */}
        <aside className="relative hidden text-gray-400 xl:block">
          <div className="sticky top-32 flex max-h-[80vh] flex-col items-end gap-2 overflow-y-auto">
            <ArticleSidebar
              articleId={articleId}
              headings={createNestedHeadings(headings)}
            />
          </div>
        </aside>
      </section>
    </section>
  );
};
