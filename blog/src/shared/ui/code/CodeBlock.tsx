"use client";

import React, { Children, ReactElement, isValidElement, useRef, useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

// This component handles the Window UI.
// It acts as the 'Figure' replacement when 'data-rehype-pretty-code-figure' is present.

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  language?: string;
  // If `pre` props are passed
  "data-language"?: string;
}

export const CodeBlock = ({ children, className, title, language: propLanguage, ...props }: CodeBlockProps) => {
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
    <div className="group relative my-8 overflow-hidden rounded-xl border border-border bg-[#ffffff] dark:bg-[#0d1117] text-sm shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between border-b border-border bg-surface-2/50 px-4 py-3 backdrop-blur-md dark:bg-surface-2/10">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        
        {/* Title or Language */}
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs font-semibold text-secondary truncate max-w-[200px]">
          {title || language.toUpperCase()}
        </span>

        <button
          onClick={onCopy}
          className="flex items-center gap-1 rounded p-1.5 text-secondary transition-colors hover:bg-surface-3 hover:text-primary"
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
             {Children.map(children, child => {
                 if (isValidElement(child)) {
                     // Check if it is figcaption (we skip it as we rendered title)
                     // Note: The child type might be 'figcaption' string or a React component if mapped?
                     // We will map figure but NOT figcaption in components.tsx, so it should be string 'figcaption'.
                     if (child.type === 'figcaption' || (child.props as any)['data-rehype-pretty-code-title'] !== undefined) {
                         return null;
                     }
                     
                     // If it is 'pre', we strip its default styling that might conflict
                     if (child.type === 'pre') {
                         return React.cloneElement(child as ReactElement<any>, {
                             className: `!my-0 !border-0 !bg-transparent p-5 font-mono leading-relaxed scrollbar-thin scrollbar-thumb-surface-3 scrollbar-track-transparent ${className || ''} ${(child.props as any).className || ''}`,
                             style: { ...((child.props as any).style || {}), backgroundColor: 'transparent' }
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
