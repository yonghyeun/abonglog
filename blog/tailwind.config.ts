import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // 다크 모드 활성화
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Pretendard", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      colors: {
        brand: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)"
        },
        status: {
          error: "var(--color-error)",
          warning: "var(--color-warning)",
          info: "var(--color-info)",
          success: "var(--color-success)"
        }
      },
      backgroundColor: {
        app: "var(--bg-app)",
        "surface-1": "var(--bg-surface-1)",
        "surface-2": "var(--bg-surface-2)",
        overlay: "var(--bg-overlay)",
        // Legacy Support
        primary: "var(--bg-app)",
        secondary: "var(--bg-surface-1)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        quaternary: "var(--text-quaternary)"
      },
      borderColor: {
        default: "var(--border-default)",
        active: "var(--border-active)"
      },
      fontSize: {
        "display": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading-l": ["2.25rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-m": ["1.75rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "500" }],
        "heading-s": ["1.375rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "500" }],
        "body-l": ["1.125rem", { lineHeight: "1.7", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-m": ["1rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "caption": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
      },
      spacing: {
        // Tailwind default spacing is 4px based (p-1 = 0.25rem = 4px).
        // 03_layout_spacing.md confirms 4px/8px grid.
        // No extra config needed unless specific custom values.
      }
    }
  },
  plugins: []
} satisfies Config;
