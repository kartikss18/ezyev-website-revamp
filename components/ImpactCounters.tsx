"use client";

import { useEffect, useState } from "react";
import { impact } from "@/content/site";

type Totals = { km: number; swaps: number; co2Tonnes: number };

function computeTotals(now: number): Totals {
  const seconds = Math.max(0, (now - new Date(impact.startDate).getTime()) / 1000);
  const days = seconds / 86400;
  const km = impact.totalBatteries * impact.kmPerBatteryPerDay * days;
  const swaps = impact.totalBatteries * impact.swapsPerBatteryPerDay * days;
  return { km, swaps, co2Tonnes: (km * impact.co2KgPerKm) / 1000 };
}

const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function useImpactTotals() {
  const [totals, setTotals] = useState<Totals | null>(null);
  useEffect(() => {
    setTotals(computeTotals(Date.now()));
    const id = window.setInterval(() => setTotals(computeTotals(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return totals;
}

/* One line proof signal for the hero */
export function ImpactLine() {
  const totals = useImpactTotals();
  return (
    <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-lime" />
      </span>
      {totals ? (
        <span>
          <span className="font-semibold text-fg tabular-nums">{fmt.format(totals.swaps)}</span> battery swaps since January 2026
        </span>
      ) : (
        <span className="skeleton h-4 w-56" aria-label="Loading live swap count" />
      )}
      <span aria-hidden className="text-subtle max-sm:hidden">·</span>
      <span>Live in Pune, Mumbai and Nagpur</span>
    </p>
  );
}

/* Three stat tiles */
export function ImpactCounters() {
  const totals = useImpactTotals();
  const stats = [
    { label: "Clean kilometres travelled", value: totals?.km, note: "Zero tailpipe emission" },
    { label: "Battery swaps completed", value: totals?.swaps, note: "Since January 2026" },
    { label: "Tonnes of CO₂ avoided", value: totals?.co2Tonnes, note: "Against petrol two wheelers" },
  ];

  return (
    <dl className="grid gap-2 rounded-3xl border border-line bg-surface p-2 md:grid-cols-3" aria-live="off">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl bg-raised p-6">
          <dt className="text-sm text-muted">{s.label}</dt>
          <dd className="mt-3 text-4xl font-semibold tracking-tight text-fg tabular-nums">
            {s.value === undefined ? (
              <span className="skeleton h-10 w-40 align-middle" aria-label="Loading" />
            ) : (
              <>{fmt.format(s.value)}+</>
            )}
          </dd>
          <dd className="mt-2 text-sm text-subtle">{s.note}</dd>
        </div>
      ))}
    </dl>
  );
}
