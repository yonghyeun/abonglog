import { Tag } from "./Tag";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tag> = {
  title: "entities/tag/Tag",
  component: Tag,
  argTypes: {
    tagId: {
      control: {
        type: "number"
      },
      description: "태그의 고유 ID (스타일 적용에 사용)"
    },
    name: {
      control: {
        type: "text"
      },
      description: "태그 이름"
    },
    onClick: {
      description: "태그 클릭 시 실행되는 함수"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`Tag\` 컴포넌트는 태그를 나타내는 버튼 컴포넌트입니다. 각 태그는 고유한 색상 스타일을 가지며, 클릭 시 지정된 콜백 함수를 호출합니다.

## 파일 경로

## Props

### TagProps
- \`tagId\` (number): 태그의 고유 ID. 색상 스타일을 결정하는 데 사용됩니다.
- \`name\` (string): 태그 이름.
- \`onClick\` (function): 태그 클릭 시 호출되는 함수. 태그 이름을 인자로 받습니다.
- 기타 \`React.ButtonHTMLAttributes<HTMLButtonElement>\` 속성들을 상속받습니다.

## 사용 예시

\`\`\`typescript
import { Tag } from "@/entities/tag/ui/Tag";

const handleTagClick = (tagName: string) => {
  console.log(\`Clicked tag: \${tagName}\`);
};

const ExampleComponent = () => {
  return (
    <div>
      <Tag tagId={0} name="javascript" onClick={handleTagClick} />
      <Tag tagId={1} name="react" onClick={handleTagClick} />
      <Tag tagId={2} name="typescript" onClick={handleTagClick} />
    </div>
  );
};
\`\`\`

## 주요 기능

### 색상 스타일
\`tagStyleArray\` 배열을 사용하여 태그 ID에 따라 고유한 색상 스타일을 적용합니다. 배열의 길이를 초과하는 경우, 모듈로 연산을 통해 색상을 순환합니다.

### 첫 글자 대문자 변환
\`capitalizeFirstLetter\` 함수를 사용하여 태그 이름의 첫 글자를 대문자로 변환합니다.

### 클릭 이벤트
태그를 클릭하면 \`onClick\` 함수가 호출되며, 태그 이름이 인자로 전달됩니다.

## 스타일
각 태그는 다음과 같은 스타일을 가집니다:
- \`rounded-full\`: 둥근 모서리
- \`px-4 py-1\`: 패딩
- \`font-semibold\`: 폰트 굵기

## 의존성
- \`tagStyleArray\`: 태그 ID별 색상 스타일 배열
- \`capitalizeFirstLetter\`: 문자열의 첫 글자를 대문자로 변환하는 함수

## 참고
- \`tagStyleArray\`는 \`../config\`에서 가져옵니다.
- \`capitalizeFirstLetter\`는 \`../lib\`에서 가져옵니다.
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    tagId: 0,
    name: "javascript",
    onClick: (tagName) => {
      console.log(`Clicked tag: ${tagName}`);
    }
  },
  render: (args) => (
    <div className="p-4">
      <Tag {...args} />
    </div>
  )
};

export const MultipleColors: Story = {
  render: () => (
    <div className="flex gap-2 p-4">
      {["react", "typescript", "nextjs", "tailwind"].map((name, index) => (
        <Tag
          key={index}
          tagId={index}
          name={name}
          onClick={(tagName) => console.log(`Clicked tag: ${tagName}`)}
        />
      ))}
    </div>
  )
};
