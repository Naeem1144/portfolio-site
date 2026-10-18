"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year on the client, as "2023–2026" when a range is
 * needed.
 *
 * The page is statically prerendered, so evaluating `new Date()` in a server
 * component froze the copyright at build time. Rendering it on first paint
 * would mismatch the prerendered HTML, so the year is filled in after mount:
 * the prerendered markup is empty and the client fills it in once.
 */
export function CopyrightYear({ start }: { start?: number }) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) return null;
  if (start !== undefined && start !== year) return <>{start}–{year}</>;
  return <>{year}</>;
}
