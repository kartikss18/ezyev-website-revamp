import type { Metadata } from "next";
import Link from "next/link";
import { offices, site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact EzyEV for EV battery swapping in Pune, Mumbai, and Nagpur. Share your fleet profile for a fixed monthly Battery-as-a-Service plan.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us about your fleet. We will build the plan."
        intro="Share your vehicle types, fleet size, and daily routes. Our operations team maps your mileage to our swap network and returns a fixed monthly plan."
      />

      <section aria-label="Contact form and offices" className="bg-surface py-20 md:py-28">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="panel bg-ground p-6 md:p-10 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-4 lg:col-span-5" aria-label="Direct contact and offices">
            <a
              href={`mailto:${site.email}`}
              className="panel block bg-ground p-6 transition-colors hover:border-accent/60"
            >
              <span className="font-mono text-[11px] tracking-wider text-subtle uppercase">Email us</span>
              <span className="mt-2 block text-lg font-medium text-fg">{site.email}</span>
            </a>

            <a
              href={site.phoneHref}
              className="panel block bg-ground p-6 transition-colors hover:border-accent/60"
            >
              <span className="font-mono text-[11px] tracking-wider text-subtle uppercase">Call us</span>
              <span className="mt-2 block font-mono text-lg font-medium text-fg tabular-nums">{site.phone}</span>
            </a>

            <div className="panel space-y-6 bg-ground p-6">
              <h2 className="font-mono text-[11px] tracking-wider text-subtle uppercase">Offices</h2>
              <ul className="space-y-6">
                {offices.map((o) => (
                  <li key={o.city} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-fg">{o.city}</span>
                      <span className="font-mono text-[11px] text-accent">{o.tag}</span>
                    </div>
                    <address className="mt-1.5 text-sm not-italic text-muted">
                      {o.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <Link
                      href={`/ev-battery-service/${o.slug}`}
                      className="mt-2 inline-flex min-h-[44px] items-center font-mono text-xs text-fg hover:text-accent"
                    >
                      EV Battery Service in {o.city} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
