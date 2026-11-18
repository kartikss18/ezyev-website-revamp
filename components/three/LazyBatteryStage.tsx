"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import type { BatterySceneConfig } from "./BatteryCanvas";

const BatteryCanvas = dynamic(
  () => import("./BatteryCanvas").then((m) => m.BatteryCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#0b0d0c]">
        <span className="font-mono text-xs tracking-widest text-subtle uppercase">
          Loading interactive 3D
        </span>
      </div>
    ),
  }
);

const CLAIM_EVENT = "ezyev:claim-3d-stage";

export function LazyBatteryStage({
  config,
  posterSrc,
  posterSrcSet,
  posterMobileSrcSet,
  posterSizes = "(min-width: 1024px) 640px, 92vw",
  posterWidth = 640,
  posterHeight = 360,
  posterLoading = "lazy",
  posterAlt = "EzyEV swappable battery pack studio render",
  className = "h-full w-full",
  ariaLabel = "Interactive 3D EzyEV battery pack",
  forceInteractive = false,
  stageHint = "3D CAD · 1:1.6:2.4 PACK",
}: {
  config: BatterySceneConfig;
  posterSrc?: string;
  posterSrcSet?: string;
  posterMobileSrcSet?: string;
  posterSizes?: string;
  posterWidth?: number;
  posterHeight?: number;
  posterLoading?: "eager" | "lazy";
  posterAlt?: string;
  className?: string;
  ariaLabel?: string;
  forceInteractive?: boolean;
  stageHint?: string;
}) {
  const stageId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [interactive, setInteractive] = useState(forceInteractive);
  const [inView, setInView] = useState(forceInteractive);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReducedMotion(mqMotion.matches);
      setIsMobile(mqMobile.matches);
    };
    update();
    mqMotion.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqMotion.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (forceInteractive) return;
    const onClaim = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail !== stageId) setInteractive(false);
    };
    window.addEventListener(CLAIM_EVENT, onClaim);
    return () => window.removeEventListener(CLAIM_EVENT, onClaim);
  }, [forceInteractive, stageId]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || forceInteractive) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        setInView(visible);
        if (!visible) setInteractive(false);
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [forceInteractive]);

  const activate3D = () => {
    if (reducedMotion || isMobile) return;
    window.dispatchEvent(new CustomEvent<string>(CLAIM_EVENT, { detail: stageId }));
    setInteractive(true);
  };

  const canRun3D =
    forceInteractive || (interactive && inView && !reducedMotion && !isMobile);

  return (
    <div
      ref={rootRef}
      data-product="ezyev-pack"
      onPointerEnter={() => {
        if (!forceInteractive && !isMobile && !reducedMotion) activate3D();
      }}
      className={`flex flex-col overflow-hidden bg-[#0b0d0c] ${className}`}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {canRun3D ? (
          <BatteryCanvas config={config} className="h-full w-full" ariaLabel={ariaLabel} />
        ) : posterSrc ? (
          <picture className="block h-full w-full">
            {posterMobileSrcSet && (
              <source
                media="(max-width: 767px)"
                srcSet={posterMobileSrcSet}
                sizes="92vw"
                type="image/webp"
              />
            )}
            <img
              src={posterSrc}
              srcSet={posterSrcSet}
              sizes={posterSizes}
              width={posterWidth}
              height={posterHeight}
              loading={posterLoading}
              decoding="async"
              alt={posterAlt}
              className="h-full w-full object-contain"
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs tracking-widest text-subtle uppercase">
              EzyEV Pack Stage
            </span>
          </div>
        )}
      </div>

      {!forceInteractive && (
        <div className="flex items-center justify-between border-t border-line bg-surface px-4 py-2 font-mono text-[11px] tracking-wider text-subtle uppercase">
          <span>{stageHint}</span>
          {!isMobile && !reducedMotion && !canRun3D && (
            <button
              type="button"
              onClick={activate3D}
              className="inline-flex min-h-[44px] items-center gap-2 text-fg transition-colors hover:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Inspect interactive 3D
            </button>
          )}
          {canRun3D && (
            <span className="inline-flex min-h-[44px] items-center gap-2 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden />
              Drag to orbit
            </span>
          )}
        </div>
      )}
    </div>
  );
}
