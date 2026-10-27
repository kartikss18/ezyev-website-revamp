"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/*
  Branded page transition, inspired by kartikss.space.
  A curtain in the theme's brand surface (lime tint in light, near black in dark)
  with a curved leading edge rises over the page, the EzyEV mark
  appears while a "charge" bar fills, the route changes underneath, then the
  curtain carries on upward and off screen.

  Only transform and opacity are animated. Reduced motion swaps the movement for a fade.
  The first visit of a session plays the reveal half as an intro (pure CSS, see globals.css).
*/

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const COVER_MS = 700;
const REVEAL_MS = 800;
const CAP = "12vh"; // height of the curved edges above and below the panel

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
    document.documentElement.classList.remove("intro");
    router.prefetch(href);
    curtain.style.visibility = "visible";

    const still = reduced();
    const enter = curtain.animate(
      still
        ? [{ opacity: 0, transform: "none" }, { opacity: 1, transform: "none" }]
        : [{ transform: `translateY(calc(100% + ${CAP}))` }, { transform: "translateY(0)" }],
      { duration: still ? 300 : COVER_MS, easing: EASE, fill: "forwards" },
    );
    brand.animate(
      [
        { opacity: 0, transform: still ? "none" : "translateY(1.5rem) scale(0.9)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 500, delay: still ? 0 : COVER_MS - 300, easing: EASE, fill: "both" },
    );
    bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(0.7)" }], {
      duration: COVER_MS + 300,
      easing: EASE,
      fill: "forwards",
    });

    enter.onfinish = () => {
      phase.current = "covered";
      router.push(href);
      // Never leave a visitor stuck behind the curtain if the route takes too long
      fallback.current = window.setTimeout(reveal, 5000);
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
    bar.animate([{ transform: "scaleX(0.7)" }, { transform: "scaleX(1)" }], {
      duration: 300,
      easing: EASE,
      fill: "forwards",
    });
    brand.animate(
      [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: still ? "none" : "translateY(-1.5rem)" },
      ],
      { duration: 400, delay: 250, easing: EASE, fill: "forwards" },
    );
    const leave = curtain.animate(
      still
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ transform: "translateY(0)" }, { transform: `translateY(calc(-100% - ${CAP}))` }],
      { duration: still ? 300 : REVEAL_MS, delay: still ? 250 : 450, easing: EASE, fill: "forwards" },
    );
    leave.onfinish = () => {
      curtain.style.visibility = "hidden";
      for (const el of [curtain, brand, bar]) el.getAnimations().forEach((a) => a.cancel());
      phase.current = "idle";
    };
  }

  // Intercept internal link clicks (works for next/link and plain anchors alike)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || "noTransition" in a.dataset) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page: hash links and scroll stay native
      if (url.pathname.startsWith("/api") || /\.[a-z0-9]+$/i.test(url.pathname)) return;

      e.preventDefault();
      cover(url.pathname + url.search + url.hash);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New route has rendered underneath: lift the curtain
  useEffect(() => {
    if (phase.current === "covered") requestAnimationFrame(reveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div ref={curtainRef} aria-hidden className="curtain pointer-events-none fixed inset-x-0 top-0 z-[70] h-dvh">
      {/* Curved leading edge (visible while rising in) */}
      <svg className="absolute inset-x-0 bottom-full h-[12vh] w-full text-olive" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 10 Q50 0 100 10 Z" fill="currentColor" />
      </svg>

      <div className="flex h-full w-full items-center justify-center bg-olive">
        <div ref={brandRef} className="curtain-brand flex flex-col items-center">
          <Image src="/images/ezyev-mark.png" alt="" width={96} height={96} priority className="size-24" />
          <span className="mt-6 text-5xl font-semibold tracking-tight text-fg">EzyEV</span>
          <span className="mt-2 text-sm font-semibold text-accent">Clean. Connected. Charged.</span>
          <span className="mt-8 block h-1 w-48 overflow-hidden rounded-full bg-fg/10">
            <span ref={barRef} className="curtain-bar block h-full w-full origin-left rounded-full bg-accent" />
          </span>
        </div>
      </div>

      {/* Curved trailing edge (visible while lifting away) */}
      <svg className="absolute inset-x-0 top-full h-[12vh] w-full text-olive" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 0 Q50 10 100 0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
