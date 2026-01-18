import Script from "next/script";

import { AnalyticsTracker } from "@/shared/ui/AnalyticsTracker";

interface GoogleAnalyticsProps {}

export const GoogleAnalytics = ({}: GoogleAnalyticsProps) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <AnalyticsTracker isEnabled={Boolean(measurementId)} />
    </>
  );
};
