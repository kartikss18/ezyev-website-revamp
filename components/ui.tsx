import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Plus, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";

export function Section({
  id,
  children,
  className = "",
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`px-4 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div data-reveal className={`max-w-[680px] ${centered ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}

/* Hero used by inner pages. The heading carries the white to grey text gradient. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="px-4 pt-24 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl pt-12 text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="hero-heading mx-auto mt-4 max-w-[680px] text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-[680px] text-lg text-muted">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function PrimaryCta({ label = site.primaryCta.label }: { label?: string }) {
  return (
    <Link href={site.primaryCta.href} className="btn-primary group">
      {label}
      <ArrowRight
        size={18}
        weight="bold"
        aria-hidden
        className="transition-transform duration-500 ease-brand group-hover:translate-x-1"
      />
    </Link>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted">
          <CheckCircle size={24} weight="fill" aria-hidden className="shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-line bg-surface transition-colors duration-300 ease-brand open:bg-raised hover:bg-raised"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl p-6 text-lg font-semibold">
            {item.q}
            <Plus size={20} weight="bold" aria-hidden className="faq-icon shrink-0 text-accent" />
          </summary>
          <p className="px-6 pb-6 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* Final call to action, identical promise to the hero. */
export function CtaBand({
  title = (
    <>
      Keep every rider on the road.
      <br className="max-sm:hidden" /> Let us carry the batteries.
    </>
  ),
  body = "Tell us your fleet size and daily routes. We will map your mileage and send a fixed monthly plan built around it.",
}: {
  title?: ReactNode;
  body?: string;
}) {
  return (
    <section aria-label="Get started" className="px-4 py-20 md:py-24">
      <div
        data-reveal
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-lime p-8 text-ink md:p-16"
      >
        <BrandWatermark />
        <h2 className="relative max-w-[680px] text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
        <p className="relative mt-6 max-w-[680px] text-lg text-ink/70">{body}</p>
        <div className="relative mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={site.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 focus-visible:outline-ink text-base font-semibold text-white transition-transform duration-500 ease-brand hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {site.primaryCta.label}
            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden
              className="transition-transform duration-500 ease-brand group-hover:translate-x-1"
            />
          </Link>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-ink/70">
            <li>No upfront battery cost</li>
            <li aria-hidden>·</li>
            <li>Fixed monthly plan</li>
            <li aria-hidden>·</li>
            <li>We maintain every battery</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Oversized logo mark bleeding off the right edge of lime bands */
export function BrandWatermark() {
  return (
    <Image
      src="/images/ezyev-mark-large.png"
      alt=""
      aria-hidden
      width={426}
      height={426}
      className="pointer-events-none absolute -right-24 -bottom-24 size-[28rem] opacity-25 mix-blend-multiply max-md:hidden"
    />
  );
}
