# Write Model 폴더 구조

이 폴더는 글 작성 관련 상태 관리 로직을 포함합니다.

## 파일 설명

### createArticleWriteStore.ts

글 작성에 필요한 전역 상태 관리 스토어

- `ArticleWriteStoreState`: 글 작성 관련 상태 인터페이스

  - title: 제목
  - tags: 태그 목록
  - seriesName: 시리즈 이름
  - content: 마크다운 내용
  - html: 변환된 HTML
  - description: 글 설명
  - thumbnailUrl: 썸네일 이미지 URL
  - articleId: 글 ID
  - isPreviewNeedScroll: 프리뷰 스크롤 필요 여부

- `ArticleWriteStoreAction`: 상태 변경을 위한 액션 인터페이스
  - setTitle: 제목 설정
  - setTags: 태그 설정
  - setSeriesName: 시리즈 설정
  - setContent: 내용 설정
  - setDescription: 설명 설정
  - setThumbnailUrl: 썸네일 설정
  - setHtml: HTML 설정
  - setIsPreviewNeedScroll: 스크롤 필요 여부 설정

### index.ts

- 스토어 생성 함수와 관련 타입들의 진입점
- 외부에서 사용할 수 있도록 export 처리
