"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insidePackLayers } from "@/content/site";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";
import { BatteryLineArt } from "@/components/BatteryLineArt";
import { RollText } from "@/components/RollText";

gsap.registerPlugin(ScrollTrigger);

export function InsidePackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [explode, setExplode] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 45%",
          scrub: 0.7,
          onUpdate: (self) => {
            const p = self.progress;
            // Sequence: 0->0.18 intro hero -> 0.18->0.75 explode -> 0.75->1.0 reassemble
            let exp = 0;
            if (p < 0.15) exp = 0;
            else if (p < 0.72) exp = (p - 0.15) / 0.57;
            else if (p < 0.85) exp = 1;
            else exp = 1 - (p - 0.85) / 0.15;
            setExplode(Math.max(0, Math.min(1, exp)));
            setActiveLayer(Math.min(3, Math.floor(p * 4)));
          },
        },
      });
      tl.to({}, { duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inside-pack"
      aria-label="Inside the pack"
      className="bg-ground py-24 md:py-28"
    >
      <div className="wrap space-y-12">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Hardware architecture · Inside the pack</p>
            <h2 className="mt-4 text-3xl leading-[1.06] font-light tracking-[-0.03em] text-fg md:text-5xl">
              Built to take fleet punishment and report every cell live.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <button
              type="button"
              onClick={() => setExplode(0)}
              className={explode < 0.4 ? "btn-primary" : "btn-secondary"}
            >
              <RollText text="Assembled" />
            </button>
            <button
              type="button"
              onClick={() => setExplode(1)}
              className={explode >= 0.4 ? "btn-primary" : "btn-secondary"}
            >
              <RollText text="Exploded view" />
            </button>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Left: Interactive / Scroll-Driven Exploded 3D Stage + Non-Overlapping Legend */}
          <div className="panel overflow-hidden lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line bg-surface px-5 py-3 font-mono text-[11px]">
              <span className="inline-flex items-center gap-2 text-fg">
                <span className="h-2 w-2 rounded-full bg-yellow" aria-hidden />
                SAFETY-YELLOW CAP · ANDERSON PLUG
              </span>
              <span className="inline-flex items-center gap-2 text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                CARBON BMS · WHITE SENSE HARNESS
              </span>
              <span className="inline-flex items-center gap-2 text-muted">
                <span className="h-2 w-2 rounded-full bg-line-strong" aria-hidden />
                EXTRUDED RIBBED AL-6063 CHASSIS
              </span>
            </div>

            <div className="h-[400px] w-full bg-[#0b0d0c] sm:h-[480px] lg:h-[540px]">
              <LazyBatteryStage
                posterSrc={explode > 0.35 ? "/media/product/exploded-pack-1x.webp" : "/media/product/front-elevation-1x.webp"}
                posterSrcSet={
                  explode > 0.35
                    ? "/media/product/exploded-pack-1x.webp 720w, /media/product/exploded-pack-2x.webp 1440w"
                    : "/media/product/front-elevation-1x.webp 500w, /media/product/front-elevation-2x.webp 1000w"
                }
                posterSizes="(min-width: 1024px) 680px, 92vw"
                posterWidth={explode > 0.35 ? 720 : 500}
                posterHeight={explode > 0.35 ? 405 : 500}
                posterLoading="lazy"
                posterAlt="Exploded view of the EzyEV battery pack showing safety-yellow cap, carbon BMS, sense-wire harness, cell stack, and ribbed green aluminium enclosure"
                ariaLabel="Interactive exploded 3D diagram of EzyEV battery pack"
                stageHint={`EXPLODE DEPTH: ${Math.round(explode * 100)}%`}
                config={{
                  mode: "pack",
                  explode,
                  ledState: "charged",
                  orbit: true,
                  cameraPos: [3.85, 2.5, 5.25],
                }}
              />
            </div>
          </div>

          {/* Right: 4 Tech-Stack Panels + 2D Line-Art Blueprint */}
          <div className="space-y-4 lg:col-span-5">
            {insidePackLayers.map((layer, idx) => {
              const active = activeLayer === idx;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setActiveLayer(idx);
                    setExplode(idx === 0 ? 0.15 : idx === 1 ? 0.85 : idx === 2 ? 1 : 0.45);
                  }}
                  className={`panel w-full p-5 text-left transition-colors duration-300 ease-brand ${
                    active ? "border-accent/60 bg-raised" : "hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-accent uppercase">
                      {layer.tag}
                    </span>
                    <span className="font-mono text-[11px] text-subtle">{layer.highlight}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-medium tracking-tight text-fg">{layer.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{layer.body}</p>
                </button>
              );
            })}

            <div className="panel flex items-center justify-between gap-6 p-5">
              <div>
                <p className="font-mono text-[11px] tracking-widest text-subtle uppercase">
                  2D Envelope Blueprint
                </p>
                <p className="mt-1 text-sm text-muted">
                  1 : 1.6 : 2.4 housing geometry with 6 vertical ribs per long face and chamfered vertical corners.
                </p>
              </div>
              <div className="w-24 shrink-0 text-fg">
                <BatteryLineArt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
