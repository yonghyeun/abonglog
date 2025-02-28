"use client";

interface MarkdownRendererProps {
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({}) => {
  return <div className="hidden w-1/2 bg-secondary md:block">2</div>;
};
