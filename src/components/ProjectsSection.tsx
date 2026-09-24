"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Database,
  Code2,
  ChartNoAxesCombined,
} from "lucide-react";

const archive = [
  {
    number: "04",
    name: "Customer churn prediction",
    description:
      "Predicting telecom customer churn with feature engineering, preprocessing, and deep learning.",
    type: "DEEP LEARNING",
    url: "customer-churn-prediction",
  },
  {
    number: "05",
    name: "GTA house price prediction",
    description:
      "Cleaning housing data and building regression models for the Greater Toronto Area market.",
    type: "PREDICTIVE MODELING",
    url: "greater-toronto-area-house-price-prediction",
  },
  {
    number: "06",
    name: "Spam email detection",
    description:
      "Using labeled email data and scikit-learn to classify phishing and legitimate emails.",
    type: "CLASSIFICATION",
    url: "spam-email-detection-system",
  },
];

const clusters = Array.from({ length: 210 }, (_, i) => {
  const group = i % 3;
  const centers = [
    [143, 175],
    [335, 105],
    [341, 249],
  ];
  const angle = i * 2.39996;
  const radius = Math.sqrt(((i * 37) % 100) / 100);
  return {
    x: centers[group][0] + Math.cos(angle) * radius * (group === 0 ? 91 : 79),
    y: centers[group][1] + Math.sin(angle) * radius * 61,
    color: ["#d3e99b", "#78a887", "#e2bc86"][group],
  };
});

function ClusterGraphic() {
  return (
    <div className="cluster-graphic">
      <div className="graphic-topline">
        <span>CUSTOMER SEGMENTATION</span>
        <span>PY / 01</span>
      </div>
      <svg
        viewBox="0 0 500 330"
        role="img"
        aria-label="Conceptual illustration of three customer clusters; not measured project results"
      >
        <defs>
          <pattern
            id="cluster-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#f5f4ee"
              strokeOpacity=".055"
            />
          </pattern>
        </defs>
        <rect width="500" height="330" fill="url(#cluster-grid)" />
        <path
          d="M 35 20 V 310 H 480"
          fill="none"
          stroke="#e5ead6"
          strokeOpacity=".25"
        />
        <ellipse
          cx="143"
          cy="175"
          rx="106"
          ry="78"
          fill="none"
          stroke="#d3e99b"
          strokeOpacity=".3"
          strokeDasharray="4 6"
          transform="rotate(-12 143 175)"
        />
        <ellipse
          cx="335"
          cy="105"
          rx="93"
          ry="77"
          fill="none"
          stroke="#78a887"
          strokeOpacity=".4"
          strokeDasharray="4 6"
          transform="rotate(15 335 105)"
        />
        <ellipse
          cx="341"
          cy="249"
          rx="94"
          ry="65"
          fill="none"
          stroke="#e2bc86"
          strokeOpacity=".3"
          strokeDasharray="4 6"
          transform="rotate(-10 341 249)"
        />
        {clusters.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={i % 9 === 0 ? 3.8 : 2.5}
            fill={point.color}
            opacity={0.45 + (i % 5) * 0.13}
          />
        ))}
        <g fill="#f5f4ee" fontSize="9" fontFamily="monospace">
          <text x="64" y="82">
            CLUSTER A
          </text>
          <text x="376" y="31">
            CLUSTER B
          </text>
          <text x="385" y="326">
            CLUSTER C
          </text>
        </g>
      </svg>
      <div className="graphic-bottomline">
        <span>
          <i /> CONCEPTUAL CLUSTER MAP
        </span>
        <span>PCA / t-SNE</span>
      </div>
    </div>
  );
}

