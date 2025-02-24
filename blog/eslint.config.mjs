import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    parser: "@typescript-eslint/parser", // TypeScript 코드를 파싱하기 위한 파서
    extends: [
      "next/core-web-vitals", // Next.js 프로젝트를 위한 기본 설정
      "next", // Next.js 프로젝트를 위한 추가 설정
      "plugin:@typescript-eslint/recommended", // TypeScript를 위한 권장 설정
      "plugin:prettier/recommended" // Prettier와 ESLint 통합을 위한 설정
    ],
    plugins: [
      "react", // React 관련 린트 규칙을 추가
      "react-hooks", // React Hooks 관련 린트 규칙을 추가
      "jsx-a11y", // 접근성 관련 린트 규칙을 추가
      "import", // import/export 관련 린트 규칙을 추가
      "prettier", // Prettier와 ESLint 통합을 위한 플러그인
      "@typescript-eslint", // TypeScript 관련 린트 규칙을 추가
      "unused-imports" // 사용되지 않는 import를 감지하고 제거하기 위한 플러그인
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "error", // 사용되지 않는 변수를 에러로 표시
      "unused-imports/no-unused-imports": "error", // 사용되지 않는 import를 에러로 표시
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all", // 모든 변수를 검사
          varsIgnorePattern: "^_", // "_"로 시작하는 변수는 무시
          args: "after-used", // 사용된 이후의 인수만 검사
          argsIgnorePattern: "^_" // "_"로 시작하는 인수는 무시
        }
      ],
      "prettier/prettier": "error" // Prettier 규칙을 ESLint에 추가하여 코드 스타일을 검사
    }
  })
];

export default eslintConfig;
