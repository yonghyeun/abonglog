"use client";

import { ArticleWrite } from "./ArticleWrite";
import React, { useState } from "react";

import { BackwardIcon } from "@/shared/config";
import { Button } from "@/shared/ui/Button";

interface ArticleWriteSlotProps {
  initialState?: Partial<{
    // step 1 state
    title: string;
    tags: string[];
    seriesName: string;
    markdown: string;
    html: string;

    // step 2 state
    description: string;
    thumbnailUrl: string | null;
  }>;

  articleId?: number;
}

export const ArticleWriteSlot: React.FC<ArticleWriteSlotProps> = ({
  articleId = Math.floor(Math.random() * 10 ** 7),
  initialState
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <ArticleWrite articleId={articleId} initialState={initialState}>
      {step === 1 ? (
        <section className="media-padding-x">
          <div className="mb-2 flex h-screen">
            {/* 글 작성 */}
            <div className="flex h-full w-full flex-col p-2 md:w-1/2">
              {/* 글 제목 */}
              <ArticleWrite.TitleInput />
              <ArticleWrite.TagList />
              <section className="relative flex justify-between p-2 text-sm">
                <ArticleWrite.SeriesList />
                <ArticleWrite.ImageUploadInput />
              </section>
              {/* 마크다운 에디터 */}
              <ArticleWrite.MarkdownEditor />
            </div>
            {/* 마크다운 프리뷰어 */}
            <ArticleWrite.MarkdownPreview />
          </div>
          <footer className="mb-2 flex justify-end gap-2">
            <ArticleWrite.TempSaveButton />
            <Button
              variant="filled"
              size="sm"
              onClick={() => {
                setStep(2);
              }}
            >
              다음 단계
            </Button>
          </footer>
        </section>
      ) : (
        <section className="media-padding-x flex h-screen flex-col">
          <header>
            <button
              className="p-2 text-gray-400 hover:bg-gray-200"
              aria-label="글 쓰기 단계로 돌아가기"
              onClick={() => setStep(1)}
            >
              <BackwardIcon size={24} />
            </button>
          </header>
          <section className="flex w-full flex-grow flex-col gap-2 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              {/* 아티클 소개글 등록 컴포넌트 */}
              <ArticleWrite.DescriptionTextArea />
              {/* 썸네일 등록 컴포넌트 */}
              <ArticleWrite.ThumbnailUploadInput />

              {/* 사용된 image 선택 컴포넌트 */}
              <ArticleWrite.ArticleImageGrid />
            </div>

            <div className="flex h-fit flex-grow justify-center py-12">
              <div className="w-96">
                <ArticleWrite.PreviewCard />
                <div className="flex justify-end">
                  <ArticleWrite.SubmitButton />
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </ArticleWrite>
  );
};
