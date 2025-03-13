# getCurrentUserData

현재 인증된 사용자의 데이터를 가져오는 유틸리티 함수입니다.

## 기능

- Supabase 인증을 통해 현재 세션의 사용자 정보를 가져옵니다.
- 인증된 사용자의 전체 프로필 데이터를 조회합니다.
- 사용자가 인증되지 않은 경우 null을 반환합니다.

## 사용 방법

```typescript
import { getCurrentUserData } from "@/shared/lib/getCurrentUserData";

// 비동기 함수 내에서 사용
const userData = await getCurrentUserData();

if (userData) {
  console.log("사용자 데이터:", userData);
} else {
  console.log("인증된 사용자가 없습니다.");
}
```

## 반환 데이터 형식

```typescript
interface UserData {
  id: string;
  email: string;
  created_at: string;
  // ... 기타 사용자 테이블의 필드들
}
```

## 주의사항

1. 서버 사이드에서만 사용 가능합니다.
2. Supabase 클라이언트가 올바르게 초기화되어 있어야 합니다.
3. users 테이블에 대한 적절한 RLS(Row Level Security) 정책이 설정되어 있어야 합니다.

## 오류 처리

함수는 다음과 같은 경우에 오류를 발생시킬 수 있습니다:

- Supabase 연결 실패
- 데이터베이스 쿼리 실패
- RLS 정책으로 인한 접근 제한

적절한 오류 처리를 구현하여 사용하시기 바랍니다.
