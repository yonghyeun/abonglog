"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { trackPageView } from "@/shared/lib";

interface AnalyticsTrackerProps {
  isEnabled: boolean;
}

export const AnalyticsTracker = ({ isEnabled }: AnalyticsTrackerProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const queryString = searchParams.toString();
    const pathWithQuery = queryString
      ? `${pathname}?${queryString}`
      : pathname;

    trackPageView(pathWithQuery);
  }, [isEnabled, pathname, searchParams]);

  return null;
};
