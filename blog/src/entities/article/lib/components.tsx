import { type LinkProps, default as _Link } from "next/link";
import React, { FC } from "react";

import { createBrowserSupabase } from "@/shared/lib";
import { CustomImage } from "@/shared/ui/CustomImage";

const Heading1: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h1 {...props} className="heading-1">
    {children}
  </h1>
);
const Heading2: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h2 {...props} className="heading-2">
    {children}
  </h2>
);
const Heading3: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h3 {...props} className="heading-3">
    {children}
  </h3>
);
const Heading4: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h4 {...props} className="heading-4">
    {children}
  </h4>
);
const Heading5: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h5 {...props} className="heading-5">
    {children}
  </h5>
);
const Heading6: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h6 {...props} className="heading-6">
    {children}
  </h6>
);
const Paragraph: FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => (
  <p {...props} className="paragraph">
    {children}
  </p>
);
const Link: FC<LinkProps & { children?: React.ReactNode }> = ({
  children,
  ...props
}) => (
  <_Link {...props} className="link">
    {children}
  </_Link>
);
const Blockquote: FC<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = ({
  children,
  ...props
}) => (
  <blockquote {...props} className="blockquote">
    {children}
  </blockquote>
);
const CodeBlock: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <code {...props} className="code-block">
    {children}
  </code>
);
const PreBlock: FC<React.HTMLAttributes<HTMLPreElement>> = ({
  children,
  ...props
}) => (
  <pre {...props} className="pre-block">
    {children}
  </pre>
);
const UnorderedList: FC<React.HTMLAttributes<HTMLUListElement>> = ({
  children,
  ...props
}) => (
  <ul {...props} className="unordered-list">
    {children}
  </ul>
);
const OrderedList: FC<React.HTMLAttributes<HTMLOListElement>> = ({
  children,
  ...props
}) => (
  <ol {...props} className="ordered-list">
    {children}
  </ol>
);
const ListItem: FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
  children,
  ...props
}) => (
  <li {...props} className="list-item">
    {children}
  </li>
);
const Table: FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...props
}) => (
  <table {...props} className="table">
    {children}
  </table>
);
const TableHead: FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <thead {...props} className="table-head">
    {children}
  </thead>
);
const TableBody: FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <tbody {...props} className="table-body">
    {children}
  </tbody>
);
const TableRow: FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => (
  <tr {...props} className="table-row">
    {children}
  </tr>
);
const TableHeader: FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => (
  <th {...props} className="table-header">
    {children}
  </th>
);
const TableCell: FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => (
  <td {...props} className="table-cell">
    {children}
  </td>
);

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const ArticlePhoto: FC<ImageProps> = ({ src, alt, ...props }) => {
  const type = src.split(".").pop();
  if (!type) {
    throw new Error(
      "적합한 이미지 경로가 아닙니다. 이미지 경로는 반드시 파일 확장자를 포함해야 합니다."
    );
  }

  if (type === "gif") {
    const supabase = createBrowserSupabase();
    const [_, ...imagePath] = src.split("/");
    const {
      data: { publicUrl }
    } = supabase.storage
      .from("article_image")
      .getPublicUrl(imagePath.join("/"));

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={publicUrl}
        alt={alt}
        {...props}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <CustomImage
      src={src}
      alt={alt}
      sizes="(max-width: 500px) 100vw, (max-width: 800px) 800px, 1000px"
      srcSet={`${src}?width=500 500w, ${src}?width=800 800w, ${src}?width=1000 1000w`}
      className="mx-auto rounded-lg shadow-md"
      {...props}
    />
  );
};
const Bold: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <strong {...props} className="bold">
    {children}
  </strong>
);
const Italic: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <em {...props} className="italic">
    {children}
  </em>
);
const Strikethrough: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <del {...props} className="strikethrough">
    {children}
  </del>
);

export const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  p: Paragraph,
  a: Link,
  blockquote: Blockquote,
  code: CodeBlock,
  pre: PreBlock,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  img: ArticlePhoto,
  strong: Bold,
  em: Italic,
  del: Strikethrough
};
