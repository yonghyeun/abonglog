import { Tag } from "../model";
import { TagChipList } from "./TagChipList";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

// 샘플 태그 데이터
const sampleTags: Tag[] = [
  { id: 1, name: "JavaScript", created_at: new Date().toISOString() },
  { id: 2, name: "TypeScript", created_at: new Date().toISOString() },
  { id: 3, name: "React", created_at: new Date().toISOString() },
  { id: 4, name: "Next.js", created_at: new Date().toISOString() },
  { id: 5, name: "Tailwind CSS", created_at: new Date().toISOString() }
];

const meta: Meta<typeof TagChipList> = {
  title: "Entities/Tag/TagChipList",
  component: TagChipList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 개요
\`TagChipList\` 컴포넌트는 태그 목록을 칩(chip) 형태로 표시하는 컴포넌트입니다.
각 태그는 클릭 가능하며, 클릭 시 \`onEachTagClick\` 콜백이 호출됩니다.

## 사용 예시
\`\`\`tsx
import { TagChipList } from '@/entities/tag/ui/TagChipList';

const MyComponent = () => {
  const tags = [
    { id: 1, name: "JavaScript", created_at: "2023-01-01T00:00:00Z" },
    { id: 2, name: "TypeScript", created_at: "2023-01-02T00:00:00Z" }
  ];
  
  const handleTagClick = (tag) => {
    console.log("Tag clicked:", tag.name);
  };
  
  return <TagChipList tags={tags} onEachTagClick={handleTagClick} />;
};
\`\`\`
`
      }
    }
  },
  argTypes: {
    tags: {
      description: "표시할 태그 목록",
      control: {
        type: "object"
      }
    },
    onEachTagClick: {
      description: "태그 클릭 시 호출될 함수",
      action: "tag clicked"
    }
  }
};

export default meta;

type Story = StoryObj<typeof TagChipList>;

// 기본 스토리
export const Default: Story = {
  args: {
    tags: sampleTags,
    onEachTagClick: action("태그 클릭됨")
  }
};

// 태그 없음 스토리
export const NoTags: Story = {
  args: {
    tags: [],
    onEachTagClick: action("태그 클릭됨")
  },
  parameters: {
    docs: {
      description: {
        story: "태그가 없는 경우입니다. 아무것도 표시되지 않습니다."
      }
    }
  }
};

// 클릭 비활성화 스토리
export const DisabledClicks: Story = {
  args: {
    tags: sampleTags,
    onEachTagClick: undefined
  },
  parameters: {
    docs: {
      description: {
        story:
          "클릭 핸들러가 없는 경우입니다. 태그를 클릭해도 아무 동작이 없습니다."
      }
    }
  }
};

// 긴 태그명 스토리
export const LongTagNames: Story = {
  args: {
    tags: [
      {
        id: 1,
        name: "This is a very long tag name that might wrap",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "AnotherVeryLongTagNameWithoutSpaces",
        created_at: new Date().toISOString()
      },
      ...sampleTags
    ],
    onEachTagClick: action("태그 클릭됨")
  },
  parameters: {
    docs: {
      description: {
        story: "태그명이 긴 경우에 대한 표시 예시입니다."
      }
    }
  }
};
