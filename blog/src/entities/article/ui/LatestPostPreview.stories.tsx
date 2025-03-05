import { LatestArticlePreview } from "./LatestArticlePreview";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LatestArticlePreview> = {
  title: "entities/preview/LatestPostPreview",
  component: LatestArticlePreview,
  argTypes: {
    postId: {
      control: {
        type: "number"
      },
      description: "게시글의 ID"
    },
    title: {
      control: {
        type: "text"
      },
      description: "게시글의 제목"
    },
    description: {
      control: {
        type: "text"
      },
      description: "게시글의 설명"
    },
    createdAt: {
      control: {
        type: "date"
      },
      description: "게시글의 작성 날짜"
    },
    thumbnailUrl: {
      control: {
        type: "text"
      },
      description: "썸네일 이미지의 URL"
    }
  }
};

export default meta;
type Story = StoryObj<typeof LatestArticlePreview>;

export const Default: Story = {
  args: {
    postId: 1,
    title: "함수형 사고로 FSD 구조에서 레이어의 역할 이해하기 (feat : 리액트)",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis alias, beatae tempora totam officia eum, dolorem illum possimus provident eaque cumque",
    createdAt: new Date().toDateString(),
    thumbnailUrl:
      "https://feature-sliced.design/kr/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg"
  },
  render: (args) => (
    <section className="h-[30vh] w-screen">
      <LatestArticlePreview {...args} />
    </section>
  )
};
