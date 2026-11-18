import type { Metadata } from "next";
import Link from "next/link";
import { companyStory, offices, platformCapabilities } from "@/content/site";
import { ImpactCounters } from "@/components/ImpactCounters";
import { PageHero, SectionHeading, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "What We Do & About EzyEV",
  description:
    "EzyEV Technologies runs automated battery swapping and lifecycle management for electric 2W and 3W fleets in Pune, Mumbai, and Nagpur.",
  alternates: { canonical: "/what-we-do" },
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow={companyStory.eyebrow}
        title={companyStory.title}
        intro={companyStory.intro}
      />

      {/* Vision, Mission, Transparency */}
      <section aria-label="Vision and mission" className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap space-y-12">
          <SectionHeading eyebrow="Direction" title="Our business is steered by three commitments." />
          <div className="grid gap-6 md:grid-cols-3">
            {companyStory.values.map((v, i) => (
              <article key={v.title} className="panel bg-ground p-8">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-light text-fg">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Philosophy + Principles */}
      <section aria-label="Core philosophy" className="border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-6">
            <SectionHeading
              eyebrow="Core philosophy"
              title="Making electric delivery work at fleet scale."
              intro="Electric two and three wheelers are cheaper to operate, but the battery remains the bottleneck: expensive upfront, slow to charge, and costly to maintain. EzyEV owns that entire layer."
            />
            <ul className="space-y-4">
              {companyStory.principles.map((p) => (
                <li key={p.title} className="panel p-5">
                  <h3 className="text-base font-medium text-fg">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <figure className="panel overflow-hidden lg:col-span-6">
            <picture>
              <source
                srcSet="/media/lifestyle/slot1-rickshaw-v2-1x.webp 1x, /media/lifestyle/slot1-rickshaw-v2-2x.webp 2x"
                type="image/webp"
              />
              <img
                src="/media/lifestyle/slot1-rickshaw-v2-1x.webp"
                alt="Electric three-wheeler operating along a wet Indian urban street at night"
                loading="lazy"
                width={1920}
                height={823}
                className="aspect-[16/10] w-full object-cover"
              />
            </picture>
          </figure>
        </div>
      </section>

      {/* Leadership: Faizan Ahmed (preserved approved portrait) */}
      <section aria-label="Leadership" className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap">
          <div className="panel grid items-center gap-10 bg-ground p-8 md:grid-cols-12 md:p-12">
            <div className="md:col-span-4">
              <div className="overflow-hidden rounded-lg border border-line bg-raised">
                <img
                  src={companyStory.founder.image}
                  alt="Faizan Ahmed, Founder and CEO of EzyEV Technologies"
                  loading="lazy"
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="space-y-4 md:col-span-8">
              <p className="eyebrow">Leadership</p>
              <h2 className="text-3xl font-light tracking-tight text-fg md:text-4xl">
                {companyStory.founder.name}
              </h2>
              <p className="font-mono text-xs tracking-wider text-accent uppercase">
                {companyStory.founder.role}
              </p>
              <div className="space-y-4 pt-2 text-base leading-relaxed text-muted">
                {companyStory.founder.bio.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Impact */}
      <section aria-label="Fleet capabilities and impact" className="border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap space-y-16">
          <div className="space-y-10">
            <SectionHeading
              eyebrow="Fleet outcomes"
              title="Everything between the grid and the rider is ours to run."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformCapabilities.map((s) => (
                <article key={s.title} className="panel p-6">
                  <h3 className="text-lg font-medium text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-8 border-t border-line pt-16">
            <SectionHeading eyebrow="Network impact" title="Operating across three Indian cities." />
            <ImpactCounters />
            <div className="grid gap-4 md:grid-cols-3">
              {offices.map((o) => (
                <Link
                  key={o.city}
                  href={`/ev-battery-service/${o.slug}`}
                  className="panel flex flex-col justify-between p-6 hover:border-accent/50"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-fg">{o.city}</h3>
                      <span className="font-mono text-xs text-accent">{o.tag}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted">{o.summary}</p>
                  </div>
                  <address className="mt-6 font-mono text-xs not-italic text-subtle">
                    {o.address.join(", ")}
                  </address>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkWithUsBand />
    </>
  );
}
