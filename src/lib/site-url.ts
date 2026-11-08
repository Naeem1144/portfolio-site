/**
 * Canonical origin for absolute URLs (Open Graph, sitemap, robots).
 *
 * `NEXT_PUBLIC_SITE_URL` should be set on the host. The fallback is the live
 * deployment so a fresh build still emits valid absolute URLs rather than
 * silently omitting them.
 */
const FALLBACK = "https://portfolio-site-naeem.vercel.app";

function normalize(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return FALLBACK;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const siteUrl = normalize(
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK,
);

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
