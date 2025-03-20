# Util (Utility)

애플리케이션 전반에서 사용되는 유틸리티 함수들을 관리하는 폴더입니다.

## 파일 구조

```
util/
├── snakeToCamel.ts    # 스네이크 케이스를 카멜 케이스로 변환하는 유틸리티
└── index.ts           # 유틸리티 함수 export 통합 관리
```

## 주요 기능

### Snake Case to Camel Case

- API 응답 데이터 변환에 사용
- 스네이크 케이스(snake_case)를 카멜 케이스(camelCase)로 변환
- 객체의 중첩된 속성들도 변환 지원

## 사용 예시

```typescript
import { snakeToCamel } from "./snakeToCamel";

const data = {
  user_name: "john",
  created_at: "2023-01-01"
};

const converted = snakeToCamel(data);
// 결과: { userName: 'john', createdAt: '2023-01-01' }
```
