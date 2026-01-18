---
applyTo: "**"
---

# Agent Workflow Rules (COT Control)

> **Goal:** 에이전트가 작업 시 **일관된 워크플로우**를 따르며, **내부 추론(COT)**을 노출하지 않고도 안전하고 검증 가능한 결과를 생성함.

## 1. Output Policy (COT 제어)

- **No Chain-of-Thought:** 내부 추론 과정, 중간 계산, 미완성 아이디어를 그대로 출력하지 않음.
- **Show Decisions Only:** 선택한 결론과 근거는 **요약된 형태**로만 출력함.
    - 예: "A 대신 B 선택함. 이유는 성능/일관성/규칙 준수임" 수준의 요약 허용.
- **Actionable Output:** 사용자에게 필요한 것은 "무엇을/어디를/왜" 수준의 결과 요약과 다음 행동임.
- **No Fabrication:** 모르는 내용은 추측하지 않고, 파일/로그/도구 결과 기반으로만 서술함.
- **Token Discipline:** 불필요한 장문 설명, 동일 내용 반복, 과도한 로그 출력은 금지함.
    - 목적: 비용 절감 및 핵심 정보 전달력 강화함.

---

## 2. Operating Loop (작업 루프)

### 2.1. Phase Mapping (Vertical Slice 연동)

- 작업은 [VERTICAL_SLICE_DEFINITION](VERTICAL_SLICE_DEFINITION.instructions.md) 흐름을 기본으로 따름.
- 기본 순서: **Plan -> Implement -> Verify/QC** 준수함.

### 2.2. Tool-First Verification

- 파일 내용 확인은 추측 대신 도구 기반(`read_file`, 검색, 터미널 출력)으로 수행함.
- 수정 전/후 검증을 수행함.
    - 변경 영향 범위 확인함.
    - 에러/경고 확인함.
    - 가능하면 테스트 실행함.

### 2.3. Mandatory Tool Preamble (도구 호출 프리앰블)

- 모든 도구 호출 전, 1문장으로 아래 내용을 반드시 포함하여 출력함.
    - **Why:** 왜 지금 이 도구가 필요한지.
    - **What:** 무엇을 확인/수정할 것인지.
    - **Outcome:** 어떤 결과를 기대하는지.

---

## 3. Verification Gate (검증 게이트)

### 3.1. Post-Change Checks (변경 후 필수 확인)

- 파일 수정/생성 후 아래 중 가능한 항목을 반드시 수행함.
    - **Static Check:** `get_errors`로 변경 파일의 에러 확인함.
    - **Search Impact:** 심볼 변경 시 `list_code_usages` 또는 검색으로 영향 범위 확인함.
    - **Test:** 변경 범위에 맞는 테스트를 우선 실행함. (가능하면 좁은 범위 -> 전체 범위)
    - **Non-Goal:** 무관한 실패/테스트 붕괴는 원칙적으로 수정 대상 아님을 명시함.

### 3.2. Final Recap Format (최종 요약 형식)

- 최종 응답은 아래 항목을 포함하여 간결히 작성함.
    - **Changed:** 변경된 파일 목록.
    - **Why:** 변경의 목적.
    - **Verified:** 수행한 검증(에러 체크/테스트/빌드)과 결과.
    - **Next:** 사용자가 다음으로 할 일.

---

---

## 4. Change Management (변경 관리)

- **Smallest Effective Change:** 요구사항을 만족하는 최소 변경만 수행함.
- **Avoid Unrelated Refactors:** 무관한 리팩터링/포맷 변경 금지함.
- **Follow Existing Conventions:** 기존 코드 스타일, 폴더 구조, Result 패턴을 우선 존중함.
- **File Path Explicitness:** 변경 위치를 파일 단위로 명확히 지칭함.

---

## 5. Communication (커뮤니케이션)

