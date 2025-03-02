# useMarkdown

## 개요

`useMarkdown` 훅은 마크다운 에디터에서 텍스트를 관리하고, 이미지가 클립보드에서 붙혀지거나 업로드 된 경우 마크다운 텍스트를 수정하는데 사용 됩니다.

### 훅 사용 예시

```typescript
import React from "react";
import { useMarkdown } from "@/features/post/lib/useMarkdown";

const MarkdownEditor: React.FC<{ articleId: string }> = ({ articleId }) => {
  const { text, handleChangeText, handleImagePaste, handleImageUpload, textAreaRef } = useMarkdown(articleId);

  return (
    <div>
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={handleChangeText}
        onPaste={handleImagePaste}
        className="rounded-lg border p-2 focus:outline-none"
        placeholder="게시글 내용을 입력해 주세요"
        autoCorrect="off"
      />
      <input type="file" multiple onChange={handleImageUpload} />
    </div>
  );
};
```

## 매개변수

- `articleId`: 게시글 식별자
- `defualtValue` (선택): 기본값으로 설정할 마크다운 텍스트

## 반환 값

- `text`: 마크다운 텍스트
- `handleChangeText`: textarea의 텍스트 변경 핸들러
- `handleImagePaste`: 이미지가 클립보드에서 textarea에 붙혔을 때 핸들러
- `handleImageUpload`: multiple input file에서 이미지를 업로드 했을 때 핸들러
- `textAreaRef`: textarea 엘리먼트의 ref

## 주요로직

- `handleChangeText`: textarea의 텍스트가 변경될 때마다 `text` 상태를 업데이트 합니다.

- `handleImagePaste`: 이미지가 클립보드에서 붙혔을 때, 이미지 파일을 업로드하고, 이미지 URL을 마크다운 텍스트에 추가합니다.
- `handleImageUpload`: 이미지 파일을 업로드하고, 이미지 URL을 마크다운 텍스트에 추가합니다.

> 두 개의 이미지 핸들러는 다음과 같은 파일들에 종속성을 갖습니다.
>
> - `@/entities/image/model` 의 `postArticleImage` 함수
> - `@/entities/image/lib` 의 `compressImage` 함수

위 두 개의 핸들러는 이미지가 업로드 되는 동안 `[image](이미지 업로드 중 ...)` 이란 텍스트가 표기 되고 그 후 이미지 URL로 대체 됩니다.

- `textAreaRef`: textarea 엘리먼트의 ref를 반환합니다.

## 발생할 수 있는 문제

- 이미지 업로드 실패 시 에러 처리
- 이미지 압축 실패 시 에러 처리

## 고려 할 수 있는 최적화 방법

- 이미지 압축 알고리즘 개선
