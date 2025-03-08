"use client";

import { ArticleWriteView } from "./ArticleWrite";
import React, { useState } from "react";

import { BackwardIcon } from "@/shared/config";
import { Button } from "@/shared/ui/Button";

interface ArticleWritePageProps {
  articleId: number;
}

export const ArticleWritePage: React.FC<ArticleWritePageProps> = ({
  articleId
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <ArticleWriteView articleId={articleId}>
      {step === 1 ? (
        <section className="media-padding-x">
          <div className="mb-2 flex h-screen">
            {/* 글 작성 */}
            <div className="flex h-full w-full flex-col p-2 md:w-1/2">
              {/* 글 제목 */}
              <ArticleWriteView.TitleInput />
              <ArticleWriteView.TagList />
              <section className="relative flex justify-between p-2 text-sm">
                <ArticleWriteView.SeriesList />
                <ArticleWriteView.ImageUploadInput />
              </section>
              {/* 마크다운 에디터 */}
              <ArticleWriteView.MarkdownEditor />
            </div>
            {/* 마크다운 프리뷰어 */}
            <ArticleWriteView.MarkdownPreview />
          </div>
          <footer className="mb-2 flex justify-end gap-2">
            <ArticleWriteView.TempSaveButton />
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
              <ArticleWriteView.DescriptionTextArea />
              {/* 썸네일 등록 컴포넌트 */}
              <ArticleWriteView.ThumbnailUploadInput />

              {/* 사용된 image 선택 컴포넌트 */}
              <ArticleWriteView.ArticleImageGrid />
            </div>

            <div className="flex flex-grow justify-center py-12">
              <div className="max-h-96 w-96">
                <ArticleWriteView.PreviewCard />
                <div className="flex justify-end">
                  <ArticleWriteView.SubmitButton />
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </ArticleWriteView>
  );
};
