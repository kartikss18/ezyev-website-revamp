"use client";

import { useEffect, useState } from "react";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";

export default function SwapLabPage() {
  const [progress, setProgress] = useState(0.5);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      const p = ((now - t0) * 0.00022) % 1;
      setProgress(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoPlay]);

  const seconds = (progress * 60).toFixed(1);
  const phase =
    progress < 0.44
      ? "01 · DEPLETED PACK EJECTS (AMBER)"
      : progress < 0.9
      ? "02 · CHARGED PACK LOCKS IN (EMERALD)"
      : "03 · VALIDATED & READY TO RIDE";

  return (
    <div className="min-h-screen bg-ground pt-28 pb-24 text-fg">
      <div className="wrap space-y-10">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="eyebrow">Milestone 4 · Swap Sequence Prototype</p>
            <h1 className="mt-4 text-3xl font-light tracking-[-0.03em] md:text-5xl">
              60-Second Automated Swap Bay
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Depleted pack (amber indicator) releases from the unbranded dock slot while a validated charged pack
              (emerald glow) locks into place.
            </p>
          </div>
          <div className="panel px-5 py-3 text-right">
            <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Elapsed Swap Time</p>
            <p className="mt-1 font-mono text-3xl font-medium text-accent tabular-nums">{seconds}s</p>
          </div>
        </header>

        <div className="panel overflow-hidden">
          <div className="h-[560px] w-full bg-[#0b0d0c]">
            <LazyBatteryStage
              forceInteractive
              ariaLabel="Interactive 3D battery swap sequence prototype"
              config={{
                mode: "swap",
                swapProgress: progress,
                swapAutoPlay: false,
                orbit: true,
                cameraPos: [3.8, 1.9, 4.9],
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line bg-surface p-6">
            <div className="min-w-[240px] flex-1 space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-accent">{phase}</span>
                <span className="text-muted tabular-nums">{Math.round(progress * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.005}
                value={progress}
                onChange={(e) => {
                  setAutoPlay(false);
                  setProgress(parseFloat(e.target.value));
                }}
                aria-label="Scrub swap sequence"
                className="w-full accent-[#24c768]"
              />
            </div>
            <button
              type="button"
              onClick={() => setAutoPlay((v) => !v)}
              className={autoPlay ? "btn-secondary" : "btn-primary"}
            >
              {autoPlay ? "Pause loop" : "Play loop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
