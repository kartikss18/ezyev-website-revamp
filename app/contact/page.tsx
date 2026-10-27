import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { offices, site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell EzyEV about your electric 2W or 3W fleet and get a fixed monthly battery plan. Offices in Pune, Mumbai and Nagpur.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us about your fleet.
            <br className="max-sm:hidden" /> We will build the plan.
          </>
        }
        intro="Share your fleet size and the routes you run. Our operations team maps your daily kilometres to our stations and comes back with a fixed monthly battery plan."
      />

      <Section label="Contact form" className="!pt-0">
        <div className="grid gap-4 lg:grid-cols-12">
          <div data-reveal className="card p-2 lg:col-span-8">
            <div className="h-full rounded-2xl bg-raised p-6 md:p-8">
              <ContactForm />
            </div>
          </div>

          <aside data-reveal className="flex flex-col gap-4 lg:col-span-4" aria-label="Other ways to reach us">
            <a
              href={`mailto:${site.email}`}
              className="card group flex items-center gap-4 p-6 transition-colors duration-300 ease-brand hover:bg-raised active:scale-[0.98]"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-raised group-hover:bg-hover">
                <EnvelopeSimple size="1.5rem" aria-hidden className="text-accent" />
              </span>
              <span>
                <span className="block text-sm text-muted">Email us</span>
                <span className="block font-semibold">{site.email}</span>
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="card group flex items-center gap-4 p-6 transition-colors duration-300 ease-brand hover:bg-raised active:scale-[0.98]"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-raised group-hover:bg-hover">
                <Phone size="1.5rem" aria-hidden className="text-accent" />
              </span>
              <span>
                <span className="block text-sm text-muted">Call us</span>
                <span className="block font-semibold tabular-nums">{site.phone}</span>
              </span>
            </a>
            <div className="card flex-1 p-6">
              <h2 className="text-sm font-semibold text-subtle">Offices</h2>
              <ul className="mt-4 flex flex-col gap-6">
                {offices.map((o) => (
                  <li key={o.city} className="flex gap-3">
                    <MapPin size="1.25rem" weight="fill" aria-hidden className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">
                        {o.city} <span className="text-sm font-normal text-subtle">{o.tag}</span>
                      </p>
                      <address className="mt-1 text-sm not-italic text-muted">
                        {o.address.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </address>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
