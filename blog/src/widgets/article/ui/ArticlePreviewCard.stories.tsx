import { ArticlePreviewCard } from "./ArticlePreviewCard";
import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "@/entities/tag/model";

// 샘플 태그 데이터
const sampleTags: Tag[] = [
  { id: "1", name: "JavaScript", created_at: new Date().toISOString() },
  { id: "2", name: "React", created_at: new Date().toISOString() },
  { id: "3", name: "TypeScript", created_at: new Date().toISOString() },
  { id: "4", name: "Next.js", created_at: new Date().toISOString() }
];

const meta: Meta<typeof ArticlePreviewCard> = {
  title: "Widgets/Article/ArticlePreviewCard",
  component: ArticlePreviewCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`ArticlePreviewCard\` 컴포넌트는 블로그 게시물을 카드 형태로 미리보기 하는 UI 컴포넌트입니다.
썸네일 이미지, 태그 목록, 제목, 시리즈 정보, 설명, 작성자 프로필 등을 표시합니다.

## 종속 컴포넌트
이 컴포넌트는 다음 컴포넌트들에 종속성을 가지고 있습니다:
- \`@/entities/tag/ui/TagChipList\`: 태그 목록을 표시
- \`@/shared/ui/Profile\`: 프로필 이미지 표시

## 사용 예시
\`\`\`tsx
import { ArticlePreviewCard } from '@/widgets/article/ui/ArticlePreviewCard';

const MyComponent = () => {
  return (
    <ArticlePreviewCard 
      thumbnailUrl="https://example.com/image.jpg"
      tags={[{ id: 1, name: "React", created_at: "2023-01-01" }]}
      title="React 컴포넌트 설계 패턴"
      seriesName="React 심화 시리즈"
      description="다양한 React 컴포넌트 설계 패턴을 소개합니다."
      updatedAt="2023년 5월 15일"
    />
  );
};
\`\`\`
`
      }
    }
  },
  argTypes: {
    thumbnailUrl: {
      description: "게시물 썸네일 이미지 URL",
      control: "text",
      table: {
        type: { summary: "string | null" }
      }
    },
    tags: {
      description: "게시물 태그 목록 (TagChipList 컴포넌트로 표시)",
      control: "object",
      table: {
        type: { summary: "Tag[]" }
      }
    },
    title: {
      description: "게시물 제목",
      control: "text"
    },
    seriesName: {
      description: "게시물이 속한 시리즈 이름",
      control: "text"
    },
    description: {
      description: "게시물 요약 설명",
      control: "text"
    },
    updatedAt: {
      description: "게시물 업데이트 날짜",
      control: "text"
    }
  }
};

export default meta;

type Story = StoryObj<typeof ArticlePreviewCard>;

// 기본 스토리
export const Default: Story = {
  args: {
    thumbnailUrl: "https://picsum.photos/800/400",
    tags: sampleTags.slice(0, 2).map(({ name }) => name),
    title: "React 컴포넌트 설계 패턴",
    seriesName: "React 심화 시리즈",
    description: "다양한 React 컴포넌트 설계 패턴을 소개합니다.",
    updatedAt: new Date().toISOString()
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본적인 ArticlePreviewCard 컴포넌트 모습입니다. TagChipList와 Profile 컴포넌트가 내부적으로 사용됩니다."
      }
    }
  }
};

// 썸네일 없는 경우
export const NoThumbnail: Story = {
  args: {
    thumbnailUrl: null,
    tags: sampleTags.slice(0, 2).map(({ name }) => name),
    title: "React 컴포넌트 설계 패턴",
    seriesName: "React 심화 시리즈",
    description: "다양한 React 컴포넌트 설계 패턴을 소개합니다.",
    updatedAt: new Date().toISOString()
  },
  parameters: {
    docs: {
      description: {
        story: "썸네일 이미지가 없는 경우 회색 영역으로 대체됩니다."
      }
    }
  }
};

// 태그 없는 경우
export const NoTags: Story = {
  args: {
    thumbnailUrl: "https://picsum.photos/800/400",
    tags: [],
    title: "태그 없는 게시물",
    seriesName: "기본 시리즈",
    description: "이 게시물에는 태그가 지정되지 않았습니다.",
    updatedAt: new Date().toISOString()
  },
  parameters: {
    docs: {
      description: {
        story: "태그가 없는 경우 TagChipList는 비어있게 표시됩니다."
      }
    }
  }
};

// 많은 태그가 있는 경우
export const ManyTags: Story = {
  args: {
    thumbnailUrl: "https://picsum.photos/800/400",
    tags: sampleTags.map(({ name }) => name),
    title: "다양한 태그를 포함한 게시물",
    seriesName: "개발 시리즈",
    description: "이 게시물에는 다양한 기술 관련 태그가 포함되어 있습니다.",
    updatedAt: new Date().toISOString()
  },
  parameters: {
    docs: {
      description: {
        story:
          "많은 수의 태그가 있는 경우 TagChipList는 태그를 여러 줄로 표시합니다."
      }
    }
  }
};

// 시리즈 없는 경우
export const NoSeries: Story = {
  args: {
    thumbnailUrl: "https://picsum.photos/800/400",
    tags: sampleTags.slice(0, 2).map(({ name }) => name),
    title: "시리즈에 포함되지 않은 게시물",
    seriesName: "",
    description:
      "이 게시물은 특정 시리즈에 포함되지 않은 독립적인 게시물입니다.",
    updatedAt: new Date().toISOString()
  },
  parameters: {
    docs: {
      description: {
        story: "시리즈 이름이 없는 경우의 표시 상태입니다."
      }
    }
  }
};
