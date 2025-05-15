import { useEffect, useRef, type RefObject } from "react";

export const useAutoScrollOnPageInit = (
  containerRef: RefObject<HTMLDivElement | null>,
  dependency: number
) => {
  const hasScrolledInitially = useRef(false);
  // Scroll to bottom on initial load
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasScrolledInitially.current) return;

    // Initial auto scroll to bottom
    el.scrollTop = el.scrollHeight;
    hasScrolledInitially.current = true;
  }, [dependency]);
};

export const useHandleLoadMoreScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
  loadMore: () => Promise<void>
) => {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Load older messages when user scrolls to the top
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el || el.scrollTop > 50) return;

      const prevScrollHeight = el.scrollHeight;
      const prevScrollTop = el.scrollTop;

      console.log("🔼 Scrolled near top, loading more...");
      loadMore().then(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = el.scrollHeight;
          el.scrollTop = newScrollHeight - (prevScrollHeight - prevScrollTop);
        });
      });
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadMore]);
};

//  Preserve scroll when local optimistic messages are added
export const usePreserveScrollOnLocalOptimisticMessage = (
  containerRef: RefObject<HTMLDivElement | null>,
  dependency: number
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const prevScrollTop = el.scrollTop;
    const prevScrollHeight = el.scrollHeight;

    requestAnimationFrame(() => {
      const newScrollHeight = el.scrollHeight;
      el.scrollTop = newScrollHeight - (prevScrollHeight - prevScrollTop);
    });
  }, [dependency]);
};
