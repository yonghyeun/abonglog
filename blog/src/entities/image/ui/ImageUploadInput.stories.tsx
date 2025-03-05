import { ImageUploadInput } from "./ImageUploadInput";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof ImageUploadInput> = {
  title: "Entities/Image/ImageUploadInput",
  component: ImageUploadInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 개요
\`ImageUploadInput\` 컴포넌트는 이미지 업로드를 위한 파일 입력 UI입니다.
사용자에게 친숙한 레이블과 숨겨진 파일 입력을 제공합니다.

## 사용 예시

\`\`\`tsx
import { ImageUploadInput } from '@/entities/image/ui/ImageUploadInput';

const MyComponent = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // 파일 처리 로직
  };
  
  return (
    <ImageUploadInput 
      id="my-image-upload"
      labelTitle="이미지 업로드"
      inputProps={{
        accept: "image/*",
        onChange: handleFileChange,
        className: "hidden"
      }}
    />
  );
};
\`\`\`
`
      }
    }
  },
  argTypes: {
    id: {
      description: "입력 요소와 레이블을 연결하는 ID",
      control: "text"
    },
    labelTitle: {
      description: "레이블에 표시될 텍스트",
      control: "text"
    },
    labelProps: {
      description: "레이블 엘리먼트에 전달할 추가 속성",
      control: "object"
    },
    inputProps: {
      description: "입력 엘리먼트에 전달할 추가 속성",
      control: "object"
    }
  }
};

export default meta;

type Story = StoryObj<typeof ImageUploadInput>;

// 기본 스토리
export const Default: Story = {
  args: {
    id: "image-upload",
    labelTitle: "이미지 업로드",
    inputProps: {
      className: "hidden",
      accept: "image/*",
      onChange: action("파일 선택됨")
    }
  }
};

// 여러 파일 업로드
export const MultipleFiles: Story = {
  args: {
    id: "multiple-image-upload",
    labelTitle: "여러 이미지 선택하기",
    inputProps: {
      className: "hidden",
      accept: "image/*",
      multiple: true,
      onChange: action("여러 파일 선택됨")
    }
  },
  parameters: {
    docs: {
      description: {
        story: "여러 파일을 선택할 수 있는 업로드 컴포넌트입니다."
      }
    }
  }
};

// 커스텀 스타일 레이블
export const CustomLabelStyle: Story = {
  args: {
    id: "styled-image-upload",
    labelTitle: "스타일 적용된 업로드",
    labelProps: {
      className:
        "flex cursor-pointer items-center gap-1 bg-sky-blue/20 text-sky-blue px-4 py-2 rounded-md hover:bg-sky-blue/30 transition-colors"
    },
    inputProps: {
      className: "hidden",
      accept: "image/*",
      onChange: action("파일 선택됨")
    }
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 스타일이 적용된 레이블을 사용하는 예시입니다."
      }
    }
  }
};

// 특정 파일 타입만 허용
export const SpecificFileTypes: Story = {
  args: {
    id: "specific-type-upload",
    labelTitle: "PNG 이미지만 업로드",
    inputProps: {
      className: "hidden",
      accept: "image/png",
      onChange: action("PNG 파일 선택됨")
    }
  },
  parameters: {
    docs: {
      description: {
        story: "PNG 파일만 선택 가능한 업로드 컴포넌트입니다."
      }
    }
  }
};
