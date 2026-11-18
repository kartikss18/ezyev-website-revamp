import type { Metadata, Viewport } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { LenisProvider } from "@/components/LenisProvider";
import { PageTransition } from "@/components/PageTransition";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EzyEV | Clean. Connected. Charged.",
    template: "%s | EzyEV",
  },
  description: site.description,
  keywords: [
    "EzyEV",
    "Battery as a Service",
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
    title: "EzyEV | Clean. Connected. Charged.",
    description: site.description,
    images: [
      {
        url: "/media/product/og-pack.jpg",
        width: 1200,
        height: 630,
        alt: "EzyEV swappable EV battery pack in anodized green and safety yellow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ezy_ev",
    creator: "@ezy_ev",
    title: "EzyEV | Clean. Connected. Charged.",
    description: site.description,
    images: ["/media/product/og-pack.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/ezyev-logo.svg`,
  email: site.email,
  telephone: site.phoneRaw,
  sameAs: site.socials.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneRaw,
    contactType: "customer service",
    areaServed: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-type="tech"
      suppressHydrationWarning
    >
      <head>
        <meta name="page-type" content="product" />
        <meta name="site-kind" content="tech" />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="bg-ground text-fg antialiased">
        <a
          href="#main"
          className="fixed top-3 left-4 z-[60] -translate-y-24 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 ease-brand focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <LenisProvider />
        <PageTransition />
      </body>
    </html>
  );
}
