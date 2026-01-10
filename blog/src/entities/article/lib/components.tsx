import Image from "next/image";
import React, { FC } from "react";
import {
  BiError,
  BiErrorCircle,
  BiInfoCircle,
  BiCheckCircle,
  BiBulb
} from "react-icons/bi";

import { CodeBlock as SharedCodeBlock } from "@/shared/ui/code";
import { CodeFigure } from "./CodeFigure";

// ... existing code ...
import { SUPABASE_STORAGE_URL } from "@/shared/config";

const Heading1: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h1
    {...props}
    className="mb-8 mt-2 scroll-m-20 text-display font-bold text-primary first:mt-0"
  >
    {children}
  </h1>
);

const Heading2: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h2
    {...props}
    className="mb-4 mt-12 scroll-m-20 text-heading-l font-semibold text-primary"
  >
    {children}
  </h2>
);

const Heading3: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h3
    {...props}
    className="mb-3 mt-8 scroll-m-20 text-heading-m font-semibold text-primary"
  >
    {children}
  </h3>
);

const Heading4: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h4
    {...props}
    className="mb-2 mt-6 scroll-m-20 text-heading-s font-semibold text-primary"
  >
    {children}
  </h4>
);

const Heading5: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h5
    {...props}
    className="mb-2 mt-6 scroll-m-20 text-body-l font-bold text-primary"
  >
    {children}
  </h5>
);

const Heading6: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h6
    {...props}
    className="mb-2 mt-6 scroll-m-20 text-body-l font-semibold text-secondary"
  >
    {children}
  </h6>
);

const Paragraph: FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => (
  <p
    {...props}
    className="mb-6 leading-relaxed text-body-l text-primary"
  >
    {children}
  </p>
);

const Link: FC<
  React.HTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }
> = ({ children, ...props }) => (
  <a
    {...props}
    className="font-medium text-info hover:underline underline-offset-4 decoration-2"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Blockquote: FC<
  React.BlockquoteHTMLAttributes<HTMLQuoteElement> & { "data-callout"?: string }
> = ({ children, ...props }) => {
  const calloutType = (props["data-callout"] || "note").toLowerCase();

  const styles: Record<string, string> = {
    note: "border-status-info bg-surface-1 text-secondary",
    tip: "border-status-success bg-status-success/10 text-secondary",
    important: "border-brand-primary bg-brand-primary/10 text-secondary",
    warning: "border-status-warning bg-status-warning/10 text-secondary",
    caution: "border-status-error bg-status-error/10 text-secondary"
  };

  const titleColors: Record<string, string> = {
    note: "text-status-info",
    tip: "text-status-success",
    important: "text-brand-primary",
    warning: "text-status-warning",
    caution: "text-status-error"
  };

  const icons: Record<string, React.ReactNode> = {
    note: <BiInfoCircle className="text-xl" />,
    tip: <BiBulb className="text-xl" />,
    important: <BiCheckCircle className="text-xl" />, // Important usually purple, maybe checkmark or star? Using Check for now or maybe Bulb? Tip is Bulb. Important maybe InfoCircle filled? Let's use BiErrorCircle for Important as "Attention".
    warning: <BiError className="text-xl" />,
    caution: <BiErrorCircle className="text-xl" />
  };

  // Override Important icon to be distinctive if needed, or stick to defaults.
  // user asked for default Note style if none.

  const styleClass = styles[calloutType] || styles.note;
  const titleColor = titleColors[calloutType] || titleColors.note;
  const icon = icons[calloutType] || icons.note;

  return (
    <blockquote
      {...props}
      className={`my-6 rounded-r-lg border-l-4 px-4 py-4 not-italic ${styleClass}`}
    >
      <div className={`mb-2 flex items-center gap-2 font-bold capitalize ${titleColor}`}>
        {icon}
        <span>{calloutType}</span>
      </div>
      <div className="text-body-m">{children}</div>
    </blockquote>
  );
};

const CodeBlock: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <code
    {...props}
    className="px-[0.3rem] py-[0.15rem] rounded bg-surface-2 font-mono text-sm text-primary border border-border"
  >
    {children}
  </code>
);



const UnorderedList: FC<React.HTMLAttributes<HTMLUListElement>> = ({
  children,
  ...props
}) => (
  <ul {...props} className="mb-6 ml-6 list-disc space-y-2 text-body-l text-primary">
    {children}
  </ul>
);

const OrderedList: FC<React.HTMLAttributes<HTMLOListElement>> = ({
  children,
  ...props
}) => (
  <ol {...props} className="mb-6 ml-6 list-decimal space-y-2 text-body-l text-primary">
    {children}
  </ol>
);

const ListItem: FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
  children,
  ...props
}) => (
  <li {...props} className="pl-1 leading-relaxed">
    {children}
  </li>
);

const Table: FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...props
}) => (
  <div className="my-6 w-full overflow-y-auto">
    <table {...props} className="w-full border-collapse text-left text-sm">
      {children}
    </table>
  </div>
);

const TableHead: FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <thead {...props} className="bg-surface-2 text-primary">
    {children}
  </thead>
);

const TableBody: FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <tbody {...props} className="text-secondary">
    {children}
  </tbody>
);

const TableRow: FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => (
  <tr {...props} className="m-0 border-t border-border p-0 even:bg-surface-1">
    {children}
  </tr>
);

const TableHeader: FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => (
  <th
    {...props}
    className="border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
  >
    {children}
  </th>
);

const TableCell: FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => (
  <td
    {...props}
    className="border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
  >
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
      <span className="my-8 flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          {...props}
          loading="lazy"
          decoding="async"
          className="rounded-lg shadow-md border border-border w-auto max-w-full"
          aria-describedby={`caption-${randomImageId}`}
        />
        <span
          className="mt-2 text-center text-caption text-secondary"
          id={`caption-${randomImageId}`}
        >
          {alt}
        </span>
      </span>
    );
  }

  return (
    <span className="my-8 flex w-full flex-col items-center">
      <Image
        src={src}
        alt={alt}
        {...props}
        width={1200}
        height={620}
        className="rounded-lg shadow-md border border-border w-auto max-w-full"
        // 픽셀 밀도를 고려하여 원하는 이미지 크기 * 2 만큼의 sizes 고려
        sizes="(max-width: 600px) 1200px , (max-width: 800px) 1600px , 2400px"
        aria-describedby={`caption-${randomImageId}`}
        quality={100}
      />
      <span
        className="mt-2 text-center text-caption text-secondary"
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
  <strong {...props} className="font-bold text-primary">
    {children}
  </strong>
);

const Italic: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <em {...props} className="italic text-secondary">
    {children}
  </em>
);

const Strikethrough: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <del {...props} className="line-through opacity-70">
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
  figure: CodeFigure,
  // code mapping removed to allow native code rendering (handled by global CSS and rehype-pretty-code)
  // pre: SharedCodeBlock, // Removing pre mapping to let native pre render inside CodeFigure/CodeBlock
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
