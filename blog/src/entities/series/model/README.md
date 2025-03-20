# /src/entities/series/model

## Create

- `postAddNewSeries.ts`: 새 시리즈 생성 기능
  - 시리즈 이름과 생성 시간 정보 저장
  - 성공 시 series 관련 쿼리 자동 갱신

## Read

- `getSeriesList.ts`: 전체 시리즈 목록 조회
  - 7일간의 staleTime 설정으로 캐시 최적화
  - snake_case -> camelCase 변환 처리

## Update

현재 시리즈 수정 기능은 구현되어 있지 않음

## Delete

현재 시리즈 삭제 기능은 구현되어 있지 않음

## Utilities

- `seriesQueryKey.ts`: React Query 캐시 키 관리
- `index.ts`: 모델 파일들의 export 관리

## 주요 특징

- React Query를 활용한 서버 상태 관리
  - useSuspenseQuery로 데이터 로딩 상태 처리
  - useMutation으로 데이터 수정 처리
  - queryClient로 캐시 무효화 관리
- Supabase 데이터베이스 통합
- TypeScript 타입 안정성
  - Database 타입 정의 활용
  - SnakeToCamel 유틸리티 타입으로 일관된 네이밍 규칙
- 최적화된 캐시 전략
  - 시리즈 목록의 경우 7일간 캐시 유지
  - 수정 시 관련 쿼리 자동 갱신
