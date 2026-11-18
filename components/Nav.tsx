"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { RollText } from "./RollText";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="relative z-50 flex w-full max-w-fit items-center gap-6 rounded-full border border-line bg-surface/85 py-2 pr-2 pl-4 backdrop-blur-xl max-lg:w-full max-lg:max-w-full max-lg:justify-between"
      >
        <Logo onClick={() => setOpen(false)} />

        <ul className="flex items-center gap-1 max-lg:hidden">
          {nav.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold transition-colors duration-300 ease-brand ${
                    current ? "bg-hover text-fg" : "text-muted hover:bg-raised hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href={site.primaryCta.href} className="btn-primary !text-sm max-sm:hidden">
            <RollText text={site.primaryCta.label} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex size-11 items-center justify-center rounded-full border border-line-strong bg-raised text-fg transition-colors duration-300 ease-brand hover:bg-hover active:scale-[0.98] lg:hidden"
          >
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded-full bg-fg transition-transform duration-300 ease-brand ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded-full bg-fg transition-transform duration-300 ease-brand ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu — sits below z-50 header pill so logo & close button stay visible */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ground/95 px-5 pt-28 pb-8 backdrop-blur-2xl lg:hidden"
      >
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {nav.map((item, i) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={`flex min-h-[60px] items-center justify-between py-3 text-xl font-medium transition-colors duration-300 ease-brand ${
                    current ? "text-accent" : "text-fg hover:text-accent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="font-mono text-sm text-subtle" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="space-y-4 pt-6">
          <Link
            href={site.primaryCta.href}
            onClick={() => setOpen(false)}
            className="btn-primary w-full"
          >
            <RollText text={site.primaryCta.label} />
            <span aria-hidden>→</span>
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 font-mono text-xs text-muted">
            <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center hover:text-fg">
              {site.email}
            </a>
            <a href={site.phoneHref} className="inline-flex min-h-[44px] items-center hover:text-fg">
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
