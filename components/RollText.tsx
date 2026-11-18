export function RollText({ text }: { text: string }) {
  const chars = Array.from(text);

  return (
    <span className="roll-wrap relative inline-flex overflow-hidden leading-[1.15]">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((ch, i) => (
          <span
            key={`a-${i}`}
            className="roll-ch roll-ch-top inline-block"
            style={{ transitionDelay: `${Math.min(i * 14, 220)}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      <span aria-hidden className="roll-row-clone pointer-events-none absolute top-full left-0 inline-flex">
        {chars.map((ch, i) => (
          <span
            key={`b-${i}`}
            className="roll-ch roll-ch-bot inline-block"
            style={{ transitionDelay: `${Math.min(i * 14, 220)}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
