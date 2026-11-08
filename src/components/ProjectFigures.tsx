import type { CSSProperties, ReactNode } from "react";
import type { ProjectVisual } from "@/lib/projects";
import { Plot, type PlotGuide } from "./Plot";

/**
 * Project illustrations.
 *
 * Diagrams of what each project did (the cluster map, the schema, the network
 * topology, the fit against the diagonal), drawn in SVG from deterministic
 * data. They are illustrations, and captioned as such: the only numbers drawn
 * inside them are ones the project itself publishes.
 *
 * Each drawing plays its finding once, as it scrolls into view: marks carry
 * their beat in the figure's sequence (`at`), staggered runs carry their
 * index (`order`). Where a drawing has a series to read, the hover reports
 * the drawn values rather than the pointer's position.
 */

const W = 500;
const H = 360;

type FigureProps = { number?: number };

function Figure({
  number,
  name,
  caption,
  plot,
  children,
}: FigureProps & {
  name: ProjectVisual;
  caption: string;
  plot?: PlotGuide;
  children: ReactNode;
}) {
  const drawing = (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className={`fg-${name}`}
    >
      {children}
    </svg>
  );

  return (
    <figure className="exhibit">
      {plot ? <Plot guide={plot}>{drawing}</Plot> : drawing}
      <figcaption className="exhibit__caption">
        <span>
          {number && <span className="exhibit__no">Fig. {number}</span>}
          Illustration: {caption}.
        </span>
      </figcaption>
    </figure>
  );
}

