import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How EzyEV Technologies collects, uses and protects personal data on ezyev.in.",
  alternates: { canonical: "/privacy" },
};

// Draft written for the website revamp. Have counsel review before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="27 October 2026">
      <p>
        This policy explains what personal data EzyEV Technologies (&quot;EzyEV&quot;, &quot;we&quot;) collects
        through ezyev.in, why we collect it, and the choices you have. We process personal data in line with the
        Digital Personal Data Protection Act, 2023.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Details you submit in our contact form: name, company, work email, mobile number, city, fleet size, vehicle type and any message.</li>
        <li>Emails you send to info@ezyev.in, including your CV if you apply for a role.</li>
        <li>Basic server logs such as IP address and browser type, kept for a limited time for security.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and prepare a battery plan for your fleet.</li>
        <li>To assess job applications.</li>
        <li>To keep the website secure and working.</li>
      </ul>
      <p>We do not sell personal data and we do not use it for advertising.</p>

      <h2>Cookies</h2>
      <p>
        This website does not set advertising or analytics cookies. If that changes, we will update this policy and ask
        for consent where the law requires it.
      </p>

      <h2>Sharing</h2>
      <p>
        We share data only with service providers that help us run this website and respond to you, under contracts
        that require them to protect it, or where the law requires us to.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or erase your personal data, or withdraw consent, by writing to{" "}
        <a href="mailto:info@ezyev.in">info@ezyev.in</a>. We will respond within the time the law allows.
      </p>

      <h2>Contact</h2>
      <p>
        EzyEV Technologies, Office No. 210, The Latitude Core, Off NIBM Road, Kondhwa, Pune 411048.
        Email <a href="mailto:info@ezyev.in">info@ezyev.in</a>.
      </p>
    </LegalPage>
  );
}
