import type { Meta, StoryObj } from "@storybook/react";
import { ArticleRowCard } from "./ArticleRowCard";

const meta: Meta<typeof ArticleRowCard> = {
  title: "Widgets/Article/ArticleRowCard",
  component: ArticleRowCard,
  tags: ["autodocs"],
  argTypes: {
    thumbnailUrl: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    seriesName: { control: "text" },
    createdAt: { control: "date" },
    tags: { control: "object" }
  },
  parameters: {
    layout: "padded"
  }
};

export default meta;
type Story = StoryObj<typeof ArticleRowCard>;

export const Default: Story = {
  args: {
    thumbnailUrl: "https://picsum.photos/800/400",
    title: "Understanding React Server Components",
    description:
      "A deep dive into how React Server Components work and why they are a game changer for web development.",
    seriesName: "Modern React",
    createdAt: new Date().toISOString(),
    tags: ["React", "Next.js", "Web Development"]
  }
};

export const NoThumbnail: Story = {
  args: {
    thumbnailUrl: null,
    title: "Understanding React Server Components",
    description:
      "A deep dive into how React Server Components work and why they are a game changer for web development.",
    seriesName: "Modern React",
    createdAt: new Date().toISOString(),
    tags: ["React", "Next.js", "Web Development"]
  }
};

export const LongText: Story = {
  args: {
    thumbnailUrl: "https://picsum.photos/800/400",
    title:
      "This is a very long title that should probably be truncated if it exceeds a certain number of lines to maintain the layout integrity",
    description:
      "This is a very long description that outlines the contents of the article in great detail. It mentions various topics and subtopics that will be covered, and it just keeps going and going to test how the card handles large amounts of text content without breaking the design.",
    seriesName: "Web Development Best Practices",
    createdAt: new Date().toISOString(),
    tags: ["Frontend", "UX", "Accessibility", "Performance", "Design Systems"]
  }
};
