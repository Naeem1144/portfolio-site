"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// A generative study, not project results. Each point has a stable identity
// across the two states, letting visitors transform disorder into structure.
const POINTS = Array.from({ length: 1800 }, (_, index) => {
  const u = ((index % 100) / 100) * Math.PI * 2;
  const v = (Math.floor(index / 100) / 18) * Math.PI * 2;
  const ring = 1 + 0.38 * Math.cos(v);
  const hash = (n: number) => {
    const value = Math.sin(index * 127.1 + n * 311.7) * 43758.5453;
    return (value - Math.floor(value) - 0.5) * 3;
  };
  return {
    x: ring * Math.cos(u),
    y: ring * Math.sin(u),
    z: 0.38 * Math.sin(v) + 0.16 * Math.sin(3 * u),
    noise: [hash(1), hash(2), hash(3)],
  };
});

export function SignalSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef(1);
  const pointer = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(false);
  const redraw = useRef<() => void>(() => {});
  const [mode, setMode] = useState<"noise" | "signal">("signal");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    target.current = mode === "signal" ? 1 : 0;
    redraw.current();
  }, [mode]);
  useEffect(() => {
    pausedRef.current = paused;
    redraw.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let rotation = 0.3;
    let progress = 1;
    let last = 0;
    let visible = true;
    let running = false;

    function schedule() {
      if (!running && visible && !document.hidden) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    }
    function draw(time: number) {
      if (!context) return;
      running = false;
      const delta = Math.min(time - last, 40);
      last = time;
      if (!reduced && !pausedRef.current) rotation += delta * 0.00012;
      progress = reduced
        ? target.current
        : progress + (target.current - progress) * 0.045;
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.285;
      const tilt =
        0.98 + (reduced || pausedRef.current ? 0 : pointer.current.y * 0.12);
      const turn =
        rotation +
        (reduced || pausedRef.current ? 0 : pointer.current.x * 0.16);
      const projected = POINTS.map((point) => {
        const x = point.noise[0] * (1 - progress) + point.x * progress;
        const y = point.noise[1] * (1 - progress) + point.y * progress;
        const z = point.noise[2] * (1 - progress) + point.z * progress;
        const rx = x * Math.cos(turn) - y * Math.sin(turn);
        const ry = x * Math.sin(turn) + y * Math.cos(turn);
        const depth = ry * Math.sin(tilt) + z * Math.cos(tilt);
        const py = ry * Math.cos(tilt) - z * Math.sin(tilt);
        const perspective = 4.8 / (4.8 - depth);
        const sx = rx * Math.cos(-0.4) - py * Math.sin(-0.4);
        const sy = rx * Math.sin(-0.4) + py * Math.cos(-0.4);
        return {
          x: width / 2 + sx * scale * perspective,
          y: height / 2 + sy * scale * perspective,
          depth,
          size: perspective,
        };
      }).sort((a, b) => a.depth - b.depth);
      for (const point of projected) {
        const front = (point.depth + 1.7) / 3.4;
        context.fillStyle = `rgba(${front > 0.7 ? "34, 81, 57" : "76, 115, 64"}, ${0.18 + front * 0.7})`;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          Math.max(0.6, point.size * 1.35),
          0,
          Math.PI * 2,
        );
        context.fill();
      }
      if (
        (!reduced && !pausedRef.current) ||
        Math.abs(progress - target.current) > 0.001
      )
        schedule();
    }
    redraw.current = schedule;
    const resize = new ResizeObserver((entries) => {
      const bounds = entries[0].contentRect;
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    });
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      schedule();
    });
    const onVisibility = () => schedule();
    const onMotion = () => {
      reduced = media.matches;
      schedule();
    };
    resize.observe(canvas);
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotion);
    return () => {
      cancelAnimationFrame(frame);
      redraw.current = () => {};
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div
      className="signal-study"
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - box.left) / box.width - 0.5,
          y: (event.clientY - box.top) / box.height - 0.5,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <div className="study-label eyebrow">
        <span>FIG. 001</span>
        <span>THE SHAPE OF INSIGHT</span>
      </div>
      <div className="study-canvas">
        <div className="study-cross cross-top" aria-hidden="true">
          +
        </div>
        <div className="study-cross cross-bottom" aria-hidden="true">
          +
        </div>
        <span className="axis-label" aria-hidden="true">
          ORDER FROM COMPLEXITY
        </span>
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="study-coordinate" aria-hidden="true">
          x / y / z<br />
          1,800 points
        </div>
      </div>
      <div className="study-controls">
        <div
          className="signal-toggle"
          role="group"
          aria-label="Data sculpture view"
        >
          <button
            type="button"
            aria-pressed={mode === "noise"}
            onClick={() => setMode("noise")}
          >
            <span>01</span> Raw data
          </button>
          <button
            type="button"
            aria-pressed={mode === "signal"}
            onClick={() => setMode("signal")}
          >
            <span>02</span> Find the signal
          </button>
        </div>
        <button
          type="button"
          className="pause-button"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Play sculpture animation" : "Pause sculpture animation"
          }
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <p className="study-caption" aria-live="polite">
        {mode === "signal"
          ? "Perspective reveals structure."
          : "Same points. Different view."}
      </p>
    </div>
  );
}
