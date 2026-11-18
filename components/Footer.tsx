import Link from "next/link";
import { offices, site } from "@/content/site";
import { BrandMark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#070908] text-fg">
      <div className="wrap py-16 md:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Direct Contact */}
          <div className="space-y-6 lg:col-span-4">
            <Link
              href="/"
              aria-label="EzyEV home"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <BrandMark tone="mono-dark" className="size-8 shrink-0" />
              <span className="text-lg font-semibold tracking-tight text-fg">EzyEV</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="space-y-2 pt-2">
              <p className="font-mono text-[11px] tracking-widest text-subtle uppercase">
                Further queries
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-[44px] items-center text-lg font-medium tracking-tight text-fg underline decoration-accent/60 underline-offset-8 transition-colors duration-300 ease-brand hover:text-accent"
              >
                {site.email}
              </a>
              <div>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-[44px] items-center font-mono text-sm text-muted tabular-nums transition-colors duration-300 ease-brand hover:text-fg"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Platform & Company Links */}
          <nav aria-label="Platform links" className="lg:col-span-2">
            <h2 className="font-mono text-xs font-medium tracking-widest text-subtle uppercase">
              Platform
            </h2>
            <ul className="mt-4 flex flex-col">
              {[
                { label: "Product & BaaS", href: "/product" },
                { label: "Fleet Services", href: "/services" },
                { label: "What We Do", href: "/what-we-do" },
                { label: "Cities We Serve", href: "/cities" },
                { label: "Plans & Pricing", href: "/price" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted transition-colors duration-300 ease-brand hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources & Legal */}
          <nav aria-label="Company and legal" className="lg:col-span-2">
            <h2 className="font-mono text-xs font-medium tracking-widest text-subtle uppercase">
              Company
            </h2>
            <ul className="mt-4 flex flex-col">
              {[
                { label: "Careers", href: "/careers" },
                { label: "FAQ", href: "/faq" },
                { label: "Updates & News", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted transition-colors duration-300 ease-brand hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cities & Socials */}
          <div className="space-y-8 lg:col-span-4">
            <div>
              <h2 className="font-mono text-xs font-medium tracking-widest text-subtle uppercase">
                Active Hubs
              </h2>
              <ul className="mt-4 space-y-4 text-sm">
                {offices.map((o) => (
                  <li key={o.city}>
                    <Link
                      href={`/ev-battery-service/${o.slug}`}
                      className="inline-flex min-h-[44px] flex-col justify-center group"
                    >
                      <span className="font-medium text-fg group-hover:text-accent">
                        {o.city}{" "}
                        <span className="ml-1.5 font-mono text-[11px] text-subtle">{o.tag}</span>
                      </span>
                      <span className="text-xs text-muted">{o.address.join(", ")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium tracking-widest text-subtle uppercase">
                Connect
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`EzyEV on ${s.label}`}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-line px-3.5 font-mono text-xs text-muted transition-colors duration-300 ease-brand hover:border-line-strong hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Hairline Legal & Engineering Dimension Row */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-subtle">
          <span>© {year} {site.legalName}. All rights reserved.</span>
          <span>Pune · Mumbai · Nagpur</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
