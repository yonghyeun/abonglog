import rehypeAddClasses from "rehype-add-classes";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringfy from "rehype-stringify";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import { unified } from "unified";

export const rehypeMarkdown = async (markdown: string) => {
  const vfileObject = await unified()
    // 마크다운 텍스트를 AST 형태로 파싱 합니다.
    .use(remarkParse)
    // AST 형태로 파싱된 마크다운 텍스트를 HTML로 변환 합니다.
    .use(remark2rehype)
    // HTML로 변환된 AST를 문자열로 변환 합니다.
    .use(rehypeSlug)
    // 각 Heading 태그에 id 를 추가 합니다.
    .use(rehypeAddClasses, {
      h1: "heading-1",
      h2: "heading-2",
      h3: "heading-3",
      h4: "heading-4",
      h5: "heading-5",
      h6: "heading-6",
      p: "paragraph",
      a: "link",
      blockquote: "blockquote",
      code: "code-block",
      pre: "pre-block",
      ul: "unordered-list",
      ol: "ordered-list",
      li: "list-item",
      table: "table",
      thead: "table-head",
      tbody: "table-body",
      tr: "table-row",
      th: "table-header",
      td: "table-cell",
      img: "image",
      strong: "bold",
      em: "italic",
      del: "strikethrough"
    })
    .use(rehypeStringfy)
    // 코드 블럭을 예쁘게 표현하기 위한 설정을 추가 합니다.
    .use(rehypePrettyCode, {
      grid: true,
      theme: "tokyo-night",
      keepBackground: false,
      bypassInlineCode: false,
      defaultLang: {
        block: "typescript"
      }
    })
    .process(markdown);

  return vfileObject.toString();
};
