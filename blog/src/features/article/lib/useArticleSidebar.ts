import { useEffect, useState } from "react";

export const useArticleSidebar = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const transformIdToSlug = (id: string) => {
    return id
      .replace(/\s+/g, "-")
      .replace(/[^\w\s가-힣-]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(transformIdToSlug(entry.target.id));
          }
        });
      },

      { rootMargin: "0% 0% -80% 0%" }
    );
    const headings = document.querySelectorAll("h1, h2, h3");

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  const handleHeadingScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    headingId: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { activeId, handleHeadingScroll, transformIdToSlug };
};
