import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import { tokens } from "@/lib/tokens";
import { fontPreloads } from "./fonts";
import "./globals.css";

/** Browser chrome mirrors the paper canvas in globals.css. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: tokens.paper,
  colorScheme: "light",
};

const TITLE = `${site.name} | ${site.role}`;
const DESCRIPTION =
  "I'm Naeem Nagori, a data analyst and data scientist in Ahmedabad, India. Selected work with SQL, Power BI and Python, from customer segmentation to computer vision, with the real numbers behind each one.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: `${site.name} | Portfolio`,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  category: "portfolio",
  keywords: [
    "data analyst",
    "data scientist",
    "business intelligence",
    "marketing analytics",
    "SQL",
    "Power BI",
    "Python",
    "machine learning",
    "deep learning",
    "computer vision",
    "reinforcement learning",
    "customer segmentation",
    site.location,
  ],
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description:
      "Selected data projects, including 83,590 hotel customers sorted into groups, a Power BI churn report with 6 views, and a CNN at 99.21% validation accuracy on Alzheimer's MRI stages.",
    // Trailing slash to match the resolved `canonical`, so the two never
    // disagree about which URL is the real one.
    url: `${siteUrl}/`,
    siteName: `${site.name} | Portfolio`,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description:
      "Selected data projects with SQL, Power BI and Python, with the real numbers behind each one.",
  },
};

/**
 * Person schema.
 *
 * A personal site is exactly the case this rich result is for: it is what can
 * produce a person card with the name, role, location and social profiles in
 * search instead of a bare blue link.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.name,
  url: siteUrl,
  image: `${siteUrl}/icon.svg`,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [site.social.github, site.social.linkedin],
  knowsAbout: [
    "Data analysis",
    "Data science",
    "Business intelligence",
    "Marketing analytics",
    "SQL",
    "Power BI",
    "Python",
    "Machine learning",
    "Deep learning",
    "Computer vision",
    "Reinforcement learning",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Seneca Polytechnic",
  },
  knowsLanguage: site.languages.map((language) => language.name),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* See `fonts.ts`: without these the first webfont could not start
            downloading until the stylesheet naming it had arrived. */}
        {fontPreloads.map((font) => (
          <link
            key={font.href}
            rel="preload"
            href={font.href}
            as="font"
            type={font.type}
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          // Static, developer-authored JSON with no user input interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
