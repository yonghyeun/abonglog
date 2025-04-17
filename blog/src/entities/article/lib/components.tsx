import Image from "next/image";
import React, { FC } from "react";

import { SUPABASE_STORAGE_URL } from "@/shared/config";

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
const Link: FC<
  React.HTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }
> = ({ children, ...props }) => (
  <a {...props} className="link" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
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
  const randomImageId = Math.floor(Math.random() * 100000);

  if (!src.startsWith(SUPABASE_STORAGE_URL)) {
    return (
      <span className="flex flex-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          {...props}
          loading="lazy"
          decoding="async"
          className="mx-auto w-fit min-w-[50%] rounded-lg"
          aria-describedby={`caption-${randomImageId}`}
        />
        <span
          className="my-1 block text-center text-base text-secondary"
          id={`caption-${randomImageId}`}
        >
          {alt}
        </span>
      </span>
    );
  }

  return (
    <span className="flex w-full flex-col">
      <Image
        src={src}
        alt={alt}
        {...props}
        width={1200}
        height={620}
        className="mx-auto w-fit rounded-lg text-base"
        // 픽셀 밀도를 고려하여 원하는 이미지 크기 * 2 만큼의 sizes 고려
        sizes="(max-width: 600px) 1200px , (max-width: 800px) 1600px , 2400px"
        aria-describedby={`caption-${randomImageId}`}
        quality={100}
      />
      <span
        className="my-1 block text-center text-base text-secondary"
        id={`caption-${randomImageId}`}
      >
        {alt}
      </span>
    </span>
  );
};
const Bold: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <strong {...props} className="text-blue-500 dark:text-blue-300">
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