/** Order in which a mark is plotted when the drawing scrolls into view. */
function order(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

/** When a mark is plotted, in milliseconds, within its figure's sequence. */
function at(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

/** A point list as polyline coordinates, and as a path a dash can unroll. */
function asPolyline(points: { x: number; y: number }[]): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

function asPath(points: { x: number; y: number }[]): string {
  return points
    .map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

/** Deterministic 0..1, so the artwork is identical on every build. */
function hash(seed: number): number {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function HGrid({ top, bottom, left = 40, right = W - 24, rows = 4 }: {
  top: number;
  bottom: number;
  left?: number;
  right?: number;
  rows?: number;
}) {
  return (
    <>
      {Array.from({ length: rows + 1 }, (_, i) => {
        const y = top + ((bottom - top) / rows) * i;
        return (
          <line
            key={i}
            x1={left}
            x2={right}
            y1={y}
            y2={y}
            className={i === rows ? "fg-axis" : "fg-grid"}
          />
        );
      })}
    </>
  );
}

/* 01 · Clustering ------------------------------------------------------- */

const HUES = ["var(--data-1)", "var(--data-2)", "var(--data-3)"];

/* Labels on the right edge are anchored at their end, so they stay inside the
   drawing however large the text is drawn. */
const HULLS = [
  { cx: 150, cy: 196, rx: 96, ry: 70, rotate: -14, label: "Group A", lx: 72, ly: 104, anchor: "start" },
  { cx: 340, cy: 116, rx: 88, ry: 60, rotate: 12, label: "Group B", lx: W - 24, ly: 44, anchor: "end" },
  { cx: 340, cy: 256, rx: 86, ry: 56, rotate: -8, label: "Group C", lx: W - 24, ly: 320, anchor: "end" },
] as const;

const CLUSTER_POINTS = Array.from({ length: 210 }, (_, i) => {
  const group = i % 3;
  const n = Math.floor(i / 3);
  const hull = HULLS[group]!;
  const angle = n * 2.39996;
  const radius = Math.sqrt(((n * 37) % 100) / 100);
  return {
    x: hull.cx + Math.cos(angle) * radius * hull.rx * 0.8 + (hash(i * 3.1) - 0.5) * 18,
    y: hull.cy + Math.sin(angle) * radius * hull.ry * 0.8 + (hash(i * 7.7) - 0.5) * 18,
    group,
    opacity: 0.45 + hash(i * 11.3) * 0.5,
  };
});

function ClusterFigure({ number }: FigureProps) {
  return (
    <Figure
      number={number}
      name="clusters"
      caption="behavioural clusters projected to two dimensions"
      plot={{
        kind: "groups",
        groups: HULLS.map((hull) => ({ x: hull.cx / W, y: hull.cy / H, label: hull.label })),
      }}
    >
      <line x1={40} y1={H - 30} x2={W - 24} y2={H - 30} className="fg-axis" />
      <line x1={40} y1={20} x2={40} y2={H - 30} className="fg-axis" />
      {HULLS.map((hull, i) => (
        <ellipse
          key={hull.label}
          cx={hull.cx}
          cy={hull.cy}
          rx={hull.rx}
          ry={hull.ry}
          fill="none"
          stroke={HUES[i]}
          strokeWidth="1"
          strokeDasharray="3 4"
          transform={`rotate(${hull.rotate} ${hull.cx} ${hull.cy})`}
          style={at(860 + i * 40)}
        />
      ))}
      {CLUSTER_POINTS.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={2.6}
          fill={HUES[point.group]}
          opacity={point.opacity}
          style={{ ...at(300), ...order(i) }}
        />
      ))}
      {HULLS.map((hull, i) => (
        <text
          key={hull.label}
          x={hull.lx}
          y={hull.ly}
          textAnchor={hull.anchor}
          className="fg-label fg-label--strong"
          fill={HUES[i]}
          style={at(1000 + i * 30)}
        >
          {hull.label}
        </text>
      ))}
      <text x={W - 24} y={H - 10} className="fg-label" textAnchor="end">
        Component 1 →
      </text>
      <text x={30} y={24} className="fg-label" textAnchor="end" transform="rotate(-90 30 24)">
        ← Component 2
      </text>
    </Figure>
  );
}

/* 02 · Schema ----------------------------------------------------------- */

const TABLES = [
  { x: 26, y: 26, w: 176, name: "passengers", rows: ["passenger_id  PK", "full_name", "date_of_birth", "age  ← trigger"] },
  { x: 298, y: 26, w: 176, name: "trains", rows: ["train_id  PK", "train_name", "source → dest"] },
  { x: 162, y: 200, w: 176, name: "bookings", rows: ["passenger_id  FK", "train_id  FK", "travel_date", "status"] },
];

/** The FK relations, drawn once the tables are standing. */
const LINKS = [
  { d: "M 114 152 V 176 H 220 V 200", lx: 122, ly: 170 },
  { d: "M 386 132 V 176 H 280 V 200", lx: 394, ly: 170 },
];

function SchemaFigure({ number }: FigureProps) {
  return (
    <Figure number={number} name="schema" caption="train booking schema, three related tables">
      {LINKS.map((link, i) => (
        <path key={link.d} d={link.d} className="fg-link" style={at(880 + i * 60)} />
      ))}
      {LINKS.map((link) => (
        <text key={link.lx} x={link.lx} y={link.ly} className="fg-label" fill="var(--data-1)" style={at(1080)}>
          FK
        </text>
      ))}
      {TABLES.map((table, t) => {
        // Row pitch leaves room for the largest label step plus its ink.
        const h = 30 + table.rows.length * 24;
        // Each table is built in reading order, then its rows type in.
        const stand = 250 + t * 110;
        return (
          <g key={table.name}>
            <rect x={table.x} y={table.y} width={table.w} height={h} className="fg-panel" style={at(stand)} />
            <line
              x1={table.x}
              x2={table.x + table.w}
              y1={table.y + 28}
              y2={table.y + 28}
              className="fg-axis"
              style={at(stand + 80)}
            />
            <text x={table.x + 12} y={table.y + 19} className="fg-label fg-label--strong" style={at(stand + 80)}>
              {table.name}
            </text>
            {table.rows.map((row, i) => (
              <text
                key={row}
                x={table.x + 12}
                y={table.y + 48 + i * 24}
                className="fg-label"
                fill={row.includes("trigger") ? "var(--data-1)" : undefined}
                style={at(stand + 140 + i * 55)}
              >
                {row}
              </text>
            ))}
          </g>
        );
      })}
    </Figure>
  );
}

/* 03 · Dashboard -------------------------------------------------------- */

const TREND = [0.58, 0.61, 0.55, 0.5, 0.53, 0.45, 0.42, 0.39, 0.43, 0.36, 0.34, 0.31];
const CUTS = [
  { name: "Demographics", bars: [0.86, 0.58, 0.41, 0.25] },
  { name: "Plan", bars: [0.92, 0.54, 0.35, 0.2] },
  { name: "Geography", bars: [0.78, 0.61, 0.44, 0.28] },
] as const;

function DashboardFigure({ number }: FigureProps) {
  const top = 34;
  const bottom = 186;
  const left = 40;
  const right = W - 24;
  const step = (right - left) / (TREND.length - 1);
  const coords = TREND.map((v, i) => ({
    x: left + i * step,
    y: bottom - v * (bottom - top),
  }));
  const first = coords[0]!;
  const last = coords[coords.length - 1]!;

  return (
    <Figure
      number={number}
      name="dashboard"
      caption="churn trend, and the same rate cut three ways"
      plot={{
        kind: "series",
        band: { top: (top - 14) / H, bottom: (bottom + 16) / H },
        series: [
          {
            unit: "%",
            digits: 0,
            points: coords.map((p, i) => ({
              x: p.x / W,
              y: p.y / H,
              v: Math.round(TREND[i]! * 100),
            })),
          },
        ],
      }}
    >
      <text x={left} y={20} className="fg-label fg-label--strong">Churn over time</text>
      <text x={right} y={20} textAnchor="end" className="fg-label">6 report views</text>
      <HGrid top={top} bottom={bottom} left={left} right={right} rows={3} />
      <polygon
        points={`${left},${bottom} ${asPolyline(coords)} ${right},${bottom}`}
        fill="var(--data-1)"
        opacity="0.08"
        style={at(600)}
      />
      {/* The line draws itself; the two ends are stamped as it arrives. */}
      <path
        d={asPath(coords)}
        pathLength={1}
        fill="none"
        stroke="var(--data-1)"
        strokeWidth="2"
        className="fg-draw"
        style={at(330)}
      />
      <circle cx={first.x} cy={first.y} r={3} fill="var(--data-1)" className="fg-dot" style={at(1100)} />
      <circle cx={last.x} cy={last.y} r={3.5} fill="var(--data-1)" className="fg-dot" style={at(1150)} />

      {/* The three cuts read as rows rather than columns: a full-width label
          can never outgrow its column the way side-by-side labels did once
          the label steps grow at narrow widths. */}
      {CUTS.map((cut, c) => {
        const rowTop = 206 + c * 46;
        const barW = (right - left - 3 * 10) / 4;
        // Each row arrives whole, then its bars grow left to right.
        const row = 700 + c * 140;
        return (
          <g key={cut.name}>
            <text x={left} y={rowTop + 10} className="fg-label fg-label--strong" style={at(row)}>
              By {cut.name.toLowerCase()}
            </text>
            {cut.bars.map((ratio, r) => (
              <g key={r}>
                <rect
                  x={left + r * (barW + 10)}
                  y={rowTop + 20}
                  width={barW}
                  height="12"
                  fill="var(--ink-3)"
                  opacity="0.1"
                  className="fg-track"
                  style={at(row)}
                />
                <rect
                  x={left + r * (barW + 10)}
                  y={rowTop + 20}
                  width={barW * ratio}
                  height="12"
                  fill={r === 0 ? "var(--data-1)" : "var(--data-2)"}
                  opacity={r === 0 ? 0.92 : 0.38}
                  className="fg-bar"
                  style={at(760 + c * 140 + r * 50)}
                />
              </g>
            ))}
          </g>
        );
      })}
    </Figure>
  );
}

/* 04 · Network ---------------------------------------------------------- */

const LAYERS = [
  { x: 60, count: 6 },
  { x: 180, count: 8 },
  { x: 300, count: 6 },
  { x: 430, count: 1 },
];

function NetworkFigure({ number }: FigureProps) {
  const top = 40;
  const span = H - top - 80;
  const nodes = LAYERS.map((layer) =>
    Array.from({ length: layer.count }, (_, i) => ({
      x: layer.x,
      y: layer.count === 1 ? top + span / 2 : top + (span / (layer.count - 1)) * i,
    })),
  );

  return (
    <Figure number={number} name="network" caption="feed-forward classifier trained on SMOTE-balanced data">
      {nodes.slice(0, -1).flatMap((layer, l) =>
        layer.flatMap((from, a) =>
          nodes[l + 1]!.map((to, b) => (
            <line
              key={`${l}-${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={l === nodes.length - 2 ? "var(--data-1)" : "var(--ink-3)"}
              strokeWidth={l === nodes.length - 2 ? 1 : 0.6}
              opacity={l === nodes.length - 2 ? 0.6 : 0.28}
              style={at(470 + l * 200)}
            />
          )),
        ),
      )}
      {nodes.map((layer, l) =>
        layer.map((node, i) => {
          const out = l === nodes.length - 1;
          return (
            <circle
              key={`${l}-${i}`}
              cx={node.x}
              cy={node.y}
              r={out ? 11 : 6}
              fill={out ? "var(--data-1)" : "var(--paper)"}
              stroke={out ? "var(--data-1)" : "var(--ink-2)"}
              strokeWidth="1.2"
              className={out ? "fg-pop" : undefined}
              style={{ ...at(400 + l * 200), ...order(i) }}
            />
          );
        }),
      )}
      {["Inputs", "Hidden", "Hidden", "Churn?"].map((label, i) => (
        <text
          key={i}
          x={LAYERS[i]!.x}
          y={H - 26}
          textAnchor="middle"
          className={`fg-label${i === 3 ? " fg-label--strong" : ""}`}
          fill={i === 3 ? "var(--data-1)" : undefined}
          style={at(450 + i * 200)}
        >
          {label}
        </text>
      ))}
    </Figure>
  );
}

/* 05 · Ensemble --------------------------------------------------------- */

const MODELS = ["Naive Bayes", "Logistic reg.", "SVM"];
const REASONS = ["suspicious URL", "urgency words", "odd punctuation"];

function EnsembleFigure({ number }: FigureProps) {
  return (
    <Figure number={number} name="ensemble" caption="three models vote; each verdict comes with its reasons">
      {MODELS.map((model, i) => {
        const y = 44 + i * 94;
        return (
          <g key={model}>
            <rect x={16} y={y} width={128} height={48} className="fg-panel" style={at(250 + i * 140)} />
            <text x={30} y={y + 29} className="fg-label fg-label--strong" style={at(310 + i * 140)}>
              {model}
            </text>
            <path
              d={`M 144 ${y + 24} C 184 ${y + 24}, 180 185, 214 185`}
              className="fg-link"
              style={at(560 + i * 60)}
            />
          </g>
        );
      })}
      {/* The verdict lands as one block, then its reasons are appended. */}
      <rect x={214} y={153} width={100} height={64} fill="var(--data-1)" className="fg-fade" style={at(820)} />
      <text x={264} y={181} textAnchor="middle" className="fg-label fg-label--strong fg-label--on-accent" style={at(820)}>
        Verdict
      </text>
      <text x={264} y={201} textAnchor="middle" className="fg-label fg-label--on-accent" style={at(870)}>
        + confidence
      </text>
      <line x1={314} y1={185} x2={334} y2={185} stroke="var(--data-1)" style={at(900)} />
      <line x1={334} x2={334} y1={143} y2={227} stroke="var(--data-1)" style={at(940)} />
      {REASONS.map((reason, i) => (
        <g key={reason}>
          <line x1={334} x2={344} y1={143 + i * 42} y2={143 + i * 42} stroke="var(--data-1)" style={at(980 + i * 50)} />
          <text x={350} y={147 + i * 42} className="fg-label" style={at(980 + i * 50)}>{reason}</text>
        </g>
      ))}
      <text x={16} y={H - 16} className="fg-label" style={at(980)}>Example reasons, from the engineered feature families.</text>
    </Figure>
  );
}

/* 06 · Stages ----------------------------------------------------------- */

const STAGES = [
  { lines: ["Non-", "demented"], barH: 10 },
  { lines: ["Very", "mild"], barH: 72 },
  { lines: ["Mild"], barH: 8 },
  { lines: ["Moderate"], barH: 4 },
] as const;

function StagesFigure({ number }: FigureProps) {
  const left = 24;
  const right = W - 24;
  const gap = 10;
  const colW = (right - left - gap * 3) / 4;
  const slotTop = 194;
  const slotH = 72;
  const slotBottom = slotTop + slotH;

  return (
    <Figure number={number} name="stages" caption="one scan in, one of four ordered stages out">
      <rect x={W / 2 - 70} y={22} width={140} height={100} className="fg-panel" />
      {Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => {
          const dx = (c - 4.5) / 4.2;
          const dy = (r - 3) / 3.1;
          const radial = Math.max(0, 1 - (dx * dx + dy * dy) * 0.75);
          return (
            <rect
              key={`${r}-${c}`}
              x={W / 2 - 62 + c * 12.4}
              y={30 + r * 12.4}
              width={10.4}
              height={10.4}
              fill={radial > 0.55 ? "var(--data-1)" : "var(--ink-2)"}
              opacity={0.08 + radial * 0.42 + hash(r * 10 + c) * 0.12}
              style={{ ...at(200), ...order(r * 15 + c) }}
            />
          );
        }),
      )}
      <text x={W / 2} y={146} textAnchor="middle" className="fg-label" style={at(450)}>MRI slice → CNN</text>
      <path d={`M ${W / 2} 156 V 184`} stroke="var(--ink-2)" style={at(470)} />
      <path d={`M ${W / 2 - 5} 178 L ${W / 2} 186 L ${W / 2 + 5} 178`} fill="none" stroke="var(--ink-2)" style={at(510)} />
      {STAGES.map((stage, i) => {
        const x = left + i * (colW + gap);
        const hot = i === 1;
        return (
          <g key={stage.lines.join("")}>
            <rect
              x={x}
              y={slotTop}
              width={colW}
              height={slotH}
              fill="var(--surface)"
              stroke="var(--line)"
              className="fg-fade"
              style={at(560 + i * 55)}
            />
            <rect
              x={x}
              y={slotBottom - stage.barH}
              width={colW}
              height={stage.barH}
              fill={hot ? "var(--data-1)" : "var(--data-2)"}
              opacity={hot ? 1 : 0.28}
              className="fg-bar"
              style={at(600 + i * 90)}
            />
            {/* The hot stage's white labels arrive with its bar, one after the
                other: the number, then the accuracy it is proud of. */}
            <text
              x={x + 10}
              y={slotTop + 22}
              className={`fg-label fg-label--strong${hot ? " fg-label--on-accent fg-snap" : ""}`}
              style={at(hot ? 1090 : 620 + i * 55)}
            >
              {i + 1}
            </text>
            {hot && (
              /* On its own line under the stage number: side by side, the two
                 labels meet in the middle once the label steps grow. */
              <text
                x={x + 10}
                y={slotTop + 50}
                className="fg-label fg-label--on-accent fg-snap"
                style={at(1160)}
              >
                99.21%
              </text>
            )}
            {/* Names break onto two lines and sit centred, so the longest
                line's overflow splits across the gap on both sides instead
                of running into the next column's name. */}
            <text x={x + colW / 2} y={288} textAnchor="middle" className="fg-label fg-label--sans" style={at(600 + i * 55)}>
              {stage.lines.map((line, n) => (
                <tspan key={line} x={x + colW / 2} dy={n === 0 ? 0 : "1.25em"}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={326} y2={326} className="fg-axis" style={at(1000)} />
      <path d={`M ${right - 7} 322 L ${right} 326 L ${right - 7} 330`} fill="none" stroke="var(--ink-3)" style={at(1000)} />
      <text x={left} y={350} className="fg-label" style={at(1000)}>Progression</text>
    </Figure>
  );
}

/* 07 · Bandits ---------------------------------------------------------- */

const BANDITS = [
  { adaptive: true, seed: 1 },
  { adaptive: true, seed: 2 },
  { adaptive: false, seed: 3 },
  { adaptive: false, seed: 4 },
  { adaptive: false, seed: 5 },
  { adaptive: false, seed: 6 },
  { adaptive: false, seed: 7 },
  { adaptive: false, seed: 8 },
];

type RegretPoint = { x: number; y: number; v: number };

/** One trajectory: the drawn points, and the values the readout quotes. */
function regretSeries(
  seed: number,
  adaptive: boolean,
  top: number,
  bottom: number,
  left: number,
  right: number,
): RegretPoint[] {
  const points: RegretPoint[] = [];
  for (let step = 0; step <= 60; step += 1) {
    const t = step / 60;
    const ceiling = adaptive ? 0.32 : 0.7 + hash(seed) * 0.26;
    const growth = adaptive ? 1 - Math.exp(-3.1 * t) : Math.pow(t, 0.72);
    const noise = (hash(step * 2.3 + seed * 41) - 0.5) * 0.03;
    const v = Math.min(1, Math.max(0, ceiling * growth + noise));
    points.push({ x: left + t * (right - left), y: bottom - v * (bottom - top), v });
  }
  return points;
}

function BanditFigure({ number }: FigureProps) {
  const top = 34;
  const bottom = H - 84;
  const left = 40;
  const right = W - 24;
  const stationary = BANDITS.filter((b) => !b.adaptive).map((b) => ({
    seed: b.seed,
    points: regretSeries(b.seed, false, top, bottom, left, right),
  }));
  const adaptive = BANDITS.filter((b) => b.adaptive).map((b) => ({
    seed: b.seed,
    points: regretSeries(b.seed, true, top, bottom, left, right),
  }));

  return (
    <Figure
      number={number}
      name="bandit"
      caption="cumulative regret as arm rewards drift"
      plot={{
        kind: "series",
        band: { top: (top - 14) / H, bottom: (bottom + 16) / H },
        series: adaptive.map((s, i) => ({
          name: i === 0 ? "UCB" : "TS",
          digits: 2,
          points: s.points.map((p) => ({ x: p.x / W, y: p.y / H, v: p.v })),
        })),
      }}
    >
      <text x={left} y={20} className="fg-label fg-label--strong">Cumulative regret</text>
      <HGrid top={top} bottom={bottom} left={left} right={right} rows={4} />
      {/* The six baselines settle first; the two that adapt draw over them. */}
      {stationary.map((b, i) => (
        <polyline
          key={b.seed}
          points={asPolyline(b.points)}
          fill="none"
          stroke="var(--data-2)"
          strokeWidth="1.2"
          opacity="0.5"
          style={at(370 + i * 22)}
        />
      ))}
      {adaptive.map((b, i) => (
        <path
          key={b.seed}
          d={asPath(b.points)}
          pathLength={1}
          fill="none"
          stroke="var(--data-1)"
          strokeWidth="2"
          className="fg-draw"
          style={at(600 + i * 70)}
        />
      ))}
      <text x={right} y={bottom + 20} className="fg-label" textAnchor="end">Time →</text>
      <rect x={left} y={H - 39} width={14} height={3} fill="var(--data-1)" className="fg-track" style={at(1100)} />
      <text x={left + 22} y={H - 34} className="fg-label" style={at(1100)}>Sliding-window UCB, forgetting TS</text>
      <rect x={left} y={H - 17} width={14} height={3} fill="var(--data-2)" opacity="0.6" className="fg-track" style={at(370)} />
      <text x={left + 22} y={H - 12} className="fg-label" style={at(370)}>The six stationary strategies</text>
    </Figure>
  );
}

const FIGURES: Record<ProjectVisual, (props: FigureProps) => React.JSX.Element> = {
  clusters: ClusterFigure,
  schema: SchemaFigure,
  dashboard: DashboardFigure,
  network: NetworkFigure,
  ensemble: EnsembleFigure,
  stages: StagesFigure,
  bandit: BanditFigure,
};

/** `number` is the figure's place in the brief; the hero figure is Fig. 1. */
export function ProjectFigure({ visual, number }: { visual: ProjectVisual; number?: number }) {
  const Component = FIGURES[visual];
  return <Component number={number} />;
}
