import React, { forwardRef } from "react";

interface MarkdownEditorProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "defaultValue"
  > {
  defaultValue?: string;
  className?: string;
}

export const MarkdownEditor = forwardRef<
  HTMLTextAreaElement,
  MarkdownEditorProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`resize-none border p-2 text-sm focus:outline-none ${className}`}
      placeholder="게시글 내용을 입력해 주세요"
      autoCorrect="off"
      ref={ref}
      {...props}
    />
  );
});

MarkdownEditor.displayName = "MarkdownEditor";
