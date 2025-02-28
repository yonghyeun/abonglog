import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";

import { getTags, tagQueryKey } from "@/entities/tag/model";

const WritePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: tagQueryKey.default,
    queryFn: getTags
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex h-screen rounded-md px-8">
        {/* 글 작성 페이지 */}
        <div className="h-full w-full p-2 md:w-1/2">
          <form className="flex flex-col gap-2">
            {/* title */}
            <div>
              <label htmlFor="" className="sr-only">
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="p-2 text-5xl outline-none focus:outline-none"
                placeholder="제목을 입력해주세요"
              />
              <div className="h-2 w-32 bg-secondary" />
            </div>

            {/* tags */}
            <label className="sr-only" htmlFor="tags">
              태그
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="w-full border p-2 outline-none focus:outline-none"
              placeholder="태그를 추가해주세요"
            />
          </form>
        </div>
        {/* 글 미리보기 페이지 */}
        <div className="hidden h-full w-1/2 bg-secondary p-2 md:block">1</div>
      </section>
    </HydrationBoundary>
  );
};

export default WritePage;
