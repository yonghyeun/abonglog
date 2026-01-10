import { CodeBlock } from "./CodeBlock";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof CodeBlock> = {
  title: "Shared/UI/Code/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    "data-language": { control: "text" },
    title: { control: "text" }
  },
  parameters: {
    layout: "padded"
  }
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const sampleCode = `function helloWorld() {
  console.log("Hello, world!");
  
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(n => n * 2);
  
  return doubled;
}`;

export const Default: Story = {
  args: {
    "data-language": "typescript",
    title: "example.ts",
    children: <pre style={{ margin: 0 }}>{sampleCode}</pre>
  }
};

export const WithTitle: Story = {
  args: {
    "data-language": "tsx",
    title: "Component.tsx",
    children: (
      <pre
        style={{ margin: 0 }}
      >{`const Component = () => <div>Hello</div>`}</pre>
    )
  }
};

export const LongLines: Story = {
  args: {
    "data-language": "javascript",
    children: (
      <pre
        style={{ margin: 0 }}
      >{`const veryLongLine = "This is a line that is intentionally very long to test the horizontal scrolling behavior of the code block component. It should not wrap to the next line but instead allow the user to scroll horizontally to read the full content.";
    
function checkScroll() {
  if (veryLongLine.length > 80) {
    console.log("Scrolling should be enabled");
  }
}`}</pre>
    )
  }
};

export const Bash: Story = {
  args: {
    "data-language": "bash",
    title: "Terminal",
    children: (
      <pre style={{ margin: 0 }}>{`npm install react react-dom next
git commit -m "feat: add code block component"
ls -la`}</pre>
    )
  }
};
