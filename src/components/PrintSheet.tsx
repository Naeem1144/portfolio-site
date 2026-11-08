"use client";

import { useEffect } from "react";

/**
 * Paper has no hover, no reveals and no disclosures. Before printing, the page
 * is put into its finished state: transitions and animations stop, held-back
 * blocks are released, and every project method opens. After printing the
 * reader's methods are closed again; blocks that were released simply stay
 * revealed.
 */
export function PrintSheet() {
  useEffect(() => {
    const methods = () =>
      Array.from(document.querySelectorAll<HTMLDetailsElement>("details.method"));

    const open = () => {
      // Still first: releasing the pending attributes below must not play an
      // 800ms reveal into the printer.
      document.documentElement.setAttribute("data-printing", "");
      for (const block of document.querySelectorAll("[data-pending]")) {
        block.removeAttribute("data-pending");
      }
      for (const method of methods()) {
        if (method.open) continue;
        method.dataset.printOpened = "";
        method.open = true;
      }
    };

    const restore = () => {
      document.documentElement.removeAttribute("data-printing");
      for (const method of methods()) {
        if (method.dataset.printOpened === undefined) continue;
        delete method.dataset.printOpened;
        method.open = false;
      }
    };

    window.addEventListener("beforeprint", open);
    window.addEventListener("afterprint", restore);
    return () => {
      window.removeEventListener("beforeprint", open);
      window.removeEventListener("afterprint", restore);
      restore();
    };
  }, []);

  return null;
}
