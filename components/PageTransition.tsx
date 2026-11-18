"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { BrandMark } from "./Logo";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const COVER_MS = 520;
const REVEAL_MS = 650;
const CAP = "10vh";

type Phase = "idle" | "covering" | "covered" | "revealing";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const phase = useRef<Phase>("idle");
  const fallback = useRef<number | undefined>(undefined);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function cover(href: string) {
    const curtain = curtainRef.current;
    const brand = brandRef.current;
    const bar = barRef.current;
    if (!curtain || !brand || !bar || phase.current !== "idle") return router.push(href);

    phase.current = "covering";
    router.prefetch(href);
    curtain.style.visibility = "visible";

    const still = reduced();
    const enter = curtain.animate(
      still
        ? [{ opacity: 0, transform: "none" }, { opacity: 1, transform: "none" }]
        : [{ transform: `translateY(calc(100% + ${CAP}))` }, { transform: "translateY(0)" }],
      { duration: still ? 220 : COVER_MS, easing: EASE, fill: "forwards" }
    );
    brand.animate(
      [
        { opacity: 0, transform: still ? "none" : "translateY(1.25rem) scale(0.92)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 380, delay: still ? 0 : Math.max(0, COVER_MS - 260), easing: EASE, fill: "both" }
    );
    bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(0.75)" }], {
      duration: COVER_MS + 200,
      easing: EASE,
      fill: "forwards",
    });

    enter.onfinish = () => {
      phase.current = "covered";
      router.push(href);
      fallback.current = window.setTimeout(reveal, 4500);
    };
  }

  function reveal() {
    const curtain = curtainRef.current;
    const brand = brandRef.current;
    const bar = barRef.current;
    if (!curtain || !brand || !bar || phase.current !== "covered") return;
    window.clearTimeout(fallback.current);
    phase.current = "revealing";

    const still = reduced();
    bar.animate([{ transform: "scaleX(0.75)" }, { transform: "scaleX(1)" }], {
      duration: 240,
      easing: EASE,
      fill: "forwards",
    });
    brand.animate(
      [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: still ? "none" : "translateY(-1.25rem)" },
      ],
      { duration: 320, delay: 180, easing: EASE, fill: "forwards" }
    );
    const leave = curtain.animate(
      still
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ transform: "translateY(0)" }, { transform: `translateY(calc(-100% - ${CAP}))` }],
      { duration: still ? 240 : REVEAL_MS, delay: still ? 180 : 320, easing: EASE, fill: "forwards" }
    );
    leave.onfinish = () => {
      curtain.style.visibility = "hidden";
      for (const el of [curtain, brand, bar]) el.getAnimations().forEach((a) => a.cancel());
      phase.current = "idle";
    };
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || "noTransition" in a.dataset) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (url.pathname.startsWith("/api") || /\.[a-z0-9]+$/i.test(url.pathname)) return;

      e.preventDefault();
      cover(url.pathname + url.search + url.hash);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase.current === "covered") requestAnimationFrame(reveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      aria-hidden
      style={{ visibility: "hidden" }}
      className="curtain pointer-events-none fixed inset-x-0 top-0 z-[70] h-dvh"
    >
      <svg
        className="absolute inset-x-0 bottom-full h-[10vh] w-full text-[#0f1512]"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <path d="M0 10 Q50 0 100 10 Z" fill="currentColor" />
      </svg>

      <div className="flex h-full w-full items-center justify-center bg-[#0f1512]">
        <div ref={brandRef} className="curtain-brand flex flex-col items-center">
          <BrandMark tone="color" className="size-20" />
          <span className="mt-5 text-4xl font-semibold tracking-tight text-fg">EzyEV</span>
          <span className="mt-1.5 font-mono text-xs tracking-widest text-accent uppercase">
            Clean · Connected · Charged
          </span>
          <span className="mt-7 block h-1 w-44 overflow-hidden rounded-full bg-fg/15">
            <span ref={barRef} className="curtain-bar block h-full w-full origin-left rounded-full bg-accent" />
          </span>
        </div>
      </div>

      <svg
        className="absolute inset-x-0 top-full h-[10vh] w-full text-[#0f1512]"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <path d="M0 0 Q50 10 100 0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
