import type { Metadata } from "next";
import { faqs, site } from "@/content/site";
import { FaqList, PageHero, WorkWithUsBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about EzyEV Battery-as-a-Service, 60-second swaps, fleet pricing, and supported vehicles.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        intro={`Answers on Battery-as-a-Service, 60-second swaps, vehicle compatibility, and onboarding. Still have questions? Email ${site.email}.`}
      />

      <section aria-label="FAQ list" className="bg-surface py-20 md:py-28">
        <div className="wrap max-w-4xl">
          <FaqList items={faqs} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      <WorkWithUsBand />
    </>
  );
}
