# 03. Layout & Spacing

## 1. 그리드 및 구조 (Grid & Structure)

### 1.1. 컨테이너 전략 (Container Strategy)
본 블로그는 콘텐츠의 성격에 따라 두 가지 컨테이너 너비를 사용합니다.

1.  **Reading Container (Article View)**
    -   **Rule**: `max-width: 720px (45rem)` + `mx-auto`
    -   **Usage**: 블로그 포스트 상세, 텍스트 위주의 페이지.
    -   **Reason**: 타이포그래피 스펙에서 정의한 CPL(Line Length) 30~40자를 준수하여 최적의 독서 경험 제공.
    
2.  **Listing Container (Main/List View)**
    -   **Rule**: `max-width: 1024px (64rem)`
    -   **Usage**: 글 목록, 카드 그리드 레이아웃.
    -   **Reason**: 한 화면에 더 많은 정보를 구조적으로 보여주되, 시선이 너무 분산되지 않도록 제한.

### 1.2. Breakpoints (Media Queries)
Mobile First 접근 방식을 취하며, Tailwind CSS 기본 브레이크포인트를 따르되 1280px 이상을 과도하게 사용하지 않습니다.

| Token | Min-Width | Device Category | Note |
| :--- | :--- | :--- | :--- |
| **sm** | 640px | Large Mobile / Tablet Portrait | 모바일 레이아웃에서 태블릿 레이아웃으로 전환 |
| **md** | 768px | Tablet Landscape | 네비게이션 패턴 변경 (Drawer -> Header) |
| **lg** | 1024px | Small Desktop / Laptop | TOC(Table of Contents)와 같은 사이드바 노출 시작 |
| **xl** | 1280px | Large Desktop | 콘텐츠 여백 확보 |

---

## 2. 간격 시스템 (Spacing System)

기본 단위(Base Unit)는 **4px (0.25rem)** 입니다. 모든 여백(Margin, Padding)과 크기는 4의 배수로 정의합니다.
이는 요소 간의 일관된 리듬감을 부여합니다.

### 2.1. Spacing Scale

| Token | Class (Ref) | Size (px) | Size (rem) | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **4** | `p-1` | 4px | 0.25rem | 아이콘과 텍스트 사이 미세 간격 |
| **8** | `p-2` | 8px | 0.5rem | 컴포넌트 내부 요소 간격 (Compact) |
| **12** | `p-3` | 12px | 0.75rem | |
| **16** | `p-4` | 16px | 1.0rem | 카드 패딩, 버튼 패딩 (Standard) |
| **24** | `p-6` | 24px | 1.5rem | 섹션 내부 여백 |
| **32** | `p-8` | 32px | 2.0rem | 섹션 간 구분 (Small) |
| **48** | `p-12` | 48px | 3.0rem | 섹션 간 구분 (Medium) |
| **64** | `p-16` | 64px | 4.0rem | 주요 챕터 구분 (Large) |

### 2.2. Vertical Rhythm (수직 리듬)
-   헤딩(H1, H2...) 위쪽 여백(`margin-top`)은 아래쪽 여백(`margin-bottom`)보다 **2배 ~ 3배** 더 커야 합니다.
-   **Principle of Proximity**: 제목은 이전 문단과 멀어지고, 자신이 설명하는 다음 문단과 가까워야 합니다.
    -   Example: `mt-12 mb-4`

---

## 3. 레이아웃 패턴 (Layout Patterns)

### 3.1. Article Layout (Desktop)
```
[ Header ]
   |
[  Main Content (720px)  ]  [ TOC (Sticky) ]
   |                       (on right, hidden if screen < lg)
   |
[ Footer ]
```

### 3.2. Article Layout (Mobile)
```
[ Header + Progress Bar ]
   |
[  Main Content (100% - px-4)  ]
   |
[ Footer ]
```
모바일에서는 좌우 패딩(`px-4` or `px-5`)을 반드시 확보하여 텍스트가 화면 끝에 붙지 않도록 합니다.
