import { TagChip } from "./TagChip";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof TagChip> = {
  title: "entities/tag/TagChip",
  component: TagChip,
  argTypes: {
    children: {
      control: {
        type: "text"
      },
      description: "TagChip 내부의 텍스트"
    },
    onClick: {
      action: "clicked",
      description: "TagChip 클릭 시 실행되는 함수"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## TagChip 컴포넌트

\`TagChip\` 컴포넌트는 태그를 표시하는 버튼 형태의 컴포넌트입니다. \`children\` 속성을 통해 태그 텍스트를 설정할 수 있으며, \`theme\` 속성은 \`summarizeTextCode\` 함수를 통해 결정됩니다.

\`capitalizeFirstLetter\` 함수를 통해 첫 글자를 대문자로 변환합니다.

### Props

- \`children\`: TagChip 내부의 텍스트
- \`onClick\`: TagChip 클릭 시 실행되는 함수

### 사용 예시

\`\`\`tsx
import { TagChip } from "@/entities/tag/ui/TagChip";

const ExampleComponent = () => {
  return (
    <TagChip onClick={() => console.log("TagChip clicked!")}>
      Example Tag
    </TagChip>
  );
};
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TagChip>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <TagChip>react</TagChip>
      <TagChip>javascript</TagChip>
      <TagChip>typescript</TagChip>
      <TagChip>algorithm</TagChip>
    </div>
  )
};
