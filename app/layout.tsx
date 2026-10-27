import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { PageTransition } from "@/components/PageTransition";
import { site } from "@/content/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EzyEV | Battery swapping for electric 2W and 3W fleets",
    template: "%s | EzyEV",
  },
  description: site.description,
  keywords: [
    "battery as a service",
    "EV battery swapping",
    "electric 2 wheeler battery swap",
    "3 wheeler EV battery subscription",
    "fleet battery management",
    "Pune",
    "Mumbai",
    "Nagpur",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
    title: "EzyEV | Battery swapping for electric 2W and 3W fleets",
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 627, alt: "EzyEV. Clean. Connected. Charged." }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ezy_ev",
    creator: "@ezy_ev",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/images/ezyev-logo.png`,
  email: site.email,
  telephone: "+919766766576",
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available (so reveals can start hidden) and applies a saved dark theme before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-full bg-lime px-3 py-2 text-sm font-semibold text-ink transition-transform duration-500 ease-brand focus-visible:translate-y-0 focus-visible:outline-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <PageTransition />
      </body>
    </html>
  );
}
