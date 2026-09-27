import type { ReactNode } from "react";
import type { ProjectVisual } from "@/lib/projects";

/**
 * Project illustrations.
 *
 * Diagrams of what each project did (the cluster map, the schema, the network
 * topology, the fit against the diagonal), drawn in SVG from deterministic
 * data. They are illustrations, and captioned as such: the only numbers drawn
 * inside them are ones the project itself publishes.
 */

const W = 500;
const H = 360;

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="figure">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
      <figcaption>Illustration · {caption}</figcaption>
    </figure>
  );
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

const HUES = ["var(--c1)", "var(--c2)", "var(--c3)"];

const HULLS = [
  { cx: 150, cy: 196, rx: 96, ry: 70, rotate: -14, label: "Group A", lx: 72, ly: 104 },
  { cx: 340, cy: 116, rx: 88, ry: 60, rotate: 12, label: "Group B", lx: 404, ly: 48 },
  { cx: 340, cy: 256, rx: 86, ry: 56, rotate: -8, label: "Group C", lx: 422, ly: 310 },
];

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

function ClusterFigure() {
  return (
    <Figure caption="behavioural clusters projected to two dimensions">
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
        />
      ))}
      {HULLS.map((hull, i) => (
        <text key={hull.label} x={hull.lx} y={hull.ly} className="fg-label fg-label--strong" fill={HUES[i]}>
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

function SchemaFigure() {
  return (
    <Figure caption="train booking schema, three related tables">
      <path d="M 114 144 V 172 H 220 V 200" className="fg-link" />
      <path d="M 386 126 V 172 H 280 V 200" className="fg-link" />
      <text x={122} y={166} className="fg-label" fill="var(--c1)">FK</text>
      <text x={394} y={166} className="fg-label" fill="var(--c1)">FK</text>
      {TABLES.map((table) => {
        const h = 30 + table.rows.length * 22;
        return (
          <g key={table.name}>
            <rect x={table.x} y={table.y} width={table.w} height={h} className="fg-panel" />
            <line x1={table.x} x2={table.x + table.w} y1={table.y + 28} y2={table.y + 28} className="fg-axis" />
            <text x={table.x + 12} y={table.y + 19} className="fg-label fg-label--strong">
              {table.name}
            </text>
            {table.rows.map((row, i) => (
              <text
                key={row}
                x={table.x + 12}
                y={table.y + 48 + i * 22}
                className="fg-label"
                fill={row.includes("trigger") ? "var(--c1)" : undefined}
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
const CUTS = ["Demographics", "Plan", "Geography"];

function DashboardFigure() {
  const top = 34;
  const bottom = 186;
  const left = 40;
  const right = W - 24;
  const step = (right - left) / (TREND.length - 1);
  const points = TREND.map((v, i) => `${left + i * step},${bottom - v * (bottom - top)}`);

  return (
    <Figure caption="churn trend, and the same rate cut three ways">
      <text x={left} y={20} className="fg-label fg-label--strong">Churn over time</text>
      <HGrid top={top} bottom={bottom} left={left} right={right} rows={3} />
      <polygon
        points={`${left},${bottom} ${points.join(" ")} ${right},${bottom}`}
        fill="var(--c1)"
        opacity="0.08"
      />
      <polyline points={points.join(" ")} fill="none" stroke="var(--c1)" strokeWidth="2" />

      {CUTS.map((cut, c) => {
        const x0 = left + c * ((right - left + 16) / 3);
        const colW = (right - left + 16) / 3 - 16;
        return (
          <g key={cut}>
            <text x={x0} y={226} className="fg-label fg-label--strong">By {cut.toLowerCase()}</text>
            {[0, 1, 2, 3].map((r) => (
              <rect
                key={r}
                x={x0}
                y={240 + r * 22}
                width={colW * (0.3 + hash(c * 10 + r) * 0.7)}
                height="12"
                fill={r === 0 ? "var(--c1)" : "var(--c2)"}
                opacity={r === 0 ? 0.9 : 0.35}
              />
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

function NetworkFigure() {
  const top = 40;
  const span = H - top - 80;
  const nodes = LAYERS.map((layer) =>
    Array.from({ length: layer.count }, (_, i) => ({
      x: layer.x,
      y: layer.count === 1 ? top + span / 2 : top + (span / (layer.count - 1)) * i,
    })),
  );

  return (
    <Figure caption="feed-forward classifier trained on SMOTE-balanced data">
      {nodes.slice(0, -1).flatMap((layer, l) =>
        layer.flatMap((from, a) =>
          nodes[l + 1]!.map((to, b) => (
            <line
              key={`${l}-${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={l === nodes.length - 2 ? "var(--c1)" : "var(--ink-3)"}
              strokeWidth={l === nodes.length - 2 ? 1 : 0.6}
              opacity={l === nodes.length - 2 ? 0.6 : 0.28}
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
              fill={out ? "var(--c1)" : "var(--figure-bg)"}
              stroke={out ? "var(--c1)" : "var(--ink-2)"}
              strokeWidth="1.2"
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
          fill={i === 3 ? "var(--c1)" : undefined}
        >
          {label}
        </text>
      ))}
    </Figure>
  );
}

/* 05 · Regression ------------------------------------------------------- */

const FIT = Array.from({ length: 120 }, (_, i) => {
  const actual = i / 119;
  const spread = 0.02 + actual * 0.06;
  return {
    x: actual,
    y: Math.min(1, Math.max(0, actual + (hash(i * 3.7) - 0.5) * spread)),
  };
});

function RegressionFigure() {
  const left = 70;
  const bottom = H - 40;
  const size = H - 70;
  const toX = (v: number) => left + v * size * 1.25;
  const toY = (v: number) => bottom - v * size;

  return (
    <Figure caption="predicted against actual sale price">
      <HGrid top={bottom - size} bottom={bottom} left={left} right={toX(1)} rows={4} />
      <line x1={toX(0)} y1={toY(0)} x2={toX(1)} y2={toY(1)} stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="4 4" />
      {FIT.map((p, i) => (
        <circle key={i} cx={toX(p.x)} cy={toY(p.y)} r={2.6} fill="var(--c2)" opacity={0.35 + hash(i * 5.1) * 0.5} />
      ))}
      <text
        x={toX(0.56)}
        y={toY(0.56) - 18}
        className="fg-label"
        transform={`rotate(${(-Math.atan(1 / 1.25) * 180) / Math.PI} ${toX(0.56)} ${toY(0.56)})`}
      >
        perfect prediction
      </text>
      <text x={toX(0.04)} y={toY(0.86)} className="fg-value">R² 0.990</text>
      <text x={toX(0.04)} y={toY(0.86) + 20} className="fg-label">Gradient Boosting, test set</text>
      <text x={toX(1)} y={H - 14} className="fg-label" textAnchor="end">Actual →</text>
      <text x={56} y={toY(1)} className="fg-label" textAnchor="end" transform={`rotate(-90 56 ${toY(1)})`}>
        ← Predicted
      </text>
    </Figure>
  );
}

/* 06 · Ensemble --------------------------------------------------------- */

const MODELS = ["Naive Bayes", "Logistic reg.", "SVM"];
const REASONS = ["suspicious URL", "urgency words", "odd punctuation"];

function EnsembleFigure() {
  return (
    <Figure caption="three models vote; each verdict comes with its reasons">
      {MODELS.map((model, i) => {
        const y = 44 + i * 94;
        return (
          <g key={model}>
            <rect x={16} y={y} width={128} height={48} className="fg-panel" />
            <text x={30} y={y + 29} className="fg-label fg-label--strong">{model}</text>
            <path d={`M 144 ${y + 24} C 184 ${y + 24}, 180 185, 214 185`} className="fg-link" />
          </g>
        );
      })}
      <rect x={214} y={153} width={100} height={64} fill="var(--c1)" />
      <text x={264} y={181} textAnchor="middle" className="fg-label fg-label--strong fg-label--on-accent">Verdict</text>
      <text x={264} y={201} textAnchor="middle" className="fg-label fg-label--on-accent">+ confidence</text>
      <line x1={314} y1={185} x2={334} y2={185} stroke="var(--c1)" />
      <line x1={334} x2={334} y1={143} y2={227} stroke="var(--c1)" />
      {REASONS.map((reason, i) => (
        <g key={reason}>
          <line x1={334} x2={344} y1={143 + i * 42} y2={143 + i * 42} stroke="var(--c1)" />
          <text x={350} y={147 + i * 42} className="fg-label">{reason}</text>
        </g>
      ))}
      <text x={16} y={H - 16} className="fg-label">Example reasons, from the engineered feature families.</text>
    </Figure>
  );
}

/* 07 · Stages ----------------------------------------------------------- */

const STAGES = ["Non-demented", "Very mild", "Mild", "Moderate"];

function StagesFigure() {
  const left = 24;
  const right = W - 24;
  const gap = 10;
  const colW = (right - left - gap * 3) / 4;

  return (
    <Figure caption="one scan in, one of four ordered stages out">
      <rect x={W / 2 - 70} y={22} width={140} height={100} className="fg-panel" />
      {Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={W / 2 - 62 + c * 12.4}
            y={30 + r * 12.4}
            width={10.4}
            height={10.4}
            fill="var(--ink-2)"
            opacity={0.08 + hash(r * 10 + c) * 0.4}
          />
        )),
      )}
      <text x={W / 2} y={140} textAnchor="middle" className="fg-label">MRI slice → CNN</text>
      <path d={`M ${W / 2} 150 V 178`} stroke="var(--ink-2)" />
      <path d={`M ${W / 2 - 5} 172 L ${W / 2} 180 L ${W / 2 + 5} 172`} fill="none" stroke="var(--ink-2)" />
      {STAGES.map((stage, i) => {
        const x = left + i * (colW + gap);
        const hot = i === 1;
        return (
          <g key={stage}>
            <rect
              x={x}
              y={196}
              width={colW}
              height={70}
              fill={hot ? "var(--c1)" : "var(--c2)"}
              opacity={hot ? 1 : 0.14 + i * 0.1}
            />
            <text
              x={x + 10}
              y={220}
              className={`fg-label fg-label--strong${hot ? " fg-label--on-accent" : ""}`}
            >
              {i + 1}
            </text>
            <text x={x} y={288} className="fg-label">{stage}</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={312} y2={312} className="fg-axis" />
      <path d={`M ${right - 7} 308 L ${right} 312 L ${right - 7} 316`} fill="none" stroke="var(--ink-3)" />
      <text x={left} y={334} className="fg-label">Progression</text>
    </Figure>
  );
}

/* 08 · Bandits ---------------------------------------------------------- */

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

function regretPath(seed: number, adaptive: boolean, top: number, bottom: number, left: number, right: number) {
  const points: string[] = [];
  for (let step = 0; step <= 60; step += 1) {
    const t = step / 60;
    const ceiling = adaptive ? 0.32 : 0.7 + hash(seed) * 0.26;
    const growth = adaptive ? 1 - Math.exp(-3.1 * t) : Math.pow(t, 0.72);
    const noise = (hash(step * 2.3 + seed * 41) - 0.5) * 0.03;
    const value = Math.min(1, Math.max(0, ceiling * growth + noise));
    points.push(`${left + t * (right - left)},${bottom - value * (bottom - top)}`);
  }
  return points.join(" ");
}

function BanditFigure() {
  const top = 34;
  const bottom = H - 84;
  const left = 40;
  const right = W - 24;

  return (
    <Figure caption="cumulative regret as arm rewards drift">
      <text x={left} y={20} className="fg-label fg-label--strong">Cumulative regret</text>
      <HGrid top={top} bottom={bottom} left={left} right={right} rows={4} />
      {BANDITS.filter((b) => !b.adaptive).map((b) => (
        <polyline
          key={b.seed}
          points={regretPath(b.seed, false, top, bottom, left, right)}
          fill="none"
          stroke="var(--c2)"
          strokeWidth="1.2"
          opacity="0.5"
        />
      ))}
      {BANDITS.filter((b) => b.adaptive).map((b) => (
        <polyline
          key={b.seed}
          points={regretPath(b.seed, true, top, bottom, left, right)}
          fill="none"
          stroke="var(--c1)"
          strokeWidth="2"
        />
      ))}
      <text x={right} y={bottom + 20} className="fg-label" textAnchor="end">Time →</text>
      <rect x={left} y={H - 39} width={14} height={3} fill="var(--c1)" />
      <text x={left + 22} y={H - 34} className="fg-label">Sliding-window UCB, forgetting TS</text>
      <rect x={left} y={H - 17} width={14} height={3} fill="var(--c2)" opacity="0.6" />
      <text x={left + 22} y={H - 12} className="fg-label">The six stationary strategies</text>
    </Figure>
  );
}

const FIGURES: Record<ProjectVisual, () => React.JSX.Element> = {
  clusters: ClusterFigure,
  schema: SchemaFigure,
  dashboard: DashboardFigure,
  network: NetworkFigure,
  regression: RegressionFigure,
  ensemble: EnsembleFigure,
  stages: StagesFigure,
  bandit: BanditFigure,
};

export function ProjectFigure({ visual }: { visual: ProjectVisual }) {
  const Component = FIGURES[visual];
  return <Component />;
}
