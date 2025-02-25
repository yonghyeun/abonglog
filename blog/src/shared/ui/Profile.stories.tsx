import { Profile } from "./Profile";
import { Meta } from "@storybook/react";

const meta: Meta<typeof Profile> = {
  title: "shared/Profile",
  component: Profile,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"]
      },
      description: "프로필 이미지의 크기"
    }
  }
};

export default meta;

export const Default = {
  render: () => (
    <div className="bg-secondary flex items-center gap-4 p-4">
      <Profile size="sm" />
      <Profile size="md" />
      <Profile size="lg" />
    </div>
  )
};
