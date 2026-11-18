import type { Metadata } from "next";
import { platformCapabilities, threePillars } from "@/content/site";
import { PageHero, SectionHeading, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "EV Fleet Battery Services | Swap, Monitor & Manage",
  description:
    "Explore EzyEV's fleet battery services: automated battery swapping, real-time monitoring, geofencing security, predictive maintenance, and fixed monthly plans.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="EV Fleet Battery Services — Swap, Monitor & Manage."
        intro="Explore EzyEV's full suite of fleet battery services: 60-second battery swapping, real-time telemetry monitoring, predictive maintenance, and predictable monthly cost management for 2W & 3W EVs."
      />

      <section aria-label="Service capabilities" className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap space-y-12">
          <SectionHeading
            eyebrow="Telemetry & operations"
            title="Built to maximize fleet uptime and asset safety."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platformCapabilities.map((item, i) => (
              <article key={item.title} className="panel bg-ground p-8">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h2 className="mt-4 text-xl font-medium text-fg">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Deployment models" className="border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap space-y-12">
          <SectionHeading eyebrow="Deployment models" title="Three ways to run on EzyEV." />
          <div className="grid gap-6 md:grid-cols-3">
            {threePillars.map((p) => (
              <article key={p.id} className="panel p-8">
                <span className="font-mono text-xs text-subtle">{p.num}</span>
                <h3 className="mt-3 text-2xl font-light text-fg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WorkWithUsBand />
    </>
  );
}
