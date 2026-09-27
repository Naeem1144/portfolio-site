"use client";

/**
 * Renders the current year on the client.
 *
 * The page is statically prerendered, so evaluating `new Date()` in a server
 * component froze the copyright at build time, and a site that redeploys only
 * occasionally would keep claiming the year it was last built.
 */
export function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
