import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  title: "Naeem — Data Science, Analytics, Machine Learning & AI",
  description: "Portfolio of Naeem, focused on data science, data analytics, machine learning, and AI-driven problem solving.",
  icons: [
    { rel: 'icon', url: '/favicon.svg?v=3', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', url: '/favicon.svg?v=3' },
    { rel: 'shortcut icon', url: '/favicon.svg?v=3' }
  ],
  openGraph: {
    title: "Naeem — Data Science, Analytics, Machine Learning & AI",
    description: "Focused on data science, data analytics, machine learning, and AI-driven problem solving.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-sora), system-ui, sans-serif',
        }}
        suppressHydrationWarning
      >
        <div className="min-h-svh flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
