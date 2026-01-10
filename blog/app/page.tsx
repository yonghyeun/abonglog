import {
  LatestArticleSlot,
  PopularArticleSlot,
  SeriesListSlot
} from "@/slots/main/ui";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import {
  getLatestArticle,
  getPopularArticleList
} from "@/entities/article/model";

import { Container } from "@/shared/ui/layout";
import { prefetchQueryInServer } from "@/shared/model";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  return [];
}

const MainPage = async () => {
  const mainPageState = await prefetchQueryInServer(getLatestArticle, () =>
    getPopularArticleList("daily")
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={mainPageState}>
        {/* Latest Post */}
        <section className="bg-surface-2/30 transition-colors">
          <Container variant="listing">
             <LatestArticleSlot />
          </Container>
        </section>
        
        {/* Popular */}
        <section className="bg-app py-16 transition-colors">
          <Container variant="listing">
            <PopularArticleSlot />
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
