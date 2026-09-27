/** Self-hosted Geist and Geist Mono are used throughout the signal identity.
 * Preload only these active faces; font-display: swap remains in globals.css.
 * Licensing: SIL OFL 1.1.
 */

export type FontPreload = {
  href: string;
  type: "font/woff2";
};

export const fontPreloads: FontPreload[] = [
  { href: "/fonts/geist-sans-variable.woff2", type: "font/woff2" },
  { href: "/fonts/geist-mono-variable.woff2", type: "font/woff2" },
];
