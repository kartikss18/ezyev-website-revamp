import type { Metadata } from "next";
import { packSpecs, platformCapabilities, site, threePillars } from "@/content/site";
import { LazyBatteryStage } from "@/components/three/LazyBatteryStage";
import { PageHero, SectionHeading, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Product: Battery Swapping, Leasing & Retrofit",
  description:
    "Automated EzyEV swap stations, battery leasing with fixed monthly plans, and a retrofit kit for 2W and 3W fleets—backed by an in-house rider app and cloud telemetry.",
  alternates: { canonical: "/product" },
};

const swapSteps = [
  { step: "01", title: "Low-battery alert", body: "The rider app warns before state of charge drops below route margin." },
  { step: "02", title: "Nearest station finder", body: "Smart routing guides the rider to the closest EzyEV bay with a charged pack." },
  { step: "03", title: "Scan QR or tap RFID", body: "Automated authentication unlocks an open bay without station staff." },
  { step: "04", title: "Swap & ride", body: "Drained pack in, validated charged pack out—back on route in under two minutes." },
] as const;

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="One battery network. Three ways to deploy."
        intro="Automated 24x7 swap bays, battery leasing subscription plans, and 2W/3W retrofit kits—all backed by EzyEV's in-house IoT hardware and telemetry cloud."
      >
        <nav aria-label="Product sections" className="mt-8 flex flex-wrap gap-2">
          {threePillars.map((p) => (
            <a
              key={p.id}
              href={`#${p.id === "packs" ? "leasing" : p.id === "network" ? "swapping" : "retrofit"}`}
              className="btn-secondary"
            >
              {p.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Pack Hero Render & Lineup */}
      <section aria-label="Pack showcase" className="border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap space-y-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <SectionHeading
                eyebrow="EzyEV Pack"
                title="Factory-engineered for rapid daily exchange."
                intro="Extruded anodized green aluminium enclosure (1 : 1.6 : 2.4), safety-yellow top cap with high-current Anderson interface, key lock, and real-time BMS telemetry."
              />
              <dl className="divide-y divide-line border-y border-line font-mono text-xs">
                {packSpecs.slice(0, 5).map((s) => (
                  <div key={s.key} className="flex justify-between py-3">
                    <dt className="text-subtle">{s.key}</dt>
                    <dd className="text-fg">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="panel h-[420px] overflow-hidden lg:col-span-7 lg:h-[480px]">
              <LazyBatteryStage
                posterSrc="/media/product/hero-pack-1x.webp"
                posterSrcSet="/media/product/hero-pack-1x.webp 640w, /media/product/hero-pack-2x.webp 1280w"
                posterMobileSrcSet="/media/product/hero-pack-mobile-1x.webp 360w, /media/product/hero-pack-mobile-2x.webp 720w"
                posterSizes="(min-width: 1024px) 680px, 92vw"
                posterWidth={640}
                posterHeight={360}
                posterLoading="lazy"
                posterAlt="EzyEV swappable battery pack 3D view"
                config={{ mode: "pack", autoRotate: true, orbit: true }}
              />
            </div>
          </div>

          <figure className="panel overflow-hidden">
            <img
              src="/media/product/pack-lineup-1x.webp"
              srcSet="/media/product/pack-lineup-1x.webp 840w, /media/product/pack-lineup-2x.webp 1680w"
              sizes="(min-width: 1024px) 1200px, 92vw"
              alt="Three EzyEV swappable battery packs staged at staggered depth"
              loading="lazy"
              decoding="async"
              width={840}
              height={360}
              className="aspect-[21/9] w-full bg-[#0b0d0c] object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Three Offering Deep-Dives */}
      <section id="swapping" aria-label="Battery swapping" className="scroll-mt-24 border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <SectionHeading
              eyebrow="01 · Battery Swapping"
              title="60-second swaps. Zero downtime."
              intro="A network of automated stations placed on the routes your riders already run. They pull in, swap a drained battery for a charged one, and leave without a queue."
            />
            <ul className="space-y-3 font-mono text-xs text-muted">
              <li>• Automated swap stations at strategic urban hubs</li>
              <li>• App-based booking and QR / RFID authentication</li>
              <li>• Automated door unlock and pack validation</li>
              <li>• Open 24x7, compact footprint for city corners</li>
            </ul>
          </div>
          <figure className="panel overflow-hidden lg:col-span-6">
            <img
              src="/media/product/swap-moment-2x.webp"
              alt="EzyEV battery pack gliding into an automated swap bay slot"
              loading="lazy"
              width={1280}
              height={720}
              className="aspect-video w-full bg-[#0b0d0c] object-cover"
            />
          </figure>
        </div>
      </section>

      <section id="leasing" aria-label="Battery leasing" className="scroll-mt-24 border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <figure className="panel overflow-hidden lg:order-1 lg:col-span-6">
            <img
              src="/media/product/front-elevation-2x.webp"
              alt="Front elevation of the EzyEV battery pack showing extruded aluminium ribs and EzyEV mark"
              loading="lazy"
              width={1000}
              height={1000}
              className="aspect-square w-full bg-[#0b0d0c] object-cover"
            />
          </figure>
          <div className="space-y-6 lg:order-2 lg:col-span-6">
            <SectionHeading
              eyebrow="02 · Battery Leasing"
              title="Own the vehicle. Lease the power."
              intro="Buy electric two-wheelers and three-wheelers without the battery and subscribe to energy instead. Drivers and operators pay less upfront, know their monthly bill, and eliminate replacement risk."
            />
            <ul className="space-y-3 font-mono text-xs text-muted">
              <li>• Up to 40% reduction in upfront vehicle CapEx</li>
              <li>• Fixed monthly battery subscription plans</li>
              <li>• Better RoI for fleet owners and individual drivers</li>
              <li>• Real-time battery monitoring &amp; preventive maintenance</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="retrofit" aria-label="Retrofit kit" className="scroll-mt-24 border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <SectionHeading
              eyebrow="03 · Retrofit Kit"
              title="Electrify the fleet you already run."
              intro="Replacing an entire fleet at once is rarely practical. Our retrofit kit converts compatible 2W and 3W vehicles onto EzyEV swappable batteries and the same swap network."
            />
            <ul className="space-y-3 font-mono text-xs text-muted">
              <li>• Convert existing 2W and 3W vehicles instead of scrapping</li>
              <li>• Runs on the same automated swap bays, app, and plans</li>
              <li>• OEM &amp; dealer partnerships to lower fleet acquisition cost</li>
              <li>• Fit confirmed model-by-model before rollout</li>
            </ul>
          </div>
          <figure className="panel overflow-hidden lg:col-span-6">
            <img
              src="/media/product/top-cap-2x.webp"
              alt="Top-down view of the EzyEV battery pack cap showing handle, key switch, display, and Anderson connector"
              loading="lazy"
              width={1000}
              height={1000}
              className="aspect-square w-full bg-[#0b0d0c] object-cover"
            />
          </figure>
        </div>
      </section>

      {/* 4-Step Swap Flow + 6 Platform Capabilities */}
      <section aria-label="Swap flow and platform" className="border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap space-y-20">
          <div className="space-y-10">
            <SectionHeading eyebrow="How a swap works" title="Under two minutes, start to finish." />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {swapSteps.map((s) => (
                <li key={s.step} className="panel p-6">
                  <span className="font-mono text-xs text-accent">{s.step}</span>
                  <h3 className="mt-4 text-lg font-medium text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-10 border-t border-line pt-16">
            <SectionHeading
              eyebrow="In-house stack"
              title="Hardware, firmware, and fleet telemetry built in-house."
              intro={`Built on TypeScript, Node.js, Go, React Native, Kafka, MQTT, and TimescaleDB—one engineering team answers for ${site.name}'s stations, app, and cloud.`}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformCapabilities.map((cap) => (
                <article key={cap.title} className="panel p-6">
                  <h3 className="text-lg font-medium text-fg">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cap.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkWithUsBand />
    </>
  );
}
