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

export const metadata: Metadata = {
  title: "Naeem Nagori — Data Analytics & Customer Insights",
  description:
    "Data analyst in Ahmedabad, India, focused on reporting, marketing analytics, and customer insights. Selected work in SQL, Power BI, and Python.",
  icons: [
    { rel: "icon", url: "/favicon.svg?v=4", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/favicon.svg?v=4" },
    { rel: "shortcut icon", url: "/favicon.svg?v=4" },
  ],
  openGraph: {
    title: "Naeem Nagori — Making data mean more",
    description:
      "Selected projects in customer insights, reporting, and business intelligence, using SQL, Power BI, and Python.",
    type: "website",
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
