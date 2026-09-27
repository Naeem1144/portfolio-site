"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Fig. 001: a model learning, told in steps.
 *
 * Idle, the points drift across the card with no structure. "Train a model"
 * gathers them into a flat sheet, bends the sheet into a loss surface, marks
 * its minima, then walks a ball downhill by gradient descent. Every point
 * keeps its identity throughout, so each stage morphs out of the last.
 * A generative illustration: the readout is computed from the surface, not
 * quoted from any project.
 */

const SIDE = 38;
const SPAN = 1.6;

/** Two valleys: a shallow local minimum and the deeper global one.
 *
 *  The tilt term matters as much as the depths. A purely radial bowl puts
 *  every corner at the same height, which projects as a four-pointed diamond
 *  rather than a landscape; the `+ TILT * y` term makes the ground fall away
 *  in one direction, so the rim reads as a rim and the basin as a basin. */
const TILT = 0.15;
function loss(x: number, y: number): number {
  return (
    1.02 -
    0.95 * Math.exp(-((x - 0.55) ** 2 + (y - 0.3) ** 2) / 0.62) -
    0.52 * Math.exp(-((x + 0.78) ** 2 + (y + 0.62) ** 2) / 0.24) +
    0.072 * (x * x + y * y) +
    TILT * y
  );
}

function hash(seed: number): number {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const GRID = Array.from({ length: SIDE * SIDE }, (_, i) => {
  const x = ((i % SIDE) / (SIDE - 1)) * 2 * SPAN - SPAN;
  const y = (Math.floor(i / SIDE) / (SIDE - 1)) * 2 * SPAN - SPAN;
  return { x, y, loss: loss(x, y) };
});

/** Height is normalised against the surface's own sampled range, so the
 *  mapping cannot drift out of step with the terrain function. */
const LOSS_MIN = Math.min(...GRID.map((p) => p.loss));
const LOSS_MAX = Math.max(...GRID.map((p) => p.loss));
const LOSS_SPAN = LOSS_MAX - LOSS_MIN;
const surfaceZ = (value: number) => ((value - LOSS_MIN) / LOSS_SPAN) * 2.2 - 1;

const POINTS = GRID.map((grid, i) => ({
  x: grid.x,
  y: grid.y,
  z: surfaceZ(grid.loss),
  basin: grid.loss < LOSS_MIN + 0.26 * LOSS_SPAN,
  /** Scatter position as a fraction of the stage, so the cloud fills the card. */
  sx: hash(i * 1.7),
  sy: hash(i * 3.1),
  drift: hash(i * 5.3) * Math.PI * 2,
  alpha: 0.25 + hash(i * 7.9) * 0.45,
  /** When this point joins the gather, 0 = first. */
  lag: hash(i * 9.7),
}));

/**
 * Camera. CAMERA has to be several times the object's own size: a divisor near
 * the depth of the scene makes the near edge two to three times the far edge,
 * which reads as a funhouse rather than a measured surface. Yaw holds the
 * valleys' diagonal across the card so both minima stay side by side.
 */
const YAW = -Math.PI / 4;
const ELEVATION = 0.7;
const CAMERA = 11;
const SWAY = 0.12;
const PARALLAX_YAW = 0.06;
const PARALLAX_TILT = 0.04;

function view(x: number, y: number, z: number, turn: number, elevation: number) {
  const rx = x * Math.cos(turn) - y * Math.sin(turn);
  const ry = x * Math.sin(turn) + y * Math.cos(turn);
  const depth = ry * Math.cos(elevation) + z * Math.sin(elevation);
  const sy = -z * Math.cos(elevation) + ry * Math.sin(elevation);
  const perspective = CAMERA / (CAMERA - depth);
  return { x: rx * perspective, y: sy * perspective, depth, perspective };
}

/** The tallest corner of the base plane, where the error axis is hung.
 *  It is the high corner because of the tilt, so the axis spans exactly the
 *  height the terrain already reaches there and needs no room of its own. */
const AXIS_AT = { x: SPAN, y: SPAN };

type Sample = { x: number; y: number; loss: number };

/** Gradient descent with momentum, from a given start, until it settles. */
function descend(x: number, y: number): Sample[] {
  const path = [{ x, y, loss: loss(x, y) }];
  let vx = 0;
  let vy = 0;
  const e = 1e-3;
  for (let step = 0; step < 400; step++) {
    const gx = (loss(x + e, y) - loss(x - e, y)) / (2 * e);
    const gy = (loss(x, y + e) - loss(x, y - e)) / (2 * e);
    vx = vx * 0.82 - gx * 0.035;
    vy = vy * 0.82 - gy * 0.035;
    x += vx;
    y += vy;
    path.push({ x, y, loss: loss(x, y) });
    // Momentum never quite reaches zero, so a velocity threshold alone lets the
    // ball jitter on the floor for another fifty steps. Stop on progress.
    if (step > 25 && path[step + 1]!.loss - path[step]!.loss < 1e-3 && Math.hypot(vx, vy) < 2e-3) break;
  }
  return path;
}

/**
 * Even arc length in the neutral projected pose, so every hop covers the same
 * ground. Resampling the raw steps instead leaves the ball crawling through the
 * basin and leaping across the rim, and a tail of invisible samples that pad out
 * the animation with nothing on screen.
 */
function resample(path: Sample[], count: number): Sample[] {
  const pts = path.map((s) => {
    const v = view(s.x, s.y, surfaceZ(s.loss), YAW, ELEVATION);
    return { s, x: v.x, y: v.y, at: 0 };
  });
  for (let i = 1; i < pts.length; i++) {
    pts[i]!.at = pts[i - 1]!.at + Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y);
  }
  const total = pts[pts.length - 1]!.at;
  const out: Sample[] = [];
  let i = 0;
  for (let k = 0; k < count; k++) {
    const target = (total * k) / (count - 1);
    while (i < pts.length - 2 && pts[i + 1]!.at < target) i++;
    const a = pts[i]!;
    const b = pts[i + 1] ?? a;
    const span = b.at - a.at;
    const t = span > 1e-9 ? (target - a.at) / span : 0;
    out.push({
      x: a.s.x + (b.s.x - a.s.x) * t,
      y: a.s.y + (b.s.y - a.s.y) * t,
      loss: a.s.loss + (b.s.loss - a.s.loss) * t,
    });
  }
  return out;
}

