---
applyTo: "**/*.{ts,tsx}"
---

# Code Convention: General (Master Rule)

> **Goal:**
> 프로젝트 전반의 코드 일관성, 타입 안정성, 그리고 **함수형 프로그래밍 원칙**을 준수함.
> 모든 TypeScript 코드는 이 규칙을 기본으로 따름.

## 1. Naming Conventions (명명 규칙 - Code Complete Inspired)

### 1.1. Case Styles (표기법)

- **Variables (Nouns):** `camelCase`. 명사 또는 명사구 사용.
    - 의미를 명확히 전달하는 **완전한 단어**를 사용함. (모호한 약어 금지)
    - ✅ `customerAddress`, `totalScore`
    - ❌ `custAddr` (모호함), `data` (정보 없음)
- **Functions (Verbs):** `camelCase`. 동사 또는 동사+명사구 사용.
    - 함수가 **무엇을 하는지** 명확히 서술함.
    - ✅ `calculateTotalPrice()`, `fetchUserInfo()`
    - ❌ `handleData()` (무엇을 핸들링하는지 불분명)
- **Types/Interfaces/Classes:** `PascalCase`.
    - ✅ `UserProfile`, `PaymentGateway`
- **Constants:** `UPPER_SNAKE_CASE`. (원시값 상수)
    - ✅ `MAX_RETRY_COUNT = 3`

### 1.2. Specific Data Types (데이터 타입별 규칙)

- **Boolean:** `is`, `has`, `should`, `can` 접두사 사용. (긍정형)
    - ✅ `isValid`, `hasMembership`
    - ❌ `notEnabled` (부정형 지양), `flag` (의미 불분명)
- **Collections (Arrays/Lists):** 복수형(`s`) 또는 `List` 접미사 사용.
    - ✅ `users`, `userList`
    - ❌ `user` (단수형으로 복수 데이터 지칭 금지)
- **Loop Variables:** 짧은 루프는 `i`, `j` 허용. 중첩되거나 긴 루프는 의미 있는 이름(`userIndex`) 사용.

---

## 2. Functional Programming (함수형 프로그래밍)

### 2.1. FP Library Usage (Custom FP Lib)

- **Priority:** `null/undefined` 체크나 예외 처리(`try/catch`) 대신, **프로젝트 내장 FP 라이브러리(`src/common/lib/fp`)** 사용을 최우선으로 고려함.
- **Modules:**
    - **`Option`:** 값이 있을 수도 없을 수도 있는 경우 (`null` 대체).
    - **`Either`:** 동기적인 연산의 성공/실패 처리 (`throw` 대체).
    - **`TaskEither`:** 비동기 연산의 성공/실패 처리 (`Promise` 에러 핸들링 대체).
- **Pipeline:** 데이터 변환 시 `pipe`, `flow`, `map`, `flatMap` 등을 적극 활용하여 선언적 데이터 흐름을 구현함.

### 2.2. Immutability & Purity (불변성과 순수성)

- **Immutable by Default:** 모든 데이터는 불변으로 취급함. 객체 수정 시 `spread` 연산자나 불변 유틸리티 사용.
- **Pure Functions:** 사이드 이펙트(API 호출, 전역 변수 수정 등)는 경계(Boundary) 계층으로 격리하고, 비즈니스 로직은 순수 함수로 작성함.

---

## 3. TypeScript Rules (타입스크립트)

### 3.1. Strict Typing

- **No Implicit Any:** 암시적인 `any` 사용 금지.
- **Explicit Return Types:** 함수(특히 Public API)는 반환 타입을 명시함.
    - ✅ `export const add = (a: number, b: number): number => a + b`

### 3.2. Type Definitions

- **Interface vs Type:** 객체는 `interface` (확장성), 유니온/튜플은 `type` 사용.
- **Validation:** 런타임 검증이 필요한 타입은 `zod` 스키마와 타입을 일치시킴 (`z.infer`).

---

## 4. General Syntax (구문)

### 4.1. Control Flow (제어 흐름)

- **Early Return:** 중첩(Nesting)을 방지하기 위해 가드 절(Guard Clause) 적극 사용.
- **Ternary Operator:** 단순 조건 분기에만 사용. 중첩 삼항 연산자는 금지.

### 4.2. Asynchronous (비동기 처리)

- **Async/Await:** `Promise` 체이닝 대신 `async/await` 사용 (FP 파이프라인 제외).
- **Concurrency:** 병렬 처리가 가능한 경우 `Promise.all` 사용.

---

## 5. Documentation & Quality (문서화 및 품질)

### 5.1. Comments (주석)

- **Language:** 모든 주석은 **한국어**로 작성함.
- **Purpose:** 코드가 '무엇'을 하는지가 아니라 '왜' 그렇게 구현했는지를 설명함.

### 5.2. No Magic Numbers/Strings (하드코딩 금지)

- **Constants:** 의미를 알 수 없는 숫자나 문자열을 직접 사용하지 않음.
    - ❌ `if (status === 2) ...`
    - ✅ `if (status === USER_STATUS.ACTIVE) ...`
- **Config:** 반복되거나 변경 가능성이 있는 값은 상수 파일(`src/common/constants`)이나 설정 파일로 분리함.

### 5.3. Linting & Formatting (무결성 유지)

- **Integrity Gate:** 코드 변경 후 `eslint` 및 `prettier` 규칙 준수 여부를 확인하여 무결성을 유지함.
- **Why:** 린트/포맷 이슈를 초기에 제거하여 리뷰 비용, 버그 유입, 스타일 드리프트를 방지함.
- **Workflow:** 가능한 경우 PR/커밋 전 `pnpm lint` 및 포맷 검증/적용을 수행함.
