---
applyTo: "src/{server,features/**/server}/**/*.ts"
---

# Code Convention: Backend (Server Actions & Logic)

> **Philosophy:** Backend 로직은 **높은 응집도(Feature-based)**와 **순수 함수 지향(Functional)**을 목표로 함.
> 모든 서버 코드는 `server/` 디렉토리(Global or Feature) 내부에 위치하며, 명확한 4-Layer 책임을 준수해야 함.

## 1. Internal Structure & Responsibilities (4-Layer Rules)

**Feature-based Architecture**에 따라 `server/` 내부의 역할을 엄격히 구분함.

### 1.1. Server Actions (`actions.ts`)

- **Role:** 클라이언트 요청의 **진입점(Entry Point)**이자 **컨트롤러(Controller)**.
- **Rules:**
    1.  **Orchestration Only:** 실제 비즈니스 로직을 직접 구현하지 않고, `services`나 `repositories`를 호출하여 조합함.
    2.  **Validation:** `dtos/`에 정의된 Zod 스키마를 이용해 입력을 검증함 (`SafeParse` 필수).
    3.  **Auth Guard:** `getUser()` 등을 통해 세션 및 권한을 최우선으로 검증함.
    4.  **Result Response:** 클라이언트에 `Result<T>` 객체를 반환함. (Throw 금지)

### 1.2. Services (`services/`)

- **Role:** 핵심 비즈니스 로직 및 트랜잭션 관리.
- **Rules:**
    1.  **Pure Business Logic:** DB 쿼리(SQL)를 직접 작성하지 않고, `repositories`를 주입받아 사용함.
    2.  **Domain Driven:** `domain/` 폴더에 정의된 타입을 인자(Input)와 반환값(Output)으로 사용함.
    3.  **Composition:** 여러 Repository의 결과를 조합하거나 계산하는 로직을 수행함.

### 1.3. Repositories (`repositories/`)

- **Role:** 데이터 영속성 계층 (Data Access Layer).
- **Rules:**
    1.  **Direct DB Access:** `supabase-js` 클라이언트를 직접 사용하는 유일한 계층임.
    2.  **Mapper Pattern:** DB의 `snake_case` (Raw Data)를 `domain/`의 `camelCase` (Domain Model)로 변환(Mapping)하여 반환함.
    3.  **Type Safety:** Supabase Generated Types를 사용하여 쿼리 안정성을 보장함.

### 1.4. DTOs (`dtos/`)

- **Role:** 데이터 전송 객체 및 검증 스키마 정의.
- **Rules:**
    1.  **Zod Schema:** 런타임 검증을 위한 `zod` 스키마를 정의함.
    2.  **Type Inference:** `z.infer<typeof Schema>`를 통해 타입을 추출하여 Action의 인자 타입으로 사용함.

---

## 2. Functional Error Handling (Result Pattern)

**"에러는 예외(Exception)가 아니라 값(Value)이다."**

### 2.1. No Throw Policy

- 예상 가능한 비즈니스 에러(유효성 실패, 데이터 없음, 권한 없음 등)는 절대 `throw` 하지 않음.
- 반드시 `success: false` 상태를 가진 실패 객체를 반환함.

### 2.2. Result Type Structure

모든 Server Action과 Service 함수는 아래 `Result` 타입을 반환해야 함.

```typescript
// src/common/types/result.ts (Interface)
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E; code?: string };
```

### 2.3. Safe Parsing

- **Zod Usage:** `.parse()`(Throw) 대신 **`.safeParse()`**를 사용함.
- **Handling:** 파싱 실패 시 에러 메시지를 포맷팅하여 `Result` 객체로 반환함.

### 2.4. Top-Level Safety

- **Panic Handling:** 오직 `actions.ts`의 최상위 레벨에서만 `try-catch`를 허용함.
    - 목적: DB 연결 끊김 등 **예상치 못한 인프라 장애(Panic)**를 잡아서 안전한 `Result` 객체로 변환하기 위함.

---

## 3. Data & Domain Guidelines

### 3.1. Domain Dependency

- **Reference:** `server/` 계층은 형제 폴더인 `domain/`의 타입과 로직을 자유롭게 참조함.
- **Isolation:** DB에서 꺼낸 데이터는 즉시 `domain/`에 정의된 모델로 변환되어야 함. (Service 로직의 DB 스키마 독립성 보장)

### 3.2. Authorization (Double Check)

- **Layer 1 (DB):** Supabase RLS(Row Level Security)를 통해 물리적 접근을 제어함.
- **Layer 2 (App):** Server Action 진입 시점에서 `supabase.auth.getUser()`를 호출하여 논리적 권한을 다시 확인함.

---

## 4. Naming Conventions

- **Actions:** `동사 + 목적어 + Action` (e.g., `createArticleAction`, `loginAction`).
- **Services:** `도메인 + Service` (e.g., `ArticleService`, `AuthService`).
- **Repositories:** `도메인 + Repository` (e.g., `ArticleRepository`).
- **Functions:**
    - **Repository:** `find...`, `save...`, `delete...` (CRUD 중심).
    - **Service:** `publishDraft`, `resetPassword` (비즈니스 행위 중심).
