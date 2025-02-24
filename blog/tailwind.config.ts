import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        tertiary: "var(--bg-tertiary)"
      },
      colors: {
        "sky-blue": "var(--sky-blue)",
        "bright-blue": "var(--bright-blue)"
      }
    }
  },
  plugins: []
} satisfies Config;
