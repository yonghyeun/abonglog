import { components } from "./components";
import { Fragment, createElement } from "react";
import { jsxDEV } from "react/jsx-dev-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import { unified } from "unified";

export const rehypeMarkdown = async (markdown: string) => {
  const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

  const vfileObject = await unified()
    // 마크다운 텍스트를 AST 형태로 파싱 합니다.
    .use(remarkParse)
    // 줄바꿈을 <br> 태그로 변환 합니다.
    .use(remarkBreaks)
    // AST 형태로 파싱된 마크다운 텍스트를 HTML로 변환 합니다.
    .use(remark2rehype, {
      jsx: true
    })
    // HTML로 변환된 AST를 문자열로 변환 합니다.
    .use(rehypeSlug)
    // 각 Heading 태그에 id 를 추가 합니다.
    // 코드 블럭을 예쁘게 표현하기 위한 설정을 추가 합니다.
    .use(rehypePrettyCode, {
      grid: true,
      theme: "one-dark-pro",
      keepBackground: false,
      bypassInlineCode: false,
      defaultLang: {
        block: "typescript"
      }
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      jsx: jsx,
      jsxDEV: jsxDEV,
      jsxs: jsxs,
      components,
      development: IS_DEVELOPMENT,
      jsxRuntime: "automatic"
    })
    .process(markdown);

  return vfileObject.result;
};
