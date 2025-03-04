# useMarkdown

## 개요

`useMarkdown` 훅은 마크다운 에디터에서 텍스트를 관리하고, 이미지가 클립보드에서 붙여지거나 업로드된 경우 마크다운 텍스트를 수정하는 데 사용됩니다. 또한, 마크다운 텍스트를 HTML로 변환하고, 코드 블록에 복사 기능을 추가할 수 있습니다.

### 훅 사용 예시

```typescript
import React from "react";
import { useMarkdown } from "@/features/article/lib";

const MarkdownEditor: React.FC<{ articleId: string }> = ({ articleId }) => {
  const { markdown, html, handleChangeMarkdown, handleImagePaste, handleImageUpload, textAreaRef, handleKeyDownTextArea } = useMarkdown(articleId);

  return (
    <div>
      <textarea
        ref={textAreaRef}
        value={markdown}
        onChange={handleChangeMarkdown}
        onPaste={handleImagePaste}
        onKeyDown={handleKeyDownTextArea}
        className="rounded-lg border p-2 focus:outline-none"
        placeholder="게시글 내용을 입력해 주세요"
        autoCorrect="off"
      />
      <input type="file" multiple onChange={handleImageUpload} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
```

## 매개변수

- `articleId`: 게시글 식별자
- `defaultValue` (선택): 기본값으로 설정할 마크다운 텍스트

## 반환 값

- `markdown`: 마크다운 텍스트
- `html`: 변환된 HTML 텍스트
- `handleChangeMarkdown`: textarea의 텍스트 변경 핸들러
- `handleImagePaste`: 이미지가 클립보드에서 textarea에 붙여졌을 때 핸들러
- `handleImageUpload`: multiple input file에서 이미지를 업로드했을 때 핸들러
- `textAreaRef`: textarea 엘리먼트의 ref
- `handleKeyDownTextArea`: textarea에서 키 다운 이벤트를 처리하는 핸들러

## 주요 로직

- `handleChangeMarkdown`: textarea의 텍스트가 변경될 때마다 `markdown` 상태를 업데이트하고, 마크다운 텍스트를 HTML로 변환하여 `html` 상태를 업데이트합니다.
- `handleImagePaste`: 이미지가 클립보드에서 붙여졌을 때, 이미지 파일을 업로드하고, 이미지 URL을 마크다운 텍스트에 추가합니다.
- `handleImageUpload`: 이미지 파일을 업로드하고, 이미지 URL을 마크다운 텍스트에 추가합니다.
- `handleKeyDownTextArea`: textarea에서 탭 키를 눌렀을 때, 탭 문자를 삽입합니다.

> 두 개의 이미지 핸들러는 다음과 같은 파일들에 종속성을 갖습니다.
>
> - `@/entities/article/model`의 `postArticleImage` 함수
> - `@/entities/image/lib`의 `compressImage` 함수

위 두 개의 핸들러는 이미지가 업로드되는 동안 `[image](이미지 업로드 중 ...)` 이란 텍스트가 표기되고 그 후 이미지 URL로 대체됩니다.

- `textAreaRef`: textarea 엘리먼트의 ref를 반환합니다.

## 발생할 수 있는 문제

- 이미지 업로드 실패 시 에러 처리
- 이미지 압축 실패 시 에러 처리

## 고려할 수 있는 최적화 방법

- 이미지 압축 알고리즘 개선
- 에러 처리 로직 개선
