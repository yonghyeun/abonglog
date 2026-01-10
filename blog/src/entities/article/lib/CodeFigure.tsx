import React, { ReactElement, isValidElement } from "react";

import { CodeBlock } from "@/shared/ui/code";

// Wrapper to bridge rehype-react figure mapping to CodeBlock
export const CodeFigure: React.FC<React.HTMLAttributes<HTMLElement>> = (
  props
) => {
  // Check if this is a rehype-pretty-code figure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((props as any)["data-rehype-pretty-code-figure"] === undefined) {
    // Just a normal figure? Render as is.
    return <figure {...props} />;
  }

  let title: string | undefined;
  let language: string | undefined;

  // Extract title and language, and filter out figcaption to avoid double rendering
  const content = React.Children.toArray(props.children).filter((child) => {
    if (isValidElement(child)) {
      if (
        child.type === "figcaption" ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child.props as any)["data-rehype-pretty-code-title"] !== undefined
      ) {
        // Found title element, extract text if needed, but don't render it in content
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = (child as ReactElement<any>).props;
        if (!title && typeof props.children === "string") {
          title = props.children;
        }
        return false; // Remove from content
      }
      if (child.type === "pre") {
        // Language might be data-language
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        language = (child.props as any)["data-language"];
        // Keep pre in content
      }
    }
    return true;
  });

  return (
    <CodeBlock title={title} language={language} {...props}>
      {content}
    </CodeBlock>
  );
};
