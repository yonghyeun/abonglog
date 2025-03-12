import { List } from "./List";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof List.UnOrder> = {
  title: "shared/ui/List",
  component: List.UnOrder,
  argTypes: {
    className: {
      control: {
        type: "text"
      },
      description: "추가적인 클래스 이름"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## List 컴포넌트

\`List\` 컴포넌트는 리스트 항목을 표시하는 컴포넌트입니다. \`Order\`, \`UnOrder\`, \`Item\`으로 구성되어 있으며, 다양한 콘텐츠를 리스트 형태로 배치할 수 있습니다.

### Props

#### ListProps
- \`children\`: List 내부의 내용
- \`className\`: 추가적인 클래스 이름

### 사용 예시

\`\`\`tsx
import { List } from "@/shared/ui/List";

const ExampleComponent = () => {
  return (
    <List.Order className="custom-class">
      <List.Item className="item-class">Item 1</List.Item>
      <List.Item className="item-class">Item 2</List.Item>
      <List.Item className="item-class">Item 3</List.Item>
    </List.Order>
  );
};
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof List.Order>;

export const OrderedList: Story = {
  args: {
    children: (
      <List.Order>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List.Order>
    ),
    className: ""
  },
  render: (args) => <List.Order {...args} />
};

export const UnorderedList: Story = {
  args: {
    children: (
      <>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </>
    ),
    className: ""
  },
  render: ({ children }) => <List.UnOrder>{children}</List.UnOrder>
};

export const CustomClass: Story = {
  args: {
    children: (
      <List.UnOrder>
        <List.Item className="bg-blue-100 p-2">Item 1</List.Item>
        <List.Item className="bg-blue-200 p-2">Item 2</List.Item>
        <List.Item className="bg-blue-300 p-2">Item 3</List.Item>
      </List.UnOrder>
    ),
    className: "custom-class"
  },
  render: (args) => <List.Order {...args} />
};

export const NestedList: Story = {
  args: {
    children: (
      <>
        <List.Item>
          <List.UnOrder>
            <List.Item>Nested Item 1</List.Item>
            <List.Item>Nested Item 2</List.Item>
          </List.UnOrder>
        </List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </>
    ),
    className: ""
  },
  render: ({ children }) => <List.Order>{children}</List.Order>
};
