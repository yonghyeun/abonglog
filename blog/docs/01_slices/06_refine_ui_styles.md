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
추가적으로, 너무 강한 테두리(Border)와 투박한 카드 디자인(Article/Series Card)을 개선하여 시각적 피로도를 낮추고 심미성을 강화한다.

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

### 2.5. 보더 스타일 완화 (Soften Borders)
- 현재 컴포넌트들의 테두리(Border) 색상이 너무 진해 시선을 분산시키므로, 은은하고 자연스러운 톤으로 변경한다.
- `border-gray-300` 등을 `border-border-default` (Stone 200) 또는 더 연한 색상으로 교체한다.

### 2.6. 카드 UI 디자인 고도화 (Refine Card UI)
- **ArticleCard**: 정보의 위계(제목 > 설명 > 메타정보)를 명확히 하고, 여백을 조정하여 균형을 잡는다.
- **SeriesCard**: 단순히 텍스트만 나열된 현재의 투박한 레이아웃을 전면 수정하여, 시리즈물임을 명확히 인지할 수 있도록 개선한다.

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

### Step 5: 보더 스타일 완화 (Soften Borders)

- **목표**: 강한 테두리를 제거하여 콘텐츠 본연에 집중할 수 있는 부드러운 UI 조성.
- **설명**:
    - `ArticleRowCard`, `ImageGrid`, `Selector` 등 주요 컴포넌트의 Border 색상을 점검한다.
    - `border-gray-300`, `border-400` 등으로 하드코딩된 부분을 디자인 토큰 `border-default` (Stone 200 수준) 또는 투명도 조절된 색상으로 변경한다.
- **작업 (Checklist)**:
    - [x] `ArticleRowCard` border 색상 완화
    - [x] `ImageGrid` 선택/비선택 상태 border 스타일 조정
    - [x] 기타 UI 컴포넌트(`Input`, `Button`) border 톤 다운

### Step 6: 게시글 카드(ArticleCard) 디자인 개선

- **목표**: 가독성과 심미성이 뛰어난 게시글 목록 카드 구현.
- **설명**:
    - 썸네일과 텍스트의 비율, 패딩 값을 조정하여 시원한 느낌을 준다.
    - 제목, 날짜, 태그의 폰트 크기 및 색상 위계를 명확히 한다.
    - Hover 시 약간의 Scale Up이나 Shadow 효과를 추가하여 인터랙션을 강화한다.
- **작업 (Checklist)**:
    - [x] `ArticleRowCard` 레이아웃 및 여백 재조정
    - [x] Typography 계층 구조 강화 (Title Bold, Meta text muted)
    - [x] Hover Interaction 추가

### Step 7: 시리즈 카드(SeriesCard) 전면 재설계

- **목표**: 투박한 텍스트 나열 형태를 벗어나 시각적으로 매력적인 시리즈 카드 구현.
- **설명**:
    - 현재의 단순 나열 레이아웃을 "책"이나 "앨범" 메타포를 차용한 디자인으로 변경 고려.
    - 시리즈 내 게시글 수(Count)와 대표 이미지를 조화롭게 배치한다.
- **작업 (Checklist)**:
    - [x] Grid 레이아웃 내에서의 배치 확인

### Step 8: 인용구(Blockquote) 기본 스타일 개선 (Default to Note)

- **목표**: 특별한 Alert 문법(`[!TYPE]`)이 없는 일반 인용구(`> content`)도 `[!NOTE]`와 동일한 스타일을 적용하여 디자인 일관성을 높인다.
- **설명**:
    - `remark-alert`가 감지하지 못한 일반 `blockquote` 요소를 렌더링할 때, `Note` 타입의 Alert와 시각적으로 동일하게 처리한다.
    - 아이콘(ℹ️)과 배경색, 테두리 스타일을 `Note` 테마로 통일한다.
- **작업 (Checklist)**:
    - [x] `components.tsx`의 `Blockquote` 컴포넌트 로직 수정
    - [x] 일반 인용구 렌더링 시 `Note` 스타일 적용 확인

### Step 9: 디자인 시스템 안정화 - TagChip 배경색 버그 수정

- **목표**: `TagChip` 컴포넌트에서 배경색이 간헐적으로 나타나지 않는 현상을 수정하여 시각적 일관성을 확보한다.
- **설명**:
    - `TagChip`의 클래스 명이나 스타일링 로직을 점검하여 Tailwind CSS 클래스가 올바르게 적용되도록 보장한다.
    - 배경색이 투명해지거나 적용되지 않는 원인(조건부 렌더링 또는 CSS 우선순위)을 파악하여 해결한다.
- **작업 (Checklist)**:
    - [x] `TagChip.tsx` 코드 스타일링 점검
    - [x] 배경색 적용 로직 강화

### Step 10: 메인 페이지 레이아웃 여백 조정

- **목표**: 메인 페이지 진입 시 불필요하게 넓은 상하 여백을 제거하여 콘텐츠 접근성을 높인다.
- **설명**:
    - 메인 페이지의 글이 표시되는 섹션에 설정된 `py-16` 클래스를 제거하거나 적절한 값으로 줄인다.
- **작업 (Checklist)**:
    - [x] `page.tsx` 또는 관련 레이아웃 컴포넌트에서 `py-16` 제거

### Step 11: 테마 토글 버튼 UX/UI 개선

