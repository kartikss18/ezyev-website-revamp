"use client";

import { useEffect, useState } from "react";
import { impactFormula } from "@/content/site";

type Totals = { km: number; swaps: number; co2Tonnes: number };

function computeTotals(now: number): Totals {
  const seconds = Math.max(0, (now - new Date(impactFormula.startDate).getTime()) / 1000);
  const days = seconds / 86400;
  const km = impactFormula.totalBatteries * impactFormula.kmPerBatteryPerDay * days;
  const swaps = impactFormula.totalBatteries * impactFormula.swapsPerBatteryPerDay * days;
  return { km, swaps, co2Tonnes: (km * impactFormula.co2KgPerKm) / 1000 };
}

const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function ImpactCounters() {
  const [totals, setTotals] = useState<Totals | null>(null);

  useEffect(() => {
    setTotals(computeTotals(Date.now()));
    const id = window.setInterval(() => setTotals(computeTotals(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const cards = [
    { key: "CITIES", label: "Live metro hubs", val: "03", note: "Pune · Mumbai · Nagpur [CITIES]" },
    { key: "STATIONS", label: "Automated swap bays", val: "[STATIONS]", note: "24x7 IoT corridor network" },
    { key: "PACKS DEPLOYED", label: "Batteries in circulation", val: "[PACKS DEPLOYED]", note: `${impactFormula.totalBatteries} baseline model` },
    {
      key: "SWAPS",
      label: "Cumulative battery swaps",
      val: totals ? `${fmt.format(totals.swaps)}+` : "[SWAPS]",
      note: "Formula estimate since Jan 2026 [TODO]",
    },
    {
      key: "KM",
      label: "Clean kilometres travelled",
      val: totals ? `${fmt.format(totals.km)}+` : "[KM]",
      note: "Zero tailpipe emissions [TODO]",
    },
    {
      key: "CO₂ AVOIDED",
      label: "Tonnes of CO₂ avoided",
      val: totals ? `${fmt.format(totals.co2Tonnes)}+` : "[CO₂ AVOIDED]",
      note: "Against petrol 2W/3W baseline [TODO]",
    },
  ];

  return (
    <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.key} className="flex flex-col justify-between bg-surface p-6 md:p-8">
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-subtle uppercase">{c.key}</dt>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </div>
          <dd className="mt-6 font-mono text-3xl font-medium tracking-tight text-fg tabular-nums md:text-4xl">
            {c.val}
          </dd>
          <p className="mt-3 font-mono text-xs text-subtle">{c.note}</p>
        </div>
      ))}
    </dl>
  );
}
