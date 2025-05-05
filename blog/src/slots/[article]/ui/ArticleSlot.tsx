import { AdminArticleHeader } from "./AdminArticleHeader";
import { ProgressBar } from "./ProgressBar";
import type { ArticlePageProps } from "./type";
import Image from "next/image";
import Link from "next/link";
import {
  BiSolidLeftArrowCircle,
  BiSolidRightArrowCircle
} from "react-icons/bi";

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
    headings,
    previousArticle,
    nextArticle
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
          <p className="text-center text-gray-500">{seriesName}</p>
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
            <div className="flex flex-col gap-1 text-sm text-gray-500">
              <span>{author}</span>
              <time>{createdAt}</time>
            </div>
          </div>
        </div>
      </header>

      <AdminArticleHeader articleId={articleId} seriesName={seriesName} />

      <section className="mx-auto flex min-h-screen max-w-screen-xl gap-2 px-4">
        {/* 본문 */}
        <article className="w-full pb-32 lg:flex-grow xl:max-w-[75%]">
          {html}
          <footer className="flex flex-col justify-between gap-4 text-lg sm:flex-row sm:justify-between">
            {/* 하단 네비게이션 버튼 */}
            <div className="flex-1">
              {previousArticle && (
                <Link
                  href={`/article/${previousArticle.id}`}
                  className="flex h-full flex-1 items-center justify-end gap-2 rounded-lg border border-purple-700 p-2 text-purple-700 hover:text-purple-500 dark:border-purple-300 dark:text-purple-300 hover:dark:text-purple-200"
                >
                  <BiSolidLeftArrowCircle />
                  {previousArticle.title}
                </Link>
              )}
            </div>
            <div className="flex flex-1">
              {nextArticle && (
                <Link
                  href={`/article/${nextArticle.id}`}
                  className="flex h-full flex-1 items-center justify-end gap-2 rounded-lg border border-purple-700 p-2 text-purple-700 hover:text-purple-500 dark:border-purple-300 dark:text-purple-300 hover:dark:text-purple-200"
                >
                  {nextArticle.title}
                  <BiSolidRightArrowCircle />
                </Link>
              )}
            </div>
          </footer>
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
