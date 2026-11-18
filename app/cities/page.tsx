import type { Metadata } from "next";
import Link from "next/link";
import { offices } from "@/content/site";
import { PageHero, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cities We Serve | EV Battery-as-a-Service",
  description:
    "EzyEV's Battery-as-a-Service network across India. Active hubs in Pune, Mumbai, and Nagpur for electric 2W and 3W fleets.",
  alternates: { canonical: "/cities" },
};

export default function CitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we operate"
        title="EzyEV Cities Across India."
        intro="EzyEV's automated Battery-as-a-Service network is live across Maharashtra's key urban logistics hubs and expanding to tier-1 and tier-2 cities across India."
      />

      <section aria-label="Active cities" className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {offices.map((o) => (
            <Link
              key={o.city}
              href={`/ev-battery-service/${o.slug}`}
              className="panel group flex flex-col justify-between bg-ground p-8 transition-colors hover:border-accent/60"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-subtle uppercase">{o.state}</span>
                  <span className="text-accent uppercase">{o.tag}</span>
                </div>
                <h2 className="mt-4 text-3xl font-light tracking-tight text-fg">{o.city}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.summary}</p>
                <address className="mt-6 border-t border-line pt-4 font-mono text-xs not-italic text-subtle">
                  {o.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <span className="mt-8 font-mono text-xs text-fg group-hover:text-accent">
                EV Battery Service in {o.city} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <WorkWithUsBand
        eyebrow="Expansion"
        title="Bring EzyEV to your city."
        body="Running a commercial 2W or 3W fleet outside Pune, Mumbai, or Nagpur? Share your route volume to plan a regional corridor deployment."
      />
    </>
  );
}
