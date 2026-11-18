import Link from "next/link";
import {
  applications,
  caseStudyPlaceholder,
  certifications,
  faqs,
  hardcodedNewsPlaceholders,
  offices,
  packSpecs,
  site,
} from "@/content/site";
import { HomeHero } from "@/components/HomeHero";
import { BatteryAnatomySection } from "@/components/BatteryAnatomySection";
import { EcosystemStack } from "@/components/EcosystemStack";
import { SwapSection } from "@/components/SwapSection";
import { InsidePackSection } from "@/components/InsidePackSection";
import { ImpactCounters } from "@/components/ImpactCounters";
import { ContactForm } from "@/components/ContactForm";
import { FaqList, SectionHeading } from "@/components/ui";
import { RollText } from "@/components/RollText";

export const metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "EzyEV Swappable Battery Pack & BaaS Platform",
  brand: { "@type": "Brand", name: site.name },
  description: site.description,
  image: `${site.url}/media/product/hero-pack-2x.webp`,
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Exponent-style Light Studio Battery Pack Anatomy */}
      <BatteryAnatomySection />

      {/* 3. Manifesto · Balanced Split + Urban Dusk Plate */}
      <section aria-label="Manifesto" className="bg-surface py-20 md:py-28">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <p className="eyebrow">Manifesto</p>
            <h2 className="text-3xl leading-[1.12] font-light tracking-[-0.03em] text-fg md:text-4xl">
              Plug-in charging sleeps overnight. Fleets don&rsquo;t.
            </h2>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              Every minute parked at a charger is an order lost. EzyEV turns 4-hour downtime into 60-second swaps.
            </p>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">EzyEV swap turnaround</dt>
                <dd className="mt-1 font-mono text-2xl font-medium text-accent tabular-nums">~60 sec</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Conventional AC plug-in</dt>
                <dd className="mt-1 font-mono text-2xl font-medium text-fg tabular-nums">4–6 hrs</dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-ground lg:col-span-6">
            <img
              src="/media/lifestyle/slot1-rickshaw-v1-1x.webp"
              srcSet="/media/lifestyle/slot1-rickshaw-v1-mobile.webp 480w, /media/lifestyle/slot1-rickshaw-v1-1x.webp 960w, /media/lifestyle/slot1-rickshaw-v1-2x.webp 1920w"
              sizes="(min-width: 1024px) 580px, 92vw"
              width={960}
              height={411}
              loading="lazy"
              decoding="async"
              alt="Electric three-wheeler operating along a rain-wet Indian city street at dusk"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Ecosystem: Three Pillars (Exponent-inspired Overlapping Stack) */}
      <EcosystemStack />

      {/* 4. The Swap (Scroll Sequence 2 + Plug-in vs Swap comparison) */}
      <SwapSection />

      {/* 5. Inside the pack (Scroll Sequence 1 + Tech panels) */}
      <InsidePackSection />

      {/* 6. Specs & Asymmetric Hardware Detail Views */}
      <section id="specs" aria-label="Pack specifications" className="bg-surface py-24 md:py-28">
        <div className="wrap space-y-12">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Engineering specifications"
                title="Pack architecture built for high-cycle fleet duty"
                intro="[BRACKETED] datasheet tokens stay hardcoded pending sign-off."
              />
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Link href="/product" className="btn-secondary">
                <RollText text="View full platform specs" />
              </Link>
            </div>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {packSpecs.map((spec) => (
              <div key={spec.key} className="bg-ground p-6 md:p-8">
                <dt className="font-mono text-[11px] tracking-widest text-subtle uppercase">{spec.key}</dt>
                <dd className="mt-4 font-mono text-2xl font-medium text-fg md:text-3xl">{spec.value}</dd>
                <dd className="mt-2 text-sm text-muted">{spec.label}</dd>
                <dd className="mt-1 font-mono text-[11px] text-subtle">{spec.unit}</dd>
              </div>
            ))}
            <div className="flex flex-col justify-between bg-ground p-6 md:p-8">
              <dt className="font-mono text-[11px] tracking-widest text-accent uppercase">ENVELOPE RATIO</dt>
              <dd className="mt-4 font-mono text-2xl font-medium text-accent md:text-3xl">1 : 1.6 : 2.4</dd>
              <dd className="mt-2 text-sm text-muted">Depth : Width : Height</dd>
              <dd className="mt-1 font-mono text-[11px] text-subtle">Extruded ribbed aluminium</dd>
            </div>
          </dl>

          {/* Asymmetric hardware macro views — zero redundant card captions */}
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="overflow-hidden rounded-xl border border-line bg-ground lg:col-span-7">
              <img
                src="/media/product/macro-bms-1x.webp"
                srcSet="/media/product/macro-bms-1x.webp 450w, /media/product/macro-bms-2x.webp 900w"
                sizes="(min-width: 1024px) 54vw, 92vw"
                alt="Macro render of carbon BMS board, white sense-wire harness, and red terminal boot inside the EzyEV battery pack"
                loading="lazy"
                decoding="async"
                width={450}
                height={300}
                className="aspect-[3/2] w-full bg-[#0b0d0c] object-cover"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-line bg-ground sm:col-span-2">
                <img
                  src="/media/product/macro-connector-1x.webp"
                  srcSet="/media/product/macro-connector-1x.webp 450w, /media/product/macro-connector-2x.webp 900w"
                  sizes="(min-width: 1024px) 36vw, 92vw"
                  alt="Macro render of metallic cable glands and high-current Anderson connector on the yellow top cap"
                  loading="lazy"
                  decoding="async"
                  width={450}
                  height={300}
                  className="aspect-[16/9] w-full bg-[#0b0d0c] object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-line bg-ground">
                <img
                  src="/media/product/macro-ribs-1x.webp"
                  srcSet="/media/product/macro-ribs-1x.webp 450w, /media/product/macro-ribs-2x.webp 900w"
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 92vw"
                  alt="Macro render of extruded green AL-6063 aluminium cooling ribs and chamfered corner"
                  loading="lazy"
                  decoding="async"
                  width={450}
                  height={300}
                  className="aspect-[3/2] w-full bg-[#0b0d0c] object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-line bg-ground">
                <img
                  src="/media/product/macro-keyswitch-1x.webp"
                  srcSet="/media/product/macro-keyswitch-1x.webp 450w, /media/product/macro-keyswitch-2x.webp 900w"
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 92vw"
                  alt="Macro render of round metal key switch and digital readout window on the top cap"
                  loading="lazy"
                  decoding="async"
                  width={450}
                  height={300}
                  className="aspect-[3/2] w-full bg-[#0b0d0c] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Applications */}
      <section aria-label="Applications" className="bg-ground py-24 md:py-28">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <SectionHeading
              eyebrow="Applications · Who we serve"
              title="Commercial two-wheeler and three-wheeler fleet applications"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {applications.map((app) => (
                <article key={app.id} className="panel p-6">
                  <p className="font-mono text-[11px] tracking-wider text-accent uppercase">{app.vehicles}</p>
                  <h3 className="mt-2 text-xl font-medium text-fg">{app.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{app.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-surface lg:col-span-5">
            <img
              src="/media/lifestyle/slot2-rider-v1-1x.webp"
              srcSet="/media/lifestyle/slot2-rider-v1-1x.webp 480w, /media/lifestyle/slot2-rider-v1-2x.webp 960w"
              sizes="(min-width: 1024px) 42vw, 92vw"
              alt="Delivery rider standing beside a matte-black electric two-wheeler in an Indian city lane at night"
              loading="lazy"
              decoding="async"
              width={480}
              height={600}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 8. Network & Impact Counters + Active Hubs */}
      <section aria-label="Network and impact" className="bg-surface py-24 md:py-28">
        <div className="wrap space-y-12">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Network coverage"
                title="Live swap corridors in Pune, Mumbai, and Nagpur"
              />
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Link href="/cities" className="btn-secondary">
                <RollText text="Explore active cities" />
              </Link>
            </div>
          </div>

          <ImpactCounters />

          <div className="grid gap-4 md:grid-cols-3">
            {offices.map((o) => (
              <Link
                key={o.city}
                href={`/ev-battery-service/${o.slug}`}
                className="panel group flex flex-col justify-between bg-ground p-6 transition-colors duration-300 ease-brand hover:border-accent/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-fg">{o.city}</h3>
                    <span className="font-mono text-[11px] tracking-wider text-accent uppercase">{o.tag}</span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted">{o.summary}</p>
                </div>
                <span className="mt-4 inline-flex min-h-[44px] items-center font-mono text-xs text-fg group-hover:text-accent">
                  View {o.city} service →
                </span>
              </Link>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-ground">
            <img
              src="/media/lifestyle/slot6-aerial-v1-1x.webp"
              srcSet="/media/lifestyle/slot6-aerial-v1-mobile.webp 480w, /media/lifestyle/slot6-aerial-v1-1x.webp 960w, /media/lifestyle/slot6-aerial-v1-2x.webp 1920w"
              sizes="(min-width: 1280px) 1232px, 92vw"
              width={960}
              height={411}
              alt="Aerial night view of Indian urban arterial corridors connecting EzyEV battery swap zones"
              loading="lazy"
              decoding="async"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 9. Case study */}
      <section aria-label="Case study" className="bg-ground py-24 md:py-28">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="overflow-hidden rounded-xl border border-line bg-surface lg:col-span-6">
            <img
              src="/media/lifestyle/slot2-rider-v3-1x.webp"
              srcSet="/media/lifestyle/slot2-rider-v3-1x.webp 480w, /media/lifestyle/slot2-rider-v3-2x.webp 960w"
              sizes="(min-width: 1024px) 46vw, 92vw"
              alt="Commercial delivery rider beside an electric two-wheeler on an Indian city street at night"
              loading="lazy"
              decoding="async"
              width={480}
              height={600}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="space-y-8 lg:col-span-6">
            <div>
              <p className="eyebrow">{caseStudyPlaceholder.eyebrow}</p>
              <h2 className="mt-4 text-3xl leading-[1.08] font-light tracking-[-0.03em] text-fg md:text-5xl">
                {caseStudyPlaceholder.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {caseStudyPlaceholder.story}
              </p>
            </div>

            <dl className="grid gap-4 border-y border-line py-6 sm:grid-cols-3">
              {caseStudyPlaceholder.stats.map((st) => (
                <div key={st.label}>
                  <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">{st.label}</dt>
                  <dd className="mt-1 font-mono text-2xl font-medium text-fg">{st.value}</dd>
                  <dd className="mt-1 text-sm text-muted">{st.note}</dd>
                </div>
              ))}
            </dl>

            <Link href={caseStudyPlaceholder.ctaHref} className="btn-secondary">
              <RollText text={caseStudyPlaceholder.ctaLabel} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Field notes & updates */}
      <section aria-label="Field notes and updates" className="bg-surface py-24 md:py-28">
        <div className="wrap space-y-10">
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow="Field notes"
                title="EzyEV network deployment updates and engineering notes"
              />
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link href="/blog" className="btn-secondary">
                <RollText text="All updates" />
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hardcodedNewsPlaceholders.map((post) => (
              <article key={post.slug} className="panel flex flex-col justify-between bg-ground p-6">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-subtle">
                    <span className="text-accent">{post.tag}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-medium leading-snug text-fg">{post.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Certifications & Safety */}
      <section id="safety" aria-label="Safety and compliance" className="bg-ground py-24 md:py-28">
        <div className="wrap space-y-12">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Safety & compliance"
                title="Automated bay thermal validation before every release"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-surface lg:col-span-5">
              <img
                src="/media/product/macro-cells-1x.webp"
                srcSet="/media/product/macro-cells-1x.webp 450w, /media/product/macro-cells-2x.webp 900w"
                sizes="(min-width: 1024px) 38vw, 92vw"
                width={450}
                height={300}
                loading="lazy"
                decoding="async"
                alt="Macro view of compressed modular lithium cell stack and insulated copper interconnects inside the EzyEV pack"
                className="aspect-[3/2] w-full bg-[#0b0d0c] object-cover"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <div key={cert.code} className="panel bg-surface p-6">
                <p className="font-mono text-xs text-yellow">{cert.code}</p>
                <h3 className="mt-3 text-xl font-medium text-fg">{cert.title}</h3>
                <p className="mt-2 font-mono text-xs text-muted">{cert.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section id="faq" aria-label="Frequently asked questions" className="bg-surface py-24 md:py-28">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title="Battery swapping questions operators ask first"
              intro={
                <>
                  Need fleet-specific numbers? Write to{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-[44px] items-center text-fg underline decoration-accent/60 underline-offset-4 hover:text-accent"
                  >
                    {site.email}
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      </section>

      {/* 13. Work With Us B2B Form + Exact Contact Details */}
      <section id="work-with-us" aria-label="Work with us" className="bg-ground py-24 md:py-28">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <SectionHeading
              eyebrow="Work with us"
              title="Deploy EzyEV battery swapping for your fleet or OEM line"
              intro="Tell us your vehicle category, fleet size, and daily routes. Our operations team maps station coverage and sends a fixed monthly plan."
            />

            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <img
                src="/media/product/top-cap-1x.webp"
                srcSet="/media/product/top-cap-1x.webp 500w, /media/product/top-cap-2x.webp 1000w"
                sizes="(min-width: 1024px) 38vw, 92vw"
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
                alt="Top view of EzyEV safety-yellow battery cap with carry handle, key lock, dual cable glands, and Anderson connector"
                className="aspect-[16/10] w-full bg-[#0b0d0c] object-cover"
              />
            </div>

            <div className="space-y-4 border-t border-line pt-6 text-base">
              <div>
                <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Direct contact</p>
                <div className="mt-1 flex flex-col items-start">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-[44px] items-center font-medium text-fg hover:text-accent"
                  >
                    {site.email}
                  </a>
                  <a
                    href={site.phoneHref}
                    className="inline-flex min-h-[44px] items-center font-mono text-muted tabular-nums hover:text-fg"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
              <div className="space-y-3 border-t border-line pt-4">
                <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Offices</p>
                {offices.map((o) => (
                  <div key={o.city}>
                    <p className="font-medium text-fg">
                      {o.city} <span className="font-mono text-[11px] text-accent">{o.tag}</span>
                    </p>
                    <p className="text-sm text-muted">{o.address.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel p-6 md:p-10 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
