"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ICON_SIZE, ICON_STROKE } from "@/lib/icon";
import { tokens } from "@/lib/tokens";

/**
 * Fig. 1 — The Analytical Lens.
 *
 * A three-stage interactive 3D/2D visualization showing how raw business
 * records become a concrete decision:
 *
 *  01 Clean   — A 15×12 record matrix swept by a validation scanline that flags
 *               18 corrupted/duplicate rows (×) and locks 162 clean records.
 *  02 Cluster — The camera tilts into 3D perspective; clean records separate
 *               into three behavioural segments linked by 3D k-NN filaments,
 *               projected floor convex hulls, and vertical centroid drop-lines.
 *  03 Decide  — Records project onto a non-linear net-lift response curve with
 *               vertical residual stems, a 95% confidence ribbon, and the
 *               optimal intervention cutoff marked in cobalt (+31.4% lift).
 *
 * Hovering at any time wakes the loop: orbiting the 3D camera, inspecting
 * individual records in Stages 1–2, or scrubbing the decision cutoff in Stage 3.
 * Visitors can also click any stage tab (01 Clean · 02 Cluster · 03 Decide) or
 * Replay the full sequence on demand.
 */

const COLS = 15;
const ROWS = 12;
const COUNT = COLS * ROWS; // 180 records

export type StageId = "clean" | "cluster" | "decide";

const STAGES: readonly {
  id: StageId;
  num: string;
  label: string;
  caption: string;
}[] = [
  {
    id: "clean",
    num: "01",
    label: "Clean",
    caption: "Step 1 · 180 raw records scanned; 18 anomalies filtered out.",
  },
  {
    id: "cluster",
    num: "02",
    label: "Cluster",
    caption: "Step 2 · 162 clean records grouped into 3 behavioural segments in 3D space.",
  },
  {
    id: "decide",
    num: "03",
    label: "Decide",
    caption: "Step 3 · Response curve locks onto the optimal cutoff (+31.4% net lift).",
  },
] as const;

const REST_CAPTION =
  "Illustration: 162 cleaned records clustered and mapped to an optimal decision cutoff.";

