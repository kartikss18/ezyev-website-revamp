import Link from "next/link";
import { site } from "@/content/site";
import { RollText } from "./RollText";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-4 text-3xl leading-[1.08] font-light tracking-[-0.03em] text-fg md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-ground pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.02] font-light tracking-[-0.04em] text-fg md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {intro}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-6 text-left text-base font-medium text-fg transition-colors hover:text-accent md:text-lg">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full border border-line font-mono text-sm text-muted group-open:border-accent/50 group-open:text-accent"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function WorkWithUsBand({
  eyebrow = "Work with us",
  title = "Electrify your fleet with fixed monthly power.",
  body = "Partner with EzyEV for automated battery swapping, battery leasing, or OEM / fleet integration across Pune, Mumbai, and Nagpur.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section aria-label="Work with us" className="border-t border-line bg-surface py-20 md:py-28">
      <div className="wrap">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-4 text-3xl leading-[1.06] font-light tracking-[-0.03em] text-fg md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link href={site.primaryCta.href} className="btn-primary">
              <RollText text={site.primaryCta.label} />
            </Link>
            <a href={`mailto:${site.email}`} className="btn-secondary">
              <RollText text="Email ops team" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
