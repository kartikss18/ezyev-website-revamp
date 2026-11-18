import Link from "next/link";
import { threePillars } from "@/content/site";
import { SectionHeading } from "@/components/ui";
import { RollText } from "@/components/RollText";

const pillarVisuals: Record<
  string,
  {
    src: string;
    srcSet: string;
    width: number;
    height: number;
    alt: string;
    aspect: string;
  }
> = {
  packs: {
    src: "/media/product/hero-pack-1x.webp",
    srcSet: "/media/product/hero-pack-1x.webp 640w, /media/product/hero-pack-2x.webp 1280w",
    width: 640,
    height: 360,
    alt: "EzyEV satin green aluminium swappable battery pack with safety-yellow cap on dark studio stage",
    aspect: "aspect-[16/9]",
  },
  network: {
    src: "/media/lifestyle/slot4-kiosk-v1-1x.webp",
    srcSet: "/media/lifestyle/slot4-kiosk-v1-1x.webp 640w, /media/lifestyle/slot4-kiosk-v1-2x.webp 1280w",
    width: 640,
    height: 360,
    alt: "Minimal unbranded automated EzyEV battery swap kiosk with glowing green dock bays",
    aspect: "aspect-[16/9]",
  },
  fleet: {
    src: "/media/product/pack-lineup-1x.webp",
    srcSet: "/media/product/pack-lineup-1x.webp 840w, /media/product/pack-lineup-2x.webp 1680w",
    width: 840,
    height: 360,
    alt: "Row of three EzyEV fleet battery packs staged at depth on near-black floor",
    aspect: "aspect-[21/9]",
  },
};

const cardTones = [
  "bg-[#0d110f] lg:top-20 z-10",
  "bg-[#101613] lg:top-28 z-20",
  "bg-[#141c18] lg:top-36 z-30",
];

export function EcosystemStack() {
  return (
    <section aria-label="Ecosystem" className="bg-ground py-24 md:py-28">
      <div className="wrap space-y-12">
        <SectionHeading
          eyebrow="Three-pillar ecosystem"
          title="Three ways fleets deploy our battery platform"
        />

        {/* Exponent-style overlapping sticky card stack on desktop; vertical stack on mobile */}
        <div className="space-y-6 lg:space-y-8 lg:pb-2">
          {threePillars.map((pillar, idx) => {
            const media = pillarVisuals[pillar.id] ?? pillarVisuals.packs;
            const tone = cardTones[idx % cardTones.length];
            return (
              <article
                key={pillar.id}
                className={`overflow-hidden rounded-2xl border border-line-strong/80 shadow-[0_-18px_45px_rgba(0,0,0,0.65)] transition-all duration-500 ease-brand hover:border-accent/50 lg:sticky ${tone}`}
              >
                {/* Top index strip that stays visible as incoming card overlaps */}
                <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium text-accent">{pillar.num}</span>
                    <span className="h-3 w-px bg-line-strong" aria-hidden />
                    <span className="font-mono text-xs tracking-wider text-fg uppercase">
                      {pillar.title}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-subtle uppercase">
                    <span className="relative flex size-1.5" aria-hidden>
                      <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                    </span>
                    Layer {pillar.num} / 03
                  </span>
                </div>

                {/* Top-aligned split body + bespoke hardware visual */}
                <div className="grid items-start gap-8 p-6 md:p-10 lg:grid-cols-12">
                  <div className="space-y-5 lg:col-span-6">
                    <h3 className="text-xl leading-[1.2] font-normal tracking-[-0.02em] text-fg md:text-2xl">
                      {pillar.headline}
                    </h3>

                    <ul className="grid gap-2.5 border-t border-line pt-4 font-mono text-xs text-muted sm:grid-cols-2">
                      {pillar.specs.map((sp) => (
                        <li key={sp} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-1">
                      <Link
                        href={pillar.href}
                        className="roll-trigger inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line-strong px-4 py-2 font-mono text-xs font-medium tracking-wider text-fg uppercase transition-colors hover:border-accent hover:text-accent"
                      >
                        <RollText text={`Explore ${pillar.title.split(" ")[0]}`} />
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-line bg-[#080a09] lg:col-span-6">
                    <img
                      src={media.src}
                      srcSet={media.srcSet}
                      sizes="(min-width: 1024px) 560px, 92vw"
                      width={media.width}
                      height={media.height}
                      loading="lazy"
                      decoding="async"
                      alt={media.alt}
                      className={`${media.aspect} w-full object-cover`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
