type AnalyticsEventParams = Record<string, string | number | boolean>;

type GtagFunction = (...args: unknown[]) => void;

const getGtag = (): GtagFunction | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.gtag;
};

const getMeasurementId = (): string | undefined => {
  return process.env.NEXT_PUBLIC_GA_ID;
};

export const trackPageView = (pathname: string): void => {
  const measurementId = getMeasurementId();
  const gtag = getGtag();

  if (!measurementId || !gtag) {
    return;
  }

  gtag("config", measurementId, {
    page_path: pathname,
    page_location: window.location.href
  });
};

export const trackEvent = (
  eventName: string,
  params: AnalyticsEventParams = {}
): void => {
  const gtag = getGtag();

  if (!gtag) {
    return;
  }

  gtag("event", eventName, params);
};
