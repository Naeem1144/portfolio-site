"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

/**
 * A plotting-tool crosshair over a drawing: two hairlines and a readout of
 * where the pointer sits, as a fraction of the plot (y measured from the
 * bottom, the way a chart reads). Mouse only; touch scrolls as normal.
 */
export function Plot({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const el = frame.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    const y = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
    el.style.setProperty("--cx", `${x * 100}%`);
    el.style.setProperty("--cy", `${y * 100}%`);
    el.dataset.tracking = x > 0.66 ? "left" : "right";
    el.dataset.side = y < 0.2 ? "below" : "above";
    if (readout.current) {
      readout.current.textContent = `x ${x.toFixed(2)}  y ${(1 - y).toFixed(2)}`;
    }
  };

  const leave = () => {
    if (frame.current) delete frame.current.dataset.tracking;
  };

  return (
    <div ref={frame} className="plot" onPointerMove={move} onPointerLeave={leave}>
      {children}
      <span className="plot__rule plot__rule--x" aria-hidden="true" />
      <span className="plot__rule plot__rule--y" aria-hidden="true" />
      <span ref={readout} className="plot__readout" aria-hidden="true" />
    </div>
  );
}
