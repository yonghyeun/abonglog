import { Button } from "./Button";
import { Meta } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["sm", "md", "lg"]
      },
      description: "버튼의 크기"
    },
    variant: {
      control: {
        type: "select",
        options: ["filled", "outlined"]
      },
      description: "버튼의 스타일"
    },
    children: {
      control: {
        type: "text"
      },
      description: "버튼의 내용"
    },
    onClick: { action: "clicked" },
    disabled: {
      control: {
        type: "boolean"
      },
      description: "버튼 비활성화 여부"
    }
  }
};

export default meta;

export const Default = {
  render: () => {
    const sizeArray = ["sm", "md", "lg"] as React.ComponentProps<
      typeof Button
    >["size"][];

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-end gap-8">
          {sizeArray.map((size) => (
            <Button variant="filled" size={size} key={size}>
              Button
            </Button>
          ))}
        </div>
        <div>
          <div className="flex items-end gap-8">
            {sizeArray.map((size) => (
              <Button variant="outlined" size={size} key={size}>
                Button
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <div className="flex items-end gap-8">
              {sizeArray.map((size) => (
                <Button variant="filled" size={size} key={size} disabled>
                  Disabled
                </Button>
              ))}
            </div>
            <div className="flex items-end gap-8">
              {sizeArray.map((size) => (
                <Button variant="outlined" size={size} key={size} disabled>
                  Disabled
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
