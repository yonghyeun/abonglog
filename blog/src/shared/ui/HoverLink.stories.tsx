import { HoverLink } from "./HoverLink";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof HoverLink> = {
  title: "shared/HoverLink",
  component: HoverLink,
  argTypes: {
    children: {
      control: {
        type: "text"
      },
      description: "링크 내부의 자식 요소"
    },
    className: {
      control: {
        type: "text"
      },
      description: "추가적인 클래스 이름"
    },
    href: {
      control: {
        type: "text"
      },
      description: "링크의 목적지 URL"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`HoverLink\` 컴포넌트는 링크에 호버 효과를 추가하는 컴포넌트입니다. 링크에 마우스를 올리면 확대되고 그림자가 커집니다.

## Props

### HoverLinkProps
- \`children\` (React.ReactNode): 링크 내부의 자식 요소.
- \`className\` (string)?: 추가적인 클래스 이름.
- \`href\` (string): 링크의 목적지 URL.

## 사용 예시

\`\`\`typescript
import { HoverLink } from "@/shared/ui/HoverLink";

const ExampleComponent = () => {
  return (
    <div>
      <HoverLink href="/about">About Us</HoverLink>
      <HoverLink href="/contact" className="text-blue-500">Contact Us</HoverLink>
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
type Story = StoryObj<typeof HoverLink>;

export const Default: Story = {
  args: {
    children: "Default Link",
    href: "/"
  },
  render: (args) => (
    <div className="p-4">
      <HoverLink {...args} />
    </div>
  )
};

export const CustomClass: Story = {
  args: {
    children: "Custom Class Link",
    href: "/custom",
    className: "text-blue-500 p-4"
  },
  render: (args) => (
    <div className="p-4">
      <HoverLink {...args} />
    </div>
  )
};

export const ExternalLink: Story = {
  args: {
    children: "External Link",
    href: "https://www.example.com",
    className: "text-red-500 p-4"
  },
  render: (args) => (
    <div className="p-4">
      <HoverLink {...args} />
    </div>
  )
};
