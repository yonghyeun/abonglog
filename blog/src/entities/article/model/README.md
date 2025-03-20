# /src/entities/article/model

## Create

- `postNewArticle.ts`: 새 아티클 작성 기능
  - 제목, 내용, 작성자, 시리즈, 설명, 태그 등 저장
  - 아티클 상태(published/draft) 관리
- `postArticleImage.ts`: 아티클 내 이미지 업로드
- `postArticleThumbnail.ts`: 아티클 썸네일 이미지 업로드

## Read

- `getArticleById.ts`: 특정 ID의 아티클 상세 정보 조회
- `getArticleList.ts`: 전체 아티클 목록 페이지네이션 조회
- `getArticleListBySeries.ts`: 시리즈별 아티클 목록 조회
- `getLatestArticle.ts`: 최신 아티클 조회
- `getNumberOfArticles.ts`: 아티클 수 조회
- `getPopularArticleList.ts`: 인기 아티클 목록 조회
- `getArticleInfoPerSeries.ts`: 시리즈별 아티클 정보 조회

## Delete

- `deleteArticle.ts`: 아티클 삭제 기능
  - 아티클 ID와 시리즈명 기반 삭제
  - 연관된 이미지 및 메타데이터 함께 삭제

## Utilities

- `articleQueryKey.ts`: React Query 캐시 키 관리
- `utils.ts`: 아티클 관련 유틸리티 함수
- `index.ts`: 모델 파일들의 export 관리

## 주요 특징

- React Query를 활용한 서버 상태 관리
- Supabase를 데이터베이스로 사용
- 페이지네이션 구현 (ITEM_PER_PAGE 단위로 조회)
- 캐시 전략 적용 (staleTime 설정)
