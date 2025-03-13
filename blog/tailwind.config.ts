import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // 다크 모드 활성화
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        darkPrimary: "var(--bg-dark-primary)",
        darkSecondary: "var(--bg-dark-secondary)"
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        quaternary: "var(--text-quaternary)",
        darkPrimary: "var(--text-dark-primary)",
        darkSecondary: "var(--text-dark-secondary)",
        darkTertiary: "var(--text-dark-tertiary)",
        darkQuaternary: "var(--text-dark-quaternary)"
      }
    }
  },
  plugins: []
} satisfies Config;