const HOPS = 28;
const PATH = resample(descend(-1.35, 1.25), HOPS);
const GLOBAL = PATH[PATH.length - 1]!;
const LOCAL = descend(-0.95, -0.85).at(-1)!;

/** Timeline of a training run, in ms from pressing the button. Each stage's tween
 *  is given room to land before the next caption arrives. */
const T = { sheet: 1600, surface: 2500, minima: 3800, descent: 4700 };
const STEP_MS = 80;
const DONE = T.descent + (HOPS - 1) * STEP_MS;

/** Error axis ticks, in loss units, spanning the sampled range. */
const TICKS = [0.5, 1, 1.5].filter((v) => v > LOSS_MIN && v < LOSS_MAX);

/** The right gutter is reserved for the error axis; the other edges only need breathing room. */
const PAD = { left: 20, right: 44, top: 36, bottom: 30 };

const PHASES = [
  { id: "raw", readout: "raw data · no structure", caption: "Scattered points, no structure yet. Press train to see what a model does." },
  { id: "gather", readout: "01 / 05 · collecting", caption: "Step 1 · the points come together." },
  { id: "sheet", readout: "02 / 05 · shaping", caption: "Step 2 · they line up into a sheet of possible answers." },
  { id: "surface", readout: "03 / 05 · measuring error", caption: "Step 3 · height is the error of each answer. Valleys are good." },
  { id: "minima", readout: "04 / 05 · finding low points", caption: "Step 4 · there are two low points, but only one is the lowest." },
  { id: "descent", readout: "", caption: "Step 5 · gradient descent walks downhill, one small step at a time." },
  { id: "done", readout: "", caption: "Found it · the lowest error on the whole surface." },
] as const;

type PhaseId = (typeof PHASES)[number]["id"];

