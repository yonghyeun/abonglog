import { Notify } from "./Notify";
import { NotifyContainer } from "./NotifyContainer";
import { useNotify } from "./lib";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "shared/Notify",
  component: NotifyContainer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### Notify 컴포넌트

알림을 표시하는 컴포넌트입니다. 4가지 위치(top-left, top-right, bottom-left, bottom-right)에 알림을 표시할 수 있으며,
3가지 타입(error, success, info)의 알림을 지원합니다.

### 특징
- 자동 닫힘 (3초)
- 수동 닫기 버튼
- 4가지 위치 지원
- 3가지 알림 타입
        `
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "알림의 타입을 지정합니다.",
      control: { type: "select" },
      options: ["error", "success", "info"],
      table: {
        type: { summary: '"error" | "success" | "info"' }
      }
    },
    text: {
      description: "알림에 표시될 메시지입니다.",
      control: "text"
    },
    onClose: {
      description: "알림이 닫힐 때 호출되는 콜백 함수입니다."
    }
  }
} satisfies Meta<typeof Notify>;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonBaseStyle = "px-4 py-2 rounded-md text-white transition-colors";
const buttonStyles = {
  error: "bg-red-500 hover:bg-red-600",
  success: "bg-green-500 hover:bg-green-600",
  info: "bg-blue-500 hover:bg-blue-600"
} as const;

const getNotifyMessage = (
  position: string,
  type: "error" | "success" | "info"
) => {
  const messages = {
    topLeft: {
      error: "작업을 완료할 수 없습니다",
      success: "작업이 완료되었습니다",
      info: "새로운 알림이 있습니다"
    },
    topRight: {
      error: "네트워크 오류가 발생했습니다",
      success: "저장이 완료되었습니다",
      info: "업데이트가 있습니다"
    },
    bottomLeft: {
      error: "파일 업로드에 실패했습니다",
      success: "파일 업로드가 완료되었습니다",
      info: "파일을 처리하고 있습니다"
    },
    bottomRight: {
      error: "인증에 실패했습니다",
      success: "로그인 되었습니다",
      info: "세션이 곧 만료됩니다"
    }
  };
  return messages[position as keyof typeof messages][type];
};

const types = ["error", "success", "info"] as const;

const TopLeftButton = () => {
  const { notifyTopLeft } = useNotify();

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2 font-semibold">Top Left</p>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => notifyTopLeft[type](getNotifyMessage("topLeft", type))}
          className={`${buttonBaseStyle} ${buttonStyles[type as keyof typeof buttonStyles]}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const TopRightButton = () => {
  const { notifyTopRight } = useNotify();

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2 font-semibold">Top Right</p>
      {types.map((type) => (
        <button
          key={type}
          onClick={() =>
            notifyTopRight[type](getNotifyMessage("topRight", type))
          }
          className={`${buttonBaseStyle} ${buttonStyles[type]}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const BottomLeftButton = () => {
  const { notifyBottomLeft } = useNotify();

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2 font-semibold">Bottom Left</p>
      {types.map((type) => (
        <button
          key={type}
          onClick={() =>
            notifyBottomLeft[type](getNotifyMessage("bottomLeft", type))
          }
          className={`${buttonBaseStyle} ${buttonStyles[type]}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const BottomRightButton = () => {
  const { notifyBottomRight } = useNotify();

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2 font-semibold">Bottom Right</p>
      {types.map((type) => (
        <button
          key={type}
          onClick={() =>
            notifyBottomRight[type](getNotifyMessage("bottomRight", type))
          }
          className={`${buttonBaseStyle} ${buttonStyles[type]}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <>
      <TopLeftButton />
      <NotifyContainer />
    </>
  ),

  // interaction test
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const errorButton = canvas.getByText("error");
    const successButton = canvas.getByText("success");
    const infoButton = canvas.getByText("info");

    const errorMessage = getNotifyMessage("topLeft", "error");
    const successMessage = getNotifyMessage("topLeft", "success");
    const infoMessage = getNotifyMessage("topLeft", "info");

    const SLIDE_ANIMATION_TIME = 150;

    await step("알림 표시 - 버튼 클릭 시 알림이 나타난다", async () => {
      // 버튼 클릭
      await userEvent.click(errorButton);
      await userEvent.click(successButton);
      await userEvent.click(infoButton);

      // 알림이 나타나기를 기다림
      const errorNotify = await canvas.findByText(errorMessage);
      const successNotify = await canvas.findByText(successMessage);
      const infoNotify = await canvas.findByText(infoMessage);

      // 검증
      await expect(errorNotify).toBeVisible();
      await expect(successNotify).toBeVisible();
      await expect(infoNotify).toBeVisible();
    });

    await step("알림 닫기 - 닫기 버튼 클릭 시 알림이 사라진다", async () => {
      // 각 notify 에 존재하는 닫기버튼들 모두 클릭
      const closeButtons = canvas.getAllByRole("button", {
        name: /닫기/i
      });

      for (const button of closeButtons) {
        await userEvent.click(button);
      }

      await waitFor(
        async () => {
          // 알림이 사라지기를 기다림
          await expect(
            canvas.queryByText(errorMessage)
          ).not.toBeInTheDocument();
          await expect(
            canvas.queryByText(successMessage)
          ).not.toBeInTheDocument();
          await expect(canvas.queryByText(infoMessage)).not.toBeInTheDocument();
        },
        {
          timeout: SLIDE_ANIMATION_TIME
        }
      );
    });

    await step("알림 자동 닫기 - 1초 후 알림이 사라진다.", async () => {
      // 알림 표시
      await userEvent.click(errorButton);

      // 알림이 나타나기를 기다림
      const errorNotify = await canvas.findByText(errorMessage);

      // 1초 대기
      await new Promise((resolve) => setTimeout(resolve, 1000 + 100));

      // 알림이 사라지기를 기다림
      await waitFor(() => {
        expect(errorNotify).not.toBeVisible();
      });
    });

    await step(
      "알림 애니메이션 - 알림이 나타나고 제거 될 때 애니메이션이 적용된다.",
      async () => {
        // 알림 표시
        await userEvent.click(successButton);

        // 알림이 나타나기를 기다림
        const animationWrapper = (await canvas.findByText(successMessage))
          .parentElement?.parentElement;

        await expect(animationWrapper).not.toHaveClass(`-translate-x-full`);

        // 닫기 버튼 클릭 후 -translate-x-full 클래스가 추가되는지 확인
        const closeButton = canvas.getByRole("button", {
          name: /닫기/i
        });
        await userEvent.click(closeButton);
        await expect(animationWrapper).toHaveClass(`-translate-x-full`);
        await waitFor(() => {
          expect(animationWrapper).not.toBeVisible();
        });
      }
    );
  }
};

export const EveryPosition: Story = {
  render: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <TopLeftButton />
        <TopRightButton />
        <BottomLeftButton />
        <BottomRightButton />
      </div>
      <NotifyContainer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
알림 컴포넌트의 기본 사용 예시입니다. 각 위치와 타입별로 알림을 테스트할 수 있습니다.

\`\`\`tsx
import { useNotify } from './lib';

const { notifyTopLeft, notifyTopRight, notifyBottomLeft, notifyBottomRight } = useNotify();

// 알림 표시 예시
notifyTopLeft("메시지", "success");
notifyTopRight("메시지", "error");
notifyBottomLeft("메시지", "info");
notifyBottomRight("메시지", "success");
\`\`\`
        `
      }
    }
  }
};
