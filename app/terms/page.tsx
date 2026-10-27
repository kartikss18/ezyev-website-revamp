import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms that apply when you use the ezyev.in website.",
  alternates: { canonical: "/terms" },
};

// Draft written for the website revamp. Have counsel review before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="27 October 2026">
      <p>
        These terms apply to your use of ezyev.in, operated by EzyEV Technologies. By using the website you agree to
        them. Battery swapping, leasing and retrofit services are governed by the separate agreement you sign with us.
      </p>

      <h2>Information on this website</h2>
      <p>
        We work to keep the information here accurate, including figures such as vehicle cost savings and network
        statistics. These are indicative and do not form an offer. Your plan and pricing are confirmed in writing.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not misuse the contact form or submit someone else&apos;s details.</li>
        <li>Do not attempt to disrupt, probe or gain unauthorised access to the website.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The EzyEV name, logo, illustrations and website content belong to EzyEV Technologies. Please ask before reusing
        them.
      </p>

      <h2>Liability</h2>
      <p>
        The website is provided as is. To the extent the law allows, EzyEV is not liable for losses arising from use of
        the website itself.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, with courts in Pune having jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:info@ezyev.in">info@ezyev.in</a>.
      </p>
    </LegalPage>
  );
}
