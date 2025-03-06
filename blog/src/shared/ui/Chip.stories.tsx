import { Chip } from "./Chip";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Chip> = {
  title: "shared/Chip",
  component: Chip,
  argTypes: {
    children: {
      control: {
        type: "text"
      },
      description: "Chip 내부의 내용"
    },
    theme: {
      control: {
        type: "number",
        min: 0,
        max: 19
      },
      description: "Chip의 테마 (0부터 19까지의 숫자, 최대값 19)"
    },
    onClick: {
      action: "clicked",
      description: "Chip 클릭 시 실행되는 함수"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## Chip 컴포넌트

\`Chip\` 컴포넌트는 다양한 테마를 가진 버튼 형태의 컴포넌트입니다. \`theme\` 속성을 통해 0부터 19까지의 테마를 설정할 수 있습니다.

### Props

- \`children\`: Chip 내부의 내용
- \`theme\`: Chip의 테마 (0부터 19까지의 숫자)
- \`onClick\`: Chip 클릭 시 실행되는 함수

### 사용 예시

\`\`\`tsx
import { Chip } from "@/shared/ui/Chip";

const ExampleComponent = () => {
  return (
    <Chip theme={0} onClick={() => console.log("Chip clicked!")}>
      Example Chip
    </Chip>
  );
};
\`\`\`
        `
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <Chip key={i} theme={i} className="m-2">
          {`Theme ${i}`}
        </Chip>
      ))}
    </>
  )
};
