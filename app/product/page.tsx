import type { Metadata } from "next";
import Image from "next/image";
import {
  BatteryCharging,
  ChartLineUp,
  ClockCountdown,
  Cloud,
  Cpu,
  DeviceMobile,
  NavigationArrow,
  Pulse,
  QrCode,
  Path,
  ShieldCheck,
  BellRinging,
} from "@phosphor-icons/react/dist/ssr";
import { CheckList, CtaBand, PageHero, PrimaryCta, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Product: battery swapping, leasing and retrofit",
  description:
    "Automated EzyEV swap stations, battery leasing with fixed monthly plans, and a retrofit kit for existing 2W and 3W fleets. Built in house with a rider app and fleet dashboard.",
  alternates: { canonical: "/product" },
};

const offerings = [
  {
    id: "swapping",
    eyebrow: "Battery swapping",
    title: "60 second swaps. Zero downtime.",
    body: "A network of automated stations placed on the routes your riders already run. They pull in, swap a drained battery for a charged one and leave, without a staff member or a queue.",
    points: [
      "Automated swap stations at strategic urban hubs",
      "App based booking and authentication",
      "Automatic door unlock and battery validation",
      "Open 24x7, compact enough to fit where riders stop",
    ],
    image: {
      src: "/images/swap-station-delivery.png",
      alt: "A delivery rider arriving at an EzyEV swap station",
      w: 2187,
      h: 1588,
      panel: "bg-stage",
    },
  },
  {
    id: "leasing",
    eyebrow: "Battery leasing",
    title: "Own the vehicle. Lease the power.",
    body: "Buy the vehicle without the battery and subscribe to the energy instead. Drivers and operators pay less upfront, know their monthly cost, and hand battery risk back to us.",
    points: [
      "Up to 40% lower vehicle cost",
      "Fixed monthly battery subscription plans",
      "Better return on investment for owners and drivers",
      "Real time battery monitoring and preventive maintenance",
    ],
    image: {
      src: "/images/savings.png",
      alt: "A rider celebrating next to a rupee banknote",
      w: 1221,
      h: 973,
      panel: "bg-lime",
    },
  },
  {
    id: "retrofit",
    eyebrow: "Retrofit kit",
    title: "Electrify the fleet you already run.",
    body: "Replacing a whole fleet at once is rarely the right call. Our retrofit kit converts suitable 2W and 3W vehicles so they can run on EzyEV batteries and the same swap network.",
    points: [
      "Convert existing vehicles instead of buying new ones",
      "Runs on the same stations, app and monthly plans",
      "Battery partnerships that bring the vehicle price down",
      "We confirm fit model by model before you commit",
    ],
    image: {
      src: "/images/station-helper-rider.png",
      alt: "An EzyEV attendant hands a charged battery to a rider",
      w: 1713,
      h: 1462,
      panel: "bg-lime",
    },
  },
] as const;

const swapFlow = [
  { icon: BellRinging, title: "Low battery alert", body: "The app warns the rider before the battery runs low." },
  { icon: NavigationArrow, title: "Nearest station", body: "Smart station finder routes them to the closest free slot." },
  { icon: QrCode, title: "Scan and unlock", body: "A QR code or RFID card opens an empty slot." },
  { icon: BatteryCharging, title: "Swap and ride", body: "Drained battery in, charged battery out, back on the road in under two minutes." },
] as const;

const platform = [
  { icon: DeviceMobile, title: "Rider app", body: "Booking, authentication and navigation to the nearest station." },
  { icon: Cpu, title: "IoT connected stations", body: "Each slot reports charge level and validates every battery it holds." },
  { icon: Cloud, title: "Cloud backend", body: "Swap history, state of charge and location for every battery in the fleet." },
  { icon: Pulse, title: "Battery health tracking", body: "Early warnings so batteries are serviced before they fail on the road." },
  { icon: Path, title: "Energy and route tracking", body: "See how much energy each vehicle uses and where it runs." },
  { icon: ChartLineUp, title: "Analytics and reports", body: "AI driven reporting on uptime and cost to guide fleet decisions." },
] as const;

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title={
          <>
            One battery network.
            <br className="max-sm:hidden" /> Three ways to run on it.
          </>
        }
        intro="Automated swap stations, a rider app and a fleet dashboard, all built in house by EzyEV. Pick the model that matches how your fleet works today."
      >
        <div className="mt-8 flex justify-center">
          <PrimaryCta />
        </div>
        <nav aria-label="Products on this page" className="mt-12 flex flex-wrap justify-center gap-2">
          {offerings.map((o) => (
            <a
              key={o.id}
              href={`#${o.id}`}
              className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-muted transition-colors duration-300 ease-brand hover:bg-raised hover:text-fg"
            >
              {o.eyebrow}
            </a>
          ))}
        </nav>
      </PageHero>

      {offerings.map((o, i) => (
        <Section key={o.id} id={o.id} label={o.eyebrow} className="scroll-mt-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <SectionHeading eyebrow={o.eyebrow} title={o.title} intro={o.body} />
              <div data-reveal className="mt-8">
                <CheckList items={o.points} />
              </div>
            </div>
            <div data-reveal className={`overflow-hidden rounded-3xl p-8 md:p-12 ${o.image.panel}`}>
              <Image
                src={o.image.src}
                alt={o.image.alt}
                width={o.image.w}
                height={o.image.h}
                sizes="(min-width: 768px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Section>
      ))}

      <Section label="How a swap works">
        <SectionHeading
          eyebrow="The swap"
          title="Under two minutes, start to finish"
          intro="No staff at the station and nothing for the rider to learn beyond a scan."
          align="center"
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {swapFlow.map((s, i) => (
            <li key={s.title} data-reveal className="card p-6">
              <div className="flex items-center justify-between">
                <s.icon size={32} aria-hidden className="text-accent" />
                <span className="font-mono text-sm text-subtle">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Platform">
        <div className="rounded-3xl border border-line bg-surface p-2">
          <div className="grid gap-8 rounded-2xl bg-olive p-8 md:grid-cols-12 md:p-12">
            <div className="md:col-span-5">
              <SectionHeading
                eyebrow="Platform"
                title="Hardware and software we build ourselves"
                intro="Owning the whole stack means one team answers for the station, the app and the data."
              />
              <ul data-reveal className="mt-8 flex flex-col gap-3 text-muted">
                <li className="flex gap-3">
                  <ShieldCheck size={24} weight="fill" aria-hidden className="shrink-0 text-accent" />
                  Every battery validated before it is released
                </li>
                <li className="flex gap-3">
                  <ClockCountdown size={24} weight="fill" aria-hidden className="shrink-0 text-accent" />
                  Live state of charge for every slot, every station
                </li>
              </ul>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 md:col-span-7">
              {platform.map((p) => (
                <li key={p.title} data-reveal className="rounded-2xl bg-raised p-6">
                  <p.icon size={24} aria-hidden className="text-accent" />
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
