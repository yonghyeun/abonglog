---
applyto: "**/docs/01_slices/**/*.md"
---

# Core Layout 구현: 레이아웃 구조 및 네비게이션 개편

**작성자**: yonghyeun
**상태**: planning
**날짜**: 2026-01-10

## 1. 컨텍스트 (Context)

`Foundation` 단계에서 디자인 토큰과 폰트 시스템 셋업을 완료했다. 이제 이를 바탕으로 사용자가 앱을 탐색하는 핵심 구조인 레이아웃과 네비게이션을 구현하는 단계이다.
기존의 레이아웃은 하드코딩된 패딩과 스타일을 사용하고 있어, 디자인 시스템을 준수하는 새로운 `Container` 컴포넌트와 `Header`, `Footer` 컴포넌트로 교체해야 한다.
특히, 본문 가독성을 위해 정의한 `Reading Container (720px)`와 목록을 위한 `Listing Container (1024px)`를 명확히 분리하여 구현한다.

---

## 2. 요구사항 명세 (Requirements Specification)

### 2.1. 레이아웃 컨테이너 (Layout Containers)
- **ReadingContainer**: `max-width: 720px` (45rem), 중앙 정렬(`mx-auto`). 상세 글 페이지용.
- **ListingContainer**: `max-width: 1024px` (64rem), 중앙 정렬. 메인 목록 페이지용.
- **Responsive**: 모든 컨테이너는 모바일(`sm`)에서 적절한 좌우 패딩(`px-4` or `px-6`)을 가져야 한다.

### 2.2. 헤더 (Header) 리디자인
- **구조**: 좌측 로고, 우측 네비게이션/유틸리티(다크모드 토글, 검색).
- **스타일**:
    - 스크롤 시 상단 고정 (Sticky) 또는 자연스러운 동작.
    - `bg-surface-1` (또는 `bg-app/80` backdrop-blur) 사용하여 본문과 구분.
    - `z-index` 관리로 본문 위 레이어 확보.
- **모바일**: 햄버거 메뉴 또는 간소화된 아이콘 배치.

### 2.3. 푸터 (Footer) 리디자인
- **콘텐츠**: 저작권 표시, 간략한 소개, 소셜 링크(GitHub 등).
- **스타일**: `text-tertiary` 색상 사용하여 시각적 비중 낮춤. `border-t`를 추가하여 본문과 구분.

### 2.4. 전역 레이아웃 적용 (`app/layout.tsx`)
- 기존의 `.media-padding-x` 클래스를 제거하고, 새로운 컨테이너 컴포넌트로 래핑하는 구조로 변경.
- `bg-app`, `text-primary` 등 Foundation에서 정의한 유틸리티 클래스가 최상위 레이아웃에 잘 적용되어 있는지 점검.

---

## 3. 구현 단계 (Implementation Steps)

### Step 1. 컨테이너 컴포넌트 구현 (`shared/ui/layout`)
- **목표**: 페이지 성격에 맞는 재사용 가능한 컨테이너 컴포넌트를 만든다.
- **설명**:
    - `src/shared/ui/layout/Container.tsx` (또는 유사 위치) 생성.
    - `variant` props (`reading` | `listing`)를 받아 `max-width` 클래스를 다르게 적용.
    - Tailwind의 `cn` 유틸리티 등을 활용하여 외부 클래스 병합 허용.
- **작업**:
    - [x] `Container` 컴포넌트 구현 (props: children, variant, className).
    - [x] 공통 패딩 로직 적용 (모바일 `px-4` 등).
- **검증**:
    - Storybook 또는 임시 페이지에서 variant 별 너비 제한이 잘 작동하는지 확인.

### Step 2. 헤더 컴포넌트 리팩토링 (`blog/app/Header.tsx` -> `widgets/navigate/ui/Header`)
- **목표**: 새로운 디자인 시스템의 색상과 그림자 등을 적용한 헤더로 교체한다.
- **설명**:
    - 기존 `Header.tsx`는 FSD 구조(`widgets`)로 이동하는 것을 권장하나, 파일 이동이 부담스럽다면 제자리에서 리팩토링.
    - 배경색 `bg-app` 혹은 `bg-surface-1` 적용.
    - `h-16` (64px) 정도의 고정 높이 확보.
- **작업**:
    - [x] 헤더 레이아웃 수정 (Flexbox, justify-between).
    - [x] 로고 및 네비게이션 아이템 스타일 업데이트 (`text-body-m`, `font-medium`).
    - [x] 다크 모드 토글 버튼 위치 및 스타일 조정.
- **검증**:
    - 스크롤 시 헤더가 배경과 섞이지 않고 잘 보이는지(Backdrop filter 등) 확인.

### Step 3. 푸터 컴포넌트 리팩토링 (`blog/app/layout.tsx` 내 Footer 분리)
- **목표**: `layout.tsx`에 하드코딩된 푸터를 별도 컴포넌트로 분리하고 디자인을 입힌다.
- **설명**:
    - `src/widgets/navigate/ui/Footer.tsx` (위치 권장) 생성.
    - 심플하고 깔끔한 디자인으로 변경.
- **작업**:
    - [x] `Footer` 컴포넌트 파일 분리.
    - [x] Top Border 추가, Padding 조정.
    - [x] 텍스트 컬러 `text-tertiary` 적용.
- **검증**:
    - 다크 모드에서도 푸터 텍스트가 너무 어둡거나 밝지 않은지 확인.

### Step 4. 메인 레이아웃 조합 (`app/layout.tsx`)
- **목표**: 전체 페이지 구조를 완성한다.
- **설명**:
    - `layout.tsx`에서 기존 스타일 클래스를 제거하고 정리된 컴포넌트(`Header`, `Footer`)를 배치한다.
    - `body` 태그에 적용된 불필요한 클래스 확인 및 제거.
- **작업**:
    - [x] `layout.tsx`에서 `Footer` import 하여 교체.
    - [x] `main` 태그 영역이 헤더/푸터 사이에서 적절히 `flex-grow` 되는지 확인.
- **검증**:
    - 메인 페이지, 글 상세 페이지 진입 시 레이아웃 깨짐이 없는지 전수 검사.
