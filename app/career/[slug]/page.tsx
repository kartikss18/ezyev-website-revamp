import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roles } from "@/content/careers";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) return { title: "Role not found" };
  return {
    title: `${role.title} | Careers`,
    description: role.summary,
    alternates: { canonical: `/career/${role.slug}` },
  };
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(role.applySubject)}`;

  return (
    <>
      <PageHero eyebrow={`${role.team} · ${role.location}`} title={role.title} intro={role.summary}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={mailHref} className="btn-primary">
            Apply via email
          </a>
          <Link href="/careers" className="btn-secondary">
            All open roles
          </Link>
        </div>
      </PageHero>

      <section aria-label="Role specification" className="bg-surface py-20 md:py-28">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-light text-fg">What you&rsquo;ll do</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {role.youWill.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-accent">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-line pt-10">
              <h2 className="text-2xl font-light text-fg">What we&rsquo;re looking for</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {role.lookingFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-accent">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-line pt-10">
              <h2 className="text-2xl font-light text-fg">Bonus points</h2>
              <ul className="flex flex-wrap gap-2">
                {role.bonus.map((b) => (
                  <li key={b} className="rounded-md border border-line bg-ground px-3 py-1.5 font-mono text-xs text-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-line pt-10">
              <h2 className="text-2xl font-light text-fg">Perks &amp; why join us</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {role.perks.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-accent">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="panel space-y-6 bg-ground p-8 lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line font-mono text-xs">
              <div className="py-4">
                <dt className="text-subtle uppercase">Location</dt>
                <dd className="mt-1 text-sm text-fg">{role.location}</dd>
              </div>
              <div className="py-4">
                <dt className="text-subtle uppercase">Duration</dt>
                <dd className="mt-1 text-sm text-fg">{role.duration}</dd>
              </div>
              <div className="py-4">
                <dt className="text-subtle uppercase">How to apply</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted">
                  Send resume / GitHub / portfolio to{" "}
                  <a href={mailHref} className="text-accent underline underline-offset-4">
                    {site.email}
                  </a>{" "}
                  with subject <span className="text-fg">{role.applySubject}</span>.
                </dd>
              </div>
            </dl>
            <a href={mailHref} className="btn-primary w-full">
              Apply for this role
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
