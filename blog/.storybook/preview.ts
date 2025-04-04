import "../app/globals.css";
import type { Preview } from "@storybook/react";

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400;700&display=swap');
  
  body {
    font-family: 'Gothic A1', sans-serif;
  }
`;

const injectFontStyles = () => {
  if (typeof document !== "undefined") {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = fontStyles;
    document.head.appendChild(styleElement);
  }
};

// 스타일 주입
injectFontStyles();

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
