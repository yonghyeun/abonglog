import { Grid } from "./Grid";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Grid> = {
  title: "shared/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`Grid\` 컴포넌트는 그리드 레이아웃을 제공하는 컴포넌트입니다. \`Grid.Item\`과 함께 사용하여 다양한 콘텐츠를 그리드 형태로 배치할 수 있습니다.

## 사용 예시
\`\`\`tsx
import { Grid } from "@/shared/ui/Grid";

const MyComponent = () => {
  return (
    <Grid>
      <Grid.Item>Item 1</Grid.Item>
      <Grid.Item>Item 2</Grid.Item>
      <Grid.Item>Item 3</Grid.Item>
    </Grid>
  );
};
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid>
      <Grid.Item className="bg-gray-200 p-4">Item 1</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 2</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 3</Grid.Item>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본적인 Grid 컴포넌트 모습입니다. 3개의 아이템을 포함합니다."
      }
    }
  }
};

export const ManyItems: Story = {
  render: () => (
    <Grid>
      <Grid.Item className="bg-gray-200 p-4">Item 1</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 2</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 3</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 4</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 5</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 6</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 7</Grid.Item>
      <Grid.Item className="bg-gray-200 p-4">Item 8</Grid.Item>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "여러 개의 아이템을 포함한 Grid 컴포넌트 모습입니다. 8개의 아이템을 포함합니다."
      }
    }
  }
};
