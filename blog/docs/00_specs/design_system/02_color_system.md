# 02. Color System

## 1. 개요 (Overview)
개발자들은 하루 종일 모니터를 봅니다. 따라서 본 블로그의 컬러 시스템은 **"Dark Mode First"**를 원칙으로 합니다.
눈부심(Halation)과 잔상(Smearing)을 최소화하고, 코드 하이라이팅과의 조화를 최우선으로 고려한 색상 팔레트를 정의합니다.
모든 색상은 **WCAG 2.1 AA 등급(4.5:1 이상)** 이상의 명암비를 준수해야 합니다.

## 2. 다크 모드 팔레트 (Dark Mode Palette)

완전한 검정(#000000)을 사용하지 않습니다. OLED 스미어링 현상을 방지하고, 눈의 대비 피로도를 낮추기 위해 Dark Gray 스케일을 사용합니다.

### 2.1. Background Surfaces (배경)

| Level | Token Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **B0** | `bg-app` | **#121212** | 전체 페이지 배경 (Main Background) |
| **B1** | `bg-surface-1` | **#1E1E1E** | 카드, 사이드바, 헤더 (Elevated UI) |
| **B2** | `bg-surface-2` | **#2C2C2C** | 칩(Chip), 인풋 필드, 호버 상태 |
| **B3** | `bg-overlay` | **#383838** | 모달, 팝업, 툴팁 |

> **Elevation Strategy**: 다크 모드에서는 그림자(Shadow)가 잘 보이지 않으므로, 더 밝은 표면색을 사용하여 층위(Layer)를 구분합니다. (Lighter color = Higher elevation)

### 2.2. Text Hierarchy (텍스트)

완전한 흰색(#FFFFFF)을 지양합니다. 어두운 배경 위의 #FFF는 빛 반사가 심해 글자가 번져 보입니다.

| Level | Token Name | Hex Code | Opacity (Ref) | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **T1** | `text-primary` | **#E0E0E0** | 87% | 본문, 제목, 주요 정보 (가독성 핵심) |
| **T2** | `text-secondary` | **#B0B0B0** | 70% | 부가 설명, 메타데이터, 보조 텍스트 |
| **T3** | `text-tertiary` | **#808080** | 50% | 비활성 텍스트, 플레이스홀더, 아이콘 |

### 2.3. Borders & Dividers

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `border-default` | #333333 | 일반적인 구분선, 카드 테두리 |
| `border-active` | #555555 | 포커스, 활성 상태 테두리 |

---

## 3. 시맨틱 컬러 (Semantic Colors)

코드 블록 테마(Dracula/One Dark) 및 상태 메시지(Alerts)에 사용되는 의미론적 색상입니다.
파스텔 톤을 사용하여 채도를 낮추고 눈의 자극을 줄입니다.

| Role | Color Name | Hex Code | Usage Scenario |
| :--- | :--- | :--- | :--- |
| **Primary** | `Purple 400` | **#BB86FC** | 브랜드 컬러, 주요 버튼, 링크, 포커스 링 |
| **Secondary** | `Teal 300` | **#03DAC6** | 보조 액션, 강조 포인트 |
| **Error** | `Red 300` | **#CF6679** | 에러 메시지, 삭제, 경고 |
| **Warning** | `Orange 300` | **#FFB74D** | 주의 사항, Deprecated 경고 |
| **Info** | `Blue 300` | **#64B5F6** | 정보, 팁, 링크 호버 |
| **Success** | `Green 300` | **#81C784** | 성공 메시지, 복사 완료 피드백 |

---

## 4. 코드 하이라이팅 (Syntax Highlighting)

블로그 전체 테마와 코드 블록 테마의 이질감을 줄이기 위해 유사한 톤앤매너를 가집니다.

-   **Theme**: `One Dark Pro` 또는 `Dracula` 변형
-   **Background**: `bg-app` 보다 약간 더 어두운/밝은 색(#181818 or #222222)을 사용하여 본문과 코드 영역을 시각적으로 분리합니다.
-   **Contrast**: 코드 텍스트 역시 배경색 대비 4.5:1 이상을 유지해야 합니다.

## 5. 접근성 체크리스트 (Accessibility Checklist)

-   [ ] 배경(#121212)과 본문(#E0E0E0)의 명암비는 **12.6:1**로 AAA 기준(7:1)을 충분히 만족하는가? (Pass)
-   [ ] 링크나 버튼 등 인터랙션 요소는 색상 외에 밑줄이나 아이콘으로도 구분되는가?
-   [ ] 에러 메시지는 붉은색 텍스트와 함께 경고 아이콘을 동반하는가?
