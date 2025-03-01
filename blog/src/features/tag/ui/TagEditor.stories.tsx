import { TagEditor } from "./TagEditor";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Tag } from "@/entities/tag/model";

const meta: Meta<typeof TagEditor> = {
  title: "features/tag/TagEditor",
  component: TagEditor,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 개요
\`TagEditor\` 컴포넌트는 태그를 관리하고 편집하기 위한 UI 컴포넌트입니다.
사용자가 태그를 추가하거나 제거할 수 있으며, 선택된 태그 목록을 관리합니다.

내부에서 사용되는 데이터, 로직 모두 외부에서 주입받는 비제어 컴포넌트입니다. 

## 사용 예시 

\`\`\`tsx
import { TagEditor } from '@/features/tag/ui/TagEditor';
import { useState } from 'react';

const MockTagEditor = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: "react" },
    { id: 2, name: "typescript" },
    { id: 3, name: "supabase" }
  ]);

  const handleTagClick = (tag: Tag) => {
    console.log("Clicked tag:", tag);
  };

  const handleTagRemove = (tag: Tag) => {
    setTags(tags.filter(t => t.id !== tag.id));
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
    <TagEditor
      tags={tags}
      onEachTagClick={handleTagClick}
      onEachTagRemove={handleTagRemove}
      onAddNewTag={handleAddNewTag}
    />
  );
};
\`\`\`

## 주요 기능
- 태그 검색 및 선택
- 선택된 태그 외부에서 주입 받은 액션 수행
- 삭제 버튼 눌린 태그 외부에서 주입 받은 액션 수행
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
    onEachTagRemove: {
      description:
        "태그 제거 시 호출되는 함수. 제거된 태그 객체를 인자로 받습니다.",
      action: "removed"
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

const MockTagEditor = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: "react", created_at: new Date().toISOString() },
    { id: 2, name: "typescript", created_at: new Date().toISOString() },
    { id: 3, name: "supabase", created_at: new Date().toISOString() }
  ]);

  const handleTagClick = (tag: Tag) => {
    console.log("Clicked tag:", tag);
  };

  const handleTagRemove = (tag: Tag) => {
    setTags(tags.filter((t) => t.id !== tag.id));
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
    <TagEditor
      tags={tags}
      onEachTagClick={handleTagClick}
      onEachTagRemove={handleTagRemove}
      onAddNewTag={handleAddNewTag}
      className="custom-class"
    />
  );
};

export const Default: StoryObj<typeof TagEditor> = {
  render: () => <MockTagEditor />
};
