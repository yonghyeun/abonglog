import { TagSelector } from "./TagSelector";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Tag } from "@/entities/tag/ui/Tag";

const meta: Meta<typeof TagSelector> = {
  title: "features/tag/TagSelector",
  component: TagSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 개요
\`TagSelector\` 컴포넌트는 태그를 선택하고 관리하기 위한 UI 컴포넌트입니다.
사용자가 태그를 추가하거나 제거할 수 있으며, 선택된 태그 목록을 관리합니다.

합성 컴포넌트 패턴으로 구현되어 외부의 상태 관리 로직을 주입받아 사용합니다.
entities/ui/tag 에 존재하는 태그 컴포넌트와 함께 사용하는 것을 목적으로 생각하고 있습니다.

> 합성 컴포넌트 패턴을 선택한 이유는 다양한 외부 상태와 다양한 외부 데이터를 주입받아야 하기 때문에 
>
> 추상화 수준을 최소한으로 유지하고자 했습니다.

## 사용 예시 

\`\`\`tsx
import {Tag} from '@/entities/tag/ui'

const MockTagSelector = () => {
  const [tags, setTags] = useState([
    { id: 1, name: "react" },
    { id: 2, name: "typescript" },
    { id: 3, name: "supabase" }
  ]);

  const [text, setText] = useState<string>("");

  return (
    <TagSelector>
      <TagSelector.SearchInput
        onChange={({ target }) => setText(target.value)}
      />
      <ul>
        {tags
          .filter(({ name }) => name.includes(text))
          .map(({ id, name }) => (
            <TagSelector.Container key={name}>
              <Tag tagId={id} name={name} />
              <TagSelector.RemoveButton
                onClick={() => {
                  setTags(tags.filter((tag) => tag.name !== name));
                }}
              />
            </TagSelector.Container>
          ))}
      </ul>
      <TagSelector.CreateTagInput
        action={async (formData) => {
          const newTag = {
            id: tags.length + 1,
            name: formData.get("tag") as string
          };
          setTags([...tags, newTag]);
        }}
      />
    </TagSelector>
  );
};
\`\`\`


## 주요 기능
- 태그 검색 및 선택
- 선택된 태그 표시
- 태그 제거
`
      }
    }
  }
};

export default meta;

const MockTagSelector = () => {
  const [tags, setTags] = useState([
    { id: 1, name: "react" },
    { id: 2, name: "typescript" },
    { id: 3, name: "supabase" }
  ]);

  const [text, setText] = useState<string>("");

  return (
    <TagSelector>
      <TagSelector.SearchInput
        onChange={({ target }) => setText(target.value)}
      />
      <div className="flex flex-col gap-2">
        {tags
          .filter(({ name }) => name.includes(text))
          .map(({ id, name }) => (
            <TagSelector.Container key={name}>
              <Tag tagId={id} name={name} />
              <TagSelector.RemoveButton
                onClick={() => {
                  setTags(tags.filter((tag) => tag.name !== name));
                }}
              />
            </TagSelector.Container>
          ))}
      </div>
      <TagSelector.CreateTagInput
        action={async (formData) => {
          const newTag = {
            id: tags.length + 1,
            name: formData.get("tag") as string
          };
          setTags([...tags, newTag]);
        }}
      />
    </TagSelector>
  );
};

export const Default: StoryObj<typeof TagSelector> = {
  render: () => <MockTagSelector />
};
