import {
  DehydratedState,
  QueryClient,
  QueryKey,
  dehydrate
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

type Callback = () => {
  queryKey: QueryKey;
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<unknown>;
  initialPageParam?: number;
};

type PrefetchInfiniteQueryWithCache = (args: {
  callbacks: Callback[];
  keyParts?: string[];
  options?: {
    revalidate?: number | false;
    tags?: string[];
  };
}) => Promise<DehydratedState>;

export const prefetchInfiniteQueryWithCache: PrefetchInfiniteQueryWithCache = ({
  callbacks,
  keyParts,
  options
}) => {
  return unstable_cache(
    async () => {
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
    },
    keyParts,
    options
  )();
};
