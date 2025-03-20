# Lib (Library)

공통으로 사용되는 유틸리티 함수들과 커스텀 훅을 관리하는 폴더입니다.

## 파일 구조

```
lib/
├── createBrowserSupabase.ts   # 브라우저용 Supabase 클라이언트 생성
├── createServerSupabase.ts    # 서버용 Supabase 클라이언트 생성
├── useObserver.ts            # Intersection Observer 커스텀 훅
└── useTransitionInput.ts     # React.useTransition 기반 입력 처리 훅
```

## 주요 기능

### Supabase 클라이언트

- `createBrowserSupabase`: 브라우저 환경에서 사용되는 Supabase 클라이언트를 생성
- `createServerSupabase`: 서버 환경에서 사용되는 Supabase 클라이언트를 생성 (쿠키 기반 세션 관리)

### 커스텀 훅

#### useObserver

- Intersection Observer API를 활용한 커스텀 훅
- 무한 스크롤 등의 구현에 사용
- 요소가 뷰포트에 진입했을 때 콜백 함수 실행

#### useTransitionInput

- React.useTransition을 활용한 입력 처리 훅
- 입력값 변경 시 UI 블로킹을 방지
- 부드러운 사용자 경험 제공

## 사용 예시

```typescript
// useObserver 사용 예시
const callback = () => {
  // 요소가 화면에 보일 때 실행될 로직
};
const ref = useObserver(callback);

// useTransitionInput 사용 예시
const [text, handleChange] = useTransitionInput();
```