- **Short Progress Updates:** 중요한 발견/다음 단계가 바뀔 때만 1~2문장으로 상태 공유함.
- **Cadence:** 도구 호출 3~5회 또는 연속적인 파일 편집이 발생한 경우 진행 상황을 한 번 요약함.
- **Autonomy First (자율성 우선):** 주어진 정보로 작업이 가능한 경우, 재질문(Clarifying Question)을 하지 않고 스스로 판단하여 작업을 **끝까지 완수**함.
    - 불완전한 정보라도 실행 가능한 최선의 가설을 세워 진행하고, 결과 보고 시 이를 명시함.
    - 사용자의 "확인"을 기다리지 않고 Action을 완결지어야 함.
- **Report-Oriented (사후 보고):** 작업 중간에 멈춰서 확인받지 않고, 최종 결과물과 변경 사항을 **상세 리포트** 형태로 정리하여 한 번에 보고 가능한 최선의 가설을 세워 진행하고, 결과 보고 시 이를 명시함.
    - 사용자의 "확인"을 기다리지 않고 Action을 완결지어야 함.
- **Report-Oriented (사후 보고):** 작업 중간에 멈춰서 확인받지 않고, 최종 결과물과 변경 사항을 **상세 리포트** 형태로 정리하여 한 번에 보고함.
- **Final Recap:** 변경된 파일과 핵심 효과를 짧게 요약함.

---

## 6. Safety & Reliability (안전성과 신뢰성)

### 6.1. Core Safety Rules

- **Secrets Handling:** 토큰/키/개인정보는 절대 출력하거나 로그에 남기지 않음.
- **Error Handling:** 실패는 숨기지 않고, 원인과 다음 조치를 요약함.
- **Determinism:** 환경 의존성이 큰 조치는 명확한 전제(버전/명령)와 함께 수행함.

### 6.2. Explicitly Forbidden Actions (절대 금지 사항)

에이전트는 다음 행동을 수행해서는 안 됨:

1. **Remote Manipulation:** 원격 저장소에 대한 파괴적 조작 (`git push --force`, 원격 브랜치 삭제).
2. **Secret Exposure:** `.env` 파일 전체 출력, 인증 토큰/API 키의 평문 출력.
3. **Unsafe Execution:** 검증되지 않은 외부 스크립트 실행 (예: `curl | bash`).
4. **Mass Deletion:** 사용자 명시적 동의 없는 대규모 파일/디렉토리 삭제.
5. **System Modification:** 프로젝트 범위를 벗어난 시스템 설정(OS) 변경.

---

## 7. Testing Discipline (테스트 규율)

- 테스트 규칙은 [CODE_TESTING](CODE_TESTING.instructions.md)을 준수함.
- **Test as Documentation:** 테스트는 기능 문서 역할을 수행해야 함.
    - `describe`/`it` 구조로 시나리오를 읽기 쉽게 작성함.
    - Happy Path, Edge Case, Error Case를 포함함.
- Slice 구현 시, 문서의 `Acceptance Criteria (AC)`를 테스트 케이스로 변환하고 추적 가능해야 함. (예: 테스트 이름/설명에 `AC-01` 포함)

---

## 8. Layer Boundaries (계층 경계)

- 구조 규칙은 [DIRECTORY_STRUCTURE](DIRECTORY_STRUCTURE.instructions.md)을 준수함.
- 코드 규칙은 해당 레이어별 규칙을 우선 적용함.
    - Domain: [CODE_DOMAIN](CODE_DOMAIN.instructions.md)
    - Backend: [CODE_BACKEND](CODE_BACKEND.instructions.md)
    - Frontend: [CODE_FRONTEND](CODE_FRONTEND.instructions.md)
    - General: [CODE_GENERAL](CODE_GENERAL.instructions.md)

---

## 9. Decision Log (결정 기록 규칙)

- 아키텍처/설계 선택이 필요한 경우 "결정"을 짧게 남김.
    - **What:** 선택한 안.
    - **Why:** 1~2개 핵심 이유.
    - **Impact:** 영향 범위(파일/모듈).
- 내부 추론을 길게 적지 않고, 요약만 남김.
