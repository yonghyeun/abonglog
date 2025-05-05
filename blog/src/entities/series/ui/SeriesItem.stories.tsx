import { SeriesItem } from "./SeriesItem";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof SeriesItem> = {
  title: "entities/series/SeriesItem",
  component: SeriesItem,
  argTypes: {
    seriesName: {
      control: {
        type: "text"
      },
      description: "시리즈 이름"
    },
    numOfArticles: {
      control: {
        type: "number"
      },
      description: "아티클 수"
    },
    createdAt: {
      control: {
        type: "text"
      },
      description: "마지막 업데이트 날짜"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`SeriesItem\` 컴포넌트는 시리즈를 나타내는 컴포넌트입니다. 시리즈 이름, 아티클 수, 마지막 업데이트 날짜를 표시합니다.

## Props

### SeriesItemProps
- \`seriesName\` (string): 시리즈 이름.
- \`numOfArticles\` (number): 아티클 수.
- \`createdAt\` (string): 마지막 업데이트 날짜.

## 사용 예시

\`\`\`typescript
import { SeriesItem } from "@/entities/series/ui/SeriesItem";

const ExampleComponent = () => {
  return (
    <div>
      <SeriesItem seriesName="React Basics" numOfArticles={10} createdAt="2025-03-05" />
      <SeriesItem seriesName="Advanced TypeScript" numOfArticles={5} createdAt="2025-02-28" />
    </div>
  );
};
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SeriesItem>;

export const Default: Story = {
  args: {
    seriesName: "React Basics",
    numOfArticles: 10,
    createdAt: "2025-03-05"
  },
  render: (args) => (
    <div className="p-4">
      <SeriesItem {...args} />
    </div>
  )
};

export const WithFewArticles: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <SeriesItem
        seriesName="Advanced TypeScript"
        numOfArticles={3}
        createdAt="2025-02-28"
      />
      <SeriesItem
        seriesName="JavaScript Essentials"
        numOfArticles={2}
        createdAt="2025-01-15"
      />
      <SeriesItem
        seriesName="CSS Mastery"
        numOfArticles={4}
        createdAt="2025-02-10"
      />
    </div>
  )
};

export const RecentlyUpdated: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <SeriesItem
        seriesName="Next.js Guide"
        numOfArticles={5}
        createdAt={new Date().toISOString().split("T")[0]}
      />
      <SeriesItem
        seriesName="GraphQL Basics"
        numOfArticles={6}
        createdAt={new Date().toISOString().split("T")[0]}
      />
      <SeriesItem
        seriesName="Node.js in Depth"
        numOfArticles={7}
        createdAt={new Date().toISOString().split("T")[0]}
      />
    </div>
  )
};
