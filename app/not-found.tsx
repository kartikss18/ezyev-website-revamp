import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="px-4 pt-24 pb-24">
      <div className="mx-auto flex max-w-[42.5rem] pt-12 flex-col items-center text-center">
        <Image src="/images/ezyev-mark.png" alt="" width={64} height={64} className="size-16" />
        <p className="eyebrow mt-8 font-mono">Error 404</p>
        <h1 className="hero-heading mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          This route ran out of charge
        </h1>
        <p className="mt-6 text-lg text-muted">
          The page you were looking for has moved or never existed. Head back home, or pick a page below.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft size="1.125rem" weight="bold" aria-hidden />
          Back to home
        </Link>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {nav.slice(1).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-muted transition-colors duration-300 ease-brand hover:bg-raised hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
