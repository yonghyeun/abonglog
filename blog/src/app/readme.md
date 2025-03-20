# App Directory

## 개요

app 디렉토리는 애플리케이션의 핵심 설정과 전역 상태 관리를 담당하는 프로바이더들을 포함합니다.

## 주요 컴포넌트

### ServiceProvider

전체 애플리케이션에 필요한 프로바이더들을 통합 관리하는 컴포넌트입니다.

#### 제공하는 기능:

- React Query 설정
- 세션 관리
- 개발 도구 지원

### SessionProvider

사용자 인증 상태를 전역적으로 관리하는 컴포넌트입니다.

#### 주요 기능:

- Supabase 인증 상태 관리
- 실시간 세션 업데이트
- 사용자 정보 제공

## 설정 상세

### React Query 설정

```typescript
defaultOptions: {
  queries: {
    // 캐시 유효 시간: 30초
    staleTime: 1000 * 30,

    // 서버 사이드 렌더링 최적화
    experimental_prefetchInRender: true
  }
}
```

### 세션 관리

- Supabase Auth를 통한 인증 관리
- 실시간 세션 상태 감지
- 자동 세션 갱신

## 사용 예시

```tsx
// 애플리케이션 루트에서 ServiceProvider 사용
<ServiceProvider>
  <YourApp />
</ServiceProvider>;

// 세션 정보 사용
const user = useContext(SessionContext);
```

## 주의사항

- ServiceProvider는 반드시 애플리케이션의 최상위에 위치해야 합니다.
- 개발 환경에서만 ReactQueryDevtools가 활성화됩니다.
- 세션 관리는 클라이언트 사이드에서만 동작합니다.
