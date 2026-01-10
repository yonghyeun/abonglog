# 04. UI Components

## 1. 코드 블록 (Code Blocks)

기술 블로그의 핵심 컴포넌트입니다. 단순 뷰어를 넘어선 Utilities를 제공합니다.

### 1.1. 구조 (Structure)
```
+-------------------------------------------------+
| [Icon] filename.ts                    [Copy]    |  <-- Header
+-------------------------------------------------+
|  1 | export const sum = (a, b) => {             |  <-- Body
|  2 |   return a + b;                            |
|  3 | }                                          |
+-------------------------------------------------+
```

### 1.2. 기능 명세 (Functional Specs)
-   **Header**:
    -   언어 아이콘 (JS, TS, Py, Go 등) 표시.
    -   파일명이 있을 경우 표시, 없을 경우 생략.
    -   Copy Button: 클릭 시 아이콘 변경(Check) 및 2초 후 복귀.
-   **Body**:
    -   Font: `JetBrains Mono`
    -   Line Numbers: 기본 표시 (선택적 숨김 가능).
    -   **Highlight Lines**: 특정 라인 강조 기능 (배경색 변경).
    -   **Diff View**: `+`, `-` 기호를 통한 변경 내역 강조.
-   **Mobile**:
    -   **Horizontal Scroll**: 줄바꿈(Word Wrap) 금지. 대신 가로 스크롤을 허용하여 코드를 원형 그대로 보존.
    -   **Touch Area**: 스크롤 영역임을 인지할 수 있도록 우측에 미세한 그림자(Scroll Hint) 적용 고려.

---

## 2. 네비게이션 (Navigation)

### 2.1. TOC (Table of Contents)
-   **Position**: 데스크톱 기준 뷰포트 우측 고정 (Sticky, top-24).
-   **Interactivity**:
    -   **Scroll Spy**: 현재 읽고 있는 헤딩 섹션을 감지하여 TOC 아이템 스타일 변경 (Active State).
    -   Click to Scroll: 클릭 시 부드러운 스크롤 이동(Smooth Scroll).
-   **Depth**: H2, H3까지만 표시 (H4 이하는 복잡도 증가로 제외).

### 2.2. Reading Progress Bar
-   **Location**: 페이지 최상단 (Header 하단 or 상단).
-   **Style**: 높이 2px~4px, 브랜드 컬러(Primary) 사용.
-   **Behavior**: `window.scrollY`에 따라 0% ~ 100% 너비 변경.

---

## 3. 정보 시각화 (Callouts / Admonitions)

텍스트 박스로 중요한 정보를 강조합니다.

### 3.1. Types
-   **Info**: 파란색 계열, 일반적인 정보 또는 보충 설명.
-   **Warning**: 주황/노랑 계열, 주의사항, Deprecated.
-   **Error**: 붉은색 계열, 위험, 금지 사항.
-   **Tip**: 초록/보라 계열, 꿀팁, Best Practice.

### 3.2. Design
-   왼쪽에 굵은 Border Line(4px) 배치.
-   배경색은 해당 컬러의 매우 옅은 톤(Opacity 10~20%) 적용.
-   아이콘을 함께 배치하여 색각 이상 사용자 배려.

---

## 4. 메타데이터 (Metadata)

### 4.1. Tags (Chips)
-   **Shape**: Rounded Rectangle (Pill shape).
-   **Interaction**: 클릭 시 해당 태그 검색 결과로 이동.
-   **Style**: `bg-surface-2`, `text-secondary`, Hover 시 `text-primary`.

### 4.2. Author Bio (저자 카드)
-   글 하단에 배치.
-   프로필 사진(Circle), 이름(Bold), 한 줄 소개, 소셜 링크 아이콘.
-   '사람' 냄새가 나도록 부드러운 톤앤매너 유지.
