import Image from "next/image";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { RollLink } from "./RollLink";

/*
  Full bleed footer, always dark in both themes (data-theme="dark" scopes the dark tokens here).
  Layout inspired by theouternet.company: big email, letter roll links, a drafting style
  dimension line, and an oversized wordmark with the EzyEV rider arriving on top of it.
*/

const cities = [
  { city: "Pune", line: "Kondhwa, Pune 411048", tag: "HQ" },
  { city: "Mumbai", line: "Juhu, Mumbai 400049" },
  { city: "Nagpur", line: "Kamptee Road, Nagpur 440026" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-night text-fg">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Battery as a Service for electric 2W and 3W fleets. Swap in 60 seconds, pay one fixed monthly plan.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-2xl tracking-tight underline decoration-lime decoration-2 underline-offset-8 transition-colors duration-300 ease-brand hover:text-lime"
            >
              {site.email}
            </a>
            <p className="mt-3">
              <a href={site.phoneHref} className="text-sm text-muted tabular-nums transition-colors duration-300 ease-brand hover:text-fg">
                {site.phone}
              </a>
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="mb-4 text-sm font-semibold text-accent">Site</h2>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <RollLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mb-4 text-sm font-semibold text-accent">Cities</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {cities.map((c) => (
                <li key={c.city}>
                  <span className="text-fg">{c.city}</span>
                  {c.tag && <span className="ml-2 text-xs text-subtle">{c.tag}</span>}
                  <span className="block text-muted">{c.line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-accent">Elsewhere</h2>
              <ul className="flex flex-col gap-3">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <RollLink href={s.href} label={s.label} external />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-accent">Legal</h2>
              <ul className="flex flex-col gap-3">
                <li>
                  <RollLink href="/privacy" label="Privacy policy" />
                </li>
                <li>
                  <RollLink href="/terms" label="Terms of use" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dimension line, like a technical drawing */}
      <div className="px-4 sm:px-8">
        <svg aria-hidden viewBox="0 0 1000 22" preserveAspectRatio="none" className="h-6 w-full text-subtle" fill="none">
          <line x1="2" y1="11" x2="998" y2="11" stroke="currentColor" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
          <line x1="2" y1="2" x2="2" y2="20" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          <path d="M11 6 2 11l9 5" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          <line x1="998" y1="2" x2="998" y2="20" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          <path d="M989 6l9 5-9 5" stroke="currentColor" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-xs font-semibold tracking-widest text-subtle uppercase">
          <span>© {year} {site.legalName}</span>
          <span className="max-sm:hidden">Pune. Mumbai. Nagpur.</span>
          <span>Clean. Connected. Charged.</span>
        </div>
      </div>

      {/* Full wordmark, edge to edge, with the rider arriving along the tops of the letters */}
      <div aria-hidden className="mt-8 px-4 pt-24 pb-8 sm:px-8 md:mt-16">
        <div className="relative">
          {/* viewBox fits the measured glyph bounds of "EzyEV" in Geist 600, so nothing is cropped */}
          <svg viewBox="0 0 1000 263" className="block w-full select-none">
            <text
              x="-26"
              y="216"
              textLength="1028"
              lengthAdjust="spacingAndGlyphs"
              fontSize="300"
              fontWeight="600"
              fill="currentColor"
              fillOpacity="0.09"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              EzyEV
            </text>
          </svg>
          <div
            data-reveal="edge"
            className="footer-rider pointer-events-none absolute right-0 bottom-full z-10 -mb-2 w-[clamp(6rem,12vw,10rem)]"
          >
            <Image
              src="/images/scooter-rider.png"
              alt=""
              width={560}
              height={550}
              sizes="160px"
              className="footer-rider-bob h-auto w-full"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
