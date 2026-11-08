"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year on the client, as "2023–2026" when a range is
 * needed.
 *
 * The page is statically prerendered, so evaluating `new Date()` in a server
 * component froze the copyright at build time. The start year is rendered on
 * the server and on the client's first paint — they agree, so there is no
 * hydration mismatch — and the range is filled in after mount. Without
 * JavaScript the start year simply stands alone.
 */
export function CopyrightYear({ start }: { start?: number }) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) return start !== undefined ? <>{start}</> : null;
  if (start !== undefined && start !== year) return <>{start}–{year}</>;
  return <>{year}</>;
}
