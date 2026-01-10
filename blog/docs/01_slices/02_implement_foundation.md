---
applyto: "**/docs/01_slices/**/*.md"
---

# Foundation 구현: 디자인 토큰 및 폰트 시스템 구축

**작성자**: yonghyeun
**상태**: planning
**날짜**: 2026-01-10

## 1. 컨텍스트 (Context)

앞서 정의한 `00_specs/design_system`의 명세(SOT)를 실제 코드베이스에 이식하는 Foundation 단계이다.
기존의 `tailwind.config.ts`와 `globals.css`에 혼재된 레거시 스타일을 정리하고, 새로운 디자인 시스템(Color, Typography, Spacing)을 Tailwind 설정과 CSS 변수로 엄격하게 구현한다.
이 작업이 완료되면 이후의 모든 UI 컴포넌트 작업은 하드코딩된 값이 아닌, 정의된 유틸리티 클래스(`text-body-l`, `bg-surface-1` 등)를 사용하여 이루어지게 된다.

---

## 2. 요구사항 명세 (Requirements Specification)

### 2.1. 폰트 시스템 이식 (Typography)
- **Pretendard**: `next/font/local` 또는 `next/font/google`을 사용하여 Variable 폰트로 설정. 시스템 폰트 Fallback 적용.
- **JetBrains Mono**: 코드 블록용 폰트로 설정.
- **Font Variables**: Tailwind에서 `font-sans`, `font-mono`로 접근 가능하도록 CSS 변수 매핑.

### 2.2. 디자인 토큰 설정 (Design Tokens)
- **Color Palette**: `02_color_system.md`에 정의된 Semantic Color(B0~B3, T1~T3, Primary/Secondary)를 CSS Variable과 Tailwind Theme으로 구현.
- **Typo Scale**: `01_typography.md`의 크기(18px Base), 행간(1.7), 자간 설정을 `fontSize` 유틸리티로 확장.
- **Spacing**: `03_layout_spacing.md`의 4px 그리드 시스템 확인 (Tailwind 기본값 활용 및 커스텀 필요 시 추가).
- **Breakpoint**: 모바일 우선(sm, md, lg, xl) 전략 확인.

### 2.3. 전역 스타일 (Global Styles)
- `globals.css`를 리팩토링하여 기존의 비표준 스타일을 제거하고, 새로운 CSS 변수(`:root`, `.dark`)들을 선언한다.
- 다크 모드 전환 시 부드러운 색상 변경이 가능하도록 변수 기반으로 구성한다.

---

## 3. 구현 단계 (Implementation Steps)

### Step 1. 폰트 에셋 설정 (`app/layout.tsx`)
- **목표**: `Pretendard`와 `JetBrains Mono`를 프로젝트에 로드하고 CSS 변수로 주입한다.
- **설명**:
    - `next/font`를 사용하여 폰트 최적화(CLS 방지)를 수행한다.
    - `Pretendard`는 로컬 파일(woff2) 혹은 CDN(google font 지원 안함, 로컬 추천)을 사용하고, `JetBrains Mono`는 구글 폰트(`next/font/google`)를 활용할 수 있다. (Pretendard 패키지 `next/font` 지원 여부 확인 필요, 없을 시 로컬 에셋 등록).
    - `layout.tsx`의 `html` 태그에 변수 클래스를 적용한다.
- **작업**:
    - [ ] `PretendardStd` (또는 Variable) 폰트 파일 준비 및 `public/fonts` 또는 `app/fonts` 배치 (필요시).
    - [ ] `app/fonts/index.ts` (또는 레이아웃 내부)에서 폰트 로더 설정.
    - [ ] `app/layout.tsx`에 `variable` 클래스네임 주입.
- **검증**:
    - 브라우저 개발자 도구에서 `font-family`가 `Pretendard`로 올바르게 적용되는지 확인.

### Step 2. Tailwind Config & Color System (`tailwind.config.ts`, `globals.css`)
- **목표**: `02_color_system.md`의 컬러 팔레트를 Tailwind config에 정의한다.
- **설명**:
    - `globals.css`의 `:root`와 `.dark` 섹터에 시맨틱 컬러 변수(`--bg-app`, `--text-primary` 등)를 정의한다.
    - `tailwind.config.ts`의 `theme.extend.colors`에 이 변수들을 매핑한다.
    - 기존의 레거시 컬러 설정(`--background`, `--foreground` 등)은 제거하거나 마이그레이션 과도기 동안 유지(deprecate 주석)한다.
- **작업**:
    - [ ] `globals.css` : CSS Variables 정의 (Light/Dark 모드 값).
    - [ ] `tailwind.config.ts` : Color Theme Extend 설정.
- **검증**:
    - 다크 모드 토글 시 배경색과 텍스트 색상이 정의된 값(#121212 등)으로 정확히 변경되는지 확인.

### Step 3. Typography & Spacing Config (`tailwind.config.ts`)
- **목표**: `01_typography.md`의 스펙을 Tailwind 유틸리티로 사용할 수 있게 만든다.
- **설명**:
    - Tailwind의 `fontSize` 설정을 확장하여 사이즈, 라인하이트, 레터스페이싱을 묶어서 정의한다. (예: `body-l: ['18px', { lineHeight: '1.7', letterSpacing: '-0.01em' }]`)
    - H1~H4, Body, Caption 등에 해당하는 유틸리티 클래스를 생성한다.
- **작업**:
    - [ ] `tailwind.config.ts` : `fontSize`, `lineHeight`, `fontFamily` 설정 업데이트.
    - [ ] 기본 HTML 태그(h1, p 등)에 대한 Base Style을 `@layer base`에 적용할지, 유틸리티 클래스로만 사용할지 결정하여 반영. (SOT 준수를 위해 유틸리티 클래스 권장)
- **검증**:
    - `text-body-l` 클래스 적용 시 18px / 1.7 행간이 적용되는지 확인.

### Step 4. 레거시 스타일 정리
- **목표**: 기존 스타일과의 충돌을 방지한다.
- **설명**:
    - `globals.css` 및 `tailwind.config.ts`에 남아있는 사용하지 않는 설정들을 정리한다.
    - 기존 컴포넌트들이 깨지지 않는 선에서 최소한의 호환성을 유지하거나, 마이그레이션 전략을 주석으로 남긴다.
- **작업**:
    - [ ] 불필요한 `@font-face` 제거 (기존 VictorMono 등).
    - [ ] 미사용 CSS 변수 정리.
- **검증**:
    - 빌드 에러 없이 스타일이 초기화되었는지 확인.
