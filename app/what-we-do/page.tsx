import type { Metadata } from "next";
import Image from "next/image";
import {
  Brain,
  Clock,
  Coins,
  Eye,
  Gauge,
  Handshake,
  Leaf,
  MapPin,
  NavigationArrow,
  Rocket,
  Target,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { offices } from "@/content/site";
import { ImpactCounters } from "@/components/ImpactCounters";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "EzyEV runs battery swapping and battery lifecycle management for electric 2W and 3W fleets in Pune, Mumbai and Nagpur. Our mission, services, values and team.",
  alternates: { canonical: "/what-we-do" },
};

const purpose = [
  {
    icon: Target,
    title: "Mission",
    body: "Reduce the environmental impact of transportation while making EV operations more convenient and more efficient for the people who run them.",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "Become the leading provider of EV energy solutions in a world where electric vehicles are the norm.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    body: "Build trust with customers, partners and employees through honest communication and fair practice.",
  },
] as const;

const services = [
  {
    icon: Clock,
    title: "Higher fleet uptime",
    body: "Rapid swaps put vehicles back on the road in about a minute, so your fleet spends the day earning.",
  },
  {
    icon: Brain,
    title: "Decisions backed by data",
    body: "AI powered analytics and reports show uptime, energy use and cost per vehicle across the fleet.",
  },
  {
    icon: NavigationArrow,
    title: "Smart station finder",
    body: "The rider app recommends the nearest station with a charged battery ready.",
  },
  {
    icon: Coins,
    title: "Lower operating cost",
    body: "Fixed monthly plans, no battery replacement bills and fewer idle hours bring your cost per kilometre down.",
  },
  {
    icon: Gauge,
    title: "Smoother operations",
    body: "Battery allocation, health checks and maintenance are handled by us, so your team manages riders, not batteries.",
  },
  {
    icon: MapPin,
    title: "Stations where you need them",
    body: "Stations sit on busy commercial corridors, close to where your riders already pick up and drop off.",
  },
] as const;

const values = [
  {
    icon: Users,
    title: "Customers first",
    body: "We start from what operators and riders need on the road and build the service around it.",
  },
  {
    icon: Rocket,
    title: "Keep building",
    body: "Our stations, app and backend are built in house, so we can keep improving every part of the service.",
  },
  {
    icon: Leaf,
    title: "Cleaner energy",
    body: "We promote clean, renewable energy through eco friendly EzySwap stations.",
  },
] as const;

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            We run the batteries
            <br className="max-sm:hidden" /> so your fleet runs the routes
          </>
        }
        intro="EzyEV is a Battery as a Service company for electric 2W and 3W fleet operators. We own, charge, swap and maintain the batteries, and operators pay a fixed monthly plan for the energy their vehicles use."
      />

      <Section label="About EzyEV" className="!pt-0">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div data-reveal className="overflow-hidden rounded-3xl bg-stage p-8">
            <Image
              src="/images/swap-station-delivery.png"
              alt="An EzyEV swap station in a city with a delivery rider arriving"
              width={2187}
              height={1588}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Making electric delivery work at fleet scale"
              intro="Electric two and three wheelers are cheaper to run, but for a delivery business the battery is still the hard part: it is expensive upfront, slow to charge and hard to keep healthy. EzyEV takes that part off the operator's plate."
            />
            <ul data-reveal className="mt-8 grid gap-2 sm:grid-cols-2">
              {[
                "Mobile app, IoT stations and cloud backend built in house",
                "No staff needed at stations, just a smartphone",
                "Designed for delivery fleets, shared mobility and logistics",
                "Affordable for drivers, efficient for operators, better for the planet",
              ].map((t) => (
                <li key={t} className="rounded-2xl bg-surface p-4 text-sm text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section label="Mission and vision">
        <div className="grid gap-4 md:grid-cols-3">
          {purpose.map((p) => (
            <article key={p.title} data-reveal className="card p-8">
              <p.icon size="2rem" aria-hidden className="text-accent" />
              <h2 className="mt-6 text-2xl font-semibold">{p.title}</h2>
              <p className="mt-3 text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Services">
        <SectionHeading
          eyebrow="Services for fleets"
          title="Everything between the plug and the rider is ours to run"
          intro="Whether you operate twenty vehicles or a city wide network, these are the outcomes we are accountable for."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              data-reveal
              className="card p-8 transition-transform duration-500 ease-brand hover:-translate-y-1"
            >
              <s.icon size="2rem" aria-hidden className="text-accent" />
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Impact">
        <SectionHeading eyebrow="Impact so far" title="What the network has done since January 2026" />
        <div data-reveal className="mt-12">
          <ImpactCounters />
        </div>
      </Section>

      <Section label="Values">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Core values" title="The philosophy behind how we work" />
          </div>
          <ul className="grid gap-4 md:col-span-8">
            {values.map((v) => (
              <li key={v.title} data-reveal className="card flex gap-6 p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-raised">
                  <v.icon size="1.5rem" aria-hidden className="text-accent" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1 text-muted">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label="Leadership">
        <div data-reveal className="rounded-3xl border border-line bg-surface p-2">
          <div className="grid gap-8 rounded-2xl bg-olive p-8 md:grid-cols-12 md:p-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Leadership</p>
              <div
                aria-hidden
                className="mt-6 flex size-24 items-center justify-center rounded-full bg-lime text-3xl font-semibold text-ink"
              >
                FA
              </div>
              <h2 className="mt-6 text-2xl font-semibold">Faizan Ahmed</h2>
              <p className="text-muted">Founder and CEO</p>
            </div>
            <div className="flex flex-col gap-4 text-lg text-muted md:col-span-8">
              <p>
                Faizan spent nearly two decades in sales and business development at global technology companies
                including Oracle, Slack and SAP before founding EzyEV.
              </p>
              <p>
                He started the company to deliver sustainable, cost effective energy to businesses, helping them meet
                their environmental commitments while running their fleets more efficiently.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section label="Cities">
        <SectionHeading
          eyebrow="Where we operate"
          title="Live in Pune, Mumbai and Nagpur"
          intro="Headquartered in Pune and expanding across tier 1 and tier 2 Indian cities."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {offices.map((o) => (
            <article key={o.city} data-reveal className="card flex flex-col p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">{o.city}</h3>
                <span className="rounded-full bg-raised px-3 py-1 text-xs font-semibold text-accent">{o.tag}</span>
              </div>
              <p className="mt-4 text-muted">{o.summary}</p>
              <address className="mt-6 text-sm not-italic text-subtle">
                {o.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
