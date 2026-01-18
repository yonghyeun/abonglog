---
applyTo: "**/*.{test|spec}.{ts|tsx}"
---

# Testing Strategy & Guidelines

> **Alignment:** **Phase 2 (Implementation)** 및 **Phase 3 (QC)** 단계를 수행하기 위한 기술적 세부 지침임.
> **Goal:** Vertical Slice의 각 계층(Layer)이 독립적이고 유기적으로 동작함을 검증하여 DoD(Definition of Done)를 충족함.

## 1. Directory Structure & Co-location

- **Unified Structure:** **Feature-based Vertical Slicing** 구조를 따름.
- **Co-location:** 테스트 코드는 해당 로직(Source)과 동일한 디렉토리에 위치시킴.

### 1.1. Path Convention
- **Unit/Integration Tests:** 소스 파일과 동일한 디렉토리에 `.test.ts(x)` 확장자로 위치.
- **E2E Tests:** 프로젝트 루트의 `e2e/` 디렉토리에 기능(Slice) 단위로 위치.

```bash
src/
└── features/
    └── [feature-name]/         # e.g., auth-login
        ├── domain/             # Domain Layer
        │   ├── user.model.ts
        │   └── user.model.test.ts      <-- [Unit] 도메인 로직 검증
        ├── server/             # Application & Persistence Layer
        │   ├── actions.ts
        │   ├── actions.test.ts         <-- [Integration] 서버 액션 & DB 통합 검증
        │   ├── repository.ts
        │   └── repository.test.ts      <-- [Unit/Int] DB 쿼리 검증 (선택적)
        └── client/             # Presentation Layer
            ├── LoginForm.tsx
            └── LoginForm.test.tsx      <-- [Integration] UI 인터랙션 검증
e2e/
└── [feature-name].spec.ts      <-- [E2E] Phase 3 최종 검증용
```

## 2. strict Testing Conventions (SSOT)

테스트 코드는 그 자체로 **살아있는 문서(Living Documentation)** 역할을 해야 함.
이를 위해 변수명, 구조, 주석 스타일을 엄격하게 제한함.

### 2.1. Naming Conventions (Semantic Naming)

변수명과 함수명은 "의미"를 명확히 전달해야 하며, 모호한 표현을 지양함.

- **Variables (Setup Data):** 데이터의 상태나 특성을 형용사로 명시함.
    - ✅ `mockActiveUser`, `expiredToken`, `validRequestPayload`
    - ❌ `data`, `mock`, `user`, `obj`
- **Result Variables:**
    - ✅ `actualResult`, `submissionResponse`, `updatedUserProfile`
    - ❌ `res`, `result`, `ret`
- **Mock Functions:**
    - ✅ `mockLoginService`, `spyOnConsoleError`
    - ❌ `m`, `mockFn`

### 2.2. BDD Style Structure (`describe` & `it`)

- **Hierarchy:** 3단 구조를 기본으로 하여 가독성을 높임.
    1.  **Top-Level `describe`**: 테스트 대상 (컴포넌트/함수명).
    2.  **Nested `describe`**: 시나리오 또는 상태 (Condition/Context).
        - 접미사 `~할 때`, `~인 경우` 등을 사용하여 상황을 명시.
    3.  **Leaf `it`**: 기대되는 행위 (Expected Behavior).
        - `~해야 한다` 또는 `~를 반환한다`로 끝나는 평서문.

```typescript
describe('LoginAction', () => {
  describe('유효하지 않은 이메일이 주어졌을 때', () => {
    it('유효성 검사 에러를 반환해야 한다 (AC-02)', async () => { ... });
  });
});
```

### 2.3. GWT Pattern (Inside Test)

테스트 내부 로직은 **Given-When-Then** 패턴을 주석으로 명시하여 논리 흐름을 구분함.

- **Given (준비):** 테스트 데이터 세팅, Mocking 설정.
- **When (실행):** 테스트 대상 함수 실행 또는 이벤트 트리거.
- **Then (검증):** 결과값 단언(`expect`), 호출 여부 확인.

```typescript
it('로그인 성공 시 홈으로 이동해야 한다', async () => {
  // Given
  const validUserCredentials = { ... };
  vi.mocked(login).mockResolvedValue({ success: true });
  
  // When
  await user.click(screen.getByRole('button', { name: /로그인/ }));
  
  // Then
  expect(router.push).toHaveBeenCalledWith('/home');
});
```

---

## 3. Testing Levels & Tools (계층별 전략)

### 3.1. Domain Layer (Unit Test)
- **Target:** 비즈니스 규칙, 순수 함수, 데이터 변환 로직.
- **Tool:** Vitest
- **Rule:** 외부 의존성(DB, API) 없이 순수 로직만 검증함. Mocking 불필요.

