import {
  DehydratedState,
  QueryClient,
  QueryKey,
  dehydrate
} from "@tanstack/react-query";

type PrefetechQueryInServer = (
  ...callbacks: (() => {
    queryKey: QueryKey;
    queryFn: () => Promise<unknown>;
  })[]
) => Promise<DehydratedState>;

/**
 * prefetchQueryInServer는 서버에서 쿼리를 prefetch 하는 함수입니다.
 * @param {() => { queryKey: QueryKey; queryFn: () => Promise<T> }} callbacks prefetch할 쿼리를 반환하는 콜백함수들
 * @returns {Promise<DehydratedState>} dehydrate된 상태
 */
export const prefetchQueryInServer: PrefetechQueryInServer = async (
  ...callbacks
) => {
  const queryClient = new QueryClient();

  await Promise.all(
    callbacks.map((callback) => {
      return queryClient.prefetchQuery(callback());
    })
  );

  return dehydrate(queryClient);
};
