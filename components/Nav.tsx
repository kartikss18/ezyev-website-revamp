"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="relative z-10 flex w-full max-w-fit items-center gap-6 rounded-full border border-line bg-surface/70 py-2 pr-2 pl-4 backdrop-blur-xl max-lg:w-full max-lg:max-w-full max-lg:justify-between"
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
                  className={`block rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-brand ${
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
          <Link
            href={site.primaryCta.href}
            className="btn-primary !text-sm max-sm:hidden"
          >
            Get a fleet plan
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex size-10 items-center justify-center rounded-full bg-raised transition-colors duration-300 ease-brand hover:bg-hover active:scale-[0.98] lg:hidden"
          >
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded-full bg-fg transition-transform duration-500 ease-brand ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 rounded-full bg-fg transition-transform duration-500 ease-brand ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu: full height panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 bg-base/90 backdrop-blur-2xl lg:hidden"
      >
        <ul className="flex flex-col gap-2 px-4 pt-24">
          {nav.map((item, i) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li
                key={item.href}
                className="menu-item"
                style={{ animationDelay: `${Math.min(i * 60, 400)}ms` }}
              >
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-3xl font-semibold transition-colors duration-300 ease-brand ${
                    current ? "bg-surface text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  {current && <span className="size-2 rounded-full bg-lime" aria-hidden />}
                </Link>
              </li>
            );
          })}
          <li
            className="menu-item mt-6"
            style={{ animationDelay: `${Math.min(nav.length * 60, 400)}ms` }}
          >
            <Link href={site.primaryCta.href} className="btn-primary w-full">
              {site.primaryCta.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