### 3.2. Server Layer (Integration Test)
- **Target:** Server Actions, API Handlers, Repository.
- **Tool:** Vitest, vitest-mock-extended (Supabase/DB Mocking)
- **Rule:**
    - 클라이언트와의 연결이 아닌, **Input(요청) -> Logic -> DB(Mock) -> Output(응답)** 흐름 검증.
    - 데이터베이스 호출은 철저히 Mocking하여 속도 확보.

### 3.3. Client Layer (Component Integration Test)
- **Target:** UI 컴포넌트, Hook, User Interaction.
- **Tool:** Vitest, React Testing Library, @testing-library/user-event
- **Rule:**
    - 구현 상세(state 이름 등)가 아닌 **사용자 행위(클릭, 타이핑, 보이는 텍스트)** 테스트.
    - Server Action 호출 Mocking 필수.

### 3.4. End-to-End (System Test)
- **Target:** 실제 브라우저 환경에서의 전체 흐름.
- **Tool:** Playwright
- **Rule:**
    - Happy Path와 핵심 Edge Case 위주 작성. (성능 고려)
    - Phase 3의 DoD Check 단계에서 수행.

### 3.5. Test Coverage (Policy)
- **Target:**
    - 프로젝트 전체 커버리지 80% 이상.
    - 핵심 모듈(비즈니스 로직) 90% 이상.
    - 비핵심 모듈(유틸/단순 변환) 70% 이상.
- **Tool:** Vitest + `@vitest/coverage-v8`.
- **Command:** `pnpm --filter pmf-mvp test:coverage`.
- **Report:** `coverage/` 아래 `text`, `html` 리포트 생성.
- **PR Agent Prompt:** PR 본문에 다음 문구를 포함해야 함.
    - "이 PR은 기존 테스트 커버리지를 감소시키지 않습니다."
    - "테스트 부족 영역이 있다면, 추가 테스트를 작성해 주세요."
    - "커버리지 리포트를 확인하고, 부족한 부분을 보완해 주세요."

---

## 4. TDD Workflow (Mapping to Agent Workflow)

Vertical Slice Workflow의 **Phase 2: Implementation** 단계에서 에이전트는 아래 순서 준수.

### Step 1: Red (Test Preparation)
- 구현하려는 기능의 명세(Slice Doc)와 **Acceptance Criteria (AC)** 를 바탕으로 **실패하는 테스트 우선 작성**.
- 각 테스트는 어떤 AC를 검증하는지 추적 가능해야 함. (예: 테스트 이름/설명에 `AC-01` 포함)
- 예시: "로그인 버튼을 누르면 loginAction이 호출되어야 한다."

### Step 2: Green (Implementation)
- 테스트를 통과시키기 위한 **최소한의 코드** 작성.
- 코드의 아름다움보다 테스트 통과(Pass) 우선.

### Step 3: Refactor (Verification)
- `pnpm test`로 통과 확인.
- 중복 제거, 변수명 개선, 구조 최적화 수행.
- 리팩토링 후에도 테스트 깨짐 없어야 함.

## 5. Mocking Guidelines

Vertical Slicing에서 각 계층의 책임을 분리하여 테스트하기 위해 Mocking은 필수적임.

### 5.1. Server Action Mocking (in Client Test)
클라이언트 컴포넌트 테스트 시, 실제 서버 로직을 실행하지 않고 모킹함.

```typescript
// src/features/auth/client/LoginForm.test.tsx
import { vi } from 'vitest';
import * as actions from '../server/actions'; // Server Actions Import

vi.mock('../server/actions'); // 모듈 전체 모킹

test('로그인 성공 시 리다이렉트 된다', async () => {
  // Arrange
  vi.mocked(actions.login).mockResolvedValue({ success: true });
  
  // Act ...
  // Assert ...
});
```

### 5.2. Database Mocking (in Server Test)
서버 액션 테스트 시, 실제 DB(Supabase)에 접근하지 않음.

```typescript
// src/features/auth/server/actions.test.ts
import { createClient } from '@/utils/supabase/server';
import { login } from './actions';
import { vi } from 'vitest';

vi.mock('@/utils/supabase/server');

test('유저가 없으면 에러를 반환한다', async () => {
  // Given
  const unknownEmail = 'unknown@test.com';
  const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnValue({ data: null, error: null }),
      single: vi.fn().mockReturnValue({ data: null, error: null })
  };
    
  vi.mocked(createClient).mockReturnValue(mockSupabase as any);
  
  // When
  const loginResult = await login(unknownEmail);

  // Then
  expect(loginResult).toMatchObject({ ok: false });
});
```

## 6. Definition of Done (Test Perspective)

하나의 Slice가 완료되기 위해 테스트 관점에서 충족해야 할 조건:

- [ ] **All Green:** 작성된 모든 테스트(Unit, Int, E2E) 100% 통과.
- [ ] **Critical Path Covered:** 기획 문서(Slice Doc)에 정의된 User Flow의 모든 경로 테스트 커버.
- [ ] **No Flaky Tests:** 실행할 때마다 결과가 달라지는 불안정한 테스트 부재.
