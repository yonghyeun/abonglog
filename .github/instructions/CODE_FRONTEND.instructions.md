---
applyTo: "src/{app,client,components,views}/**/*.{ts,tsx}"
---

# Code Convention: Frontend (Next.js & React)

> **Goal:**
> UI는 상태를 반영하는 **순수 함수(Pure Function)**여야 함.
> **Next.js + Tailwind + FP(함수형) + A11y(접근성)**가 조화된 예측 가능한 인터페이스 구현.

## 1. Component Architecture (Next.js App Router)

### 1.1. Server vs Client Components

- **Default to Server:** 기본적으로 모든 컴포넌트는 **Server Component**로 작성함.
- **Leaf Node Pattern:** `'use client'` 지시어는 상태(`useState`)나 이벤트 핸들러(`onClick`)가 필요한 **가장 하위 컴포넌트(Leaf Node)**에만 선언함.
    - ❌ 페이지 전체(`page.tsx`)를 Client Component로 전환하지 않음.
- **Client Boundary:** 다음 기능 사용 시에만 클라이언트 컴포넌트로 전환함:
    - React Hooks (`useState`, `useEffect` 등).
    - Event Listeners (`onClick`, `onChange` 등).
    - Browser APIs (`window`, `localStorage` 등).

### 1.2. Component Structure (Functional Style)

- **Pure Arrows:** `function` 키워드나 `class` 대신 `const`와 **화살표 함수(Arrow Function)** 사용.
- **Props Definitions:** Props 타입은 반드시 `interface`로 정의하고 컴포넌트 상단에 위치시킴.
- **Destructuring:** Props는 함수 인자에서 즉시 구조 분해 할당하여 사용함.

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return <button type="button" onClick={onClick}>{label}</button>;
};
```

---

## 2. State Management & Data Fetching

### 2.1. Minimal Local State

- **Transient UI:** `useState`는 모달, 토글 등 일시적인 UI 상태에만 사용함.
- **URL as State:** 검색어, 페이지네이션, 필터 등은 **URL Search Params**로 관리하여 공유 및 새로고침 시 유지를 보장함.

### 2.2. Data Fetching Strategy

- **Server Components:** `async/await`를 사용하여 데이터 패칭을 직접 수행 (`fetch` or DB Call).
- **Client Components:**
    - **Prefetching:** 부모 Server Component에서 데이터를 가져와 Props로 전달하는 패턴 선호.
    - **React Query:** 클라이언트 사이드 패칭이 필수적인 경우 `@tanstack/react-query` 사용.
- **No Effect Fetching:** `useEffect` 내부에서 데이터를 패칭하는 것을 금지함 (Waterfall 및 Race Condition 방지).

### 2.3. Global State (Zustand)

- **Client Only:** 전역 클라이언트 상태는 `zustand` 사용.
- **Initialization:** 서버 상태와의 동기화가 필요한 경우 `Hydration` 패턴 사용.

---

## 3. Web Accessibility (A11y - Strict)

> **Note:** AI 에이전트는 코드 작성 시 아래 접근성 규칙을 **강제적**으로 준수해야 함.

### 3.1. Semantic HTML

- **No Div Soup:** 의미 없는 `<div>` 남용 금지.
    - ✅ 버튼: `<button type="button">` (절대 `<div onClick>` 금지).
    - ✅ 목록: `<ul>`, `<li>`.
    - ✅ 섹션: `<section>`, `<article>`, `<header>`, `<footer>`.

### 3.2. Forms & Interactions

- **Labels:** 모든 `input`, `textarea`, `select`는 연결된 `<label>`이 있거나 `aria-label` 속성을 가져야 함.
- **Textless Buttons:** 아이콘 버튼 등 텍스트가 없는 요소는 반드시 `aria-label="기능 설명"`을 포함해야 함.
- **Keyboard Navigation:** 모든 인터랙션 요소는 키보드(`Tab`, `Enter`, `Space`)만으로 접근 및 조작 가능해야 함 (`tabIndex` 활용).

### 3.3. Images

- **Alt Text:** 장식용(`aria-hidden="true"`)이 아닌 모든 이미지에 명확한 `alt` 속성을 제공함.

---

## 4. Styling (Tailwind CSS)

### 4.1. Utility First

- **Direct Usage:** 별도의 CSS 파일이나 CSS-in-JS 라이브러리 대신 Tailwind 유틸리티 클래스를 직접 사용함.

### 4.2. Conditional Styling

- **cn Utility:** 조건부 스타일링은 템플릿 리터럴 대신 `cn` (clsx + tailwind-merge) 유틸리티를 사용함.

```tsx
<button className={cn(
  "bg-blue-500 px-4 py-2",
  isDisabled && "bg-gray-400 cursor-not-allowed"
)}>
```

### 4.3. Class Ordering

- **Logical Order:** 가독성을 위해 `Layout` -> `Box Model` -> `Typography` -> `Visual` -> `Misc` 순서의 멘탈 모델 유지 (Prettier 자동 정렬 권장).

---

## 5. Directory & Naming

- **File Naming:**
    - Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
    - Hooks: `camelCase.ts` (e.g., `useAuth.ts`)
- **Co-location:** 특정 기능(Slice)에서만 사용되는 컴포넌트는 해당 기능 폴더(`features/{slice}/components`) 내부에 위치시킴 (조기 추상화 지양).
