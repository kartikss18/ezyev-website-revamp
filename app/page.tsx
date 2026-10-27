import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowsClockwise,
  ChartLineUp,
  CurrencyInr,
  Lightning,
  MapPin,
  Moped,
  Package,
  Plugs,
  Van,
  Wrench,
  XCircle,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { faqs, offices } from "@/content/site";
import { ImpactCounters, ImpactLine } from "@/components/ImpactCounters";
import { TaglineReveal } from "@/components/TaglineReveal";
import { CtaBand, FaqList, PrimaryCta, Section, SectionHeading } from "@/components/ui";

export const metadata = {
  alternates: { canonical: "/" },
};

const benefits = [
  {
    icon: Lightning,
    title: "60 second swaps, any hour",
    body: "Riders swap a drained battery for a charged one at automated stations that run 24x7. No charging queue, no idle vehicles.",
  },
  {
    icon: ChartLineUp,
    title: "One predictable monthly cost",
    body: "Minimal upfront capex and a fixed monthly battery plan, so your cost per vehicle is known before the month starts.",
  },
  {
    icon: Package,
    title: "Live data on every battery",
    body: "Track state of charge, battery health, energy use and routes for the whole fleet from one partner dashboard.",
  },
  {
    icon: Wrench,
    title: "Maintenance is on us",
    body: "We charge, monitor and maintain the full battery lifecycle, with preventive checks before a battery ever lets a rider down.",
  },
] as const;

const steps = [
  {
    title: "Share your fleet",
    body: "Tell us how many vehicles you run, the models, and the kilometres each one covers in a day.",
  },
  {
    title: "Get a fixed monthly plan",
    body: "We map your routes to our stations and send a plan priced per vehicle, with no battery to buy upfront.",
  },
  {
    title: "Start swapping",
    body: "Your riders get the EzyEV app, you get the partner dashboard, and the fleet starts swapping at stations on its routes.",
  },
] as const;

const products = [
  {
    anchor: "swapping",
    name: "Battery swapping",
    line: "60 second swaps. Zero downtime.",
    body: "For delivery fleets that cannot afford a vehicle sitting at a charger.",
  },
  {
    anchor: "leasing",
    name: "Battery leasing",
    line: "Own the vehicle. Lease the power.",
    body: "For drivers and operators who want a lower vehicle price and a fixed battery bill.",
  },
  {
    anchor: "retrofit",
    name: "Retrofit kit",
    line: "Electrify the fleet you already run.",
    body: "For 2W and 3W operators converting existing vehicles instead of replacing them.",
  },
] as const;

