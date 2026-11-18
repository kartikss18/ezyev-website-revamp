export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-ground pt-28 pb-24 md:pt-36">
      <div className="wrap max-w-3xl">
        <p className="eyebrow">Legal · Updated {updated}</p>
        <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] text-fg md:text-5xl">{title}</h1>
        <div className="mt-10 space-y-6 border-t border-line pt-8 text-base leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </article>
  );
}
