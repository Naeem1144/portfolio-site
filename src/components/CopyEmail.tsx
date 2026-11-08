"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "@/lib/icon";
import { site } from "@/lib/site";

/**
 * The address as a mailto link, plus a button that copies it.
 *
 * Many visitors have no mail client wired to mailto, so the link alone is a
 * dead end for them; the copy button is the path that always works.
 */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      // No clipboard access (insecure context, permission denied): say so
      // outright. The mailto link beside the button is the fallback path.
      setState("failed");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), 4000);
    }
  };

  const copied = state === "copied";

  return (
    <span className={`copy-email ${className}`}>
      <a href={`mailto:${site.email}`} className="copy-email__address">
        {site.email}
      </a>
      <button
        type="button"
        className="text-button"
        onClick={copy}
        aria-label={
          copied
            ? "Email address copied"
            : state === "failed"
              ? "Copy failed, use the email link instead"
              : "Copy email address"
        }
      >
        {copied ? (
          <Check size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden="true" />
        ) : (
          <Copy size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden="true" />
        )}
        <span aria-hidden="true">
          {copied ? "Copied" : state === "failed" ? "Failed" : "Copy"}
        </span>
      </button>
      <span className="sr-only" role="status">
        {copied
          ? "Email address copied to clipboard"
          : state === "failed"
            ? "Could not copy automatically. Use the email link to open a mail client."
            : ""}
      </span>
    </span>
  );
}