function phaseAt(elapsed: number, training: boolean): PhaseId {
  if (!training) return "raw";
  if (elapsed < T.sheet) return "gather";
  if (elapsed < T.surface) return "sheet";
  if (elapsed < T.minima) return "surface";
  if (elapsed < T.descent) return "minima";
  if (elapsed < DONE) return "descent";
  return "done";
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
/** Eases a value toward its target at a rate that doesn't depend on frame rate. */
const approach = (value: number, target: number, delta: number, tau: number) =>
  value + (target - value) * (1 - Math.exp(-delta / tau));

export function HeroFigure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const trainingRef = useRef(true);
  const pausedRef = useRef(true);
  const restart = useRef(false);
  const pointer = useRef({ x: 0, y: 0 });
  const wake = useRef<() => void>(() => {});
  const [training, setTraining] = useState(true);
  const [paused, setPaused] = useState(true);
  const [phase, setPhase] = useState<PhaseId>("done");

  useEffect(() => {
    trainingRef.current = training;
    wake.current();
  }, [training]);

  useEffect(() => {
    pausedRef.current = paused;
    wake.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;
    let ink = "#f2f4ed";
    let accent = "#dfff00";
    let mono = "ui-monospace, monospace";
    let surface = "#171c1e";
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let clock = 0;
    let elapsed = DONE;
    let fit = { scale: 1, cx: 0, cy: 0 };
    let currentPhase: PhaseId = "done";

    // Tweened stage values, 0..1.
    let gather = 1;
    let bend = 1;
    let marks = 1;

    const readStyle = () => {
      const style = getComputedStyle(canvas);
      ink = style.getPropertyValue("--ink").trim() || ink;
      accent = style.getPropertyValue("--accent").trim() || accent;
      mono = style.getPropertyValue("--font-mono").trim() || mono;
      surface = style.getPropertyValue("--paper-raised").trim() || surface;
    };

    const schedule = () => {
      if (!running && visible && !document.hidden) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const project = (x: number, y: number, z: number, turn: number, elevation: number) => {
      const v = view(x, y, z, turn, elevation);
      return { x: fit.cx + v.x * fit.scale, y: fit.cy + v.y * fit.scale, depth: v.depth, perspective: v.perspective };
    };

    /** Scale and centre so the sheet and the surface, at every reachable angle, stay inside the stage. */
    const refit = () => {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (let t = -1; t <= 1; t += 0.25) {
        for (const e of [-1, 1]) {
          const turn = YAW + t * (SWAY + PARALLAX_YAW);
          const elevation = ELEVATION + e * PARALLAX_TILT;
          for (let i = 0; i < POINTS.length; i += 3) {
            const point = POINTS[i]!;
            for (const z of [0, point.z]) {
              const v = view(point.x, point.y, z, turn, elevation);
              minX = Math.min(minX, v.x);
              maxX = Math.max(maxX, v.x);
              minY = Math.min(minY, v.y);
              maxY = Math.max(maxY, v.y);
            }
          }
        }
      }
      const innerW = Math.max(1, width - PAD.left - PAD.right);
      const innerH = Math.max(1, height - PAD.top - PAD.bottom);
      const scale = Math.min(innerW / (maxX - minX), innerH / (maxY - minY));
      fit = {
        scale,
        cx: PAD.left + innerW / 2 - ((minX + maxX) / 2) * scale,
        cy: PAD.top + innerH / 2 - ((minY + maxY) / 2) * scale,
      };
    };

    const label = (
      text: string,
      x: number,
      y: number,
      alpha: number,
      strong = false,
      align: CanvasTextAlign = "center",
      size = 11,
    ) => {
      ctx.globalAlpha = alpha;
      ctx.font = `${strong ? 600 : 500} ${size}px ${mono}`;
      ctx.textAlign = align;
      ctx.lineJoin = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = surface;
      ctx.strokeText(text, x, y);
      ctx.fillStyle = strong ? accent : ink;
      ctx.fillText(text, x, y);
    };

    function draw(time: number) {
      if (!ctx) return;
      running = false;
      const delta = Math.min(time - last, 40);
      last = time;
      const training = trainingRef.current;
      const paused = pausedRef.current;

      if (restart.current) {
        restart.current = false;
        elapsed = 0;
        gather = 0;
        bend = 0;
        marks = 0;
      }
      if (!paused) {
        clock += delta;
        if (training) elapsed += delta;
      }
      if (reduced && training) elapsed = DONE;

      const nextPhase = phaseAt(elapsed, training);
      if (nextPhase !== currentPhase) {
        currentPhase = nextPhase;
        setPhase(nextPhase);
      }

      // Stage targets from the timeline; tweening keeps reversals smooth too.
      const targets = training
        ? {
            gather: 1,
            bend: elapsed >= T.surface ? 1 : 0,
            marks: elapsed >= T.minima ? 1 : 0,
          }
        : { gather: 0, bend: 0, marks: 0 };
      if (reduced) {
        gather = targets.gather;
        bend = targets.bend;
        marks = targets.marks;
      } else if (!paused) {
        gather = approach(gather, targets.gather, delta, training ? 420 : 300);
        bend = approach(bend, targets.bend, delta, 380);
        marks = approach(marks, targets.marks, delta, 250);
      }

      const formed = smooth(gather);
      const turn =
        YAW + Math.sin(clock * 0.00028) * SWAY * formed + pointer.current.x * 2 * PARALLAX_YAW * formed;
      const elevation = ELEVATION + pointer.current.y * 2 * PARALLAX_TILT * formed;
      const lift = smooth(bend);

      ctx.clearRect(0, 0, width, height);

      const innerW = Math.max(1, width - PAD.left - PAD.right);
      const innerH = Math.max(1, height - PAD.top - PAD.bottom);
      // A dot sized from the lattice pitch closes the gaps at every card size;
      // a fixed radius leaves the far field see-through on a wide card and
      // blobs into a solid wash on a small one. The row pitch is the tighter of
      // the two, because the camera foreshortens it, and it is the one that
      // decides whether neighbouring dots touch.
      const pitch = ((2 * SPAN) / (SIDE - 1)) * fit.scale * Math.sin(elevation);
      const points = POINTS.map((point) => {
        const g = smooth(gather * 1.5 - point.lag * 0.5);
        const p = project(point.x, point.y, point.z * lift, turn, elevation);
        const floatX = reduced ? 0 : Math.sin(clock * 0.0005 + point.drift) * 5;
        const floatY = reduced ? 0 : Math.cos(clock * 0.0004 + point.drift) * 5;
        const sx = PAD.left + point.sx * innerW + floatX;
        const sy = PAD.top + point.sy * innerH + floatY;
        const front = clamp01((p.depth + 1.5) / 4.2);
        const basin = point.basin && lift > 0.5;
        // Depth for sorting must be the geometric one: `g` varies per point, so
        // sorting on the tweened value lets far points paint over near ones
        // halfway through the gather.
        return {
          x: sx + (p.x - sx) * g,
          y: sy + (p.y - sy) * g,
          r: 1.5 + (pitch * 0.36 * (0.86 + 0.3 * p.perspective - 0.15) - 1.5) * g,
          depth: p.depth,
          alpha: point.alpha + ((basin ? 0.34 : 0.3) + front * (basin ? 0.28 : 0.3) - point.alpha) * g,
          accent: basin,
        };
      }).sort((a, b) => a.depth - b.depth);

      for (const point of points) {
        ctx.fillStyle = point.accent ? accent : ink;
        ctx.globalAlpha = point.alpha;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Error axis, hung off the far corner of the base plane so the height
      // mapping is readable instead of merely implied.
      if (lift > 0.01) {
        const foot = project(AXIS_AT.x, AXIS_AT.y, 0, turn, elevation);
        const head = project(AXIS_AT.x, AXIS_AT.y, surfaceZ(LOSS_MAX), turn, elevation);
        ctx.globalAlpha = lift * 0.55;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(foot.x, foot.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
        const dx = head.x - foot.x;
        const dy = head.y - foot.y;
        const len = Math.hypot(dx, dy) || 1;
        for (const value of TICKS) {
          const tick = project(AXIS_AT.x, AXIS_AT.y, surfaceZ(value), turn, elevation);
          ctx.beginPath();
          ctx.moveTo(tick.x, tick.y);
          // Perpendicular to the axis, pointing into the right gutter.
          ctx.lineTo(tick.x - (dy / len) * 4, tick.y + (dx / len) * 4);
          ctx.stroke();
          label(value.toFixed(1), tick.x + 7, tick.y + 3, lift * 0.75, false, "left", 10);
        }
        label("error", head.x + 4, head.y - 7, lift * 0.75, false, "left", 10);
      }

      const at = (s: Sample, above = 0.05) => project(s.x, s.y, surfaceZ(s.loss) * lift + above, turn, elevation);

      if (marks > 0.01) {
        // A ring in parameter space, not a fixed pixel count, so it still reads
        // as marking the feature once the card is narrow.
        const ring = 0.16 * fit.scale;
        const lead = 0.5 * fit.scale;
        for (const [minimum, name, side] of [
          [LOCAL, "local min", -1],
          [GLOBAL, "global min", 1],
        ] as const) {
          const m = at(minimum);
          ctx.globalAlpha = marks;
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(m.x, m.y, ring, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          // Leader line out to the clear space below the terrain, so the two
          // labels never knot together over the point field. Half the label
          // width is reserved either side so neither runs off the stage.
          const half = 30;
          const ax = Math.min(
            Math.max(PAD.left + half, m.x + side * lead * 1.3),
            width - PAD.right - half,
          );
          const ay = Math.min(
            Math.max(PAD.top + 14, m.y + lead * (side > 0 ? 0.8 : 1.25)),
            height - PAD.bottom - 6,
          );
          ctx.globalAlpha = marks * 0.7;
          ctx.beginPath();
          ctx.moveTo(m.x + side * ring * 0.72, m.y);
          ctx.lineTo(ax - side * 6, ay);
          ctx.stroke();
          // The caption claims only one minimum is the lowest, so the pair of
          // values is what makes that checkable.
          label(name, ax, ay - 3, marks, side > 0 && currentPhase === "done", "center");
          label(minimum.loss.toFixed(2), ax, ay + 11, marks * 0.8, false, "center", 10);
        }
      }

      const step = Math.max(0, Math.min(PATH.length - 1, Math.floor((elapsed - T.descent) / STEP_MS)));
      const walking = training && elapsed >= T.descent;
      if (walking) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.6;
        ctx.lineJoin = "round";
        ctx.beginPath();
        for (let i = 0; i <= step; i++) {
          const s = at(PATH[i]!, 0.08);
          if (i === 0) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
        }
        ctx.stroke();

        const start = at(PATH[0]!, 0.08);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 3, 0, Math.PI * 2);
        ctx.stroke();

        const ring = 0.16 * fit.scale;
        const ball = at(PATH[step]!, 0.08);
        const pulse = currentPhase === "done" && !reduced ? 1 + Math.sin(clock * 0.004) * 0.25 : 1;
        // Kept inside the ring it stands on, so the marker from step 4 survives.
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ring * 0.7 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ring * 0.34, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (readoutRef.current) {
        const info = PHASES.find((p) => p.id === currentPhase)!;
        readoutRef.current.textContent =
          currentPhase === "done"
            ? `05 / 05 · converged · loss ${GLOBAL.loss.toFixed(3)}`
            : walking
              ? `05 / 05 · step ${String(step).padStart(2, "0")} · loss ${PATH[step]!.loss.toFixed(3)}`
              : info.readout;
      }

      const settling =
        Math.abs(gather - targets.gather) > 0.001 ||
        Math.abs(bend - targets.bend) > 0.001 ||
        Math.abs(marks - targets.marks) > 0.001;
      if (!paused && (!reduced || settling)) schedule();
    }

    wake.current = schedule;

    const resize = new ResizeObserver(([entry]) => {
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      refit();
      schedule();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      schedule();
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readStyle();
      schedule();
    };
    const onMotion = () => {
      reduced = media.matches;
      schedule();
    };
    const onVisibility = () => schedule();

    readStyle();
    resize.observe(canvas);
    intersection.observe(canvas);
    scheme.addEventListener("change", onScheme);
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      wake.current = () => {};
      resize.disconnect();
      intersection.disconnect();
      scheme.removeEventListener("change", onScheme);
      media.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const caption = PHASES.find((p) => p.id === phase)!.caption;

  return (
    <figure
      className="study"
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
      <div className="study__head" aria-hidden="true">
        <span>Fig. 001</span>
        <span>How a model learns</span>
      </div>

      <div className="study__stage">
        <span className="study__cross study__cross--tl" aria-hidden="true">+</span>
        <span className="study__cross study__cross--br" aria-hidden="true">+</span>
        <span className="study__meta" aria-hidden="true">
          {phase === "raw" ? "raw data" : "loss surface"}
          <br />
          {POINTS.length.toLocaleString("en")} points
        </span>
        <canvas ref={canvasRef} aria-hidden="true" />
        <span className="study__readout num" ref={readoutRef} aria-hidden="true">
          A model finding its minimum error
        </span>
      </div>

      <div className="study__controls">
        <div className="study__toggle" role="group" aria-label="Figure view">
          <button type="button" aria-pressed={!training} onClick={() => { setTraining(false); setPaused(false); }}>
            <span className="num">01</span> Raw data
          </button>
          <button
            type="button"
            aria-pressed={training}
            onClick={() => {
              setPaused(false);
              if (training) {
                restart.current = true;
                wake.current();
              } else {
                restart.current = true;
                setTraining(true);
              }
            }}
          >
            <span className="num">02</span> Watch it learn
          </button>
        </div>
        <button
          type="button"
          className="study__pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play the animation" : "Pause the animation"}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>

      <figcaption className="study__caption" aria-live="polite">
        {caption}
      </figcaption>
    </figure>
  );
}
