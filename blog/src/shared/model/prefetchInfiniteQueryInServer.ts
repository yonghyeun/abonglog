import {
  DehydratedState,
  QueryClient,
  QueryKey,
  dehydrate
} from "@tanstack/react-query";

type PrefetchInfiniteQueryInServer = <T>(
  ...callbacks: (() => {
    queryKey: QueryKey;
    queryFn: ({ pageParam }: { pageParam: number }) => Promise<T>;
    initialPageParam?: number;
  })[]
) => Promise<DehydratedState>;

/**
 * prefetchInfiniteQueryInServer는 서버에서 쿼리를 prefetch 하는 함수입니다.
 * @param {() => { queryKey: QueryKey; queryFn: () => Promise<T> }} callbacks prefetch할 쿼리를 반환하는 콜백함수들
 * @returns {Promise<DehydratedState>} dehydrate된 상태
 */
export const prefetchInfiniteQueryInServer: PrefetchInfiniteQueryInServer =
  async (...callbacks) => {
    const queryClient = new QueryClient();

    await Promise.all(
      callbacks.map((callback) => {
        return queryClient.prefetchInfiniteQuery({
          initialPageParam: 0,
          ...callback()
        });
      })
    );

    return dehydrate(queryClient);
  };
