---
applyto: "**/docs/01_slices/**/*.md"
---

# Article UX 구현: 타이포그래피 상세 및 코드 블록 고도화

**작성자**: yonghyeun
**상태**: done
**날짜**: 2026-01-10

## 1. 컨텍스트 (Context)

블로그의 핵심인 '글 읽기 경험'을 완성하는 단계이다.
Core Layout을 통해 외형적인 틀은 잡혔으나, 실제 Markdown 콘텐츠가 렌더링되는 내부 스타일(`Typography`)과 개발자 블로그의 핵심인 `Code Block`은 아직 레거시 상태이거나 개선이 필요하다.
디자인 시스템(`00_specs`)에서 정의한 상세 타이포그래피 규칙과 코드 블록의 유틸리티(복사, 파일명 등)를 구현하여 "읽기 편하고 기술적으로 유용한" 아티클 뷰를 완성한다.

---

## 2. 요구사항 명세 (Requirements Specification)

### 2.1. Markdown 타이포그래피 고도화
- **Markdown Components**: `next-contentlayer`나 `react-markdown` 등에서 사용하는 컴포넌트(`h1`~`h6`, `p`, `ul`, `ol`, `blockquote`, `a`, `table`)에 디자인 시스템 클래스를 매핑한다.
- **스타일 디테일**:
    - `line-height`: 1.7 (본문) / 1.6 (코드).
    - `margin`: 문단 간 시각적 리듬(`mt`, `mb`) 조정.
    - `link`: 시맨틱 컬러(`text-info`) 및 `hover:underline` 적용.
    - `list`: 불릿/숫자 스타일 및 들여쓰기 조정.

### 2.2. 코드 블록 (Code Block) 컴포넌트 
- **기능**:
    - **Header**: 파일명(또는 언어) 표시 + 복사(Copy) 버튼.
    - **Syntax Highlighting**: 기존 라이브러리(rehype-pretty-code 등) 설정 확인 및 테마(One Dark/Dracula) 적용.
    - **Font**: `JetBrains Mono` 적용.
- **Mobile UX**:
    - 긴 코드가 줄바꿈되지 않고 **가로 스크롤** 되도록 `overflow-x-auto` 처리.
    - 터치 영역 확보.

### 2.3. Callout / Admonition 컴포넌트
- **디자인**: 좌측에 굵은 Border가 있는 유색 박스 스타일.
- **Types**: `Info`, `Warning`, `Error`, `Tip` (각각 시맨틱 컬러 `bg-info/10`, `border-info` 등 사용).
- **Markdown 연동**: Markdown 내용 중 특정 문법(예: `:::info`)이나 Blockquote 스타일을 활용하여 렌더링하도록 구현.

---

## 3. 구현 단계 (Implementation Steps)

### Step 1. Markdown 컴포넌트 스타일링 (`article/ui/MarkdownViewer`)
- **목표**: 마크다운 렌더러에 디자인 시스템을 입힌다.
- **설명**:
    - 현재 블로그가 어떤 마크다운 렌더러를 쓰는지 확인(예: `MDXRemote`, `Contentlayer` 등).
    - 커스텀 컴포넌트(`components` prop)를 주입하여 `h1`, `p`, `a` 등의 렌더링 방식을 제어한다.
    - `Container`(`variant="reading"`) 안에서 텍스트가 어떻게 보이는지 검증.
- **작업**:
    - [x] Markdown 렌더링 컴포넌트(`ArticleContent` 등) 파악.
    - [x] 각 태그별 커스텀 컴포넌트 연결 및 Tailwind 유틸리티(`text-body-l` 등) 적용.
    - [x] `Link` 컴포넌트 스타일링 (외부 링크: `target="_blank"`, 아이콘 추가 고려).

### Step 2. 코드 블록 컴포넌트 구현 (`shared/ui/code`)
- **목표**: 기능이 풍부한 코드 블록 래퍼를 구현한다.
- **설명**:
    - 마크다운의 `pre` 태그를 대체하거나 감싸는 컴포넌트(`CodeBlock`) 구현.
    - `navigator.clipboard` API를 이용한 복사 기능 구현.
    - 코드 하이라이팅 테마가 System Dark Mode와 연동되거나, 독자적인 Dark Theme을 유지하도록 설정.
- **작업**:
    - [x] `CodeBlockHeader` 컴포넌트 구현 (파일명, 복사 버튼).
    - [x] `pre` 태그 스타일링 (가로 스크롤 `overflow-x-auto`, `scrollbar-hide` 등).
    - [x] Markdown 파서 설정에서 `rehype-pretty-code` 등의 옵션 튜닝.

### Step 3. Callout (Admonition) 구현
- **목표**: 강조 구문을 위한 Callout UI를 추가한다.
- **설명**:
    - `Blockquote`를 재활용하거나, 별도 구문을 파싱하여 `Callout` 컴포넌트로 렌더링.
    - 디자인 시스템의 Semantic Color(`bg-surface-2`, `border-l-4`) 활용.
- **작업**:
    - [x] `Callout` 컴포넌트 구현.
    - [x] Markdown 매핑 설정 (예: `> [!INFO]` 구문 지원 또는 일반 `blockquote` 스타일링).

### Step 4. 아티클 상세 페이지 점검
- **목표**: 실제 글을 띄워보고 가독성을 최종 점검한다.
- **설명**:
    - 다양한 요소(이미지, 코드, 리스트, 인용문)가 섞인 샘플 마크다운을 렌더링해본다.
    - 모바일에서 좌우 여백과 폰트 크기가 적절한지(`16px` vs `18px`) 확인.
- **작업**:
    - [x] `article/[articleId]/page.tsx` 레이아웃 확인.
    - [x] 최종 렌더링 테스트 (QA).
