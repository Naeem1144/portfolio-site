"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

/**
 * The address as a mailto link, plus a button that copies it.
 *
 * Many visitors have no mail client wired to mailto, so the link alone is a
 * dead end for them; the copy button is the path that always works.
 */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <span className={`copy-email ${className}`}>
      <a href={`mailto:${site.email}`} className="copy-email__address">
        {site.email}
      </a>
      <button
        type="button"
        className="text-button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        {copied ? (
          <Check size={15} aria-hidden="true" />
        ) : (
          <Copy size={15} aria-hidden="true" />
        )}
        <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </span>
  );
}
