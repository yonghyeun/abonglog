---
applyTo: "**/{src/features/**/domain,src/shared/domains}/**/*.ts"
---

# Code Convention: Domain Layer

> **Goal:**
> 외부 의존성이 전혀 없는 **순수 비즈니스 로직(Pure Business Logic)**과 **타입 정의(Type Definitions)** 공간.
> 이 계층은 프레임워크(Next.js), DB(Supabase), UI(React)로부터 완전히 독립적이어야 함.

## 1. Purity & Dependencies (순수성과 의존성)

### 1.1. Zero Dependency Rule
- **Allowed:**
    - TypeScript Native Types
    - `zod` (런타임 검증용)
    - `src/common/lib/fp` (함수형 유틸리티)
    - 다른 `domain` 모듈 (Layer 내 참조)
- **Forbidden:**
    - `react`, `next/*` (UI/Framework)
    - `@supabase/*` (DB)
    - `server/*`, `client/*` (Layer 위반)

### 1.2. Pure Functions
- 모든 도메인 로직은 **순수 함수**여야 함.
    - 동일 입력 -> 동일 출력.
    - 사이드 이펙트(API 호출, DB 저장) 금지.

---

## 2. Models & Schemas (모델과 스키마)

### 2.1. Type Definition
- 도메인 모델(Entity/Value Object)은 `interface` 또는 `type`으로 정의함.
- DB 테이블 구조(`snake_case`)가 아닌, 애플리케이션 관점의 **명확한 네이밍(`camelCase`)**을 사용함.

### 2.2. Zod Schema
- 런타임 검증이 필요한 데이터는 `zod` 스키마를 정의함.
- **Single Source of Truth:** TypeScript 타입은 가능한 `z.infer`를 통해 스키마로부터 유도함.

```typescript
// ✅ Good
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  isActive: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
```

---

## 3. Domain Logic (도메인 로직)

### 3.1. Business Rules
- "가격 계산", "권한 확인", "상태 전이" 등 데이터 자체에 대한 로직을 이곳에 구현함.
- **Location:** 모델 정의 파일과 함께 위치하거나 (`user.model.ts`), `rules/` 폴더 등으로 세분화.

### 3.2. Factory Functions
- 복잡한 객체 생성이 필요한 경우, `new` 키워드 대신 팩토리 함수(`create...`)를 사용함.
- 생성 시점에서 유효성 검사(`UserSchema.parse`)를 수행하여 무결성을 보장함.

---

## 4. Testing
- 도메인 계층은 외부 의존성이 없으므로, **Mocking 없이** 100% 순수 단위 테스트(Unit Test)를 작성해야 함.
