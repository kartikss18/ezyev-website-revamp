"use client";

import { useState } from "react";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";
import { RollText } from "@/components/RollText";

type Subsystem = {
  num: string;
  id: string;
  title: string;
  spec: string;
  detail: string;
  pin: { x: number; y: number; lx: number; ly: number; label: string };
};

const SUBSYSTEMS: readonly Subsystem[] = [
  {
    num: "01",
    id: "cap",
    title: "Safety-Yellow Cap & Handle",
    spec: "ABS top cover · Ribbed grip · Perimeter gasket",
    detail: "Molded yellow shell with stainless fasteners and rainproof perimeter seal.",
    pin: { x: 430, y: 122, lx: 635, ly: 92, label: "01 HANDLE & CAP" },
  },
  {
    num: "02",
    id: "connector",
    title: "High-Current Anderson Plug",
    spec: "Dual glands · Polarized power + CAN",
    detail: "Self-aligning dock plug built for high-cycle automated bay mating.",
    pin: { x: 505, y: 162, lx: 645, ly: 158, label: "02 ANDERSON BUS" },
  },
  {
    num: "03",
    id: "keylock",
    title: "Key Lock & Readout Window",
    spec: "Sealed cylinder · Optical state window",
    detail: "Hardware isolation lock paired with direct voltage status readout.",
    pin: { x: 372, y: 168, lx: 185, ly: 130, label: "03 KEY & READOUT" },
  },
  {
    num: "04",
    id: "bms",
    title: "Carbon BMS & Sense Harness",
    spec: "MQTT / Kafka sync · White harness",
    detail: "Multi-channel cell balancing and cloud telemetry on every swap.",
    pin: { x: 435, y: 245, lx: 645, ly: 238, label: "04 CARBON BMS" },
  },
  {
    num: "05",
    id: "cells",
    title: "Modular Cell Core",
    spec: "[CHEMISTRY] · Copper busbars · Terminal boot",
    detail: "Compressed modular stack for 2W scooters and L5 cargo fleets.",
    pin: { x: 432, y: 345, lx: 185, ly: 315, label: "05 CELL CORE" },
  },
  {
    num: "06",
    id: "enclosure",
    title: "Ribbed AL-6063 Chassis",
    spec: "1 : 1.6 : 2.4 ratio · 6 ribs/face",
    detail: "Anodized green extruded aluminium housing for passive thermal cooling.",
    pin: { x: 515, y: 392, lx: 645, ly: 392, label: "06 AL-6063 BODY" },
  },
];

