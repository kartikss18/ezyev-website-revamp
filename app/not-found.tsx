import Link from "next/link";
import { nav } from "@/content/site";
import { BrandMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center bg-ground pt-28 pb-24">
      <div className="wrap max-w-2xl text-center">
        <div className="mx-auto flex justify-center">
          <BrandMark tone="color" className="h-14 w-14" />
        </div>
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-fg md:text-6xl">
          This route ran out of charge.
        </h1>
        <p className="mt-4 text-base text-muted">
          The page you requested has moved or does not exist. Return home or jump to a section below.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="btn-secondary">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
