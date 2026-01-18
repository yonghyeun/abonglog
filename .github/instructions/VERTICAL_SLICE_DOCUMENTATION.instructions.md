---
applyTo: "**/apps/**/{docs/slices,docs/01_slices}/**/*.md"
---

# Vertical Slice Documentation Rules

> **Goal:** Slice 문서가 구현의 기준선이자 테스트 가능한 계약(Contract) 역할을 수행하도록 강제함.
> 이 문서는 [VERTICAL_SLICE_DEFINITION](VERTICAL_SLICE_DEFINITION.instructions.md)의 Phase 1: Planning 산출물을 구체화함.

## 1. Slice 문서 필수 섹션

- Slice 문서는 `SLICE.template.md` 기반으로 작성함.
- 최소 포함 섹션은 아래와 같음.
    - **Context & Value:** 문제/해결/가치 정의함.
    - **Scope & Boundaries:** 4계층(UI/API/Domain/DB) 최소 경로 정의함.
    - **User Flow (Mermaid):** 데이터 흐름 시각화함.
    - **Requirements Sanity Checklist:** 요구사항 품질/완전성 점검함.
    - **Acceptance Criteria (AC):** 성공/실패/예외 포함 체크리스트화함.
    - **Task Breakdown:** 단계별 Red-Green-Refactor 정의함.
    - **DoD Verification:** Definition of Done(DoD) 체크리스트 유지함.

---

## 2. Requirements Sanity Checklist (Code Complete Inspired, 재구성)

> **Rule:** 원문을 인용/복사하지 않고, 프로젝트에 맞게 재구성하여 작성함.

### 2.1. Functional Requirements (기능 요구사항)

- [ ] **Inputs:** 입력의 출처, 허용 범위, 빈도, 정확도 정의함.
- [ ] **Outputs:** 출력의 대상, 포맷, 빈도, 정확도 정의함.
- [ ] **User Tasks:** 사용자가 수행하는 작업이 모두 나열됨.
- [ ] **Data Flow:** 각 작업의 입력 데이터와 결과 데이터가 정의됨.
- [ ] **External Interfaces:** 외부 시스템/라이브러리/프로토콜 의존성이 명시됨.

### 2.2. Nonfunctional Requirements (품질 요구사항)

- [ ] **Performance:** 사용자 관점 응답시간 또는 주요 타이밍 제약 정의함.
- [ ] **Security:** 인증/인가 수준, 보호해야 하는 정보, 공격 표면 고려함.
- [ ] **Reliability:** 실패 시 영향, 에러 탐지/복구 전략 정의함.
- [ ] **Maintainability:** 변경 가능성, 확장 방향, 인터페이스 안정성 고려함.

### 2.3. Requirements Quality (요구사항 품질)

- [ ] **User Language:** 사용자 관점 언어로 서술됨.
- [ ] **No Conflicts:** 다른 요구사항과 충돌하지 않음.
- [ ] **No Design Lock-in:** 구현 상세를 과도하게 강제하지 않음.
- [ ] **Consistent Detail:** 디테일 수준이 과도하게 들쭉날쭉하지 않음.
- [ ] **Traceability:** 요구사항의 출처(문제/피드백/가설)가 추적 가능함.
- [ ] **Testability:** 독립적인 테스트로 충족 여부 판단 가능함.

### 2.4. Requirements Completeness (요구사항 완전성)

- [ ] **Unknowns:** 사전 정보 부족 영역과 미정 항목이 명시됨.
- [ ] **Definition of Success/Failure:** 성공/실패 정의가 포함됨.
- [ ] **Feasibility:** 구현 불가능하거나 단순 설득용 요구사항이 제거됨.

---

## 3. Writing Rules (작성 규칙)

- 문서 스타일은 [MARKDOWN_CONVENTION](MARKDOWN_CONVENTION.instructions.md) 준수함.
- 체크리스트는 가능한 한 **검증 가능한 문장**으로 작성함.
    - 예: "로그인 성공 시 홈으로 이동함".
- Mermaid 문법은 `MARKDOWN_CONVENTION`의 Mermaid 규칙 준수함.

---

## 4. AC → Test Traceability Rules (추적성 규칙)

- AC는 고유 ID를 가진 항목으로 작성함. (예: `AC-01`, `AC-02`)
- 각 AC는 최소 1개 이상의 자동화 테스트로 추적 가능해야 함.
    - 권장: 테스트 이름/설명에 `AC-01` 포함함.
    - 권장: Task Breakdown의 Step에 어떤 AC가 커버되는지 명시함.
