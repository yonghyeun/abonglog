import { TagSelector } from "./TagSelector";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Tag } from "@/entities/tag/model";

const meta: Meta<typeof TagSelector> = {
  title: "features/tag/TagSelector",
  component: TagSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 개요
\`TagSelector\` 컴포넌트는 태그 목록을 관리하고 편집하기 위한 UI 컴포넌트입니다.
사용자가 태그를 검색하거나 추가할 수 있으며, 선택된 태그 목록을 관리합니다.

내부에서 사용되는 데이터와 비즈니스 로직은 모두 외부에서 주입받는 비제어 컴포넌트입니다.

## 사용 예시 

\`\`\`tsx
import { TagSelector } from '@/features/tag/ui/TagSelector';
import { useState } from 'react';

const MockTagSelector = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: "react" },
    { id: 2, name: "typescript" },
    { id: 3, name: "supabase" }
  ]);

  const handleTagClick = (tag: Tag) => {
    console.log("Clicked tag:", tag);
  };

  const handleAddNewTag = (tagName: string) => {
    const newTag = {
      id: tags.length + 1,
      name: tagName,
      created_at: new Date().toISOString()
    };
    setTags([...tags, newTag]);
  };

  return (
    <TagSelector
      tags={tags}
      onEachTagClick={handleTagClick}
      onAddNewTag={handleAddNewTag}
      isAvailableRemoveTag={true}
    />
  );
};
\`\`\`

## 주요 기능
- 태그 검색 및 선택
- 선택된 태그 외부에서 주입 받은 액션 수행
- 새로운 태그 추가 버튼 눌릴 시 외부에서 주입 받은 액션 수행
`
      }
    }
  },
  argTypes: {
    tags: {
      description: "현재 선택된 태그 목록",
      control: {
        type: "object"
      }
    },
    onEachTagClick: {
      description:
        "태그 클릭 시 호출되는 함수. 클릭된 태그 객체를 인자로 받습니다.",
      action: "clicked"
    },
    onAddNewTag: {
      description: "새 태그 추가 시 호출되는 함수. tag 이름을 인자로 받습니다.",
      action: "added"
    },
    className: {
      description: "추가적인 CSS 클래스를 적용하기 위한 문자열",
      control: {
        type: "text"
      }
    }
  }
};

export default meta;

const MockTagSelector = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: "react", created_at: new Date().toISOString() },
    { id: 2, name: "typescript", created_at: new Date().toISOString() },
    { id: 3, name: "supabase", created_at: new Date().toISOString() }
  ]);

  const handleTagClick = (tag: Tag) => {
    console.log("Clicked tag:", tag);
  };

  const handleAddNewTag = (tagName: string) => {
    const newTag = {
      id: tags.length + 1,
      name: tagName,
      created_at: new Date().toISOString()
    };
    setTags([...tags, newTag]);
  };

  return (
    <TagSelector
      tags={tags}
      onEachTagClick={handleTagClick}
      onAddNewTag={handleAddNewTag}
      className="custom-class"
    />
  );
};

export const Default: StoryObj<typeof TagSelector> = {
  render: () => <MockTagSelector />
};
