---
applyto: "**/docs/01_slices/**/*.md"
---

# Listing UX 구현: 메인 페이지 및 리스트 리디자인

**작성자**: yonghyeun
**상태**: done
**날짜**: 2026-01-10

## 1. 컨텍스트 (Context)

Article UX(`04_slice`)를 통해 '읽는 경험'을 개선했다면, 이제는 사용자가 '글을 탐색하는 경험'을 개선해야 한다.
현재 메인 페이지(`app/page.tsx`)와 리스트 페이지(`article/list`)는 레거시 스타일을 사용하고 있으며, 디자인 시스템의 카드 UI 패턴과 타이포그래피를 적용하여 일관성을 확보해야 한다.

---

## 2. 요구사항 명세 (Requirements Specification)

### 2.1. Article Card UI
- **Design**: Clean, Minimal Card Style.
    - **Hover Effect**: `scale-up` or `border-color` transition.
    - **Typography**: Title(`heading-m`), Date(`caption`), Excerpt(`body-m` text-tertiary).
    - **Thumbnail**: Aspect Ratio 16:9, Rounded Corners.
    - **Tags**: Small Chips (`bg-surface-2`).

### 2.2. Listing Layout
- **Grid System**: 
    - Mobile: 1 Column.
    - Tablet: 2 Columns.
    - Desktop: 3 Columns (`max-w-screen-xl`).
- **Container**: `Container variant="listing"`(1024px) or `full` used properly.

### 2.3. Page Redesign
- **Main Page**:
    - **Hero Section**: 블로그 소개, 프로필 간략 표시. `Container variant="reading"`(centered text) 활용.
    - **Recent Posts**: 최신 글 그리드.
- **List Page**:
    - **Category/Series Filter**: 탭 스타일 UI? (Check existing logic).
    - **Pagination**: 심플한 숫자/화살표 네비게이션.

---

## 3. 구현 단계 (Implementation Steps)

### Step 1. Article Card 컴포넌트 리팩토링 (`entities/article/ui/ArticleCard`)
- **목표**: 현대적이고 깔끔한 카드 컴포넌트를 만든다.
- **설명**:
    - 기존 `ArticleCard`를 분석하고 디자인 토큰으로 재작성한다.
    - `Image` 최적화 및 레이아웃 이동(CLS) 방지 확인.
    - Hover 인터랙션 추가.
    - [x] Refactored `ArticlePreviewCard`.

### Step 2. 리스트 페이지 레이아웃 (`widgets/article/ui/ArticleList`)
- **목표**: 반응형 그리드 시스템을 적용한다.
- **설명**:
    - `ArticleList` 위젯이 Grid Layout을 사용하도록 변경.
    - `gap-6`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 등 유틸리티 적용.
    - [x] Refactored `Grid` component in `shared/ui/Grid.tsx`.

### Step 3. 메인 페이지 리디자인 (`app/page.tsx`)
- **목표**: 첫인상을 결정하는 메인 페이지를 정돈한다.
- **설명**:
    - Hero 섹션(자기소개) 디자인 개선.
    - 최신 글 목록 섹션과의 간격(`my-12`) 조정.
    - [x] Refactored `app/page.tsx` with `Container`.

### Step 4. 시리즈/태그 리스트 점검 (`article/list/[...params]`)
- **목표**: 필터링된 목록 페이지도 동일한 경험을 제공하는지 확인한다.
- **설명**:
    - 공통 `ArticleList` 위젯을 사용하므로 자동 적용될 것으로 예상되나, 헤더(시리즈명 표시 등) 스타일링이 필요할 수 있음.
    - [x] Refactored `article/list/page.tsx`.

