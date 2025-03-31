# Article Library

마크다운 기반의 아티클을 처리하기 위한 유틸리티 라이브러리입니다.

## 파일 구조

### 마크다운 변환 관련

- `rehypeMarkdown.ts`: 마크다운 텍스트를 React 컴포넌트로 변환
  - unified 파이프라인 사용
  - remark 플러그인으로 마크다운 파싱
  - rehype 플러그인으로 HTML 변환
  - rehype-pretty-code로 코드 블록 스타일링

### 컴포넌트 관련

- `components.tsx`: 마크다운 변환 시 사용되는 React 컴포넌트 정의
  - 모든 HTML 요소에 대한 스타일링된 컴포넌트 제공
  - 이미지 처리를 위한 최적화된 ArticlePhoto 컴포넌트
  - GIF 이미지를 위한 Supabase Storage 통합

### 헤딩 파싱 관련

- `parsingHeadings.ts`: 마크다운 내 헤딩(#) 파싱
  - 1~3레벨 헤딩 추출
  - 목차 생성을 위한 헤딩 정보 제공
- `parsingHeadings.test.ts`: 헤딩 파싱 테스트 코드

### 기타

- `index.ts`: 라이브러리 파일들의 export 관리

## 주요 기능

- 마크다운 -> React 컴포넌트 변환
- 코드 블록 구문 강조 (Tokyo Night 테마)
- 반응형 이미지 처리
- 목차 생성을 위한 헤딩 추출
- GIF 이미지 최적화
