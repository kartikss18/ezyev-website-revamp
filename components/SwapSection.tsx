"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";

gsap.registerPlugin(ScrollTrigger);

export function SwapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0.5);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || manualOverride || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const state = { p: 0.08 };
      gsap.to(state, {
        p: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 40%",
          scrub: 0.6,
          onUpdate: () => setProgress(state.p),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [manualOverride]);

  const seconds = (progress * 60).toFixed(1);
  const statusLabel =
    progress < 0.44
      ? "DEPLETED PACK RELEASES"
      : progress < 0.88
      ? "CHARGED PACK SEATS IN BAY"
      : "READY · 98% STATE OF CHARGE";

  return (
    <section ref={sectionRef} id="the-swap" aria-label="The Swap" className="bg-surface py-24 md:py-28">
      <div className="wrap space-y-12">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Signature sequence · The swap</p>
            <h2 className="mt-4 text-3xl leading-[1.06] font-light tracking-[-0.03em] text-fg md:text-5xl">
              Swap a depleted pack and get back on route in under two minutes
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted">
              Scan QR or tap RFID. Depleted pack ejects, validated 100% charged pack slides into bay.
            </p>
          </div>
        </div>

        {/* 3D Swap Stage + Live Seconds Counter */}
        <div className="panel overflow-hidden">
          <div className="grid lg:grid-cols-12">
            <div className="relative h-[380px] bg-[#0b0d0c] sm:h-[460px] lg:col-span-8 lg:h-[520px]">
              <LazyBatteryStage
                posterSrc="/media/product/swap-moment-1x.webp"
                posterSrcSet="/media/product/swap-moment-1x.webp 640w, /media/product/swap-moment-2x.webp 1280w"
                posterSizes="(min-width: 1024px) 780px, 92vw"
                posterWidth={640}
                posterHeight={360}
                posterLoading="lazy"
                posterAlt="EzyEV charged battery pack sliding into an automated graphite swap slot"
                ariaLabel="Interactive 3D battery swap sequence"
                config={{
                  mode: "swap",
                  swapProgress: progress,
                  cameraPos: [4.35, 2.25, 5.75],
                }}
              />
            </div>

            <div className="flex flex-col justify-between border-t border-line bg-surface p-6 md:p-8 lg:col-span-4 lg:border-t-0 lg:border-l">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="font-mono text-xs tracking-wider text-subtle uppercase">Bay telemetry</span>
                  <span className="font-mono text-xs text-accent">{statusLabel}</span>
                </div>

                <div>
                  <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Swap timer</p>
                  <p className="mt-1 font-mono text-5xl font-light tracking-tight text-fg tabular-nums">
                    {seconds}
                    <span className="text-2xl text-subtle">s</span>
                  </p>
                </div>

                {/* Live Kinetic Bay Exchange Motion Schematic — active on both mobile & desktop */}
                <div className="rounded-lg border border-line bg-[#0b0d0c] p-3">
                  <svg
                    viewBox="0 0 280 86"
                    role="img"
                    aria-label="Kinetic motion graphic of depleted amber pack exiting and charged green pack locking into swap bay"
                    className="h-auto w-full"
                  >
                    {/* Bay frame */}
                    <rect x="86" y="10" width="108" height="66" rx="6" fill="#121614" stroke="#2d3632" strokeWidth="1.2" />
                    <line x1="94" y1="70" x2="186" y2="70" stroke="#24c768" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 3" />
                    {/* Depleted pack (amber) ejecting left as progress advances 0->0.48 */}
                    <g
                      style={{
                        transform: `translateX(${Math.round(-Math.min(1, progress * 2.1) * 74)}px)`,
                        opacity: Math.max(0.18, 1 - progress * 1.4),
                        transition: "transform 120ms linear, opacity 120ms linear",
                      }}
                    >
                      <rect x="98" y="20" width="38" height="44" rx="4" fill="#18201c" stroke="#f59e0b" strokeWidth="1.5" />
                      <rect x="98" y="16" width="38" height="7" rx="2" fill="#f8c812" />
                      <circle cx="117" cy="36" r="3.5" fill="#f59e0b" />
                    </g>
                    {/* Charged pack (emerald) gliding from right into locked dock position */}
                    <g
                      style={{
                        transform: `translateX(${Math.round((1 - Math.max(0, Math.min(1, (progress - 0.3) * 1.55))) * 74)}px)`,
                        opacity: Math.min(1, Math.max(0.22, (progress - 0.15) * 1.5)),
                        transition: "transform 120ms linear, opacity 120ms linear",
                      }}
                    >
                      <rect x="144" y="20" width="38" height="44" rx="4" fill="#0f7d3f" stroke="#24c768" strokeWidth="1.5" />
                      <rect x="144" y="16" width="38" height="7" rx="2" fill="#f8c812" />
                      <circle cx="163" cy="36" r="3.5" fill="#24c768" />
                    </g>
                  </svg>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between font-mono text-xs text-muted">
                    <label htmlFor="swap-scrub">SCRUB SEQUENCE</label>
                    <span>{Math.round(progress * 100)}%</span>
                  </div>
                  <input
                    id="swap-scrub"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={progress}
                    onChange={(e) => {
                      setManualOverride(true);
                      setProgress(parseFloat(e.target.value));
                    }}
                    className="w-full accent-[#24c768]"
                  />
                </div>
              </div>

              <ol className="mt-8 space-y-3 border-t border-line pt-6 font-mono text-xs">
                <li className="flex justify-between text-muted">
                  <span>01 · QR / RFID AUTH</span>
                  <span className="text-fg">~8s</span>
                </li>
                <li className="flex justify-between text-muted">
                  <span>02 · DRAINED PACK IN</span>
                  <span className="text-fg">~22s</span>
                </li>
                <li className="flex justify-between text-muted">
                  <span>03 · CHARGED PACK OUT</span>
                  <span className="text-accent">~60s TOTAL</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Conventional Plug-in vs EzyEV Swap Comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-subtle uppercase">Conventional EV</span>
              <span className="font-mono text-xs text-muted">PLUG-IN CHARGING</span>
            </div>
            <h3 className="mt-4 text-2xl font-light tracking-tight text-fg">
              Hours parked at a wall socket
            </h3>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between font-mono text-xs text-muted">
                <span>Typical full charge turnaround</span>
                <span>3–4 HOURS IDLE</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-raised">
                <div className="h-full w-[92%] rounded-full bg-subtle/60" />
              </div>
            </div>
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted">
              <li>• Peak delivery shifts lost charging</li>
              <li>• Upfront pack CapEx baked into vehicle cost</li>
              <li>• Degradation absorbed by fleet owner</li>
            </ul>
          </div>

          <div className="panel border-accent/40 p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-accent uppercase">EzyEV BaaS</span>
              <span className="font-mono text-xs text-accent">AUTOMATED SWAP</span>
            </div>
            <h3 className="mt-4 text-2xl font-light tracking-tight text-fg">
              Continuous shifts with zero queue
            </h3>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between font-mono text-xs text-accent">
                <span>Swap exchange + bay release</span>
                <span>~60 SECONDS</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-raised">
                <div className="h-full w-[6%] min-w-[20px] rounded-full bg-accent animate-pulse" />
              </div>
            </div>
            <ul className="mt-6 space-y-2 font-mono text-xs text-fg/90">
              <li>• 24×7 swaps in under two minutes</li>
              <li>• −40% upfront vehicle purchase cost</li>
              <li>• BMS health &amp; servicing covered by EzyEV</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