function hash(seed: number): number {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/** Standard normal approximation via Box-Muller on deterministic hashes. */
function gauss(s1: number, s2: number): number {
  const u1 = Math.max(1e-4, hash(s1));
  const u2 = hash(s2);
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/** The computed accent is always a hex from tokens.ts / globals.css. */
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h[0]! + h[0]! + h[1]! + h[1]! + h[2]! + h[2]!;
  const v = Number.parseInt(h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const CLUSTERS = [
  {
    id: 0,
    name: "High-value",
    short: "Seg A · High-value",
    cx: 0.62,
    cy: -0.28,
    cz: 0.46,
    rx: 0.34,
    ry: 0.28,
    rz: 0.26,
  },
  {
    id: 1,
    name: "Steady core",
    short: "Seg B · Steady",
    cx: -0.62,
    cy: -0.3,
    cz: 0.04,
    rx: 0.36,
    ry: 0.28,
    rz: 0.24,
  },
  {
    id: 2,
    name: "At-risk",
    short: "Seg C · At-risk",
    cx: 0.02,
    cy: 0.56,
    cz: -0.34,
    rx: 0.38,
    ry: 0.26,
    rz: 0.22,
  },
] as const;

const FLOOR_Z = -0.88;

/**
 * Expected net retention lift (%) as a function of propensity threshold t in [0, 1].
 * Peaks at t* = 0.68 with +31.4% lift, then declines as incentive cost exceeds gain.
 */
const OPTIMAL_T = 0.68;
function liftCurve(t: number): number {
  const base = 31.4 * Math.exp(-((t - OPTIMAL_T) ** 2) / (t < OPTIMAL_T ? 0.19 : 0.075));
  const tail = -4.2 * (1 - t) ** 2.4;
  return base + tail;
}

function liftConfidence(t: number): number {
  return 2.1 + 2.4 * Math.abs(t - 0.58);
}

/** Maps lift percentage [-6, 36] into normalized stage Y [-0.72, 0.72] (positive = up). */
const liftToZ = (lift: number) => ((lift - 13) / 23) * 0.68;
/** Maps threshold t [0, 1] into normalized stage X [-1.18, 1.18]. */
const scoreToX = (t: number) => (t - 0.5) * 2.32;

type AnomalyReason = "dup_id" | "null_val" | "outlier";
const REASONS: readonly AnomalyReason[] = ["dup_id", "null_val", "outlier"];

type PointRecord = {
  id: number;
  row: number;
  col: number;
  anomaly: boolean;
  reason: AnomalyReason;
  cluster: 0 | 1 | 2;
  /** Stage 1: Clean matrix coordinates */
  x1: number;
  y1: number;
  z1: number;
  /** Stage 2: 3D Cluster space coordinates */
  x2: number;
  y2: number;
  z2: number;
  /** Stage 3: Decision curve coordinates */
  t: number;
  liftObs: number;
  liftHat: number;
  x3: number;
  y3: number;
  z3: number;
};

const RECORDS: PointRecord[] = Array.from({ length: COUNT }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;

  // Stage 1: 15x12 structured matrix
  const x1 = ((col / (COLS - 1)) * 2 - 1) * 1.16;
  const y1 = ((row / (ROWS - 1)) * 2 - 1) * 0.74;
  const z1 = 0;

  // Deterministic ~10% anomaly selection (18 of 180 records), well-distributed
  const anomalyScore = hash(i * 19.3 + row * 7.1 + col * 3.7);
  const anomaly = anomalyScore < 0.105 && !(row === 0 && col === 0);
  const reason = REASONS[i % REASONS.length]!;

  // Assign cluster 0, 1, 2
  const cluster = ((i * 7 + row * 3) % 3) as 0 | 1 | 2;
  const c = CLUSTERS[cluster]!;

  // Bounded Gaussian offsets for tight, organic 3D clusters
  const gx = Math.max(-1.65, Math.min(1.65, gauss(i * 3.1 + 1, i * 5.7 + 2)));
  const gy = Math.max(-1.65, Math.min(1.65, gauss(i * 7.3 + 3, i * 11.1 + 4)));
  const gz = Math.max(-1.65, Math.min(1.65, gauss(i * 13.7 + 5, i * 17.9 + 6)));

  const x2 = c.cx + gx * c.rx * 0.58;
  const y2 = c.cy + gy * c.ry * 0.58;
  const z2 = c.cz + gz * c.rz * 0.58;

  // Stage 3: Decision score t stratified by segment so segments map along the curve
  const tRange =
    cluster === 2
      ? [0.05, 0.42]
      : cluster === 1
        ? [0.34, 0.72]
        : [0.54, 0.95];
  const u = hash(i * 23.1 + 9);
  const t = tRange[0]! + u * (tRange[1]! - tRange[0]!);
  const liftHat = liftCurve(t);
  const noise = (hash(i * 31.7) - 0.5) * 2 * liftConfidence(t) * 1.15;
  const liftObs = liftHat + noise;

  const x3 = scoreToX(t);
  const y3 = (hash(i * 41.3) - 0.5) * 0.28; // subtle depth layer for 2.5D parallax
  const z3 = liftToZ(liftObs);

  return {
    id: i + 1,
    row,
    col,
    anomaly,
    reason,
    cluster,
    x1,
    y1,
    z1,
    x2,
    y2,
    z2,
    t,
    liftObs,
    liftHat,
    x3,
    y3,
    z3,
  };
});

/** Precompute 3D k-NN filaments within each cluster for Stage 2. */
const EDGES: { a: number; b: number; cluster: 0 | 1 | 2 }[] = [];
{
  const seen = new Set<string>();
  const clean = RECORDS.filter((r) => !r.anomaly);
  for (const p of clean) {
    const neighbours = clean
      .filter((q) => q.id !== p.id && q.cluster === p.cluster)
      .map((q) => ({
        id: q.id - 1,
        d: Math.hypot(p.x2 - q.x2, p.y2 - q.y2, p.z2 - q.z2),
      }))
      .sort((m, n) => m.d - n.d)
      .slice(0, 2);

    for (const n of neighbours) {
      const a = Math.min(p.id - 1, n.id);
      const b = Math.max(p.id - 1, n.id);
      const key = `${a}-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        EDGES.push({ a, b, cluster: p.cluster });
      }
    }
  }
}

/** 2D Monotone Chain convex hull in the (x2, y2) floor plane for each cluster. */
function convexHull2D(pts: { x: number; y: number }[]): { x: number; y: number }[] {
  const sorted = [...pts].sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));
  if (sorted.length <= 2) return sorted;
  const cross = (
    o: { x: number; y: number },
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower: { x: number; y: number }[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2]!, lower[lower.length - 1]!, p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: { x: number; y: number }[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]!;
    while (upper.length >= 2 && cross(upper[upper.length - 2]!, upper[upper.length - 1]!, p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

const CLUSTER_HULLS = CLUSTERS.map((c) => {
  const members = RECORDS.filter((r) => !r.anomaly && r.cluster === c.id).map((r) => ({
    x: r.x2,
    y: r.y2,
  }));
  const rawHull = convexHull2D(members);
  // Pad hull slightly outward from cluster center so points sit comfortably inside
  return rawHull.map((p) => {
    const dx = p.x - c.cx;
    const dy = p.y - c.cy;
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: p.x + (dx / len) * 0.07,
      y: p.y + (dy / len) * 0.07,
    };
  });
});

/** Camera pose per stage: smoothly interpolated during morphs. */
const CAMERA_POSES: Record<StageId, { yaw: number; elevation: number; persp: number }> = {
  clean: { yaw: 0, elevation: 0, persp: 0.15 }, // Top-down orthographic matrix
  cluster: { yaw: -0.64, elevation: 0.98, persp: 1 }, // 3D isometric/perspective orbit
  decide: { yaw: 0, elevation: 1.48, persp: 0.45 }, // Front-facing 2.5D response plot
};

const CAMERA_DIST = 9.5;

function project3D(
  x: number,
  y: number,
  z: number,
  yaw: number,
  elevation: number,
  perspStrength: number,
) {
  const rx = x * Math.cos(yaw) - y * Math.sin(yaw);
  const ry = x * Math.sin(yaw) + y * Math.cos(yaw);
  // When elevation = 0 (Stage 1 top-down): sy = ry, depth = -z
  // When elevation ~ 1.0 (Stage 2 3D): sy mixes -z (height) and ry (ground depth)
  // When elevation ~ pi/2 (Stage 3 front): sy = -z, depth = ry
  const sy = ry * Math.cos(elevation) - z * Math.sin(elevation);
  const depth = ry * Math.sin(elevation) + z * Math.cos(elevation);
  const k = 1 + (CAMERA_DIST / (CAMERA_DIST - depth) - 1) * perspStrength;
  return { x: rx * k, y: sy * k, depth, k };
}

/** Timeline for the automatic opening sequence (ms). */
const T_CLUSTER = 2900;
const T_DECIDE = 6300;
const T_DONE = 9200;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const approach = (value: number, target: number, delta: number, tau: number) =>
  value + (target - value) * (1 - Math.exp(-delta / tau));

/**
 * One integration step of a spring, in frame time. Critically damped (zeta = 1)
 * arrives without overshoot; a little less makes a move feel placed rather
 * than corrected. Returns the new value and velocity.
 */
const spring = (
  value: number,
  velocity: number,
  target: number,
  delta: number,
  omega: number,
  zeta = 1,
): [number, number] => {
  const accel = -2 * zeta * omega * velocity - omega * omega * (value - target);
  const v = velocity + accel * delta;
  return [value + v * delta, v];
};

/**
 * Each filament's place in the Stage 2 weave: 0 at its cluster's centre, 1 at
 * the rim. The web grows outward from each centroid when the stage arrives,
 * so the order reads as clustering rather than a uniform fade.
 */
const EDGE_GROW = EDGES.map((edge) => {
  const a = RECORDS[edge.a]!;
  const b = RECORDS[edge.b]!;
  const c = CLUSTERS[edge.cluster]!;
  const mid = Math.hypot((a.x2 + b.x2) / 2 - c.cx, (a.y2 + b.y2) / 2 - c.cy);
  return clamp01(mid / 0.34);
});

export function HeroFigure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<() => void>(() => {});
  const stageTargetRef = useRef<StageId>("decide");
  const autoPlayRef = useRef(true);
  const restartRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number; px: number; py: number; active: boolean }>({
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    active: false,
  });

  const [activeStage, setActiveStage] = useState<StageId>("decide");
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [userPicked, setUserPicked] = useState(false);

  const selectStage = (stage: StageId) => {
    autoPlayRef.current = false;
    stageTargetRef.current = stage;
    setActiveStage(stage);
    setAutoPlaying(false);
    setUserPicked(true);
    wakeRef.current();
  };

  const replay = () => {
    autoPlayRef.current = true;
    restartRef.current = true;
    stageTargetRef.current = "clean";
    setActiveStage("clean");
    setAutoPlaying(true);
    setUserPicked(false);
    wakeRef.current();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;

    let ink: string = tokens.ink;
    let ink2: string = tokens.ink2;
    let ink3: string = tokens.ink3;
    let accent: string = tokens.accent;
    let data3 = "#7583e4";
    let surface: string = tokens.paper;
    let mono = "ui-monospace, monospace";

    let width = 0;
    let height = 0;
    let fit = { scale: 1, cx: 0, cy: 0 };

    let frame = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let elapsed = T_DONE;

    // Continuous stage weights (sum ~ 1), camera parameters, and pointer
    // tilt. Each is a spring — value plus velocity — so stage moves carry
    // weight and settle instead of easing in a straight line.
    let wClean = 0;
    let wCluster = 0;
    let wDecide = 1;
    let vClean = 0;
    let vCluster = 0;
    let vDecide = 0;
    let scanLine = 1;
    let camYaw = CAMERA_POSES.decide.yaw;
    let camElev = CAMERA_POSES.decide.elevation;
    let camPersp = CAMERA_POSES.decide.persp;
    let vYaw = 0;
    let vElev = 0;
    let vPersp = 0;
    let tiltX = 0;
    let tiltY = 0;
    let vTiltX = 0;
    let vTiltY = 0;
    /* Time since the stage last changed. Drives the label handoff (labels
       leave before the geometry moves, and type on once it arrives) and the
       record echoes during the move itself. */
    let switchAge = 1e4;
    let lastTarget: StageId | null = null;
    let reportedStage: StageId = "decide";
    let glow: HTMLCanvasElement | null = null;
    /* The previous two frames' drawn records, for motion echoes. */
    let echoPrev: { sx: number; sy: number; radius: number; color: string; alpha: number }[] = [];
    let echoPrev2: typeof echoPrev = [];

    /* A soft radial sprite in the accent, pre-rendered per palette. Fogging
       the beam head, the highlighted segment and the optimal cutoff with one
       drawImage each stays cheap; shadowBlur would cost an offscreen pass
       every frame. */
    const buildGlow = () => {
      const size = 64;
      const sprite = document.createElement("canvas");
      sprite.width = size;
      sprite.height = size;
      const g = sprite.getContext("2d");
      if (!g) return null;
      const [r, gr, b] = hexToRgb(accent);
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, `rgba(${r}, ${gr}, ${b}, 0.55)`);
      grad.addColorStop(0.5, `rgba(${r}, ${gr}, ${b}, 0.16)`);
      grad.addColorStop(1, `rgba(${r}, ${gr}, ${b}, 0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return sprite;
    };

    const drawGlow = (x: number, y: number, radius: number, alpha: number) => {
      if (!glow || alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = clamp01(alpha);
      ctx.drawImage(glow, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
    };

    const readStyle = () => {
      const style = getComputedStyle(canvas);
      ink = style.getPropertyValue("--ink").trim() || ink;
      ink2 = style.getPropertyValue("--ink-2").trim() || ink2;
      ink3 = style.getPropertyValue("--ink-3").trim() || ink3;
      accent = style.getPropertyValue("--accent").trim() || accent;
      data3 = style.getPropertyValue("--data-3").trim() || data3;
      // Label halos knock out whatever is actually behind the canvas: the
      // stage's painted background, which is a mix rather than flat paper.
      const stage = canvas.parentElement;
      const stageBg = stage ? getComputedStyle(stage).backgroundColor : "";
      surface =
        stageBg && stageBg !== "rgba(0, 0, 0, 0)" && stageBg !== "transparent"
          ? stageBg
          : style.getPropertyValue("--paper").trim() || surface;
      mono = style.getPropertyValue("--font-mono").trim() || mono;
      glow = buildGlow();
    };

    const refit = () => {
      const padX = width < 380 ? 22 : 34;
      const padTop = 34;
      const padBottom = 30;
      const innerW = Math.max(1, width - padX * 2);
      const innerH = Math.max(1, height - padTop - padBottom);
      // World spans roughly [-1.28, 1.28] horizontally and [-0.92, 0.92] vertically
      const scale = Math.min(innerW / 2.56, innerH / 1.84);
      fit = {
        scale,
        cx: padX + innerW / 2,
        cy: padTop + innerH / 2 + 4,
      };
    };

    const toScreen = (x: number, y: number, z: number) => {
      const v = project3D(x, y, z, camYaw, camElev, camPersp);
      return {
        x: fit.cx + v.x * fit.scale,
        y: fit.cy + v.y * fit.scale,
        depth: v.depth,
        k: v.k,
      };
    };

    const drawLabel = (
      text: string,
      x: number,
      y: number,
      alpha: number,
      color: string,
      align: CanvasTextAlign = "center",
      weight: 500 | 600 = 500,
      reveal = 1,
    ) => {
      if (alpha <= 0.02) return;
      /* A label arriving after a stage change is written, not flashed:
         `reveal` is how much of it has been typed so far. */
      const shown =
        reveal >= 1 ? text : text.slice(0, Math.max(0, Math.floor(text.length * reveal)));
      if (!shown) return;
      ctx.save();
      ctx.globalAlpha = clamp01(alpha);
      ctx.font = `${weight} 12px ${mono}`;
      ctx.textAlign = align;
      ctx.lineJoin = "round";
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = surface;
      ctx.strokeText(shown, x, y);
      ctx.fillStyle = color;
      ctx.fillText(shown, x, y);
      ctx.restore();
    };

    const drawBadge = (
      text: string,
      x: number,
      y: number,
      alpha: number,
      accentBorder = false,
    ) => {
      if (alpha <= 0.02) return;
      ctx.save();
      ctx.globalAlpha = clamp01(alpha);
      ctx.font = `500 12px ${mono}`;
      const padH = 7;
      const boxW = ctx.measureText(text).width + padH * 2;
      const boxH = 22;
      const bx = Math.min(Math.max(8, x - boxW / 2), width - boxW - 8);
      const by = Math.min(Math.max(6, y - boxH / 2), height - boxH - 6);

      ctx.fillStyle = surface;
      ctx.strokeStyle = accentBorder ? accent : ink2;
      ctx.lineWidth = 1;
      // roundRect is not universal; a plain rect keeps one missing method
      // from throwing inside the frame loop and killing the figure.
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") ctx.roundRect(bx, by, boxW, boxH, 4);
      else ctx.rect(bx, by, boxW, boxH);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accentBorder ? accent : ink;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(text, bx + padH, by + boxH / 2 + 0.5);
      ctx.restore();
    };

    const schedule = () => {
      if (!running && visible && !document.hidden) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    function draw(now: number) {
      if (!ctx) return;
      running = false;
      const delta = last ? Math.min(now - last, 40) : 16;
      last = now;

      if (restartRef.current) {
        restartRef.current = false;
        elapsed = 0;
        wClean = 1;
        wCluster = 0;
        wDecide = 0;
        vClean = 0;
        vCluster = 0;
        vDecide = 0;
        scanLine = 0;
        camYaw = CAMERA_POSES.clean.yaw;
        camElev = CAMERA_POSES.clean.elevation;
        camPersp = CAMERA_POSES.clean.persp;
        vYaw = 0;
        vElev = 0;
        vPersp = 0;
        echoPrev = [];
        echoPrev2 = [];
        /* The figure boots with its labels still to be written, and the
           jump back to Stage 1 smears through the record echoes. */
        switchAge = -260;
        lastTarget = "clean";
      }

      if (autoPlayRef.current && !reduced) {
        elapsed += delta;
        const nextStage: StageId =
          elapsed < T_CLUSTER ? "clean" : elapsed < T_DECIDE ? "cluster" : "decide";
        stageTargetRef.current = nextStage;
        if (nextStage !== reportedStage) {
          reportedStage = nextStage;
          setActiveStage(nextStage);
        }
        if (elapsed >= T_DONE) {
          autoPlayRef.current = false;
          setAutoPlaying(false);
        }
      } else {
        reportedStage = stageTargetRef.current;
      }

      const target = stageTargetRef.current;
      const tClean = target === "clean" ? 1 : 0;
      const tCluster = target === "cluster" ? 1 : 0;
      const tDecide = target === "decide" ? 1 : 0;

      const pose = CAMERA_POSES[target];

      if (lastTarget === null) lastTarget = target;
      if (!reduced) {
        switchAge += delta;
        if (target !== lastTarget) {
          /* Anticipation: the camera takes a small kick away from where it
             is going, then the springs carry it over and settle. */
          lastTarget = target;
          switchAge = 0;
          vYaw += (camYaw - pose.yaw) * 0.0013;
          vElev += (camElev - pose.elevation) * 0.0013;
          vPersp += (camPersp - pose.persp) * 0.0011;
        }
      }

      const pointer = pointerRef.current;
      const targetTiltX = pointer.active && !reduced ? pointer.x : 0;
      const targetTiltY = pointer.active && !reduced ? pointer.y : 0;

      const yawTarget =
        pose.yaw + targetTiltX * (target === "cluster" ? 0.28 : target === "decide" ? 0.1 : 0.04);
      const elevTarget =
        pose.elevation +
        targetTiltY * (target === "cluster" ? 0.16 : target === "decide" ? 0.08 : 0.04);

      if (reduced) {
        wClean = tClean;
        wCluster = tCluster;
        wDecide = tDecide;
        scanLine = 1;
        camYaw = pose.yaw;
        camElev = pose.elevation;
        camPersp = pose.persp;
        tiltX = 0;
        tiltY = 0;
      } else {
        // Stage weights: critically damped, so the blend never overshoots
        // into a double exposure mid-morph.
        [wClean, vClean] = spring(wClean, vClean, tClean, delta, 0.0055, 1);
        [wCluster, vCluster] = spring(wCluster, vCluster, tCluster, delta, 0.0055, 1);
        [wDecide, vDecide] = spring(wDecide, vDecide, tDecide, delta, 0.0055, 1);
        const wSum = wClean + wCluster + wDecide || 1;
        wClean /= wSum;
        wCluster /= wSum;
        wDecide /= wSum;

        if (target === "clean" && autoPlayRef.current) {
          scanLine = clamp01(elapsed / (T_CLUSTER * 0.78));
        } else {
          scanLine = approach(scanLine, 1, delta, 180);
        }

        // The camera may overshoot a hair (zeta 0.88); that is what makes a
        // stage change feel like a move rather than a cut.
        [camYaw, vYaw] = spring(camYaw, vYaw, yawTarget, delta, 0.0058, 0.88);
        [camElev, vElev] = spring(camElev, vElev, elevTarget, delta, 0.0058, 0.88);
        [camPersp, vPersp] = spring(camPersp, vPersp, pose.persp, delta, 0.0062, 0.92);
        [tiltX, vTiltX] = spring(tiltX, vTiltX, targetTiltX, delta, 0.009, 0.9);
        [tiltY, vTiltY] = spring(tiltY, vTiltY, targetTiltY, delta, 0.009, 0.9);
      }

      /* The label handoff: a departing stage's words leave before the
         geometry moves, and the arriving stage's words are written once it
         has mostly arrived. */
      const labelGate = (departing: boolean) => {
        if (reduced) return 1;
        return departing
          ? clamp01(1 - switchAge / 140)
          : clamp01((switchAge - 260) / 340);
      };
      const gateClean = labelGate(tClean === 0);
      const gateCluster = labelGate(tCluster === 0);
      const gateDecide = labelGate(tDecide === 0);
      const typeReveal = reduced ? 1 : clamp01((switchAge - 300) / 420);
      const trailing = !reduced && switchAge < 400;
      /* The arriving stage's set pieces are timed rather than weight-driven:
         the springs settle in a few hundred milliseconds, far quicker than a
         beat like the curve drawing itself wants to read. */
      const sinceSwitch = (from: number, to: number) =>
        reduced ? 1 : clamp01((switchAge - from) / (to - from));

      ctx.clearRect(0, 0, width, height);

      const clusterColors = [accent, data3, ink2] as const;

      /* -------------------------------------------------------------------
         LAYER 1: Stage-specific structural frames & coordinate planes
         ------------------------------------------------------------------- */

      // 1A. Stage 1 (Clean): Matrix frame, row/col index ticks, and live scanline
      if (wClean > 0.02) {
        ctx.save();
        ctx.strokeStyle = ink3;
        ctx.lineWidth = 1;

        /* The matrix is ruled row by row, top to bottom, as the stage opens. */
        const rowAge = reduced ? 1e4 : switchAge + 260;
        for (let r = 0; r < ROWS; r++) {
          const on = reduced ? 1 : clamp01((rowAge - r * 28) / 380);
          if (on <= 0.01) continue;
          const y = ((r / (ROWS - 1)) * 2 - 1) * 0.74;
          const left = toScreen(-1.16, y, 0);
          const right = toScreen(1.16, y, 0);
          ctx.globalAlpha = wClean * 0.35 * on;
          ctx.beginPath();
          ctx.moveTo(left.x, left.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }

        const topR = toScreen(1.16, -0.74, 0);
        const botL = toScreen(-1.16, 0.74, 0);
        /* Two rows, never one: on the stage widths this figure actually gets,
           the table name and the scan report cannot share the top line. The
           table name captions the matrix from below; the scan report stays in
           the top-right corner, where the beam is heading. */
        drawLabel(
          "sql_clean · 180 rows × 12 cols",
          botL.x,
          botL.y + 16,
          wClean * 0.85 * gateClean,
          ink2,
          "left",
          500,
          typeReveal,
        );
        drawLabel(
          scanLine < 0.98
            ? `scanning ${Math.round(scanLine * 100)}%`
            : "162 valid · 18 excluded",
          topR.x,
          topR.y - 14,
          wClean * 0.9 * gateClean,
          accent,
          "right",
          600,
        );

        // Sweeping validation scan beam: a hairline with fog around it.
        if (scanLine > 0.01 && scanLine < 0.99) {
          const sxWorld = (-1 + scanLine * 2) * 1.2;
          const sTop = toScreen(sxWorld, -0.82, 0);
          const sBot = toScreen(sxWorld, 0.82, 0);
          const span = sBot.y - sTop.y;
          drawGlow(sTop.x, sTop.y + span * 0.18, 44, wClean * 0.4);
          drawGlow(sTop.x, sTop.y + span * 0.5, 58, wClean * 0.3);
          drawGlow(sTop.x, sTop.y + span * 0.82, 44, wClean * 0.4);

          ctx.strokeStyle = accent;
          ctx.lineCap = "round";
          ctx.globalAlpha = wClean * 0.08;
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.moveTo(sTop.x, sTop.y);
          ctx.lineTo(sBot.x, sBot.y);
          ctx.stroke();
          ctx.globalAlpha = wClean * 0.2;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(sTop.x, sTop.y);
          ctx.lineTo(sBot.x, sBot.y);
          ctx.stroke();
          ctx.globalAlpha = wClean * 0.85;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sTop.x, sTop.y);
          ctx.lineTo(sBot.x, sBot.y);
          ctx.stroke();
          ctx.lineCap = "butt";
        }
        ctx.restore();
      }

      // 1B. Stage 2 (Cluster): 3D Floor Plane, Projected Convex Hulls & Centroid Drop-lines
      if (wCluster > 0.02) {
        ctx.save();
        // 3D Floor lattice at z = FLOOR_Z
        const gridRange = 1.15;
        const steps = 6;
        ctx.strokeStyle = ink3;
        ctx.lineWidth = 1;
        ctx.globalAlpha = wCluster * 0.22;

        for (let i = 0; i <= steps; i++) {
          const u = -gridRange + (2 * gridRange * i) / steps;
          const a1 = toScreen(u, -gridRange, FLOOR_Z);
          const a2 = toScreen(u, gridRange, FLOOR_Z);
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.stroke();

          const b1 = toScreen(-gridRange, u, FLOOR_Z);
          const b2 = toScreen(gridRange, u, FLOOR_Z);
          ctx.beginPath();
          ctx.moveTo(b1.x, b1.y);
          ctx.lineTo(b2.x, b2.y);
          ctx.stroke();
        }

        // Floor axis labels
        const axX = toScreen(gridRange, gridRange + 0.14, FLOOR_Z);
        const axY = toScreen(-gridRange - 0.1, gridRange, FLOOR_Z);
        drawLabel("PC1 →", axX.x, axX.y, wCluster * 0.75 * gateCluster, ink3, "right", 500, typeReveal);
        drawLabel("← PC2", axY.x, axY.y, wCluster * 0.75 * gateCluster, ink3, "left", 500, typeReveal);

        // Projected 2D convex hulls on the 3D floor plane. Each unrolls and
        // settles onto the floor over the first second of the arrival.
        const settle = sinceSwitch(150, 950);
        CLUSTER_HULLS.forEach((hull, cIdx) => {
          if (hull.length < 3) return;
          const c = CLUSTERS[cIdx]!;
          const spread = 1 + (1 - settle) * 0.07;
          const projected = hull.map((p) =>
            toScreen(c.cx + (p.x - c.cx) * spread, c.cy + (p.y - c.cy) * spread, FLOOR_Z),
          );
          const col = clusterColors[cIdx]!;

          ctx.beginPath();
          projected.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.closePath();

          ctx.fillStyle = col;
          ctx.globalAlpha = wCluster * (cIdx === 0 ? 0.12 : 0.07) * settle;
          ctx.fill();

          ctx.strokeStyle = col;
          ctx.globalAlpha = wCluster * (cIdx === 0 ? 0.65 : 0.4) * settle;
          ctx.lineWidth = 1.1;
          ctx.setLineDash([3, 3]);
          ctx.lineDashOffset = -(1 - settle) * 26;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineDashOffset = 0;
        });

        // Vertical drop-lines from 3D cluster centroids to the floor plane
        CLUSTERS.forEach((c, cIdx) => {
          const top = toScreen(c.cx, c.cy, c.cz);
          const floor = toScreen(c.cx, c.cy, FLOOR_Z);
          const col = clusterColors[cIdx]!;

          ctx.strokeStyle = col;
          ctx.globalAlpha = wCluster * 0.55;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(top.x, top.y);
          ctx.lineTo(floor.x, floor.y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Floor anchor ring
          ctx.beginPath();
          ctx.arc(floor.x, floor.y, 3, 0, Math.PI * 2);
          ctx.stroke();
        });

        ctx.restore();
      }

      // 1C. Stage 3 (Decide): Coordinate Grid, 95% Confidence Fan & Fitted Response Curve
      if (wDecide > 0.02) {
        ctx.save();
        // Horizontal reference lines (0%, +15%, +30% lift)
        const liftTicks = [
          { v: 0, label: "0%" },
          { v: 15, label: "+15%" },
          { v: 30, label: "+30%" },
        ];
        for (const tick of liftTicks) {
          const z = liftToZ(tick.v);
          const pL = toScreen(scoreToX(0), 0, z);
          const pR = toScreen(scoreToX(1), 0, z);
          ctx.strokeStyle = tick.v === 0 ? ink2 : ink3;
          ctx.globalAlpha = wDecide * (tick.v === 0 ? 0.45 : 0.2);
          ctx.lineWidth = 1;
          if (tick.v === 0) ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(pL.x, pL.y);
          ctx.lineTo(pR.x, pR.y);
          ctx.stroke();
          ctx.setLineDash([]);
          drawLabel(tick.label, pL.x - 6, pL.y + 4, wDecide * 0.75 * gateDecide, ink3, "right");
        }

        // Sample the curve across t in [0, 1]
        const curveSamples = 48;
        const upperPts: { x: number; y: number }[] = [];
        const lowerPts: { x: number; y: number }[] = [];
        const midPts: { x: number; y: number }[] = [];

        for (let s = 0; s <= curveSamples; s++) {
          const t = s / curveSamples;
          const x = scoreToX(t);
          const m = liftCurve(t);
          const ci = liftConfidence(t);
          midPts.push(toScreen(x, 0, liftToZ(m)));
          upperPts.push(toScreen(x, 0, liftToZ(m + ci)));
          lowerPts.push(toScreen(x, 0, liftToZ(m - ci)));
        }

        /* The ribbon unrolls left to right just behind the curve. */
        const ribbonProgress = sinceSwitch(900, 1700);
        const clipLeft = toScreen(scoreToX(0), 0, 0).x;
        const clipRight = toScreen(scoreToX(1), 0, 0).x;

        if (ribbonProgress > 0.01) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, clipLeft + (clipRight - clipLeft) * ribbonProgress + 2, height);
          ctx.clip();

          // 95% confidence band fill
          ctx.beginPath();
          upperPts.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          for (let idx = lowerPts.length - 1; idx >= 0; idx--) {
            const p = lowerPts[idx]!;
            ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
          ctx.fillStyle = accent;
          ctx.globalAlpha = wDecide * 0.12;
          ctx.fill();

          // Upper/lower confidence hairlines
          ctx.strokeStyle = accent;
          ctx.globalAlpha = wDecide * 0.32;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          for (const boundary of [upperPts, lowerPts]) {
            ctx.beginPath();
            boundary.forEach((p, idx) => {
              if (idx === 0) ctx.moveTo(p.x, p.y);
              else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
          }
          ctx.setLineDash([]);
          ctx.restore();
        }

        // Axis labels
        const xEnd = toScreen(scoreToX(1), 0, liftToZ(-6));
        const yTop = toScreen(scoreToX(0), 0, liftToZ(35));
        drawLabel(
          "Propensity score →",
          xEnd.x,
          height - 10,
          wDecide * 0.8 * gateDecide,
          ink3,
          "right",
          500,
          typeReveal,
        );
        drawLabel(
          "Net lift (%) ↑",
          yTop.x,
          18,
          wDecide * 0.8 * gateDecide,
          ink2,
          "left",
          600,
          typeReveal,
        );

        ctx.restore();
      }

      /* -------------------------------------------------------------------
         LAYER 2: Compute blended 3D positions & depth-sort all 180 records
         ------------------------------------------------------------------- */

      const renderedPoints = RECORDS.map((r) => {
        const wx = r.x1 * wClean + r.x2 * wCluster + r.x3 * wDecide;
        const wy = r.y1 * wClean + r.y2 * wCluster + r.y3 * wDecide;
        const wz = r.z1 * wClean + r.z2 * wCluster + r.z3 * wDecide;
        const proj = toScreen(wx, wy, wz);

        // Has the Stage 1 scanline reached this point yet?
        const normalizedCol = r.col / (COLS - 1);
        const scanned = scanLine >= normalizedCol - 0.05;

        /* Rows light up as the beam passes: a gaussian around the scanning
           column, so the sweep reads as a wave rather than a threshold. */
        const wave =
          wClean > 0.02 && scanLine > 0.01 && scanLine < 0.99
            ? Math.exp(-((normalizedCol - scanLine) ** 2) / 0.045)
            : 0;

        // Anomalies are visible in Stage 1 and fade out smoothly in Stages 2–3
        const alpha = clamp01(
          r.anomaly
            ? wClean * (scanned ? 0.9 : 0.35)
            : 0.35 +
                0.55 * (wClean * (scanned ? 1 : 0.45) + wCluster + wDecide) +
                wave * 0.25 * wClean,
        );

        return {
          record: r,
          wx,
          wy,
          wz,
          sx: proj.x,
          sy: proj.y,
          depth: proj.depth,
          k: proj.k,
          alpha,
          scanned,
          wave,
        };
      });

      // Find nearest hovered record for Stages 1 & 2 magnetic inspection
      let hoveredPoint: (typeof renderedPoints)[number] | null = null;
      if (pointer.active && wDecide < 0.6) {
        let bestDist = 28;
        for (const pt of renderedPoints) {
          if (pt.alpha < 0.2) continue;
          const d = Math.hypot(pt.sx - pointer.px, pt.sy - pointer.py);
          if (d < bestDist) {
            bestDist = d;
            hoveredPoint = pt;
          }
        }
      }

      // 2A. Draw 3D k-NN cluster filaments (Stage 2). The web grows outward
      // from each centroid: each filament waits for its own place in the
      // weave, which reads as clustering rather than a uniform fade-in.
      if (wCluster > 0.03) {
        ctx.save();
        EDGES.forEach((edge, edgeIndex) => {
          /* Each filament waits its turn, so the web grows outward from each
             centroid over the second after the switch rather than in one
             weight step. */
          const on = reduced
            ? 1
            : clamp01((switchAge - (200 + 620 * EDGE_GROW[edgeIndex]!)) / 420);
          if (on <= 0.02) return;
          const pa = renderedPoints[edge.a]!;
          const pb = renderedPoints[edge.b]!;
          const isHoveredEdge =
            hoveredPoint &&
            (hoveredPoint.record.id === pa.record.id || hoveredPoint.record.id === pb.record.id);

          ctx.strokeStyle = isHoveredEdge ? accent : clusterColors[edge.cluster]!;
          ctx.lineWidth = isHoveredEdge ? 1.6 : 0.9;
          ctx.globalAlpha =
            on * wCluster * (isHoveredEdge ? 0.85 : edge.cluster === 0 ? 0.34 : 0.22);
          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.stroke();
        });
        ctx.restore();
      }

      // 2B. Draw vertical residual stems from each sample to the fitted curve
      // (Stage 3); each stem drops in just behind the drawing curve.
      if (wDecide > 0.15) {
        const stemsProgress = sinceSwitch(500, 1500);
        ctx.save();
        ctx.strokeStyle = ink3;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = wDecide * 0.24;
        for (const pt of renderedPoints) {
          if (pt.record.anomaly || pt.record.t > stemsProgress) continue;
          const fitted = toScreen(pt.record.x3, 0, liftToZ(pt.record.liftHat));
          ctx.beginPath();
          ctx.moveTo(pt.sx, pt.sy);
          ctx.lineTo(fitted.x, fitted.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2C. Draw all data points sorted back-to-front by 3D depth
      const sorted = [...renderedPoints].sort((a, b) => a.depth - b.depth);

      /* Motion echoes: while a stage change is in flight, the records of the
         two previous frames are re-drawn faintly, so 180 points travelling
         between stages read as travel. Nothing else on the stage smears. */
      if (trailing && echoPrev.length) {
        for (const [layer, mult] of [
          [echoPrev2, 0.09],
          [echoPrev, 0.26],
        ] as const) {
          for (const echo of layer) {
            ctx.globalAlpha = echo.alpha * mult;
            ctx.fillStyle = echo.color;
            ctx.beginPath();
            ctx.arc(echo.sx, echo.sy, echo.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      const drawn: typeof echoPrev = trailing ? [] : echoPrev;

      for (const pt of sorted) {
        const { record, sx, sy, k, alpha, scanned, wave } = pt;
        if (alpha <= 0.02) continue;

        if (record.anomaly) {
          // Draw crisp '×' marker for anomalous records in Stage 1
          const arm = scanned ? 3.6 : 2.2;
          ctx.save();
          ctx.strokeStyle = scanned ? accent : ink3;
          ctx.lineWidth = scanned ? 1.6 : 1.1;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(sx - arm, sy - arm);
          ctx.lineTo(sx + arm, sy + arm);
          ctx.moveTo(sx + arm, sy - arm);
          ctx.lineTo(sx - arm, sy + arm);
          ctx.stroke();
          ctx.restore();
          continue;
        }

        const isHovered = hoveredPoint?.record.id === record.id;
        const baseColor =
          wClean > 0.6
            ? scanned
              ? ink
              : ink3
            : clusterColors[record.cluster]!;

        const radius =
          (wClean * 2.4 + wCluster * (record.cluster === 0 ? 3.1 : 2.6) + wDecide * 2.5) *
          k *
          (isHovered ? 1.55 : 1) *
          (1 + wave * 0.45);

        // The emphasis segment carries a soft halo in Stage 2, from the
        // pre-rendered sprite so the frame stays cheap.
        if (wCluster > 0.45 && record.cluster === 0) {
          drawGlow(sx, sy, radius * 5, wCluster * 0.15 * alpha);
        }

        ctx.fillStyle = isHovered ? accent : baseColor;
        ctx.globalAlpha = isHovered ? 1 : alpha;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        if (trailing) drawn.push({ sx, sy, radius, color: ctx.fillStyle as string, alpha });
      }
      if (trailing) {
        echoPrev2 = echoPrev;
        echoPrev = drawn;
      } else {
        echoPrev2 = [];
        echoPrev = [];
      }
      ctx.globalAlpha = 1;

      /* -------------------------------------------------------------------
         LAYER 3: Foreground Model Curve, Centroid Callouts & Interactive Probe
         ------------------------------------------------------------------- */

      // 3A. Stage 2: 3D Cluster Centroid Reticles & Callouts
      if (wCluster > 0.2) {
        CLUSTERS.forEach((c, idx) => {
          const center = toScreen(c.cx, c.cy, c.cz);
          const col = clusterColors[idx]!;
          const primary = idx === 0;

          ctx.save();
          ctx.strokeStyle = col;
          ctx.fillStyle = surface;
          ctx.globalAlpha = wCluster;
          ctx.lineWidth = primary ? 1.6 : 1.2;

          /* The reticle pulses once as the segment locks in, then rests. */
          const lock = reduced ? 0 : Math.sin(Math.PI * clamp01((wCluster - 0.5) / 0.45));
          drawGlow(center.x, center.y, 26, wCluster * 0.25);

          ctx.beginPath();
          ctx.arc(center.x, center.y, (primary ? 8 : 6) * (1 + lock * 0.5), 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(center.x, center.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          const labelY = idx === 2 ? center.y + 20 : center.y - 14;
          drawLabel(
            c.short,
            center.x,
            labelY,
            wCluster * gateCluster,
            primary ? accent : ink,
            "center",
            primary ? 600 : 500,
          );
        });
      }

      // 3B. Stage 3: Main Fitted Response Curve + Optimal Cutoff Beacon + Live Scrubbing
      if (wDecide > 0.05) {
        ctx.save();
        const curveSamples = 56;
        /* The curve draws itself left to right as the stage arrives, rather
           than fading in whole: about a second of drawing. */
        const curveProgress = sinceSwitch(280, 1200);
        if (curveProgress > 0.01) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = wDecide;
          ctx.beginPath();
          for (let s = 0; s <= curveSamples; s++) {
            const t = s / curveSamples;
            if (t > curveProgress) break;
            const p = toScreen(scoreToX(t), 0, liftToZ(liftCurve(t)));
            if (s === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        }

        // Optimal decision cutoff at t* = 0.68 (+31.4% net lift)
        const beaconIn = sinceSwitch(1250, 1550);
        const optPeak = toScreen(scoreToX(OPTIMAL_T), 0, liftToZ(liftCurve(OPTIMAL_T)));
        const optBase = toScreen(scoreToX(OPTIMAL_T), 0, liftToZ(-4));

        if (beaconIn > 0.01) {
          // The marker drops onto the peak once the curve has drawn.
          const dropY = optPeak.y - (1 - beaconIn) * 16;

          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = wDecide * 0.7 * beaconIn;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(optPeak.x, dropY);
          ctx.lineTo(optBase.x, optBase.y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Pulsing halo and solid core on the optimal cutoff
          const pulse = !reduced ? 1 + Math.sin(now * 0.004) * 0.22 : 1;
          ctx.fillStyle = accent;
          drawGlow(optPeak.x, dropY, 40 * pulse, wDecide * 0.36 * beaconIn);

          ctx.globalAlpha = wDecide * beaconIn;
          ctx.beginPath();
          ctx.arc(optPeak.x, dropY, 4.5, 0, Math.PI * 2);
          ctx.fill();

          const scrubbing = pointer.active && wDecide > 0.6;
          if (!scrubbing) {
            drawBadge(
              "Optimal cutoff 0.68 · +31.4% lift",
              optPeak.x - 16,
              optPeak.y - 24,
              wDecide * beaconIn,
              true,
            );
          } else {
            // Keep compact label on optimal peak while visitor scrubs another threshold
            drawLabel(
              "opt 0.68",
              optPeak.x,
              optBase.y + 14,
              wDecide * 0.85 * beaconIn,
              accent,
              "center",
              600,
            );
          }
        }

        if (pointer.active && wDecide > 0.6) {
          const leftEdge = toScreen(scoreToX(0), 0, 0).x;
          const rightEdge = toScreen(scoreToX(1), 0, 0).x;
          const hoverT = clamp01((pointer.px - leftEdge) / Math.max(1, rightEdge - leftEdge));
          const hoverLift = liftCurve(hoverT);
          const hoverCi = liftConfidence(hoverT);
          const hPt = toScreen(scoreToX(hoverT), 0, liftToZ(hoverLift));
          const hBase = toScreen(scoreToX(hoverT), 0, liftToZ(-4));

          ctx.strokeStyle = ink;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.55;
          ctx.beginPath();
          ctx.moveTo(hPt.x, hPt.y);
          ctx.lineTo(hBase.x, hBase.y);
          ctx.stroke();

          ctx.fillStyle = surface;
          ctx.strokeStyle = ink;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(hPt.x, hPt.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          const sign = hoverLift >= 0 ? "+" : "";
          drawBadge(
            `score ${hoverT.toFixed(2)} → ${sign}${hoverLift.toFixed(1)}% ±${hoverCi.toFixed(1)}%`,
            hPt.x,
            hPt.y - 24,
            1,
            Math.abs(hoverT - OPTIMAL_T) < 0.05,
          );
        }
        ctx.restore();
      }

      // 3C. Magnetic Hover Reticle & Laser Drop-line for Stages 1 & 2
      if (hoveredPoint) {
        const { record, sx, sy, wx, wy } = hoveredPoint;
        ctx.save();

        if (wCluster > 0.5 && !record.anomaly) {
          // Drop a vertical laser line to the 3D floor plane
          const floorPt = toScreen(wx, wy, FLOOR_Z);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.7;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(floorPt.x, floorPt.y);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(floorPt.x, floorPt.y, 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Precision target ring around hovered point
        drawGlow(sx, sy, 26, 0.45);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.stroke();

        const info = record.anomaly
          ? `rec #${String(record.id).padStart(3, "0")} · excluded (${record.reason})`
          : wClean > 0.5
            ? `rec #${String(record.id).padStart(3, "0")} · r${record.row + 1}:c${record.col + 1} · valid`
            : `rec #${String(record.id).padStart(3, "0")} · ${CLUSTERS[record.cluster]!.name} · score ${record.t.toFixed(2)}`;

        drawBadge(info, sx, sy - 22, 1, true);
        ctx.restore();
      }

      // Continue scheduling while auto-playing, morphing, echoing, or the
      // pointer is inspecting.
      const morphing =
        Math.abs(wClean - tClean) > 0.002 ||
        Math.abs(wCluster - tCluster) > 0.002 ||
        Math.abs(wDecide - tDecide) > 0.002 ||
        Math.abs(camYaw - yawTarget) > 0.002 ||
        Math.abs(camElev - elevTarget) > 0.002 ||
        Math.abs(tiltX - targetTiltX) > 0.002 ||
        Math.abs(tiltY - targetTiltY) > 0.002;

      /* A stage arrival keeps its own frames: the timed beats (the curve
         drawing, the ribbon unrolling) run longer than the weight springs. */
      if (
        !reduced &&
        (autoPlayRef.current || morphing || switchAge < 1900 || pointer.active)
      ) {
        schedule();
      }
    }

    wakeRef.current = schedule;

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

    const onMotion = () => {
      reduced = media.matches;
      if (reduced) {
        autoPlayRef.current = false;
        stageTargetRef.current = "decide";
        setActiveStage("decide");
        setAutoPlaying(false);
        setUserPicked(false);
      }
      schedule();
    };

    const onVisibility = () => schedule();

    readStyle();
    if (!reduced) {
      restartRef.current = true;
      autoPlayRef.current = true;
      stageTargetRef.current = "clean";
      setActiveStage("clean");
      setAutoPlaying(true);
    }

    resize.observe(canvas);
    intersection.observe(canvas);
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      wakeRef.current = () => {};
      resize.disconnect();
      intersection.disconnect();
      media.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Every other exhibit keeps its "Illustration:" caption at rest. This one
  // names the step only while the sequence plays or after a stage is chosen;
  // the stage buttons carry aria-pressed, so the caption itself stays quiet
  // rather than announcing each autoplay step.
  const stageCaption = STAGES.find((s) => s.id === activeStage)!.caption;
  const caption = autoPlaying || userPicked ? stageCaption : REST_CAPTION;

  return (
    <figure className="exhibit hero-figure">
      <div
        className="hero-figure__stage"
        onPointerMove={(event) => {
          // Mouse only, as in Plot.tsx: a touch drag here is a page scroll,
          // and treating it as orbit would hold the render loop awake for
          // the whole gesture.
          if (event.pointerType !== "mouse") return;
          const box = event.currentTarget.getBoundingClientRect();
          const px = event.clientX - box.left;
          const py = event.clientY - box.top;
          pointerRef.current = {
            x: px / Math.max(1, box.width) - 0.5,
            y: py / Math.max(1, box.height) - 0.5,
            px,
            py,
            active: true,
          };
          wakeRef.current();
        }}
        onPointerLeave={() => {
          pointerRef.current = {
            ...pointerRef.current,
            x: 0,
            y: 0,
            active: false,
          };
          wakeRef.current();
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" />

        {/* Without JavaScript the canvas never paints. This static view of
            the resting decision state stands in; the noscript rule below is
            what reveals it, so with JS on it never flashes. Drawn to the
            stage's own 3/2 ratio so nothing letterboxes. */}
        <div className="hero-figure__fallback" aria-hidden="true">
          <svg viewBox="0 0 450 300" aria-hidden="true" focusable="false">
            <line className="fg-grid" x1="60" y1="200" x2="420" y2="200" />
            <line className="fg-grid" x1="60" y1="150" x2="420" y2="150" />
            <line className="fg-grid" x1="60" y1="100" x2="420" y2="100" />
            <line className="fg-axis" x1="60" y1="250" x2="420" y2="250" />
            <line className="fg-axis" x1="60" y1="250" x2="60" y2="50" />
            <path
              fill="var(--hl)"
              d="M66 231 C 150 227 230 189 296 129 S 372 51 414 59 L414 81 C 372 73 340 121 296 151 S 150 249 66 253 Z"
            />
            <line x1="120" y1="228" x2="120" y2="240" stroke="var(--ink-3)" strokeWidth="1" />
            <line x1="200" y1="194" x2="200" y2="205" stroke="var(--ink-3)" strokeWidth="1" />
            <line x1="350" y1="89" x2="350" y2="100" stroke="var(--ink-3)" strokeWidth="1" />
            <path
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              d="M66 242 C 150 238 230 200 296 140 S 372 62 414 70"
            />
            <line
              x1="296"
              y1="250"
              x2="296"
              y2="140"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <circle cx="296" cy="140" r="5" fill="var(--accent)" />
            <text className="fg-label" x="70" y="90" fill="var(--accent)">
              +31.4% lift
            </text>
            <text className="fg-label" x="420" y="272" textAnchor="end">
              score
            </text>
            <text className="fg-label" x="60" y="36">
              net lift
            </text>
          </svg>
        </div>
        <noscript>
          <style>{".hero-figure__fallback{display:grid}"}</style>
        </noscript>
      </div>

      <figcaption className="exhibit__caption hero-figure__caption">
        <span className="hero-figure__status">
          <span className="exhibit__no">Fig. 1</span>
          {caption}
        </span>

        <div className="hero-figure__controls" role="group" aria-label="Figure stages">
          {STAGES.map((stage) => {
            const current = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                className="hero-figure__step"
                aria-pressed={current}
                onClick={() => selectStage(stage.id)}
              >
                <span className="num">{stage.num}</span> {stage.label}
              </button>
            );
          })}
          <button
            type="button"
            className="text-button hero-figure__replay"
            onClick={replay}
            aria-label="Replay figure animation"
          >
            <RotateCcw size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden="true" />
            <span>Replay</span>
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
