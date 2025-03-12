import {
  DehydratedState,
  QueryClient,
  QueryKey,
  dehydrate
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

type Callback = () => { queryKey: QueryKey; queryFn: () => Promise<unknown> };

type PrefetechQueryWithCache = (args: {
  callbacks: Callback[];
  keyParts?: string[];
  options?: {
    revalidate?: number | false;
    tags?: string[];
  };
}) => Promise<DehydratedState>;

export const prefetechQueryWithCache: PrefetechQueryWithCache = ({
  callbacks,
  keyParts,
  options
}) => {
  return unstable_cache(
    async () => {
      const queryClient = new QueryClient();
      await Promise.all(
        callbacks.map((callback) => {
          return queryClient.prefetchQuery(callback());
        })
      );
      return dehydrate(queryClient);
    },
    keyParts,
    options
  )();
};
