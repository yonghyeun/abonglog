# Write Lib 폴더 구조

이 폴더는 글 작성 관련 커스텀 훅과 유틸리티 함수들을 포함합니다.

## 파일 설명

### useDebounce.ts

- 디바운스 처리를 위한 커스텀 훅
- 주로 마크다운 에디터의 실시간 프리뷰 렌더링 최적화에 사용
- `callback`: 실행할 함수
- `delay`: 지연 시간(ms)

### useTagSelectToggle.ts

- 태그 선택 기능을 위한 커스텀 훅
- 태그 검색 및 새 태그 추가 기능 제공
- 주요 함수:
  - `filterBySearchedText`: 검색어로 태그 필터링
  - `isAvailableAddNewTag`: 새 태그 추가 가능 여부 확인

### useSeriesSelectToggle.ts

- 시리즈 선택 기능을 위한 커스텀 훅
- 시리즈 검색 및 선택 기능 제공

### index.ts

- 모든 훅과 유틸리티 함수들의 진입점
- 외부에서 사용할 수 있도록 export 처리
