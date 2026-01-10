---
applyto: "**/docs/01_slices/**/*.md"
---

## slice 문서 작성 및 에이전트 행동 지침

### 1. slice 문서의 철학 (philosophy)

- **one slice = one doc = one branch**: 하나의 slicing은 하나의 문서로 관리되며, 이는 하나의 git 브랜치 작업 단위와 일치해야 한다.
- **unified context**: 기획(requirement)과 실행(todo)을 분리하지 않고 한 문서 내에서 `context` -> `spec` -> `task` 순으로 기술한다.
- **evolutionary**: 완료된 slice 문서는 **수정하지 않고 아카이빙(logged)**되며, 새로운 slice가 시스템을 덮어쓴다. 단, 시스템의 최종 상태는 `docs/00_specs`에 반영해야 한다.

### 2. 작성 가이드 (structure)

1.  **헤더 (metadata)**: 작성자, 관련 이슈 번호, 상태(planning/in-progress/done), 날짜를 기입한다.
2.  **컨텍스트 (section 1)**: "왜 이 작업을 하는가?"에 집중한다. 이전 slice와의 관계를 명시한다.
3.  **요구사항 명세 (section 2 - sot)**:
    - user flow는 mermaid로 시각화한다.
    - 기능 및 ac는 엄밀한 한국어로 작성한다.
    - 비기능 요구사항을 포함한다.
4.  **구현 단계 (section 3)**:
    - 작업을 논리적인 순서(step)로 나누어 기술한다.
    - 각 step별로 **목표(goal)**, **설명(description)**, **작업(checklist)**, **검증(verification)** 4단 구성을 갖춘다.
    - **설명** 파트는 구현자가 코드를 보지 않고도 설계 의도와 방식을 파악할 수 있도록 '기술적인 서사(technical narrative)'로 작성한다.

### 3. ai 에이전트 행동 지침 (agent action protocol)

에이전트가 `docs/slices` 문서를 기반으로 작업을 수행할 때는 다음 절차를 따른다.

1.  **context loading**:
    - 문서의 `1. 컨텍스트`와 `2. 요구사항 명세`를 읽어 전체 그림을 이해한다.

2.  **task execution (loop)**:
    - **step context**: 각 step의 `목표`와 `설명`을 정독하여 구현 방식을 숙지한다.
    - **checklist**: `작업` 항목을 순차적으로 수행한다.
    - **verification**: 각 step이 끝날 때마다 `검증` 항목을 테스트하여 통과 여부를 확인한다.
    - **update**: 완료된 체크박스에 `[x]` 표시를 하고, 관련 파일명 등을 커밋 메시지에 포함한다.

3.  **compliance check**:
    - 코드를 작성할 때 `00_specs/data-model.md` 등 전역 spec 문서의 용어와 정의를 위배하지 않는지 확인한다.

4.  **wrap-up**:
    - 모든 태스크가 완료되면(all checked), 문서의 상단 상태를 `✅ done`으로 변경한다.
    - 사용자에게 `00_specs` 업데이트가 필요한지 리마인드한다.
