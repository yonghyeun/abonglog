import { parsingHeading, rehypeMarkdown } from "../lib";

export const transformArticleData = async <
  T extends { content: string; articleTags: { tagName: string | null }[] }
>({
  content,
  articleTags,
  ...data
}: T) => {
  const html = await rehypeMarkdown(content);
  const headings = parsingHeading(content);

  return {
    html,
    headings,
    tags: articleTags.map(({ tagName }) => tagName!),
    ...data
  };
};
