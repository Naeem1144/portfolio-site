"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "@/lib/icon";
import { site } from "@/lib/site";

/** Route-level error boundary, so one failing client component cannot blank the page. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="status-page">
      <div className="container">
        <p className="eyebrow">Something went wrong</p>
        <h1>Lost the thread mid-analysis.</h1>
        <p>
          An unexpected error interrupted this page. Trying again usually
          clears it.
        </p>
        <div className="status-actions">
          <button type="button" className="button button--primary" onClick={reset}>
            <RotateCcw size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden="true" /> Try again
          </button>
          <Link href="/" className="link">
            Back to the portfolio
          </Link>
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </div>
      </div>
    </main>
  );
}
