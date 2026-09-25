import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#f5f4ee",
};

// Set NEXT_PUBLIC_SITE_URL to the deployed origin (e.g. in Vercel project env vars)
// so og:url and the og:image resolve to absolute URLs. The fallback follows the
// default Vercel project slug derived from the repository name.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-site-naeem1144.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Naeem Nagori — Data Analyst & Data Scientist",
  description:
    "Portfolio of Naeem Nagori: data analysis, business intelligence, data science, machine learning, and marketing analytics. SQL, Power BI, Python, deep learning, and customer insight projects from Ahmedabad, India.",
  alternates: { canonical: "/" },
  icons: [
    { rel: "icon", url: "/favicon.svg?v=4", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "shortcut icon", url: "/favicon.svg?v=4" },
  ],
  openGraph: {
    title: "Naeem Nagori — Making data mean more",
    description:
      "Data analysis, business intelligence, data science, and marketing analytics — selected projects in SQL, Power BI, Python, and machine learning.",
    url: siteUrl,
    siteName: "Naeem Nagori — Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naeem Nagori — Making data mean more. SQL, Python, Power BI, Customer Insights.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naeem Nagori — Making data mean more",
    description:
      "Selected projects in customer insights, reporting, and business intelligence, using SQL, Power BI, and Python.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-svh flex flex-col">{children}</div>
      </body>
    </html>
  );
}