export function BatteryAnatomySection() {
  const [selected, setSelected] = useState<string>("bms");
  const [viewMode, setViewMode] = useState<"cutaway" | "3d">("cutaway");

  const activeItem = SUBSYSTEMS.find((s) => s.id === selected) ?? SUBSYSTEMS[3];

  return (
    <section
      id="anatomy"
      aria-label="Anatomy of the EzyEV battery pack"
      className="bg-[#eef0ee] py-24 text-[#0b0d0c] md:py-28"
    >
      <div className="wrap space-y-12">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left Column: Architectural intro + subsystem selector */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2.5 font-mono text-xs font-medium tracking-widest text-[#0a6331] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0a6331]" aria-hidden />
                Hardware anatomy · X-ray stack
              </p>
              <h2 className="text-3xl leading-[1.06] font-light tracking-[-0.03em] text-[#0b0d0c] md:text-5xl">
                Anatomy of a fleet-grade swappable pack
              </h2>
              <p className="text-base leading-relaxed text-[#3d4540]">
                One standardized 1 : 1.6 : 2.4 energy stack from 2W scooters to L5 cargo 3-wheelers.
              </p>
            </div>

            {/* View mode toggle: Isometric Cutaway vs Live 3D Exploded */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setViewMode("cutaway")}
                className={`roll-trigger inline-flex min-h-[44px] items-center rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  viewMode === "cutaway"
                    ? "bg-[#0b0d0c] text-[#f4f5f3]"
                    : "border border-[#0b0d0c]/20 bg-white/70 text-[#0b0d0c] hover:bg-white"
                }`}
              >
                <RollText text="Isometric cutaway" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                className={`roll-trigger inline-flex min-h-[44px] items-center rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  viewMode === "3d"
                    ? "bg-[#0f7d3f] text-white"
                    : "border border-[#0b0d0c]/20 bg-white/70 text-[#0b0d0c] hover:bg-white"
                }`}
              >
                <RollText text="Live 3D exploded" />
              </button>
            </div>

            {/* Subsystem interactive list */}
            <div className="divide-y divide-[#0b0d0c]/12 border-y border-[#0b0d0c]/12">
              {SUBSYSTEMS.map((item) => {
                const isActive = item.id === selected;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(item.id)}
                    className={`flex min-h-[44px] w-full items-start justify-between gap-4 py-3.5 text-left transition-colors ${
                      isActive ? "bg-[#0f7d3f]/[0.07] px-3" : "px-1 hover:bg-[#0b0d0c]/[0.03]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono text-xs font-medium ${
                          isActive ? "text-[#0a6331]" : "text-[#404743]"
                        }`}
                      >
                        {item.num}
                      </span>
                      <div>
                        <span className="block text-base font-medium text-[#0b0d0c]">{item.title}</span>
                        {isActive && (
                          <span className="mt-1 block text-sm leading-relaxed text-[#3d4540]">
                            {item.detail}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-[#404743]">
                      {isActive ? "ACTIVE" : "VIEW"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Translucent Isometric Cutaway Schematic OR Interactive 3D */}
          <div className="lg:col-span-7">
            {viewMode === "3d" ? (
              <div className="overflow-hidden rounded-2xl border border-[#0b0d0c]/15 bg-[#0b0d0c]">
                <div className="h-[460px] w-full sm:h-[540px] lg:h-[600px]">
                  <LazyBatteryStage
                    forceInteractive
                    posterSrc="/media/product/exploded-pack-1x.webp"
                    posterAlt="Live 3D exploded EzyEV swappable battery pack"
                    ariaLabel="Interactive 3D exploded EzyEV battery pack"
                    config={{
                      mode: "pack",
                      explode: 0.78,
                      ledState: "charged",
                      autoRotate: false,
                      orbit: true,
                      cameraPos: [3.8, 2.35, 5.1],
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#0b0d0c]/12 bg-[#f7f8f7] p-4 md:p-6">
                <svg
                  viewBox="0 0 820 580"
                  role="img"
                  aria-label="Isometric cutaway diagram showing the EzyEV battery pack layers: safety-yellow cap and handle, Anderson bus connector, key switch, carbon BMS board, cell stack, and ribbed green aluminium enclosure connected to fleet swap rails"
                  className="h-auto w-full select-none"
                >
                  <defs>
                    <linearGradient id="cutawayGreenGlass" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0f7d3f" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#0a4f28" stopOpacity="0.34" />
                    </linearGradient>
                    <linearGradient id="cellGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#27322d" />
                      <stop offset="100%" stopColor="#141a17" />
                    </linearGradient>
                  </defs>

                  {/* Ghosted isometric floor + EzyEV Swap Dock & 3W bay footprint silhouette */}
                  <g opacity="0.24" stroke="#2c332f" strokeWidth="1.2" fill="none">
                    {/* Dock cabinet ghost behind pack */}
                    <polygon points="240,80 355,25 460,80 345,135" fill="#d9deda" />
                    <polygon points="240,80 345,135 345,355 240,300" fill="#e2e6e3" />
                    <polygon points="345,135 460,80 460,300 345,355" fill="#cfd5d1" />
                    {/* Ghost 3-wheeler / chassis tray lower right */}
                    <polygon points="295,430 510,335 660,415 445,515" fill="#dce0dd" />
                    <polygon points="445,515 660,415 660,455 445,555" fill="#c7ceca" />
                    <ellipse cx="485" cy="525" rx="22" ry="12" fill="#8b948f" />
                    <ellipse cx="620" cy="462" rx="22" ry="12" fill="#8b948f" />
                  </g>

                  {/* Twin vehicle dock mini yellow packs in ghosted chassis tray */}
                  <g opacity="0.88">
                    <polygon points="480,455 520,436 555,454 515,473" fill="#f8c812" stroke="#9e7f07" strokeWidth="1" />
                    <polygon points="480,455 515,473 515,495 480,477" fill="#0f7d3f" />
                    <polygon points="515,473 555,454 555,476 515,495" fill="#0a5a2c" />
                  </g>

                  {/* Animated Isometric Red (+HV Power) & Blue (CAN Telemetry) Flow Conduits */}
                  <g fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline
                      points="458,255 508,282 508,395 495,455"
                      stroke="#dc2626"
                      className="animate-flow-bus"
                    />
                    <polyline
                      points="410,332 290,388 290,445 480,472"
                      stroke="#dc2626"
                      className="animate-flow-bus"
                    />
                    <polyline
                      points="448,236 530,275 530,378 518,442"
                      stroke="#0284c7"
                      className="animate-flow-bus"
                    />
                  </g>

                  {/* 06. EXTRUDED AL-6063 RIBBED CHASSIS (Translucent X-ray back wall first) */}
                  <g opacity={selected === "enclosure" ? 1 : 0.92}>
                    {/* Back outer shell faces */}
                    <polygon
                      points="318,215 432,160 546,215 432,270"
                      fill="none"
                      stroke="#0f7d3f"
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="432,160 546,215 546,435 432,380"
                      fill="url(#cutawayGreenGlass)"
                      stroke="#0f7d3f"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* 05. COMPRESSED MODULAR CELL CORE (Inside Cavity) */}
                  <g opacity={selected === "cells" ? 1 : 0.9}>
                    {/* Main cell block isometric prism */}
                    <polygon
                      points="350,305 432,265 512,305 432,345"
                      fill="#232a27"
                      stroke={selected === "cells" ? "#0f7d3f" : "#444d48"}
                      strokeWidth={selected === "cells" ? 2.2 : 1.2}
                    />
                    <polygon
                      points="350,305 432,345 432,455 350,415"
                      fill="url(#cellGlow)"
                      stroke={selected === "cells" ? "#0f7d3f" : "#3a423e"}
                      strokeWidth="1.2"
                    />
                    <polygon
                      points="432,345 512,305 512,415 432,455"
                      fill="#121714"
                      stroke={selected === "cells" ? "#0f7d3f" : "#3a423e"}
                      strokeWidth="1.2"
                    />
                    {/* Copper busbar strips across top of cell stack */}
                    <polygon points="370,302 426,274 440,281 384,309" fill="#d97706" />
                    <polygon points="400,316 456,288 470,295 414,323" fill="#d97706" />
                    <polygon points="430,330 486,302 500,309 444,337" fill="#d97706" />
                    {/* Cell compression straps */}
                    <line x1="350" y1="360" x2="432" y2="400" stroke="#7f8c85" strokeWidth="1.8" />
                    <line x1="432" y1="400" x2="512" y2="360" stroke="#5d6862" strokeWidth="1.8" />
                    {/* Red positive terminal boot */}
                    <rect x="448" y="294" width="18" height="10" rx="2" fill="#dc2626" />
                  </g>

                  {/* 04. CARBON BMS BOARD + WHITE SENSE HARNESS */}
                  <g>
                    {/* Floating PCB carrier above cells */}
                    <polygon
                      points="352,248 432,208 512,248 432,288"
                      fill="#141816"
                      stroke={selected === "bms" ? "#24c768" : "#2e3632"}
                      strokeWidth={selected === "bms" ? 2.5 : 1.4}
                    />
                    <polygon points="352,248 432,288 432,298 352,258" fill="#0d100f" />
                    <polygon points="432,288 512,248 512,258 432,298" fill="#090b0a" />
                    {/* Glowing emerald PCB telemetry traces */}
                    <polyline
                      points="378,248 424,225 466,246 430,264"
                      fill="none"
                      stroke="#24c768"
                      strokeWidth="2.2"
                    />
                    {/* MCU chip */}
                    <polygon points="416,245 434,236 452,245 434,254" fill="#262d2a" stroke="#505b55" />
                    {/* White sense-wire bundle curving from BMS down to cells */}
                    <path
                      d="M 465 256 C 495 268, 495 296, 476 310"
                      fill="none"
                      stroke="#f4f5f3"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 455 262 C 482 274, 484 300, 464 316"
                      fill="none"
                      stroke="#e2e6e3"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* 06b. TRANSLUCENT FRONT GREEN SHELL OVERLAY WITH 6 VERTICAL COOLING RIBS */}
                  <g>
                    <polygon
                      points="318,215 432,270 432,485 318,430"
                      fill="url(#cutawayGreenGlass)"
                      stroke={selected === "enclosure" ? "#0f7d3f" : "#0f7d3f"}
                      strokeWidth={selected === "enclosure" ? 2.4 : 1.4}
                    />
                    <polygon
                      points="432,270 546,215 546,430 432,485"
                      fill="url(#cutawayGreenGlass)"
                      stroke="#0f7d3f"
                      strokeWidth={selected === "enclosure" ? 2.4 : 1.4}
                    />
                    {/* Vertical cooling ribs on front-left & front-right */}
                    {[0.18, 0.34, 0.72, 0.86].map((t) => {
                      const x = 318 + (432 - 318) * t;
                      const y = 215 + (270 - 215) * t;
                      return (
                        <line
                          key={`rib-l-${t}`}
                          x1={x}
                          y1={y}
                          x2={x}
                          y2={y + 215}
                          stroke="#0f7d3f"
                          strokeOpacity="0.65"
                          strokeWidth="2.4"
                        />
                      );
                    })}
                    {[0.16, 0.32, 0.68, 0.84].map((t) => {
                      const x = 432 + (546 - 432) * t;
                      const y = 270 - (270 - 215) * t;
                      return (
                        <line
                          key={`rib-r-${t}`}
                          x1={x}
                          y1={y}
                          x2={x}
                          y2={y + 215}
                          stroke="#0a5a2c"
                          strokeOpacity="0.55"
                          strokeWidth="2.4"
                        />
                      );
                    })}
                    {/* Subtle EzyEV circular mark badge on translucent center face */}
                    <circle cx="375" cy="350" r="14" fill="none" stroke="#f4f5f3" strokeOpacity="0.7" strokeWidth="1.6" />
                    <path d="M 366 350 L 384 350 M 373 342 L 377 358" stroke="#f4f5f3" strokeOpacity="0.7" strokeWidth="1.5" />
                  </g>

                  {/* 01 / 02 / 03. ELEVATED SAFETY-YELLOW TOP CAP + HARDWARE */}
                  <g>
                    {/* Perimeter silver silicone gasket line */}
                    <polygon
                      points="318,186 432,131 546,186 432,241"
                      fill="none"
                      stroke="#d0d6d2"
                      strokeWidth="2.2"
                    />
                    {/* Safety-yellow ABS molded cap */}
                    <polygon
                      points="318,162 432,107 546,162 432,217"
                      fill="#f8c812"
                      stroke={selected === "cap" ? "#0b0d0c" : "#b38d06"}
                      strokeWidth={selected === "cap" ? 2.2 : 1.2}
                    />
                    <polygon
                      points="318,162 432,217 432,238 318,183"
                      fill="#e3b40a"
                      stroke="#a68306"
                      strokeWidth="1"
                    />
                    <polygon
                      points="432,217 546,162 546,183 432,238"
                      fill="#c99f08"
                      stroke="#8f6e05"
                      strokeWidth="1"
                    />

                    {/* Arched yellow handle + dark ribbed rubber grip */}
                    <path
                      d="M 378 148 L 378 96 Q 378 82 396 74 L 466 108 Q 484 116 484 130 L 484 182"
                      fill="none"
                      stroke="#f8c812"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 402 82 L 464 112"
                      fill="none"
                      stroke="#181c1a"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />

                    {/* 03. Key switch cylinder + digital readout window */}
                    <ellipse
                      cx="372"
                      cy="168"
                      rx="10"
                      ry="6"
                      fill="#d1d7d3"
                      stroke={selected === "keylock" ? "#0f7d3f" : "#555e59"}
                      strokeWidth="1.8"
                    />
                    <polygon
                      points="396,158 430,141 446,149 412,166"
                      fill="#141816"
                      stroke="#24c768"
                      strokeWidth="1.2"
                    />

                    {/* 02. Anderson black high-current connector + dual metallic glands */}
                    <polygon
                      points="476,164 514,145 536,156 498,175"
                      fill="#161918"
                      stroke={selected === "connector" ? "#24c768" : "#0b0d0c"}
                      strokeWidth={selected === "connector" ? 2.2 : 1.2}
                    />
                    <circle cx="468" cy="174" r="4.5" fill="#b4bdb8" stroke="#5b645f" strokeWidth="1" />
                    <circle cx="478" cy="179" r="4.5" fill="#b4bdb8" stroke="#5b645f" strokeWidth="1" />
                  </g>

                  {/* Clean non-overlapping orthogonal leader lines + clickable callout labels */}
                  {SUBSYSTEMS.map((sub) => {
                    const isActive = sub.id === selected;
                    const alignRight = sub.pin.lx > 420;
                    const midX = alignRight ? sub.pin.lx - 18 : sub.pin.lx + 18;
                    return (
                      <g
                        key={sub.id}
                        onClick={() => setSelected(sub.id)}
                        className="cursor-pointer"
                      >
                        <polyline
                          points={`${sub.pin.x},${sub.pin.y} ${midX},${sub.pin.ly} ${sub.pin.lx},${sub.pin.ly}`}
                          fill="none"
                          stroke={isActive ? "#0f7d3f" : "#4b534e"}
                          strokeWidth={isActive ? "2" : "1.1"}
                          strokeDasharray={isActive ? undefined : "3 3"}
                        />
                        <circle
                          cx={sub.pin.x}
                          cy={sub.pin.y}
                          r={isActive ? 5.5 : 3.8}
                          fill={isActive ? "#0f7d3f" : "#0b0d0c"}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        <rect
                          x={alignRight ? sub.pin.lx : sub.pin.lx - 148}
                          y={sub.pin.ly - 13}
                          width="148"
                          height="26"
                          rx="4"
                          fill={isActive ? "#0b0d0c" : "#ffffff"}
                          stroke={isActive ? "#0f7d3f" : "#c7ceca"}
                          strokeWidth="1.2"
                        />
                        <text
                          x={alignRight ? sub.pin.lx + 10 : sub.pin.lx - 138}
                          y={sub.pin.ly + 4}
                          fontSize="11"
                          fontFamily="ui-monospace, monospace"
                          fontWeight="600"
                          fill={isActive ? "#24c768" : "#181d1a"}
                        >
                          {sub.pin.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Active subsystem spec footer inside light card */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#0b0d0c]/10 pt-4 font-mono text-xs text-[#3d4540]">
                  <span>
                    <strong className="text-[#0f7d3f]">{activeItem.num}</strong> · {activeItem.title}
                  </span>
                  <span>{activeItem.spec}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
