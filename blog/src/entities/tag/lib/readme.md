# Tag Library

## 개요

이 디렉토리는 태그와 관련된 유틸리티 함수들을 포함하고 있습니다. 현재 포함된 함수들은 문자열의 첫 글자를 대문자로 변환하는 함수와 텍스트의 각 문자의 유니코드 값을 합산하는 함수입니다.

## 파일 경로

## 함수 목록

### 1. `capitalizeFirstLetter`

문자열의 첫 글자를 대문자로 변환하는 함수입니다.

#### 파일 경로

`capitalizeFirstLetter.ts`

#### 사용 예시

```typescript
import { capitalizeFirstLetter } from "@/entities/tag/lib";

const result = capitalizeFirstLetter("hello");
console.log(result); // "Hello"
```

### 2. summarizeTextCode

텍스트의 각 문자의 유니코드 값을 합산하는 함수입니다.

#### 사용 예시

```typescript
import { summarizeTextCode } from "@/entities/tag/lib";

const result = summarizeTextCode("hello");
console.log(result); // 532
```
