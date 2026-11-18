import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { offices, platformCapabilities } from "@/content/site";
import { PageHero, SectionHeading, WorkWithUsBand } from "@/components/ui";

export function generateStaticParams() {
  return offices.map((o) => ({ city: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const office = offices.find((o) => o.slug === city);
  if (!office) return { title: "City not found" };
  return {
    title: `EV Battery-as-a-Service in ${office.city} | 2W & 3W Fleet BaaS`,
    description: office.heroLead,
    alternates: { canonical: `/ev-battery-service/${office.slug}` },
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const office = offices.find((o) => o.slug === city);
  if (!office) notFound();

  return (
    <>
      <PageHero
        eyebrow={`EV BaaS — ${office.city}`}
        title={office.heroTitle}
        intro={office.heroLead}
      />

      <section aria-label={`${office.city} network`} className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <SectionHeading
              eyebrow={`Locally charged · ${office.city} ready`}
              title={`EzyEV is live and operating in ${office.city}.`}
            />
            <ul className="space-y-3 font-mono text-xs text-muted">
              {office.points.map((pt) => (
                <li key={pt} className="panel bg-ground px-5 py-4 text-fg">
                  • {pt}
                </li>
              ))}
            </ul>
          </div>

          <aside className="panel bg-ground p-8 lg:col-span-5">
            <p className="font-mono text-xs tracking-wider text-accent uppercase">{office.tag}</p>
            <h2 className="mt-3 text-2xl font-light text-fg">{office.city} Operations Office</h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-muted">
              {office.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </aside>
        </div>
      </section>

      <section aria-label="Fleet services" className="border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap space-y-12">
          <SectionHeading
            eyebrow="Included platform"
            title={`Full BaaS telemetry for ${office.city} operators.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformCapabilities.map((cap) => (
              <article key={cap.title} className="panel p-6">
                <h3 className="text-lg font-medium text-fg">{cap.title}</h3>
                <p className="mt-2 text-sm text-muted">{cap.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WorkWithUsBand
        eyebrow={`${office.city} onboarding`}
        title={`Start your EzyEV journey in ${office.city}.`}
      />
    </>
  );
}
