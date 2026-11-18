import type { Metadata } from "next";
import Link from "next/link";
import { roles } from "@/content/careers";
import { site } from "@/content/site";
import { PageHero, SectionHeading, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join EzyEV in Pune and build the IoT + cloud platform powering battery swapping across India's electric 2W and 3W fleets.",
  alternates: { canonical: "/careers" },
};

const reasons = [
  {
    title: "Work across hardware, IoT & cloud",
    body: "Our stack spans TypeScript, Node.js, Go, React Native, Kafka, MQTT, and Supabase—shipping directly to unmanned swap stations on Indian streets.",
  },
  {
    title: "Small team, real ownership",
    body: "You own problems end-to-end alongside senior engineers, the founder, and operations teams in Pune.",
  },
  {
    title: "Output over clock-ins",
    body: "Flexible startup culture focused on shipping reliable EV telemetry, APIs, and mobile rider flows.",
  },
  {
    title: "Measurable clean-energy impact",
    body: "Every vehicle moving onto EzyEV replaces petrol two-wheelers and three-wheelers across urban corridors.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help build India’s battery-swapping backbone."
        intro="We are an engineering-led team in Pune building the IoT stations, mobile apps, and real-time telemetry cloud behind EzyEV."
      >
        <div className="mt-8">
          <a href="#roles" className="btn-primary">
            See open positions
          </a>
        </div>
      </PageHero>

      <section aria-label="Why EzyEV" className="border-b border-line bg-surface py-20 md:py-28">
        <div className="wrap space-y-12">
          <SectionHeading
            eyebrow="Why join"
            title="Join a committed team driven by real-world EV problems."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <article key={r.title} className="panel bg-ground p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-medium text-fg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="roles" aria-label="Open positions" className="scroll-mt-24 border-b border-line bg-ground py-20 md:py-28">
        <div className="wrap space-y-10">
          <SectionHeading
            eyebrow="Open positions"
            title={roles.length ? `${roles.length} open ${roles.length === 1 ? "role" : "roles"}` : "No open roles right now"}
          />

          <ul className="space-y-4">
            {roles.map((role) => (
              <li key={role.slug} className="panel p-6 md:p-8">
                <div className="grid items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-3 lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-accent uppercase">{role.team}</span>
                      <span className="text-subtle">·</span>
                      <span className="text-muted">{role.location}</span>
                      <span className="text-subtle">·</span>
                      <span className="text-muted">{role.duration}</span>
                    </div>
                    <h3 className="text-2xl font-light text-fg">{role.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{role.summary}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {role.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-sm border border-line bg-raised px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                    <Link href={`/career/${role.slug}`} className="btn-primary">
                      Read full role
                    </Link>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(role.applySubject)}`}
                      className="btn-secondary"
                    >
                      Apply by email
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WorkWithUsBand
        eyebrow="Open application"
        title="Don’t see your role? Write to us anyway."
        body={`Engineers, operations leads, and city launch builders: send your CV or GitHub to ${site.email}.`}
      />
    </>
  );
}
