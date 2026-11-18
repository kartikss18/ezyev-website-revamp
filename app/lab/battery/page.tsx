"use client";

import { useState } from "react";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";
import type { BatteryPartsMask } from "@/components/three/BatteryPackMesh";

export default function BatteryLabPage() {
  const [explode, setExplode] = useState(0);
  const [ledState, setLedState] = useState<"charged" | "depleted">("charged");
  const [autoRotate, setAutoRotate] = useState(false);
  const [parts, setParts] = useState<BatteryPartsMask>({
    enclosure: true,
    cap: true,
    handle: true,
    bms: true,
    cells: true,
  });

  const togglePart = (key: keyof BatteryPartsMask) => {
    setParts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-ground pt-28 pb-24 text-fg">
      <div className="wrap space-y-12">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="eyebrow">Milestone 3 · 3D Pack Isolation Lab</p>
            <h1 className="mt-4 text-3xl font-light tracking-[-0.03em] md:text-5xl">
              EzyEV Pack Geometry &amp; Proportion Check
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              1 : 1.6 : 2.4 (D:W:H) extruded ribbed aluminium body, beveled safety-yellow cap, arched rubber-grip
              handle, top-deck hardware, carbon BMS, white sense harness, and cell stack. Zero third-party logos or serials.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setExplode(0)}
              className={explode < 0.5 ? "btn-primary" : "btn-secondary"}
            >
              Assembled
            </button>
            <button
              type="button"
              onClick={() => setExplode(1)}
              className={explode >= 0.5 ? "btn-primary" : "btn-secondary"}
            >
              Exploded
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Interactive 3D Stage */}
          <div className="panel overflow-hidden lg:col-span-8">
            <div className="h-[560px] w-full bg-[#0b0d0c]">
              <LazyBatteryStage
                forceInteractive
                ariaLabel="Interactive 3D EzyEV battery pack lab model"
                config={{
                  mode: "pack",
                  explode,
                  parts,
                  ledState,
                  autoRotate,
                  orbit: true,
                  cameraPos: [2.9, 1.85, 3.85],
                }}
              />
            </div>

            {/* Controls bar */}
            <div className="grid gap-6 border-t border-line bg-surface p-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-muted">
                  <label htmlFor="explode-range">EXPLODE SEQUENCE</label>
                  <span className="text-accent tabular-nums">{Math.round(explode * 100)}%</span>
                </div>
                <input
                  id="explode-range"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={explode}
                  onChange={(e) => setExplode(parseFloat(e.target.value))}
                  className="w-full accent-[#24c768]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLedState((s) => (s === "charged" ? "depleted" : "charged"))}
                  className="rounded-md border border-line bg-raised px-3 py-2 font-mono text-xs text-fg hover:border-line-strong"
                >
                  LED: {ledState.toUpperCase()}
                </button>
                <button
                  type="button"
                  onClick={() => setAutoRotate((v) => !v)}
                  className="rounded-md border border-line bg-raised px-3 py-2 font-mono text-xs text-fg hover:border-line-strong"
                >
                  SPIN: {autoRotate ? "ON" : "OFF"}
                </button>
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-2 border-t border-line pt-4">
                <span className="mr-2 self-center font-mono text-[11px] tracking-wider text-subtle uppercase">
                  Layers:
                </span>
                {(
                  [
                    ["enclosure", "Aluminium Enclosure"],
                    ["cap", "Yellow Top Cap + Hardware"],
                    ["handle", "Arched Rubber Handle"],
                    ["bms", "Carbon BMS + Harness"],
                    ["cells", "Cell Stack"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePart(key)}
                    className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                      parts[key]
                        ? "border-accent/60 bg-accent/15 text-accent"
                        : "border-line bg-raised text-subtle"
                    }`}
                  >
                    {parts[key] ? "● " : "○ "}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reference Photos for Proportion Check (Lab Only) */}
          <aside className="space-y-4 lg:col-span-4">
            <div className="panel p-4">
              <p className="font-mono text-xs tracking-wider text-subtle uppercase">
                Reference comparison (Lab only)
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 lg:grid-cols-1">
                <figure className="overflow-hidden rounded-md border border-line bg-raised">
                  <img
                    src="/reference/battery/ref-2-front.jpg"
                    alt="Reference front elevation"
                    className="h-44 w-full object-cover"
                  />
                  <figcaption className="px-2 py-1.5 font-mono text-[11px] text-muted">
                    ref-2-front · Ribs, logo &amp; top hardware
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-md border border-line bg-raised">
                  <img
                    src="/reference/battery/ref-3-iso.jpg"
                    alt="Reference isometric top deck"
                    className="h-44 w-full object-cover"
                  />
                  <figcaption className="px-2 py-1.5 font-mono text-[11px] text-muted">
                    ref-3-iso · Handle, key switch &amp; connector
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-md border border-line bg-raised">
                  <img
                    src="/reference/battery/ref-1-internals.jpg"
                    alt="Reference BMS and harness internals"
                    className="h-44 w-full object-cover"
                  />
                  <figcaption className="px-2 py-1.5 font-mono text-[11px] text-muted">
                    ref-1-internals · Carbon BMS, harness &amp; cells
                  </figcaption>
                </figure>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
