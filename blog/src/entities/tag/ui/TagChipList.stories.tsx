import { TagChipList } from "./TagChipList";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof TagChipList> = {
  title: "entities/tag/TagChipList",
  component: TagChipList,
  argTypes: {
    tags: {
      control: {
        type: "object"
      },
      description: "태그 목록"
    },
    onEachTagClick: {
      action: "clicked",
      description: "각 태그 클릭 시 실행되는 함수"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`TagChipList\` 컴포넌트는 태그 목록을 표시하는 컴포넌트입니다. 각 태그는 \`TagChip\` 컴포넌트로 렌더링되며, 클릭 시 지정된 콜백 함수를 호출합니다.

## Props

### TagChipListProps
- \`tags\` (string[]): 태그 목록.
- \`onEachTagClick\` (function)?: 각 태그 클릭 시 호출되는 함수. 태그 이름을 인자로 받습니다.

## 사용 예시

\`\`\`typescript
import { TagChipList } from "@/entities/tag/ui/TagChipList";

const ExampleComponent = () => {
  const handleTagClick = (tagName: string) => {
    console.log(\`Clicked tag: \${tagName}\`);
  };

  return (
    <TagChipList
      tags={["JavaScript", "React", "TypeScript"]}
      onEachTagClick={handleTagClick}
    />
  );
};
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TagChipList>;

export const Default: Story = {
  args: {
    tags: ["JavaScript", "React", "TypeScript"]
  },
  render: (args) => (
    <div className="p-4">
      <TagChipList {...args} />
    </div>
  )
};

export const WithClickHandler: Story = {
  args: {
    tags: ["JavaScript", "React", "TypeScript"],
    onEachTagClick: (tagName: string) => {
      console.log(`Clicked tag: ${tagName}`);
    }
  },
  render: (args) => (
    <div className="p-4">
      <TagChipList {...args} />
    </div>
  )
};
