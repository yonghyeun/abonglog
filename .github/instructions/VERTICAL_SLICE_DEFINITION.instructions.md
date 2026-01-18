---
applyTo: "**/apps/**/{docs/slices,docs/01_slices,src/features}/**/*"
---

# Vertical Slice Workflow & Definition

> **SSOT (Single Source of Truth):**
> 이 문서는 Vertical Slice의 정의와 이를 구현하기 위한 에이전트 워크플로우를 정의하는 **유일한 진실 공급원**임.
> 모든 Slice 개발은 이 문서의 정의와 프로토콜을 따라야 함.

## 1. Standard Definition: Vertical Slice

### 1.1. Terminological Definition (용어 정의)

- **Vertical Slice (수직적 분할):** 소프트웨어 아키텍처의 모든 계층(All Layers)을 관통하여, 사용자에게 실질적이고 검증 가능한 가치(Value)를 제공하는 **최소 단위의 개발 및 배포 증분(Increment)**을 의미함.
- **Goal:** 수평적 분할(Horizontal Slicing)과 대조되며, **기능 횡단적(Cross-functional) 구현**을 통해 통합 리스크를 조기에 제거함.

### 1.2. Architectural Scope (기술적 범위)

- **Core Rule:** 하나의 Slice는 다음 계층의 **'최소한의 경로(Critical Path)'**를 반드시 포함해야 함.
- **Presentation Layer (UI/UX):** 사용자 인터페이스.
- **Application Layer (API/Controller):** 요청 처리 및 데이터 교환.
- **Domain Layer (Business Logic):** 비즈니스 규칙 수행.
- **Persistence Layer (Database):** 데이터 영속성 보장.

### 1.3. INVEST Principle (구성 원칙)

1. **Independent:** 독립적인 개발 및 배포 가능.
2. **Negotiable:** 구현 상세는 유연하게 조정 가능.
3. **Valuable:** 사용자 관점의 실질적 가치 제공.
4. **Estimable:** 소요 시간 예측 가능.
5. **Small:** 단기간(1~3일) 내 완료 가능한 크기.
6. **Testable:** 명확한 인수 조건(AC) 및 자동화 테스트 가능.

---

## 2. Agent Workflow Protocol (에이전트 작업 절차)

에이전트는 사용자의 기능 구현 요청 시, **반드시** 다음 단계를 순차적으로 수행하여 프로세스를 자동화해야 함.

### Phase 1: Planning (기획 및 명세)

1.  **Slice Identification:** 요청받은 기능의 Vertical Slice 부합 여부 판단.
2.  **Document Creation:**
    - `inklingme/apps/pmf-mvp/docs/__templates__/SLICE.template.md` 복사 및 문서 생성.
    - 경로: `inklingme/apps/pmf-mvp/docs/slices/{domain}/{id}-{name}.md` (표준 경로)
    - 레거시 경로: `inklingme/apps/pmf-mvp/docs/01_slices/{domain}/{id}-{name}.md`
3.  **Drafting:**
    - **Context & Value:** 'Why'와 'Goal' 명확히 작성.
    - **Scope:** 4계층(UI, API, Domain, DB) 범위 정의.
    - **User Flow:** Mermaid 다이어그램으로 데이터 흐름 시각화 (필수).
    - **Requirements Sanity Checklist:** 요구사항 품질/완전성 점검 체크리스트 포함함. (Code Complete Inspired, 인용/복사 금지)
    - **Acceptance Criteria (AC):** 성공/실패/예외 케이스를 포함한 체크리스트 작성 (QC 기준).
        - AC는 구현 단계에서 테스트 코드로 변환 가능한 문장으로 작성함.
    - **Documentation Rules:** Slice 문서 작성 규칙은 `VERTICAL_SLICE_DOCUMENTATION` 문서를 따름.
4.  **Issue Creation & Linking:**
    - 작성된 Slice 문서를 기반으로 GitHub Issue를 생성함. (Agent: `@slice-issue` 활용 권장)
    - 생성된 Issue 번호를 Slice 문서의 `Linked Issue: #...` 필드에 업데이트함.
5.  **Approval:** 작성된 기획 문서의 사용자 승인 획득 (승인 전 코딩 금지).

### Phase 2: Implementation (구현 & 검증 루프)

승인된 Slice 문서의 `Acceptance Criteria (AC)`를 기반으로 테스트를 선작성하고, `3.3 Task Breakdown`의 **각 Step 별로** 다음 사이클을 반복(Iterate)함.

1.  **Test Preparation (Red):**
    - AC를 테스트 케이스로 분해하여 **실패하는 테스트를 우선 작성**함.
    - 각 테스트는 어떤 AC를 검증하는지 추적 가능해야 함. (예: 테스트 이름/설명에 `AC-01` 포함)
    - *Note: 테스트 작성 위치 및 기술적 규칙은 `CODE_TESTING` 문서를 따름.*
2.  **Implementation (Green):**
    - 테스트 통과를 위한 최소한의 프로덕션 코드 작성.
3.  **Verification (Refactor):**
    - `pnpm test` 실행 및 통과 확인.
    - 코드 리팩토링 및 불필요한 주석 제거.
4.  **Commit (Save):**
    - Step 완료 및 테스트 통과 시 즉시 커밋.
    - 커밋 메시지는 `COMMIT_CONVENTION` 준수.
5.  **Mark Progress:**
    - Slice 문서의 해당 체크리스트 항목을 `[x]`로 업데이트.

### Phase 3: QC & Final Verification (통합 검증)

1.  **AC Verification:** 문서의 `Acceptance Criteria (AC)`는 대응되는 테스트 실행 결과로 검증함.
2.  **DoD Verification:** `Definition of Done (DoD)` 리스트 점검.
    - E2E 실행 확인
    - 테스트 통과 확인
    - 린트/포맷 준수 확인
3.  **Final Update:** 모든 구현 완료 시 Slice 문서 상태 `Done` 변경 및 체크리스트 `[x]` 마크.

---

## 3. Definition of Done (DoD: 완료의 정의)

기술적으로 하나의 Slice가 '완료'되었다고 선언하기 위한 필수 충족 조건:

- [ ]  **End-to-End Execution:** UI에서 DB까지 데이터 흐름의 끊김 없는 동작.
- [ ]  **Test Coverage:** 해당 기능에 대한 단위(Unit) 및 통합(Integration) 테스트 작성 및 통과.
- [ ]  **Code Quality:** 린트(Lint) 및 포맷팅 규칙 준수 (No Errors).
- [ ]  **No Technical Debt:** 하드코딩된 값이나 임시 우회 로직(Mocking) 부재.
