import { PostCard } from "./PostCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PostCard> = {
  title: "entities/preview/PostCard",
  component: PostCard,
  args: {
    postId: 1,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum voluptates dolores, tempore optio modi sequi numquam at temporibus voluptatibus repudiandae ipsum aliquam ducimus ",
    createdAt: new Date().toDateString(),
    thumbnailUrl: "/images/latest_post_thumbnail.jpg",
    tags: [
      { id: 1, name: "react" },
      { id: 2, name: "Typescript" },
      { id: 3, name: "jest" }
    ]
  }
};

export default meta;

export const Default: StoryObj<typeof PostCard> = {
  render: (args) => (
    <div className="aspect-square w-96">
      <PostCard {...args} />
    </div>
  )
};
