import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="px-4 pt-24 pb-24">
      <div className="mx-auto max-w-[680px] pt-12">
        <p className="eyebrow">Legal</p>
        <h1 className="hero-heading mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-subtle">Last updated {updated}</p>
        <div className="mt-12 flex flex-col gap-6 text-muted [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg [&_a]:text-fg [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </article>
  );
}