const segments = [
  { icon: Package, label: "Last mile delivery", body: "Food, grocery and parcel riders working long shifts" },
  { icon: Moped, label: "2W courier fleets", body: "Document and parcel runs across the city" },
  { icon: Van, label: "Electric rickshaw operators", body: "Passenger and cargo three wheelers" },
  { icon: ArrowsClockwise, label: "Shared mobility", body: "Rental and subscription scooter fleets" },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="px-4 pt-24 pb-12">
        <div className="mx-auto max-w-6xl pt-12 text-center">
          <p className="eyebrow">Battery as a Service for 2W and 3W fleets</p>
          <h1 className="hero-heading mx-auto mt-4 max-w-[42.5rem] text-4xl font-semibold tracking-tight sm:text-5xl">
            60 second battery swaps
            <br className="max-sm:hidden" /> for India&apos;s EV fleets
          </h1>
          <p className="mx-auto mt-6 max-w-[42.5rem] text-lg text-muted">
            EzyEV leases the battery and runs the swap network, so your delivery riders never wait at a
            charger. Buy each vehicle for up to 40% less and pay one fixed monthly plan.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCta />
          </div>
          <div className="mt-6">
            <ImpactLine />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-stage p-8 md:p-12">
          <Image
            src="/images/swap-station-delivery.png"
            alt="A delivery rider on an electric scooter pulls up to an EzyEV swap station where an attendant holds a charged battery"
            width={2187}
            height={1588}
            priority
            sizes="(min-width: 896px) 70vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* 2. Live proof */}
      <Section label="Network impact" className="!pt-0">
        <div data-reveal>
          <ImpactCounters />
        </div>
      </Section>

      {/* 3. Problem to solution */}
      <Section label="Why swap instead of charge">
        <SectionHeading
          eyebrow="The problem"
          title="Every hour at a charger is an hour without deliveries"
          intro="Plug in charging was built for private cars that sit parked overnight. Delivery fleets run all day, and every stop to charge shows up as lost orders."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div data-reveal className="card p-8">
            <div className="flex items-center gap-3">
              <Plugs size="1.5rem" aria-hidden className="text-subtle" />
              <h3 className="text-xl font-semibold text-muted">Charging your own batteries</h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {[
                "Riders wait hours at a plug instead of earning",
                "The battery inflates the price of every vehicle you buy",
                "A battery that degrades becomes your replacement bill",
                "You find out about battery health when a rider is stranded",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-muted">
                  <XCircle size="1.5rem" aria-hidden className="shrink-0 text-subtle" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-3xl border border-accent/40 bg-olive p-8">
            <div className="flex items-center gap-3">
              <Lightning size="1.5rem" weight="fill" aria-hidden className="text-accent" />
              <h3 className="text-xl font-semibold">Swapping with EzyEV</h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {[
                "A charged battery in about 60 seconds, 24x7",
                "Buy the vehicle for up to 40% less and lease the battery",
                "We charge, monitor and maintain every battery we hand over",
                "Live battery health and swap history for every vehicle",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle size="1.5rem" weight="fill" aria-hidden className="shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 4. Benefits */}
      <Section label="Benefits">
        <SectionHeading
          eyebrow="What you get"
          title="Lower vehicle cost, longer working hours"
          intro="Five things change for an operator the week they move to EzyEV."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article data-reveal className="card grid gap-6 overflow-hidden p-2 md:col-span-6 md:grid-cols-2">
            <div className="flex flex-col justify-center p-6 md:p-10">
              <CurrencyInr size="2rem" aria-hidden className="text-accent" />
              <h3 className="mt-6 text-3xl font-semibold tracking-tight">Up to 40% lower vehicle cost</h3>
              <p className="mt-4 text-lg text-muted">
                The battery is the most expensive part of an EV. Buy the vehicle without it, lease the battery
                from us, and put the difference into growing your fleet.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-lime p-8 md:p-12">
              <Image
                src="/images/savings.png"
                alt="A rider celebrates next to a large rupee banknote, showing lower vehicle cost"
                width={1221}
                height={973}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="h-auto w-full max-w-md"
              />
            </div>
          </article>
          {benefits.map((b) => (
            <article
              key={b.title}
              data-reveal
              className="card p-8 transition-transform duration-500 ease-brand hover:-translate-y-1 md:col-span-3"
            >
              <b.icon size="2rem" aria-hidden className="text-accent" />
              <h3 className="mt-6 text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-muted">{b.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 5. Tagline reveal */}
      <TaglineReveal
        lines={[
          "Riders should be earning,",
          "not waiting for a charge.",
          "We keep a full battery",
          "ready at every station.",
        ]}
      />

      {/* 6. How it works */}
      <Section label="How it works">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="From first call to first swap in three steps"
            />
            <ol className="mt-10 flex flex-col gap-4">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal className="card flex gap-6 p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime font-mono text-base font-semibold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal className="overflow-hidden rounded-3xl bg-lime p-8 md:p-12">
            <Image
              src="/images/station-helper-rider.png"
              alt="An EzyEV attendant carries a charged battery from a swap station to a rider"
              width={1713}
              height={1462}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Section>

      {/* 7. Products */}
      <Section label="Products">
        <SectionHeading
          eyebrow="Product"
          title="One battery network, three ways to use it"
          intro="Start with swapping, lease batteries for drivers, or convert vehicles you already own."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.anchor}
              href={`/product#${p.anchor}`}
              data-reveal
              className="card group flex flex-col p-8 transition-colors duration-300 ease-brand hover:bg-raised active:scale-[0.98]"
            >
              <p className="eyebrow">{p.name}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.line}</h3>
              <p className="mt-3 text-muted">{p.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg">
                See how it works
                <ArrowUpRight
                  size="1rem"
                  weight="bold"
                  aria-hidden
                  className="transition-transform duration-500 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 8. Who we serve and where */}
      <Section label="Who we serve">
        <div className="grid gap-4 md:grid-cols-2">
          <div data-reveal className="card flex flex-col p-8">
            <p className="eyebrow">Built for</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Fleets that run all day</h2>
            <ul className="mt-8 grid flex-1 grid-cols-2 gap-2">
              {segments.map((s) => (
                <li key={s.label} className="flex flex-col rounded-2xl bg-raised p-4">
                  <s.icon size="1.5rem" aria-hidden className="text-accent" />
                  <span className="mt-6 font-semibold">{s.label}</span>
                  <span className="mt-1 text-sm text-muted">{s.body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="card p-8">
            <p className="eyebrow">Where we operate</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Live in three cities</h2>
            <ul className="mt-8 flex flex-col gap-2">
              {offices.map((o) => (
                <li key={o.city} className="flex items-start gap-4 rounded-2xl bg-raised p-4">
                  <MapPin size="1.5rem" weight="fill" aria-hidden className="shrink-0 text-accent" />
                  <div>
                    <p className="font-semibold">
                      {o.city} <span className="text-sm font-normal text-subtle">{o.tag}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted">{o.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Running a fleet in another city?{" "}
              <Link href="/contact" className="font-semibold text-fg underline decoration-line underline-offset-4 transition-colors duration-300 ease-brand hover:decoration-accent">
                Ask us about expansion
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section id="faq" label="Frequently asked questions">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions operators ask us first"
              intro={
                <>
                  Something else on your mind? Write to{" "}
                  <a href="mailto:info@ezyev.in" className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
                    info@ezyev.in
                  </a>
                </>
              }
            />
          </div>
          <div data-reveal className="md:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Section>

      {/* 10. Risk reversal and final CTA */}
      <CtaBand />
    </>
  );
}
