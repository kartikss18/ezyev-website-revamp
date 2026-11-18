import type { Metadata } from "next";
import { brandTokens } from "@/lib/brand";
import { BrandLockup, BrandMark } from "@/components/Logo";
import { BatteryLineArt } from "@/components/BatteryLineArt";

export const metadata: Metadata = {
  title: "Brandkit, Tokens & Style Tile | Lab",
  robots: { index: false, follow: false },
};

export default function BrandLabPage() {
  return (
    <div className="min-h-screen bg-ground pt-28 pb-24 text-fg">
      <div className="wrap space-y-20">
        {/* Header */}
        <header className="border-b border-line pb-10">
          <p className="eyebrow">Milestone 2 · Brandkit & Style Tile</p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] md:text-6xl">
            EzyEV visual system
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted">
            Graphite-first industrial token sheet built around the preserved EzyEV mark
            (#0F7D3F anodized green &amp; #F8C812 safety-yellow bolt), Geist display/body grotesk, and Geist Mono telemetry labels.
          </p>
        </header>

        {/* 1. Color System */}
        <section aria-labelledby="colors-h">
          <div className="mb-8 flex items-baseline justify-between border-b border-line pb-4">
            <h2 id="colors-h" className="text-2xl font-normal tracking-tight">
              01 · Color tokens
            </h2>
            <span className="font-mono text-xs tracking-wider text-subtle uppercase">
              Dark graphite base · Single emerald accent · 1× micro yellow max
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brandTokens.palette.map((c) => (
              <div key={c.token} className="panel flex items-start gap-4 p-4">
                <div
                  className="h-14 w-14 shrink-0 rounded-md border border-line-strong"
                  style={{ background: c.hex }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-fg">{c.name}</span>
                    <span className="font-mono text-xs text-accent">{c.hex}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-subtle">{c.token}</p>
                  <p className="mt-1.5 text-xs text-muted">{c.role}</p>
                  <p className="mt-1 font-mono text-[11px] text-subtle">Contrast: {c.contrastOnBg}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Logo Usage Sheet */}
        <section aria-labelledby="logo-h">
          <div className="mb-8 flex items-baseline justify-between border-b border-line pb-4">
            <h2 id="logo-h" className="text-2xl font-normal tracking-tight">
              02 · Vectorized logo &amp; clear space
            </h2>
            <span className="font-mono text-xs tracking-wider text-subtle uppercase">
              Exact SVG · Zero redraw · Clear space = cap height of &ldquo;E&rdquo;
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Dark background lockup */}
            <div className="panel flex flex-col justify-between p-8">
              <div>
                <p className="font-mono text-xs tracking-wider text-subtle uppercase">
                  Dark surface · Brand / Mono lockup
                </p>
                <div className="mt-8 flex flex-col gap-8 rounded-md border border-dashed border-line-strong bg-[#0b0d0c] p-8">
                  <div className="flex items-center justify-between">
                    <BrandLockup tone="brand-on-dark" className="h-9 w-auto" />
                    <span className="font-mono text-[11px] text-subtle">Primary nav</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line pt-6">
                    <BrandLockup tone="dark-bg" className="h-9 w-auto" />
                    <span className="font-mono text-[11px] text-subtle">White mono</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs text-muted">{brandTokens.logoRules.darkSurface}</p>
            </div>

            {/* Light background lockup */}
            <div className="panel flex flex-col justify-between p-8">
              <div>
                <p className="font-mono text-xs tracking-wider text-subtle uppercase">
                  Light surface · Original colors
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-6 rounded-md border border-black/10 bg-[#f6f7f5] p-8">
                  <BrandLockup tone="light-bg" className="h-10 w-auto" />
                  <img
                    src="/brand/ezyev-logo.svg"
                    alt="EzyEV stacked original color logo"
                    className="h-24 w-auto"
                  />
                </div>
              </div>
              <p className="mt-6 text-xs text-muted">{brandTokens.logoRules.lightSurface}</p>
            </div>

            {/* Mark-only favicon & clear space */}
            <div className="panel flex flex-col justify-between p-8">
              <div>
                <p className="font-mono text-xs tracking-wider text-subtle uppercase">
                  Mark only · Clear space &amp; min size (24px)
                </p>
                <div className="mt-8 flex items-center justify-around rounded-md border border-line bg-[#0b0d0c] p-8">
                  <div className="relative border border-dashed border-accent/60 p-4">
                    <BrandMark tone="color" className="h-12 w-12" />
                    <span className="absolute -top-3 left-1 bg-[#0b0d0c] px-1 font-mono text-[10px] text-accent">
                      1× E-height
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <BrandMark tone="color" className="h-6 w-6" />
                    <span className="font-mono text-[11px] text-subtle">24px min</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <BrandMark tone="mono-dark" className="h-8 w-8" />
                    <span className="font-mono text-[11px] text-subtle">32px mono</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs text-muted">{brandTokens.logoRules.clearSpace}</p>
            </div>
          </div>
        </section>

        {/* 3. Typography & Style Tile */}
        <section aria-labelledby="type-h">
          <div className="mb-8 flex items-baseline justify-between border-b border-line pb-4">
            <h2 id="type-h" className="text-2xl font-normal tracking-tight">
              03 · Typography &amp; One-Page Style Tile
            </h2>
            <span className="font-mono text-xs tracking-wider text-subtle uppercase">
              Geist (300/400/500/600) + Geist Mono (400/500)
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Display specimen */}
            <div className="panel space-y-6 p-8 lg:col-span-7">
              <p className="font-mono text-xs tracking-wider text-subtle uppercase">Display &amp; Hierarchy</p>
              <p className="text-5xl leading-[0.98] font-light tracking-[-0.04em] text-fg md:text-6xl">
                Swap, don&rsquo;t wait.
              </p>
              <p className="text-2xl font-normal tracking-[-0.025em] text-muted">
                Sixty-second battery swaps engineered for India&rsquo;s 2W and 3W electric fleets.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <span className="btn-primary">Partner with us</span>
                <span className="btn-secondary">Explore the pack</span>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-fg">
                  <span className="h-2 w-2 rounded-full bg-yellow" />
                  1× Safety Yellow micro-accent
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-line pt-6">
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Swap target</p>
                  <p className="mt-1 font-mono text-2xl font-medium text-fg tabular-nums">60s</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Vehicle CapEx</p>
                  <p className="mt-1 font-mono text-2xl font-medium text-accent tabular-nums">−40%</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Availability</p>
                  <p className="mt-1 font-mono text-2xl font-medium text-fg tabular-nums">24×7</p>
                </div>
              </div>
            </div>

            {/* Technical spec & SVG diagram preview */}
            <div className="panel flex items-center justify-between gap-6 p-8 lg:col-span-5">
              <div className="space-y-4">
                <p className="font-mono text-xs tracking-wider text-subtle uppercase">
                  2D Line-Art &amp; Hairline Spec
                </p>
                <dl className="divide-y divide-line border-y border-line font-mono text-xs">
                  <div className="flex justify-between gap-6 py-2.5">
                    <dt className="text-subtle">RATIO (D:W:H)</dt>
                    <dd className="text-fg">1 : 1.6 : 2.4</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-2.5">
                    <dt className="text-subtle">ENCLOSURE</dt>
                    <dd className="text-fg">RIBBED AL-6063</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-2.5">
                    <dt className="text-subtle">RADIUS SCALE</dt>
                    <dd className="text-fg">4 / 8 / 12 / PILL</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-2.5">
                    <dt className="text-subtle">EASING</dt>
                    <dd className="text-accent">0.22, 1, 0.36, 1</dd>
                  </div>
                </dl>
              </div>
              <div className="w-36 shrink-0 text-fg">
                <BatteryLineArt />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