- **목표**: 테마 변경 버튼의 조작감을 향상시키고 시각적 즐거움을 더한다.
- **설명**:
    - 버튼의 터치 영역(Padding)을 넓혀 모바일 및 데스크탑에서의 클릭 편의성을 높인다.
    - 아이콘 변경 시 회전하거나 부드럽게 변하는 애니메이션을 추가하여 생동감을 준다.
- **작업 (Checklist)**:
    - [x] Header 또는 ThemeToggle 컴포넌트의 패딩 값 증가
    - [x] 아이콘 전환 애니메이션(Rotate, Scale 등) 추가

### Step 12: 사이드바 토글 버튼 개선

- **목표**: 투박한 햄버거 메뉴 버튼을 세련된 인터랙티브 버튼으로 변경한다.
- **설명**:
    - 단순한 3줄 `div` 대신, Hover 및 Click 시 생동감 있게 반응하는 애니메이션을 적용한다.
    - 배경색 변경이나 Scale 효과를 통해 클릭 가능성을 명확히 한다.
- **작업 (Checklist)**:
    - [x] `ArticleSidebar.tsx` (또는 `SideBar.tsx`) 내 토글 버튼 스타일링 개선
    - [x] 햄버거 아이콘 인터랙션 구현

### Step 13: ArticleFooter 네비게이션 버튼 개선

- **목표**: 게시글 하단 이전/다음 글 이동 버튼의 투박한 스타일을 개선한다.
- **설명**:
    - 현재의 Outlined 스타일 대신, 부드러운 배경색(`bg-surface-2`)과 Hover 효과를 적용하여 모던한 카드 형태로 변경한다.
    - 화살표 아이콘과 텍스트의 배치를 정돈하고, 전체 클릭 영역을 명확히 한다.
- **작업 (Checklist)**:
    - [x] `ArticleFooter.tsx` 스타일 Refactoring covering hover and active states.

### Step 14: CodeBlock 보더 스타일 자연스럽게 수정

- **목표**: 코드 블록의 테두리가 너무 강해(부자연스러워) 보이는 문제를 해결한다.
- **설명**:
    - `border-border` 대신 더 투명도가 높은 색상(`border-white/10` 등)이나 `border-default`를 적용하여 배경과 부드럽게 이어지도록 한다.
- **작업 (Checklist)**:
    - [x] `CodeBlock.tsx` 내 border 클래스 수정

### Step 15: TagChip 컬러 매핑 로직 및 다크모드 가시성 개선

- **목표**: 다크모드에서 태그 칩이 배경에 묻히거나 가독성이 떨어지는 문제를 해결한다.
- **설명**:
    - `Chip.tsx`에 하드코딩된 색상 배열을 시스템화한다 (Light: `bg-50 text-600`, Dark: `bg-800 text-200`).
    - 배경색이 페이지 배경과 겹치지 않도록 채도와 명도를 조정한다.
- **작업 (Checklist)**:
    - [x] `Chip.tsx` 내 `chipStyles` 배열을 다크모드 호환 클래스로 전면 교체

### Step 16: LatestArticle UX/UI 심미성 강화

- **목표**: 메인 페이지 최신 글 섹션의 시각적 위계와 완성도를 높인다.
- **설명**:
    - **Typography**: "NEW UPDATE" 뱃지를 추가하고, 제목 및 시리즈명의 가독성을 높인다.
    - **Layout**: 작성자/날짜 정보를 과감히 제거하여 콘텐츠 자체에 집중하도록 한다.
    - **Button**: Brand Color가 적용된 Solid 버튼으로 변경하여 행동 유도(CTA)를 강화한다.
    - **Image**: 썸네일 영역이 남은 공간을 꽉 채우도록 Flex 레이아웃을 최적화한다.
- **작업 (Checklist)**:
    - [x] `LatestArticleSlot.tsx` 리디자인 (Author 제거, Button Style, Layout)
    - [x] "Latest Post" -> "New Update" 뱃지 적용

## 4. 검증 (Verification)
- [x] 메인 컬러가 Warm Orange로 변경되어 따뜻한 분위기를 주는가?
- [x] `src` 폴더 내에 `text-purple` 등의 하드코딩된 클래스가 남아있지 않은가?
- [x] 스크롤바가 다크/라이트 모드 모두에서 자연스러운가?
- [x] Border 색상이 튀지 않고 콘텐츠와 조화롭게 어우러지는가?
- [x] ArticleCard와 SeriesCard가 심미적으로 개선되었으며 정보 전달이 명확한가?
- [x] 일반 인용구(`>`)가 `[!NOTE]`와 동일하게 예쁘게 렌더링되는가?
- [x] TagChip 배경색이 항상 올바르게 표시되는가?
- [x] 메인 페이지 상단 여백이 줄어들어 콘텐츠가 바로 보이는가?
- [x] 테마 토글 버튼이 누르기 편하고 애니메이션이 자연스러운가?
- [x] 사이드바 버튼이 예쁘고 누를 때 반응하는가?
- [x] ArticleFooter 버튼이 세련되어졌는가?
- [x] CodeBlock 테두리가 자연스러운가?
- [x] TagChip이 다크모드에서도 잘 보이는가?
- [x] 최신 글 섹션이 더 전문적이고 깊이 있어 보이는가?
