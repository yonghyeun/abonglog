import {
  LatestArticleSlot,
  RecentArticleListSlot,
  SeriesListSlot
} from "@/slots/main/ui";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import { Suspense } from "react";

import { getArticleList, getLatestArticle } from "@/entities/article/model";

import { Container } from "@/shared/ui/layout";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  return [];
}

const MainPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getLatestArticle()),
    queryClient.prefetchInfiniteQuery({
      ...getArticleList("published")
    })
  ]);

  const mainPageState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={mainPageState}>
        {/* Latest Post */}
        <section className="bg-surface-2/30 transition-colors">
          <Container variant="listing">
            <LatestArticleSlot />
          </Container>
        </section>

        {/* Recent Article List */}
        <section className="bg-app py-16 transition-colors">
          <Container variant="listing">
            <RecentArticleListSlot />
          </Container>
        </section>

        {/* Series List  */}
        <section className="bg-surface-2/30 py-16 transition-colors">
          <Container variant="listing">
            <SeriesListSlot />
          </Container>
        </section>
      </HydrationBoundary>
    </Suspense>
  );
};

export default MainPage;
