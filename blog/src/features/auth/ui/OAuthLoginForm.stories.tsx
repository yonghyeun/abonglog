import { OAuthLoginForm } from "./OAuthLoginForm";
import { StoryObj } from "@storybook/react";

const meta = {
  title: "features/auth/OAuthLoginForm",
  component: OAuthLoginForm
};

export default meta;

export const Default: StoryObj<typeof OAuthLoginForm> = {
  render: () => <OAuthLoginForm />
};
