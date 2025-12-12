import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { PerformanceMode } from '@/components/PerformanceMode';

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d12' }
  ],
};

export const metadata: Metadata = {
  title: "Naeem's Portfolio",
  description: "Personal portfolio of Naeem, an aspiring data scientist and developer.",
  icons: [
    { rel: 'icon', url: '/favicon.svg?v=2', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', url: '/favicon.svg?v=2' },
    { rel: 'shortcut icon', url: '/favicon.svg?v=2' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body
        className={`${firaCode.variable} antialiased theme-ultra-dark`}
        suppressHydrationWarning
      >
        <div className="min-h-svh flex flex-col">
          <PerformanceMode />
          {children}
        </div>
      </body>
    </html>
  );
}
