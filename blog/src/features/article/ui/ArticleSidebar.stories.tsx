import { createNestedHeadings } from "../lib/createNestedHeadings";
import { ArticleSidebar } from "./ArticleSidebar";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { parsingHeading } from "@/entities/article/lib";

const meta: Meta<typeof ArticleSidebar> = {
  title: "features/article/ArticleSidebar",
  component: ArticleSidebar,
  argTypes: {
    headings: {
      control: {
        type: "object"
      },
      description: "계층적인 헤딩 배열"
    },
    depth: {
      control: {
        type: "number"
      },
      description: "현재 깊이"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`ArticleSidebar\` 컴포넌트는 계층적인 헤딩 구조를 나타내는 사이드바 컴포넌트입니다.

## Props

### ArticleSidebarProps
- \`headings\` (string[] | (string | Headings)[]): 계층적인 헤딩 배열.
- \`depth\` (number): 현재 깊이.

## 사용 예시

\`\`\`typescript
import { ArticleSidebar } from "@/features/article/ui/ArticleSidebar";

const ExampleComponent = () => {
  const headings = [
    "Introduction",
    ["Chapter 1", ["Section 1.1", ["Subsection 1.1.1", "Subsection 1.1.2"]]],
    ["Chapter 2", ["Section 2.1", "Section 2.2"]],
    "Conclusion",
  ];

  return <ArticleSidebar headings={headings} />;
};
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ArticleSidebar>;

export const Default: Story = {
  args: {
    headings: createNestedHeadings(
      parsingHeading(`
# Heading 1
## Heading 2
### Heading 3
# Heading 4
# Heading 5
## Heading 6
## Heading 7
###Heading 8
 `)
    )
  },
  render: (args) => (
    <div className="p-4">
      <ArticleSidebar {...args} />
    </div>
  )
};
