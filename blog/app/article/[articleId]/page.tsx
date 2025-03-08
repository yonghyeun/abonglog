import "./article.styles.css";

import {
  createNestedHeadings,
  parsingHeading
} from "@/features/article/lib/createNestedHeadings";
import { ArticleSidebar } from "@/features/article/ui/ArticleSidebar";

import { rehypeMarkdown } from "@/entities/article/lib";
import { getArticleById } from "@/entities/article/model";
import { TagChip } from "@/entities/tag/ui";
import { AdminProfile } from "@/entities/user/ui";

import { List } from "@/shared/ui/List";

interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { articleId } = await params;

  const { thumbnailUrl, tags, title, author, updatedAt, seriesName, content } =
    await getArticleById(articleId);

  const html = await rehypeMarkdown(content);

  return (
    <section>
      <header>
        {/* 썸네일 이미지 */}
        <img
          src={thumbnailUrl!}
          alt={`${title} 의 썸네일`}
          className="h-96 w-full object-cover"
        />
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

      <section className="media-padding-x flex min-h-screen gap-2">
        {/* 본문 */}
        <article
          dangerouslySetInnerHTML={{ __html: html }}
          className="w-full pb-32 lg:flex-grow"
        />
        {/* 사이드바 */}
        <aside className="relative hidden text-gray-400 xl:block">
          <div className="sticky top-32">
            <ArticleSidebar
              articleId={articleId}
              headings={createNestedHeadings(parsingHeading(content))}
            />
          </div>
        </aside>
      </section>
    </section>
  );
};

export default ArticlePage;
