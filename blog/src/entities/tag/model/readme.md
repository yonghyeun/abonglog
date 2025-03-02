# getTags 함수

## 개요

`getTags` 함수는 Supabase를 사용하여 `tags` 테이블에서 모든 태그 데이터를 가져오는 비동기 함수입니다.

## 함수 설명

해당 함수는 `public.tags` 에 존재하는 모든 태그 목록을 쿼리 합니다.

### 함수 시그니처

```typescript
export const getTags: () => Promise<{id : number; name : string ; created_at : Date}[] | null>
```

