"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  One observer for the whole page. Any element with data-reveal rises 32px
  and fades in the first time it enters the viewport, then stays put.
*/
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const onEnter: IntersectionObserverCallback = (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    };
    // Most sections wait until they are 10% clear of the bottom edge.
    const io = new IntersectionObserver(onEnter, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    // data-reveal="edge" is for things at the very bottom of the page, which can never clear that margin.
    const edge = new IntersectionObserver(onEnter, { threshold: 0 });

    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
      .forEach((el) => (el.dataset.reveal === "edge" ? edge : io).observe(el));
    return () => {
      io.disconnect();
      edge.disconnect();
    };
  }, [pathname]);

  return null;
}
