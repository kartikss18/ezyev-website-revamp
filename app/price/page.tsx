import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/content/site";
import { FaqList, PageHero, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Fleet Battery Plans & Pricing",
  description:
    "Tailored Battery-as-a-Service monthly subscription plans for electric 2W and 3W fleets in India.",
  alternates: { canonical: "/price" },
};

const planPlaceholderTiers = [
  {
    id: "2w-fleet",
    tag: "2-WHEELER FLEETS [TODO]",
    name: "Last-Mile 2W Subscription",
    rate: "[RATE / MONTH]",
    summary: "Fixed monthly battery lease + 60-second swaps for food, grocery, and courier two-wheelers.",
    bullets: ["Up to 40% lower vehicle CapEx", "Unlimited / tiered daily km [TODO]", "Partner dashboard telemetry included"],
  },
  {
    id: "3w-fleet",
    tag: "3-WHEELER & CARGO [TODO]",
    name: "L3–L5 & E-Rickshaw Plan",
    rate: "[RATE / MONTH]",
    summary: "High-uptime multi-shift energy plan built for commercial passenger and cargo three-wheelers.",
    bullets: ["24x7 automated corridor access", "Zero degradation replacement risk", "Preventive BMS health monitoring"],
  },
  {
    id: "enterprise",
    tag: "CUSTOM & OEM [TODO]",
    name: "Enterprise & Retrofit Rollout",
    rate: "Custom Quote",
    summary: "Dedicated corridor stations, fleet retrofit integration, and volume SLA pricing.",
    bullets: ["Custom depot / corridor station siting", "2W & 3W retrofit kit compatibility", "Dedicated ops & telemetry API"],
  },
] as const;

export default function PricePage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet plans · Hardcoded placeholder [TODO]"
        title="Predictable monthly energy. Zero upfront battery CapEx."
        intro="Every EzyEV subscription is structured around your vehicle type, daily kilometres, and fleet size. Replace [RATE / MONTH] tokens below with finalized tariff figures."
      />

      <section aria-label="Subscription tiers" className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap grid gap-6 lg:grid-cols-3">
          {planPlaceholderTiers.map((tier) => (
            <article key={tier.id} className="panel flex flex-col justify-between bg-ground p-8">
              <div>
                <p className="font-mono text-xs text-accent">{tier.tag}</p>
                <h2 className="mt-3 text-2xl font-light text-fg">{tier.name}</h2>
                <p className="mt-4 font-mono text-3xl font-medium text-fg">{tier.rate}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tier.summary}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5 font-mono text-xs text-muted">
                  {tier.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary w-full">
                  Request custom plan
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Pricing FAQ" className="bg-ground py-20 md:py-28">
        <div className="wrap max-w-4xl space-y-8">
          <h2 className="text-3xl font-light tracking-tight text-fg">Subscription FAQ</h2>
          <FaqList items={faqs.slice(0, 5)} />
        </div>
      </section>

      <WorkWithUsBand />
    </>
  );
}
