"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

/**
 * What a drawing says under the pointer, in the drawing's own terms. The
 * guide is plain data so the figures can stay server components: a series
 * snaps the crosshair to its nearest plotted value, regions name the area
 * under the pointer. Fractions are of the drawing's own box, y from the top.
 */
export type PlotGuide =
  | {
      kind: "series";
      /** Where the pointer still counts as on the plot, in fractions of the box. */
      band?: { top: number; bottom: number };
      series: {
        /** Short name for the readout, e.g. "UCB". */
        name?: string;
        unit?: string;
        digits?: number;
        points: { x: number; y: number; v: number }[];
      }[];
    }
  | { kind: "groups"; groups: { x: number; y: number; label: string }[] };

/** The drawings are 500 × 360, so a step across is worth more than a step up. */
const ASPECT = 500 / 360;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A plotting-tool crosshair over a drawing. With a guide the readout carries
 * real values: the crosshair snaps to the nearest plotted point (with a dot
 * on it) or names the region under the pointer. Without one it falls back to
 * the pointer's position as fractions of the plot. Mouse only; touch scrolls
 * as normal.
 */
export function Plot({ children, guide }: { children: ReactNode; guide?: PlotGuide }) {
  const frame = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const measured = useRef({ text: "", w: 0, h: 0 });

  const hide = () => {
    const el = frame.current;
    if (!el) return;
    delete el.dataset.tracking;
    delete el.dataset.side;
    if (readout.current) readout.current.textContent = "";
    measured.current = { text: "", w: 0, h: 0 };
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const el = frame.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const svg = el.querySelector("svg");
    const marks = (svg ?? el).getBoundingClientRect();
    const fx = clamp01((event.clientX - marks.left) / marks.width);
    const fy = clamp01((event.clientY - marks.top) / marks.height);

    let px = fx;
    let py = fy;
    let text = `x ${fx.toFixed(2)}  y ${(1 - fy).toFixed(2)}`;

    if (guide?.kind === "series") {
      const band = guide.band;
      if (band && (fy < band.top || fy > band.bottom)) {
        hide();
        return;
      }
      let best = Infinity;
      for (const series of guide.series) {
        const n = series.points.length;
        for (let i = 0; i < n; i += 1) {
          const p = series.points[i]!;
          const dx = (p.x - fx) * ASPECT;
          const dy = p.y - fy;
          const d2 = dx * dx + dy * dy;
          if (d2 < best) {
            best = d2;
            px = p.x;
            py = p.y;
            const named = series.name ? `${series.name} ` : "";
            text = `${named}${p.v.toFixed(series.digits ?? 0)}${series.unit ?? ""} · ${i + 1}/${n}`;
          }
        }
      }
    } else if (guide?.kind === "groups") {
      let best = Infinity;
      for (const group of guide.groups) {
        const dx = (group.x - fx) * ASPECT;
        const dy = group.y - fy;
        const d2 = dx * dx + dy * dy;
        if (d2 < best) {
          best = d2;
          text = group.label;
        }
      }
    }

    // The readout's text varies with the reading, so measure it when it
    // changes; the flip logic works off its real size.
    if (readout.current && measured.current.text !== text) {
      readout.current.textContent = text;
      measured.current = {
        text,
        w: readout.current.offsetWidth,
        h: readout.current.offsetHeight,
      };
    }

    // Place the rules over the drawing's own box: the frame carries padding,
    // so fractions of the frame would drift off the marks.
    const left = marks.left - box.left - el.clientLeft + px * marks.width;
    const top = marks.top - box.top - el.clientTop + py * marks.height;
    el.style.setProperty("--cx", `${left}px`);
    el.style.setProperty("--cy", `${top}px`);

    const { w, h } = measured.current;
    const frameW = el.clientWidth;
    const frameH = el.clientHeight;
    const fitsRight = left + 12 + w <= frameW;
    const fitsLeft = left - 12 - w >= 0;
    const fitsAbove = top - 8 - h >= 0;
    const fitsBelow = top + 10 + h <= frameH;
    el.dataset.tracking = fitsRight || !fitsLeft ? "right" : "left";
    el.dataset.side = fitsAbove || !fitsBelow ? "above" : "below";
  };

  return (
    <div
      ref={frame}
      className="plot"
      data-mode={guide?.kind}
      onPointerMove={move}
      onPointerLeave={hide}
    >
      {children}
      <span className="plot__rule plot__rule--x" aria-hidden="true" />
      <span className="plot__rule plot__rule--y" aria-hidden="true" />
      <span className="plot__dot" aria-hidden="true" />
      <span ref={readout} className="plot__readout" aria-hidden="true" />
    </div>
  );
}
