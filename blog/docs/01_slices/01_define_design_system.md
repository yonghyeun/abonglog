---
applyto: "**/docs/01_slices/**/*.md"
---

# Design System 문서화: 기술 블로그 UI/UX 표준 정의

**작성자**: yonghyeun
**상태**: planning
**날짜**: 2026-01-10

## 1. 컨텍스트 (Context)

본 슬라이스는 본격적인 리디자인 구현에 앞서, **Single Source of Truth (SOT)** 역할을 할 디자인 시스템 명세서를 `docs/00_specs`에 엄밀하게 구축하는 것을 목표로 한다.
제공된 "기술 블로그 UX/UI 최적화 보고서"를 바탕으로, 단순한 스타일 가이드가 아닌 **가독성 이론(Readability Theory)**, **접근성(Accessibility)**, **개발자 경험(DX)**에 기반한 근거 있는 디자인 스펙을 정의한다.

이 문서는 추후 모든 프론트엔드 구현(Tailwind config, 컴포넌트 개발)의 절대적인 기준이 되며, 변경 시에는 반드시 이 문서를 먼저 수정한 후 코드를 반영해야 한다.

---

## 2. 요구사항 명세 (Requirements Specification)

### 2.1. 목표 결과물 (Deliverables)

`docs/00_specs/design_system/` 디렉토리 하위에 다음 문서들을 생성한다.

1.  **01_typography.md**:
    -   폰트 패밀리 선정 근거 (Pretendard, JetBrains Mono).
    -   Type Scale (H1~Caption)의 수치적 정의 (px/rem).
    -   가독성 이론에 기반한 Line Height, Letter Spacing, Line Logic 공식.
2.  **02_color_system.md**:
    -   Semantic Color Palette (Primary, Secondary, Status).
    -   Dark Mode 전략 (Surface Elevation, Text Contrast).
    -   WCAG 접근성 기준 충족 여부 명시.
3.  **03_layout_spacing.md**:
    -   Grid System, Breakpoints.
    -   Spacing Scale (4pt/8pt grid).
    -   Readability를 위한 컨테이너 너비 제한 정책.
4.  **04_ui_components.md**:
    -   Atomic Components 스펙 (Button, Chip, Card).
    -   Code Block 기능 명세 (Highlighting, Utilities).
    -   Navigation & IA (TOC, Progress Bar).

### 2.2. 작성 원칙

-   **Why**를 포함할 것: "왜 1.6의 행간을 쓰는가?"에 대해 "수식/코드의 간섭 방지"와 같은 이론적 배경을 서술한다.
-   **Strict Spec**: "적당히 크게"가 아닌 "Desktop 720px, Mobile 100%"와 같이 정확한 수치를 명시한다.
-   **Reference**: 참고한 아티클(Stripe, Toss, Material Design 등)의 링크나 출처를 각주로 남긴다.

---

## 3. 구현 단계 (Implementation Steps)

### Step 1. 디렉토리 구조 및 Typography Spec 정의
-   **목표**: `docs/00_specs/design_system` 폴더를 생성하고 `01_typography.md`를 작성한다.
-   **설명**:
    -   본문 폰트 크기 트렌드(17-18px)와 고해상도 디스플레이 대응 전략을 기술한다.
    -   Line Length(CPL) 이론에 따른 컨테이너 폭과 폰트 크기의 상관관계를 정의한다.
    -   한글/영문 혼용 시의 폰트 폴백(System Font Stack) 전략을 수립한다.
-   **작업**:
    -   [x] `docs/00_specs/design_system/` 디렉토리 생성
    -   [x] `docs/00_specs/design_system/01_typography.md` 작성
        -   Font Family: Pretendard (KR), JetBrains Mono (Code)
        -   Font Sizes: Base 17px/18px, Scale Ratio 1.25 (Major Third) 등
-   **검증**:
    -   정의된 폰트 스택이 OS별/브라우저별 호환성을 갖는지 레퍼런스(MDN, Can I Use) 등을 통해 더블 체크 (문서 내 기록).

### Step 2. Color System & Dark Mode Spec 정의
-   **목표**: `02_color_system.md`를 작성하여 눈이 편안한 다크모드 시스템을 설계한다.
-   **설명**:
    -   Pure Black(#000000) 지양 및 다크 그레이 베이스의 Surface 레벨 시스템을 정의한다.
    -   텍스트 가독성을 위한 Off-white(#E0E0E0) 활용 및 Contrast Ratio 4.5:1 이상 확보 전략을 기술한다.
    -   코드 하이라이팅 테마(One Dark 등)와의 색상 조화를 고려한다.
-   **작업**:
    -   [x] `docs/00_specs/design_system/02_color_system.md` 작성
        -   Background Levels: Base, Surface, Overlay
        -   Text Levels: High Emphasis, Medium Emphasis, Disabled
        -   Semantic Colors: Info, Success, Warning, Error
-   **검증**:
    -   선정된 컬러 팔레트가 WCAG AA 등급을 통과하는지 명시.

### Step 3. Layout & Spacing Spec 정의
-   **목표**: `03_layout_spacing.md`를 작성하여 반응형 레이아웃 규칙을 확립한다.
-   **설명**:
    -   모바일 우선(Mobile First) 관점의 Breakpoint를 정의한다.
    -   8-point Grid System을 기반으로 한 Spacing Scale을 정의한다.
    -   가독성을 극대화하는 최적의 Line Length(한글 30-40자)를 보장하는 Layout Max-width를 설정한다.
-   **작업**:
    -   [x] `docs/00_specs/design_system/03_layout_spacing.md` 작성
        -   Breakpoints: Mobile, Tablet, Desktop
        -   Container Max-widths
        -   Spacing Tokens (p-1, p-2...와 매핑될 수치)
-   **검증**:
    -   제시된 Breakpoint가 주요 디바이스 해상도를 커버하는지 확인.

### Step 4. UI Components & UX Patterns Spec 정의
-   **목표**: `04_ui_components.md`를 작성하여 블로그 핵심 요소의 기능과 형태를 정의한다.
-   **설명**:
    -   **Code Block**: 단순 표시를 넘어선 기능적 컴포넌트(복사, 파일명 라벨)로서의 스펙을 정의한다.
    -   **Navigation**: Sticky TOC, Progress Bar의 동작 방식(Interaction)을 정의한다.
    -   **Metadata**: 태그, 날짜, 읽는 시간 표시의 통일된 UI 패턴을 제시한다.
-   **작업**:
    -   [x] `docs/00_specs/design_system/04_ui_components.md` 작성
        -   Component Specs: Typography, Spacing, Color 참조
        -   Icons: 사용될 아이콘 시스템 (Lucide, Heroicons 등) 선정
-   **검증**:
    -   각 컴포넌트가 디자인 시스템의 다른 요소(Color, Typo)와 정합성을 이루는지 확인.
