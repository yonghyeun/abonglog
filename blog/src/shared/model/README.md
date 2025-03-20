# shared/model

공통으로 사용되는 타입 정의와 컨텍스트를 관리하는 폴더입니다.

## database.types.ts

Supabase 데이터베이스의 테이블 스키마와 관련된 타입 정의를 포함합니다.

## SessionContext.ts

사용자 인증 상태를 전역적으로 관리하기 위한 Context를 제공합니다.

## index.ts

모든 모델 관련 타입과 Context를 외부로 노출하는 진입점입니다.

## 파일 구조

```
model/
├── database.types.ts         # Supabase 데이터베이스 타입 정의
├── SessionContext.ts         # 사용자 세션 관리를 위한 Context
└── index.ts                 # 모델 관련 export 통합 관리
```

## 주요 기능

### Database Types

- Supabase 데이터베이스의 테이블 스키마 타입 정의
- 테이블 관련 CRUD 작업을 위한 타입 정의 (Insert, Update, Row)
- 데이터베이스 관계(Relationships) 타입 정의

### Session Context

- 사용자 인증 상태 관리
- `useSession` 훅을 통한 전역 세션 상태 접근
- Supabase User 타입 활용

## 사용 예시

```typescript
// Session Context 사용
const session = useSession();
if (session) {
  // 로그인된 사용자 정보 접근
  console.log(session.user);
}

// Database 타입 사용
type Article = Database["public"]["Tables"]["articles"]["Row"];
```
