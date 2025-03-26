import { AdminArticleHeader } from "./AdminArticleHeader";
import { ProgressBar } from "./ProgressBar";
import type { ArticlePageProps } from "./type";
import Image from "next/image";

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
    updatedAt,
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
          <Image
            src={thumbnailUrl}
            alt={`${title} 의 썸네일`}
            className="h-96 w-full object-cover"
            width={1080}
            height={500}
            priority={true}
            quality={100}
          />
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
              <time>{new Date(updatedAt).toLocaleString()}</time>
            </div>
          </div>
        </div>
      </header>

      <AdminArticleHeader articleId={articleId} seriesName={seriesName} />

      <section className="media-padding-x flex min-h-screen gap-2">
        {/* 본문 */}
        <article className="w-full pb-32 lg:flex-grow xl:max-w-[75%]">
          {html}
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
