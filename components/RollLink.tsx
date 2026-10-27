import Link from "next/link";

/*
  Letter roll link (footer). On hover or keyboard focus each letter slides up in turn
  and an accent copy rolls in from below. Inspired by theouternet.company.
*/
export function RollLink({
  href,
  label,
  external = false,
  current = false,
}: {
  href: string;
  label: string;
  external?: boolean;
  current?: boolean;
}) {
  const letters = Array.from(label);

  const row = (copy: boolean) => (
    <span aria-hidden={copy || undefined} className={copy ? "absolute top-full left-0 inline-flex text-accent" : "inline-flex"}>
      {letters.map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-500 ease-brand group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full motion-reduce:transition-none"
          style={{ transitionDelay: `${i * 15}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );

  const inner = (
    <span className="relative inline-flex overflow-hidden">
      {row(false)}
      {row(true)}
    </span>
  );
  const className = `group/roll inline-block rounded-sm text-sm ${current ? "text-fg" : "text-muted"}`;

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} aria-label={label} aria-current={current ? "page" : undefined} className={className}>
      {inner}
    </Link>
  );
}
