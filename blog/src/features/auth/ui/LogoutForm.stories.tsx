import { LogoutForm } from "./LogoutForm";
import { StoryObj } from "@storybook/react";

const meta = {
  title: "features/auth/LogoutForm",
  component: LogoutForm
};

export default meta;

export const Default: StoryObj<typeof LogoutForm> = {
  render: () => <LogoutForm />
};
