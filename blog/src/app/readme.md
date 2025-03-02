# ServiceProvider

## 개요

app 디렉토리의 ServiceProvider는 전역 상태 및 설정을 관리하는 컴포넌트들을 포함합니다.

## 구성 요소

### QueryClientProvider

- React Query를 위한 클라이언트 설정
- 서버-클라이언트 hydration 관리
- 캐시 전략 설정

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30
    }
  }
});
```

