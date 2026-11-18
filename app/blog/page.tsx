import type { Metadata } from "next";
import { hardcodedNewsPlaceholders } from "@/content/site";
import { PageHero, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Updates & Engineering Notes",
  description: "News, corridor launches, and battery engineering updates from EzyEV Technologies.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Field notes · Hardcoded placeholder [TODO]"
        title="News, network rollouts & engineering notes."
        intro="Static placeholder entries structured for EzyEV corridor announcements, fleet economics briefs, and hardware telemetry posts."
      />

      <section aria-label="Updates list" className="bg-surface py-20 md:py-28">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {hardcodedNewsPlaceholders.map((post) => (
            <article key={post.slug} className="panel flex flex-col justify-between bg-ground p-8">
              <div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-accent">{post.tag}</span>
                  <span className="text-subtle">{post.date}</span>
                </div>
                <h2 className="mt-4 text-xl font-medium leading-snug text-fg">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              </div>
              <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] text-subtle">
                SLUG: /blog/{post.slug}
              </p>
            </article>
          ))}
        </div>
      </section>

      <WorkWithUsBand />
    </>
  );
}