function SqlGraphic() {
  return (
    <div className="sql-graphic" aria-label="Illustrative SQL query">
      <div className="code-window">
        <div className="code-window-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>customer_insights.sql</span>
          <Code2 size={14} />
        </div>
        <pre>
          <code>
            <span className="line-number">01</span> <b>SELECT</b>{" "}
            customer_segment,{"\n"}
            <span className="line-number">02</span> <b>SUM</b>(revenue){" "}
            <b>AS</b> total_revenue,{"\n"}
            <span className="line-number">03</span> <b>RANK</b>() <b>OVER</b> (
            {"\n"}
            <span className="line-number">04</span> <b>ORDER BY SUM</b>(revenue){" "}
            <b>DESC</b>
            {"\n"}
            <span className="line-number">05</span> ) <b>AS</b> revenue_rank
            {"\n"}
            <span className="line-number">06</span> <b>FROM</b> customer_data
            {"\n"}
            <span className="line-number">07</span> <b>GROUP BY</b>{" "}
            customer_segment;
          </code>
        </pre>
        <div className="code-result">
          <span>
            <Database size={12} /> QUERY STUDY
          </span>
          <span>
            Revenue by segment <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

function DashboardGraphic() {
  return (
    <div className="dashboard-graphic">
      <div className="dashboard-window">
        <div className="dashboard-title">
          <span className="dashboard-mark">
            <ChartNoAxesCombined size={15} />
          </span>
          <span>
            Customer overview<small>CHURN & RETENTION</small>
          </span>
          <span className="dashboard-filter">All customers⌄</span>
        </div>
        <div className="dashboard-charts">
          <div className="chart-bars">
            <span>Customers by geography</span>
            <div>
              {[46, 78, 59, 92, 68, 48, 82].map((height, i) => (
                <i key={i} style={{ height: height + "%" }} />
              ))}
            </div>
            <small>GEOGRAPHY COMPARISON</small>
          </div>
          <div className="chart-donut">
            <div>
              <span>
                Customer
                <br />
                <strong>retention</strong>
              </span>
            </div>
            <small>ACCOUNT OVERVIEW</small>
          </div>
        </div>
        <div className="dashboard-foot">
          <span>
            <i /> Conceptual dashboard preview
          </span>
          <span>POWER BI</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState("All work");
  return (
    <>
      <div className="section-kicker">
        <span className="eyebrow">01 / SELECTED WORK</span>
        <span className="eyebrow">QUESTIONS INTO PRACTICE</span>
      </div>
      <div className="section-heading-row">
        <h2>
          Proof in the <em>work.</em>
        </h2>
        <p>
          Real datasets. Practical questions.
          <br />A closer look at the methods.
        </p>
      </div>
      <div className="project-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {[
            ["All work", "06"],
            ["Data analytics", "03"],
            ["Machine learning", "03"],
          ].map(([label, count]) => (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(label)}
              aria-pressed={filter === label}
            >
              {label}
              <span>{count}</span>
            </button>
          ))}
        </div>
        <span className="eyebrow project-count" aria-live="polite">
          {filter === "All work" ? "06" : "03"} PROJECTS
        </span>
      </div>
      {filter !== "Machine learning" && (
        <div className="featured-projects">
          <a
            href="https://github.com/Naeem1144/segmentation-project"
            aria-label="Explore Hotel Customer Segmentation on GitHub"
            className="project-featured"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="featured-copy">
              <div className="project-overline">
                <span>01 / FEATURED PROJECT</span>
                <span className="round-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </div>
              <h3>
                From raw records
                <br />
                to customer <em>groups.</em>
              </h3>
              <p className="project-subtitle">Hotel Customer Segmentation</p>
              <p>
                Cleaning and analyzing 83,590 hotel customer records to explore
                booking behavior, revenue, and customer groups with K-Means,
                DBSCAN, and HDBSCAN.
              </p>
              <div className="project-tags">
                <span>Python</span>
                <span>Clustering</span>
                <span>PCA & t-SNE</span>
              </div>
              <span className="project-open">
                View project <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="featured-visual">
              <ClusterGraphic />
              <div className="project-stat">
                <strong>83,590</strong>
                <span>
                  CUSTOMER RECORDS ANALYZED.
                </span>
              </div>
            </div>
          </a>
          <div className="project-pair">
            <a
              href="https://github.com/Naeem1144/sql-analysis"
              aria-label="Explore SQL Business Data Analysis on GitHub"
              className="project-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SqlGraphic />
              <div className="project-card-body">
                <div className="project-overline">
                  <span>02 / SQL ANALYSIS</span>
                  <ArrowUpRight size={22} />
                </div>
                <h3>Revenue, segmented.</h3>
                <p>
                  Using joins, CTEs, and window functions to explore revenue
                  trends and customer segments.
                </p>
                <div className="project-tags">
                  <span>SQL</span>
                  <span>Business analysis</span>
                  <span>Database design</span>
                </div>
              </div>
            </a>
            <a
              href="https://github.com/Naeem1144/professional-power-bi-dashboard"
              aria-label="Explore Customer Churn Dashboard on GitHub"
              className="project-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DashboardGraphic />
              <div className="project-card-body">
                <div className="project-overline">
                  <span>03 / BUSINESS INTELLIGENCE</span>
                  <ArrowUpRight size={22} />
                </div>
                <h3>Customer churn, in one view.</h3>
                <p>
                  Built in Power BI to compare customer geography, card type,
                  and account measures.
                </p>
                <div className="project-tags">
                  <span>Power BI</span>
                  <span>Dashboards</span>
                  <span>Reporting</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
      {filter !== "Data analytics" && (
        <div className="project-archive">
          <div className="archive-heading">
            <span className="eyebrow">
              {filter === "All work"
                ? "MORE PROJECTS"
                : "MACHINE LEARNING PROJECTS"}
            </span>
            <span className="eyebrow">MODELING & CLASSIFICATION</span>
          </div>
          {archive.map((project) => (
            <a
              key={project.url}
              href={`https://github.com/Naeem1144/${project.url}`}
              aria-label={`Explore ${project.name} on GitHub`}
              target="_blank"
              rel="noopener noreferrer"
              className="archive-row"
            >
              <span className="archive-number">{project.number}</span>
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <span className="archive-type">{project.type}</span>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
      )}
      <div className="work-bottom">
        <span>Browse the full project collection.</span>
        <a
          href="https://github.com/Naeem1144"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          View GitHub profile <ArrowUpRight size={17} />
        </a>
      </div>
    </>
  );
}
