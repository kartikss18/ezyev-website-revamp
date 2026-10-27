import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  ChartLineUp,
  Clock,
  Code,
  EnvelopeSimple,
  MapPin,
  UsersThree,
  Leaf,
} from "@phosphor-icons/react/dist/ssr";
import { roles } from "@/content/careers";
import { site } from "@/content/site";
import { BrandWatermark, PageHero, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join EzyEV in Pune and help build the battery swapping network for India's electric delivery fleets. See open roles and how we hire.",
  alternates: { canonical: "/careers" },
};

const reasons = [
  {
    icon: Code,
    title: "Work across the whole stack",
    body: "App, IoT stations and cloud backend are all built in house, so your work reaches real hardware on real streets.",
  },
  {
    icon: ChartLineUp,
    title: "Impact you can count",
    body: "Every swap and every clean kilometre shows up on a live counter. You will see what your work moves.",
  },
  {
    icon: UsersThree,
    title: "Small team, real ownership",
    body: "You own problems end to end and work directly with the founder and the operations team.",
  },
  {
    icon: Leaf,
    title: "Cleaner cities",
    body: "Each fleet that switches to EzyEV takes petrol two wheelers off the road in Pune, Mumbai and Nagpur.",
  },
] as const;

const hiring = [
  { title: "Apply", body: "Send your CV and a line on why EzyEV. Links to your work help." },
  { title: "Intro call", body: "A short conversation about you, the role and how the team works." },
  { title: "Practical round", body: "A focused task or discussion close to the real work you would do." },
  { title: "Offer", body: "Meet the founder, agree on details, and pick a start date." },
] as const;

function applyHref(title: string) {
  const subject = encodeURIComponent(`Application: ${title}`);
  return `mailto:${site.email}?subject=${subject}`;
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Help electrify
            <br className="max-sm:hidden" /> India&apos;s delivery fleets
          </>
        }
        intro="We are a small team in Pune building battery swapping for the riders who keep cities fed and supplied. If you like work that ships to the street, we would like to meet you."
      >
        <div className="mt-8 flex justify-center">
          <a href="#roles" className="btn-primary group">
            See open roles
            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden
              className="transition-transform duration-500 ease-brand group-hover:translate-x-1"
            />
          </a>
        </div>
      </PageHero>

      <Section label="Why EzyEV" className="!pt-0">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div data-reveal className="overflow-hidden rounded-3xl bg-lime p-8 md:p-12">
            <Image
              src="/images/station-helper-rider.png"
              alt="An EzyEV team member carries a charged battery to a rider"
              width={1713}
              height={1462}
              sizes="(min-width: 768px) 560px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Why join" title="Build something riders use every day" />
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r.title} data-reveal className="card p-6">
                  <r.icon size={24} aria-hidden className="text-accent" />
                  <h3 className="mt-4 font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="roles" label="Open roles" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Open roles"
          title={roles.length ? `${roles.length} open ${roles.length === 1 ? "role" : "roles"}` : "No open roles right now"}
        />

        {roles.length ? (
          <ul className="mt-12 flex flex-col gap-4">
            {roles.map((role) => (
              <li key={role.slug} id={role.slug} data-reveal className="card p-2">
                <article className="grid gap-8 rounded-2xl bg-raised p-6 md:grid-cols-12 md:p-8">
                  <div className="md:col-span-7">
                    <p className="eyebrow">{role.team}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{role.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2 text-sm text-muted">
                      <li className="flex items-center gap-1 rounded-full bg-surface px-3 py-1">
                        <MapPin size={16} aria-hidden /> {role.location}
                      </li>
                      <li className="flex items-center gap-1 rounded-full bg-surface px-3 py-1">
                        <Clock size={16} aria-hidden /> {role.type}
                      </li>
                    </ul>
                    <p className="mt-6 text-muted">{role.summary}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-6 md:col-span-5">
                    <div>
                      <h4 className="text-sm font-semibold text-subtle">You will</h4>
                      <ul className="mt-3 flex list-disc flex-col gap-2 pl-4 text-muted marker:text-accent">
                        {role.youWill.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <a href={applyHref(role.title)} className="btn-primary w-fit">
                      Apply for this role
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div data-reveal className="card mt-12 flex flex-col items-center p-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-raised">
              <Briefcase size={24} aria-hidden className="text-accent" />
            </span>
            <h3 className="mt-6 text-xl font-semibold">We are not hiring for a specific role today</h3>
            <p className="mt-2 max-w-md text-muted">
              We still read every application. Send your CV and we will reach out when something fits.
            </p>
            <a href={applyHref("Open application")} className="btn-primary mt-6">
              Send an open application
            </a>
          </div>
        )}
      </Section>

      <Section label="How we hire">
        <SectionHeading eyebrow="How we hire" title="Four steps, no surprises" align="center" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hiring.map((h, i) => (
            <li key={h.title} data-reveal className="card p-6">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold">{h.title}</h3>
              <p className="mt-2 text-muted">{h.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section aria-label="Open application" className="px-4 py-20 md:py-24">
        <div data-reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-lime p-8 text-ink md:p-16">
          <BrandWatermark />
          <h2 className="relative max-w-[680px] text-3xl font-semibold tracking-tight md:text-5xl">
            Don&apos;t see your role?
            <br className="max-sm:hidden" /> Write to us anyway.
          </h2>
          <p className="relative mt-6 max-w-[680px] text-lg text-ink/70">
            Engineers, operations people and city launch folks: tell us what you want to build at EzyEV.
          </p>
          <a
            href={applyHref("Open application")}
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-base font-semibold text-white transition-transform duration-500 ease-brand hover:-translate-y-0.5 focus-visible:outline-ink active:scale-[0.98]"
          >
            <EnvelopeSimple size={18} weight="bold" aria-hidden />
            Send an open application
          </a>
        </div>
      </section>
    </>
  );
}
