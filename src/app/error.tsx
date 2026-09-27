"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
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
        <p className="label">
          Something went wrong{error.digest && <> · ref {error.digest}</>}
        </p>
        <h1>
          Lost the thread <em>mid-analysis.</em>
        </h1>
        <p>
          An unexpected error interrupted this page. Trying again usually
          clears it.
        </p>
        <div className="status-actions">
          <button type="button" className="button button--primary" onClick={reset}>
            <RotateCcw size={17} aria-hidden="true" /> Try again
          </button>
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
          </a>
        </div>
      </div>
    </main>
  );
}
