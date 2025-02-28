import { EmailLoginForm } from "./EmailLoginForm";
import { StoryObj } from "@storybook/react";

const meta = {
  title: "features/auth/EmailLoginForm",
  component: EmailLoginForm
};

export default meta;

export const Default: StoryObj<typeof EmailLoginForm> = {
  render: () => <EmailLoginForm />
};
