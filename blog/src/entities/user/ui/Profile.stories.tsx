import { AdminProfile, Profile } from "./Profile";
import { Meta } from "@storybook/react";

const meta: Meta<typeof Profile> = {
  title: "entitis/user/Profile",
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
    <div className="flex items-center gap-4 bg-secondary p-4">
      <AdminProfile size="sm" />
      <AdminProfile size="md" />
      <AdminProfile size="lg" />
    </div>
  )
};
