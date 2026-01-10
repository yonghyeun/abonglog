---
applyto: "**/app/globals.css"
---

# Slice 6: UI 스타일 고도화 및 인터랙션 개선

| 항목 | 내용 |
| --- | --- |
| 작성자 | GitHub Copilot |
| 이슈 | #165-redesign |
| 상태 | done |
| 날짜 | 2026-01-10 |

## 1. 컨텍스트 (Context)

기능적인 UI 구조(목록, 상세, 코드 블록) 구현이 완료되었으나, 전반적인 시각적 완성도(Look & Feel)가 부족하다.
특히 기존의 보라색(Purple) 테마는 다소 차갑고 기계적인 느낌을 주어, 블로그의 "에세이 같은 따뜻함"을 전달하기 어렵다.
이에 따라 따뜻하고 감성적인 **Warm Orange** 테마로 전면 개편하고, 코드 곳곳에 산재된 하드코딩된 색상 값들을 정리하여 디자인 시스템의 일관성을 확보한다.

## 2. 요구사항 명세 (Requirements)

### 2.1. 컬러 팔레트 재정의 (Warm Orange Theme)
- **Primary Color 변경**: 기존의 보라색(`6200ea`)을 제거하고, 창의적이고 따뜻한 **Warm Orange (#f97316)** 를 메인 컬러로 채택한다.
- **Surface Colors**: Stone(Warm Gray) 계열의 배경색을 사용하여 종이 질감의 편안함을 제공한다.

### 2.2. 모던 스크롤바 (Modern Scrollbar)
- OS 기본 스크롤바 대신, 디자인 시스템과 어우러지는 얇고 깔끔한 커스텀 스크롤바를 적용한다.
- **Style**: Track은 투명하게, Thumb는 둥근 회색(Stone 400)으로 처리하여 콘텐츠 집중도를 높인다.

### 2.3. 레거시 컬러 청산 (Refactor Legacy Colors)
- 코드베이스 전반에 하드코딩된 `text-purple-*`, `bg-indigo-*` 등의 클래스를 찾아 제거한다.
- 모든 색상은 `text-brand-primary`, `bg-surface-1` 등 의미론적(Semantic) 토큰으로 대체하여 테마 변경에 유연하게 대응한다.

### 2.4. 테마 전환 최적화 (Theme Stability)
- 초기 계획했던 복잡한 애니메이션은 렌더링 동기화 문제(Hydration mismatch)를 유발하므로 제외한다.
- 대신 **즉각적이고 깔끔한(Instant & Clean)** 전환을 목표로 하며, 불필요한 `transition` 속성을 제거한다.

## 3. 구현 단계 (Implementation Steps)

### Step 1: 디자인 토큰 시스템 업데이트 (✅ Done)

- **목표**: `globals.css`를 수정하여 **Warm Orange & Stone** 테마를 정의한다.
- **설명**:
    - Light/Dark 모드에 대응하는 의미론적 변수(`--color-primary`, `--bg-app`)를 설정한다.
    - 기존의 `purple`, `indigo` 계열 변수를 제거하거나 deprecated 처리한다.
- **작업 (Checklist)**:
    - [x] Primary Color: `#f97316` (Orange 500) 적용
    - [x] Backgrounds: Stone 50~900 스케일 적용
    - [x] Tailwind Config: `colors.brand.primary`가 CSS 변수를 바라보도록 매핑

### Step 2: 커스텀 스크롤바 적용 (✅ Done)

- **목표**: 브라우저 간 일관된 스크롤바 경험 제공.
- **설명**:
    - `::-webkit-scrollbar` 가상 요소를 사용하여 얇고 둥근 스크롤바를 구현한다.
- **작업 (Checklist)**:
    - [x] Scrollbar Width: 6px로 설정
    - [x] Thumb styling: `border-radius: 99px` 적용

### Step 3: 하드코딩된 레거시 컬러 리팩토링 (✅ Done)

- **목표**: `purple`의 잔재를 완전히 제거하고 Semantic Token으로 교체한다.
- **설명**:
    - `grep`으로 `purple`, `indigo` 등을 검색하여 모든 발생 지점을 수정한다.
    - 주요 타겟: `ArticleFooter`, `Sidebar`, `ArticleWrite` 등 레거시 코드가 많은 컴포넌트.
- **작업 (Checklist)**:
    - [x] 공통 UI (Button, Input) 리팩토링
    - [x] 슬롯 및 위젯 (Footer, Sidebar, Header) 리팩토링
    - [x] `Notify` 컴포넌트의 Info 타입 색상 교체

### Step 4: 테마 전환 안정화 (✅ Done)

- **목표**: 테마 변경 시 깜빡임 없는 안정적인 렌더링 보장.
- **설명**:
    - `globals.css`에 있었던 전역 `transition: color 0.3s` 등을 제거하여 브라우저 부담을 줄이고 즉시성을 높인다.
- **작업 (Checklist)**:
    - [x] Global transition rule 제거

## 4. 검증 (Verification)
- [x] 메인 컬러가 Warm Orange로 변경되어 따뜻한 분위기를 주는가?
- [x] `src` 폴더 내에 `text-purple` 등의 하드코딩된 클래스가 남아있지 않은가?
- [x] 스크롤바가 다크/라이트 모드 모두에서 자연스러운가?
