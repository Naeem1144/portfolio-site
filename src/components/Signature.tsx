"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * The sign-off: the name set huge in a field of dots. They lean away from the
 * pointer and light up in the accent, a tap sends a ripple through them, and a
 * slow sweep of light crosses them while nobody is touching. Nothing to read.
 */

type Dot = { x: number; y: number; ox: number; oy: number; glow: number };
type Ripple = { x: number; y: number; born: number };

const LENS = 120;
const PUSH = 16;
const RIPPLE_SPEED = 0.8;
const RIPPLE_WIDTH = 46;
const SWEEP_MS = 5600;

const approach = (value: number, target: number, delta: number, tau: number) =>
  value + (target - value) * (1 - Math.exp(-delta / tau));

export function Signature() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let ripples: Ripple[] = [];
    let pointer: { x: number; y: number } | null = null;
    let width = 0;
    let height = 0;
    let radius = 2;
    let ink = "#f3f1ea";
    let accent = "#a5b0ff";
    let frame = 0;
    let last = 0;
    let visible = false;
    let cancelled = false;

    const layout = async () => {
      const style = getComputedStyle(canvas);
      ink = style.getPropertyValue("--ink").trim() || ink;
      accent = style.getPropertyValue("--accent").trim() || accent;
      const family = style.fontFamily;
      await document.fonts.load(`600 100px ${family}`).catch(() => undefined);
      if (cancelled) return;

      width = Math.round(wrap.getBoundingClientRect().width);
      if (!width) return;
      const lines = width < 600 ? site.name.split(" ") : [site.name];
      const step = Math.max(4, Math.round(width / 190));

      // Set the name on a scratch canvas, then keep one dot per inked cell.
      const scratch = document.createElement("canvas");
      const sctx = scratch.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      const setFont = (size: number) => {
        sctx.font = `600 ${size}px ${family}`;
        sctx.letterSpacing = `${-0.045 * size}px`;
      };
      setFont(100);
      const widest = Math.max(...lines.map((line) => sctx.measureText(line).width));
      const size = Math.floor((100 * width) / widest) * 0.99;
      const leading = size * 0.9;
      scratch.width = width;
      scratch.height = Math.ceil(leading * lines.length + size * 0.3);
      setFont(size);
      sctx.textBaseline = "alphabetic";
      sctx.fillStyle = "#000";
      lines.forEach((line, i) => sctx.fillText(line, 0, size * 0.78 + i * leading));

      const pixels = sctx.getImageData(0, 0, scratch.width, scratch.height).data;
      const found: Dot[] = [];
      let top = Infinity;
      let bottom = 0;
      for (let y = step / 2; y < scratch.height; y += step) {
        for (let x = step / 2; x < scratch.width; x += step) {
          const alpha = pixels[(Math.floor(y) * scratch.width + Math.floor(x)) * 4 + 3]!;
          if (alpha > 140) {
            found.push({ x, y, ox: 0, oy: 0, glow: 0 });
            top = Math.min(top, y);
            bottom = Math.max(bottom, y);
          }
        }
      }

      // Trim to the ink, with room for the dots to lean out.
      const margin = PUSH + step;
      dots = found.map((d) => ({ ...d, y: d.y - top + margin }));
      height = Math.ceil(bottom - top + margin * 2);
      radius = step * 0.34;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setReady(true);
      draw(performance.now());
    };

    const draw = (now: number) => {
      frame = 0;
      const delta = last ? Math.min(now - last, 40) : 16;
      last = now;
      ripples = ripples.filter((r) => (now - r.born) * RIPPLE_SPEED < width + RIPPLE_WIDTH);
      const sweep = ((now % SWEEP_MS) / SWEEP_MS) * (width + height + 600) - 300;

      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        let tx = 0;
        let ty = 0;
        let glow = 0;

        if (!reduced && pointer) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < LENS) {
            const k = (1 - d / LENS) ** 2;
            tx += (dx / d) * k * PUSH;
            ty += (dy / d) * k * PUSH;
            glow = Math.max(glow, k);
          }
        }
        for (const r of ripples) {
          const dx = dot.x - r.x;
          const dy = dot.y - r.y;
          const d = Math.hypot(dx, dy) || 1;
          const front = (now - r.born) * RIPPLE_SPEED;
          const band = 1 - Math.abs(d - front) / RIPPLE_WIDTH;
          if (band > 0) {
            const k = band * Math.max(0, 1 - front / (width * 0.9));
            tx += (dx / d) * k * PUSH * 0.7;
            ty += (dy / d) * k * PUSH * 0.7;
            glow = Math.max(glow, k);
          }
        }

        dot.ox = reduced ? 0 : approach(dot.ox, tx, delta, 110);
        dot.oy = reduced ? 0 : approach(dot.oy, ty, delta, 110);
        dot.glow = reduced ? 0 : approach(dot.glow, glow, delta, 140);

        const light = reduced ? 0 : Math.max(0, 1 - Math.abs(dot.x + dot.y * 0.6 - sweep) / 160);
        const x = dot.x + dot.ox;
        const y = dot.y + dot.oy;

        ctx.globalAlpha = Math.min(1, 0.4 + light * 0.4 + dot.glow * 0.6);
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(x, y, radius * (1 + dot.glow * 0.5), 0, Math.PI * 2);
        ctx.fill();

        if (dot.glow > 0.04) {
          ctx.globalAlpha = dot.glow;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(x, y, radius * (1 + dot.glow * 0.9), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const wakeUp = () => {
      if (!frame && !reduced && visible && !document.hidden && dots.length) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };

    const local = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const onMove = (event: PointerEvent) => {
      pointer = local(event);
      wakeUp();
    };
    const onLeave = () => {
      pointer = null;
    };
    const onDown = (event: PointerEvent) => {
      if (reduced) return;
      ripples.push({ ...local(event), born: performance.now() });
      wakeUp();
    };

    const seen = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      wakeUp();
    });
    let lastWidth = 0;
    const resize = new ResizeObserver(([entry]) => {
      const w = Math.round(entry?.contentRect.width ?? 0);
      if (w && w !== lastWidth) {
        lastWidth = w;
        void layout();
      }
    });

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", wakeUp);
    seen.observe(canvas);
    resize.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", wakeUp);
      seen.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="signature" data-ready={ready || undefined}>
      <p className="signature__text" aria-hidden="true">
        {site.name}
      </p>
      <canvas ref={canvasRef} className="signature__canvas" aria-hidden="true" />
    </div>
  );
}
