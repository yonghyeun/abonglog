# /src/entities/tag/model

## Create

- `postAddNewTag.ts`: 새 태그를 생성하는 기능
  - Tag 테이블에 name, created_at 정보 저장
  - 성공 시 태그 관련 쿼리 자동 갱신

## Read

- `getTagList.ts`: 전체 태그 목록 조회 기능
  - Supabase tags 테이블에서 모든 태그 정보 조회
  - 데이터 정규화 및 캐싱 처리

## Update

현재 태그 수정 기능은 구현되어 있지 않음

## Delete

현재 태그 삭제 기능은 구현되어 있지 않음

## Utilities

- `tagQueryKey.ts`: React Query 캐시 키 관리
- `index.ts`: 모델 파일들의 export 관리
