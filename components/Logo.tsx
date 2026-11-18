import Link from "next/link";

const E_PATH =
  "M411.83,274 A208,208 0 1,1 420.61,237 L84.99,237 A145,145 0 0,0 403.52,274 Z M84.99,174 A145,145 0 0,1 341.01,174 Z";
const BOLT_PATH =
  "M125.99,24.14 A208,208 0 0,1 196.46,5.66 L328.60,237 L200.00,237 L260.00,406 L122.00,174 L221.37,174 Z";
const WORDMARK_PATH =
  "M105,281 H136 V292 H118 V302 H135 V314 H118 V325 H136 V335 H105 Z M141,301 H176 L160,327 H174 V336 H139 L154,312 H141 Z M177,301 H191 L199,319 L207,303 H221 L196,353 H183 L194,331 Z M224,282 H256 V294 H238 V303 H256 V315 H238 V326 H256 V337 H224 Z M258,282 H272 L285,317 L299,282 H313 L291,336 H280 Z";

export function BrandMark({
  tone = "color",
  className = "size-8",
}: {
  tone?: "color" | "mono-dark" | "mono-light";
  className?: string;
}) {
  const eFill = tone === "color" ? "#0F7D3F" : tone === "mono-dark" ? "#E4E7E5" : "#040707";
  const boltFill = tone === "color" ? "#F8C812" : tone === "mono-dark" ? "#FFFFFF" : "#040707";
  return (
    <svg viewBox="0 0 426 426" fill="none" aria-hidden className={className}>
      <path fill={eFill} fillRule="evenodd" d={E_PATH} />
      <path fill={boltFill} d={BOLT_PATH} />
    </svg>
  );
}

export function BrandLockup({
  tone = "dark-bg",
  className = "h-7 md:h-8 w-auto",
}: {
  tone?: "dark-bg" | "light-bg" | "brand-on-dark";
  className?: string;
}) {
  const eFill = tone === "dark-bg" ? "#E4E7E5" : "#0F7D3F";
  const boltFill = tone === "dark-bg" ? "#FFFFFF" : "#F8C812";
  const textFill = tone === "light-bg" ? "#040707" : "#F4F5F3";

  return (
    <svg viewBox="0 0 164 44" fill="none" aria-hidden className={className}>
      <g transform="translate(1, 1) scale(0.09859)">
        <path fill={eFill} fillRule="evenodd" d={E_PATH} />
        <path fill={boltFill} d={BOLT_PATH} />
      </g>
      <g transform="translate(3, -125.5) scale(0.48)">
        <path fill={textFill} d={WORDMARK_PATH} />
      </g>
    </svg>
  );
}

export function Logo({
  onClick,
}: {
  onClick?: () => void;
  tone?: "dark-bg" | "light-bg" | "brand-on-dark";
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="EzyEV home"
      className="flex min-h-[44px] items-center gap-2 rounded-full pr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <BrandMark tone="color" className="size-8 shrink-0" />
      <span className="text-lg font-semibold tracking-tight text-fg">EzyEV</span>
    </Link>
  );
}
