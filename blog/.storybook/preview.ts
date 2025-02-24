import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layouts: ["center"],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
