"use client";

import React, {
  Children,
  ReactElement,
  isValidElement,
  useRef,
  useState
} from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

// This component handles the Window UI.
// It acts as the 'Figure' replacement when 'data-rehype-pretty-code-figure' is present.

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  language?: string;
  // If `pre` props are passed
  "data-language"?: string;
}

export const CodeBlock = ({
  children,
  className,
  title,
  language: propLanguage,
  ...props
}: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Try to determine language from props or children
  const language = propLanguage || props["data-language"] || "text";

  const onCopy = async () => {
    let textToCopy = "";

    if (contentRef.current) {
      textToCopy = contentRef.current.textContent || "";
    }

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/50 px-4 py-3 backdrop-blur-md dark:border-gray-800 dark:bg-white/5">
        <div className="flex shrink-0 gap-1.5">
          <div className="h-3 w-3 rounded-full border border-[#E0443E] bg-[#FF5F56]" />
          <div className="h-3 w-3 rounded-full border border-[#DEA123] bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full border border-[#1AAB29] bg-[#27C93F]" />
        </div>

        {/* Title or Language */}
        <span className="mx-4 break-words text-center font-mono text-xs font-semibold text-secondary">
          {title || language.toUpperCase()}
        </span>

        <button
          onClick={onCopy}
          className="hover:bg-surface-3 flex shrink-0 items-center gap-1 rounded p-1.5 text-secondary transition-colors hover:text-primary"
          aria-label="Copy code"
        >
          {isCopied ? (
            <MdCheck className="h-4 w-4 text-green-500" />
          ) : (
            <MdContentCopy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="relative">
        <div ref={contentRef} className="overflow-x-auto p-0">
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              // Check if it is figcaption (we skip it as we rendered title)
              // Note: The child type might be 'figcaption' string or a React component if mapped?
              // We will map figure but NOT figcaption in components.tsx, so it should be string 'figcaption'.
              if (
                child.type === "figcaption" ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (child.props as any)["data-rehype-pretty-code-title"] !==
                  undefined
              ) {
                return null;
              }

              // If it is 'pre', we strip its default styling that might conflict
              if (child.type === "pre") {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return React.cloneElement(child as ReactElement<any>, {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  className: `!my-0 !border-0 !bg-transparent p-5 font-mono leading-relaxed scrollbar-thin scrollbar-thumb-surface-3 scrollbar-track-transparent ${className || ""} ${(child.props as any).className || ""}`,
                  style: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ...((child.props as any).style || {}),
                    backgroundColor: "transparent"
                  }
                });
              }
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};
