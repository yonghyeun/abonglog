# 01. Typography System

## 1. 개요 (Overview)
기술 블로그의 본질은 텍스트와 코드의 전달입니다. 화려한 그래픽보다 **가독성(Readability)**과 **판독성(Legibility)**이 최우선되어야 합니다.
본 시스템은 "Long-form Reading"에 최적화된 타이포그래피 규칙을 정의하며, 특히 고해상도 디스플레이에서의 눈의 피로도를 최소화하고 코드와 한글이 조화롭게 어우러지도록 설계되었습니다.

## 2. 폰트 패밀리 (Font Families)

### 2.1. Main Sans-Serif (본문)
-   **Font**: **Pretendard**
-   **Fallback**:
    ```css
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    ```
-   **선정 근거**:
    -   **Inter 호환성**: 영문 폰트인 Inter의 메트릭을 기반으로 제작되어, 영문과 한글의 조화가 뛰어납니다.
    -   **다양한 웨이트**: 9개의 웨이트를 제공하여 섬세한 계층 표현이 가능합니다.
    -   **OS 표준감**: Apple의 San Francisco와 유사한 현대적이고 중립적인 느낌(Neo-Grotesque)을 줍니다.
-   **Web Font 설정**:
    -   `Pretendard Variable`을 사용하여 네트워크 요청을 최소화하고 다양한 굵기를 지원합니다.

### 2.2. Monospace (코드)
-   **Font**: **JetBrains Mono**
-   **Fallback**: `Fira Code`, `Consolas`, `Monaco`, `monospace`
-   **선정 근거**:
    -   **개발자 친화적**: 코드 가독성에 특화되어 1, l, I, 0, O 등의 구분이 명확합니다.
    -   **Ligatures**: `=>`, `===`, `!=` 등의 연산자 합자 기능을 지원하여 심미성을 높입니다.
    -   **높은 x-height**: 작은 크기에서도 판독성이 뛰어납니다.

---

## 3. 타입 스케일 (Type Scale)

'대담한 미니멀리즘(Bold Minimalism)' 트렌드를 반영하여 본문 크기를 키우고, 명확한 계층 구조를 만듭니다.

### 3.1. Desktop (Base: 18px)

| Role | Tag | Size (px) | Size (rem) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | H1 | 48px | 3.0rem | Bold (700) | 1.25 | -0.02em |
| **Heading L** | H2 | 36px | 2.25rem | SemiBold (600) | 1.35 | -0.01em |
| **Heading M** | H3 | 28px | 1.75rem | Medium (500) | 1.4 | -0.01em |
| **Heading S** | H4 | 22px | 1.375rem | Medium (500) | 1.5 | 0 |
| **Body L** | p, li | **18px** | 1.125rem | Regular (400) | **1.7** | -0.01em |
| **Body M** | small | 16px | 1.0rem | Regular (400) | 1.6 | 0 |
| **Caption** | span | 14px | 0.875rem | Regular (400) | 1.5 | 0 |

### 3.2. Mobile (Base: 16px)

| Role | Tag | Size (px) | Size (rem) | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | H1 | 32px | 2.0rem | Bold (700) | 1.25 |
| **Heading L** | H2 | 26px | 1.625rem | SemiBold (600) | 1.35 |
| **Heading M** | H3 | 22px | 1.375rem | Medium (500) | 1.4 |
| **Body L** | p | **16px** | 1.0rem | Regular (400) | **1.65** |
| **Caption** | span | 13px | 0.8125rem | Regular (400) | 1.5 |

---

## 4. 상세 규칙 (Detailed Rules)

### 4.1. 행간 (Line Height)
-   **Rule**: 본문 행간은 **1.6 ~ 1.8 (170% 권장)**을 유지합니다.
-   **Reason**:
    -   기술 블로그 특성상 문장 중간에 `Inline Code`나 $Math Formula$가 삽입되는 경우가 빈번합니다.
    -   이러한 요소는 일반 텍스트보다 물리적/시각적 높이가 높아, 일반적인 웹 행간(1.5)에서는 줄 간격이 불규칙해 보이거나 겹쳐 보일 수 있습니다.
    -   넉넉한 행간은 시선이 다음 줄로 이동할 때 길을 잃지 않도록 돕는 레일 역할을 합니다.

### 4.2. 자간 (Letter Spacing)
-   **Rule**: 폰트 크기가 커질수록 자간을 좁히고, 작아질수록 넓힙니다.
-   **Reason**:
    -   큰 텍스트(H1)에서 자간이 넓으면 글자가 흩어져 보여 덩어리감(Headline)이 깨집니다. (-0.02em)
    -   작은 텍스트(Caption, Uppercase Button)는 자간을 넓혀 판독성을 확보해야 합니다. (0 ~ 0.05em)
    -   Pretendard는 기본적으로 한글 자간이 최적화되어 있으나, 영문 혼용을 고려하여 본문에서 약한 `-0.01em` 정도를 권장합니다.

### 4.3. 줄 길이 (Line Length & Measure)
-   **Spec**: 본문 컨테이너 최대 너비 **680px ~ 720px**.
-   **Target**: 한 줄 당 **국문 30~40자**, **영문 60~75자**.
-   **Theory**:
    -   사람의 눈은 한 번의 도약(Saccade)으로 인지할 수 있는 폭에 한계가 있습니다.
    -   줄이 너무 길면 다음 줄을 찾기 위해 고개를 돌리거나 눈을 크게 움직여야 하여 피로를 유발합니다.
    -   줄이 너무 짧으면 빈번한 시선 이동으로 독서 흐름이 끊깁니다.
