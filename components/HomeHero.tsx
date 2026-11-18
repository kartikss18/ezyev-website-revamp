import Link from "next/link";
import { site } from "@/content/site";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";
import { RollText } from "@/components/RollText";

export function HomeHero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-ground pt-28 pb-16 lg:min-h-[820px] lg:pt-32 lg:pb-20"
    >
      {/* Clean studio radial ambient glow + subtle grid rhythm */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_76%_46%,rgba(36,199,104,0.16),transparent_70%)]"
      />

      <div className="wrap relative z-10 grid w-full items-start gap-12 lg:grid-cols-12">
        {/* Left: short headline promise + clear actions + 3 compact proof metrics */}
        <div className="space-y-8 lg:col-span-6">
          <p className="inline-flex items-center gap-2.5 font-mono text-xs font-medium tracking-widest text-accent uppercase">
            <span className="relative flex size-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Battery-as-a-Service · India 2W &amp; 3W Fleets
          </p>

          <div className="space-y-4">
            <h1 className="text-5xl leading-[0.98] font-light tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.75rem]">
              Battery swapping.{" "}
              <span className="block font-normal text-accent">Don&rsquo;t wait to charge.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              60-second swaps, fixed monthly plans, and telemetry for 2W &amp; 3W fleets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href={site.primaryCta.href} className="btn-primary">
              <RollText text={site.primaryCta.label} />
              <span aria-hidden>→</span>
            </Link>
            <a href="#anatomy" className="btn-secondary">
              <RollText text="Inspect pack anatomy" />
            </a>
          </div>

          {/* Three compact proof stats */}
          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Swap time</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-fg tabular-nums">~60s</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Vehicle CapEx</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-accent tabular-nums">−40%</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Active cities</dt>
              <dd className="mt-1 font-mono text-2xl font-medium text-fg tabular-nums">03</dd>
            </div>
          </dl>
        </div>

        {/* Right: dark-stage 3D EzyEV battery pack */}
        <div className="panel h-[420px] w-full sm:h-[500px] lg:col-span-6 lg:h-[590px]">
          <LazyBatteryStage
            posterSrc="/media/product/hero-pack-1x.webp"
            posterSrcSet="/media/product/hero-pack-1x.webp 640w, /media/product/hero-pack-2x.webp 1280w"
            posterMobileSrcSet="/media/product/hero-pack-mobile-1x.webp 360w, /media/product/hero-pack-mobile-2x.webp 720w"
            posterSizes="(min-width: 1024px) 580px, 92vw"
            posterWidth={640}
            posterHeight={360}
            posterLoading="eager"
            posterAlt="EzyEV swappable battery pack in satin anodized green with safety-yellow cap"
            ariaLabel="Interactive 3D EzyEV swappable battery pack"
            stageHint="1:1.6:2.4 AL-6063 ENCLOSURE"
            config={{
              mode: "pack",
              explode: 0,
              ledState: "charged",
              autoRotate: true,
              orbit: true,
              cameraPos: [4.35, 2.35, 6.05],
              fov: 36,
            }}
          />
        </div>
      </div>
    </section>
  );
}
