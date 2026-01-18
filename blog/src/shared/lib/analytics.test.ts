import { trackEvent, trackPageView } from "./analytics";

describe("analytics", () => {
  const mockGtag = jest.fn();

  beforeEach(() => {
    mockGtag.mockClear();
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST-1234";
    const mockedWindow = {
      gtag: mockGtag,
      location: { href: "http://localhost/test" } as Location
    } as unknown as Window;

    (globalThis as unknown as { window: Window }).window = mockedWindow;
  });

  afterEach(() => {
    delete (globalThis as unknown as { window?: Window }).window;
    delete process.env.NEXT_PUBLIC_GA_ID;
  });

  describe("유효한 측정 ID와 gtag가 있을 때", () => {
    it("page_view를 전송해야 한다 (AC-01)", () => {
      // Given
      const pathname = "/article/123";

      // When
      trackPageView(pathname);

      // Then
      expect(mockGtag).toHaveBeenCalledWith("config", "G-TEST-1234", {
        page_location: "http://localhost/test",
        page_path: pathname
      });
    });

    it("커스텀 이벤트를 전송해야 한다 (AC-02)", () => {
      // Given
      const eventName = "article_view";
      const params = { article_id: "123" };

      // When
      trackEvent(eventName, params);

      // Then
      expect(mockGtag).toHaveBeenCalledWith("event", eventName, params);
    });
  });

  describe("측정 ID가 없을 때", () => {
    it("page_view를 전송하지 않아야 한다 (AC-03)", () => {
      // Given
      process.env.NEXT_PUBLIC_GA_ID = "";

      // When
      trackPageView("/article/123");

      // Then
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe("gtag가 없을 때", () => {
    it("예외가 발생하지 않아야 한다 (AC-04)", () => {
      // Given
      const mockedWindow = {
        location: { href: "http://localhost/test" } as Location
      } as unknown as Window;

      (globalThis as unknown as { window: Window }).window = mockedWindow;

      // When
      const trackEventCall = () => trackEvent("article_view", { article_id: "1" });

      // Then
      expect(trackEventCall).not.toThrow();
    });
  });
});
