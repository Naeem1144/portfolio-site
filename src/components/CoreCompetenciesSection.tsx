import {
  ArrowRight,
  Database,
  ChartNoAxesCombined,
  BrainCircuit,
  Workflow,
} from "lucide-react";

const competencies = [
  {
    icon: Database,
    number: "01",
    title: "Prepare the data.",
    subtitle: "ANALYSIS & PREPARATION",
    description:
      "Clean, structure, and explore datasets to answer focused questions.",
    skills: [
      "SQL · joins, CTEs, window functions",
      "Python · pandas & NumPy",
      "Data cleaning & ETL",
      "Exploratory data analysis",
    ],
  },
  {
    icon: ChartNoAxesCombined,
    number: "02",
    title: "Make it visible.",
    subtitle: "REPORTING & VISUALIZATION",
    description:
      "Build clear dashboards and communicate what the data shows.",
    skills: [
      "Power BI & Power BI Service",
      "Advanced Excel & automation",
      "Matplotlib & Seaborn",
      "Dashboard design & data storytelling",
    ],
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "Test the patterns.",
    subtitle: "MODELING & METHODS",
    description:
      "Model customer groups and test whether the findings hold up.",
    skills: [
      "K-Means, DBSCAN & HDBSCAN",
      "scikit-learn & predictive modeling",
      "Feature engineering & validation",
      "PCA, t-SNE & A/B testing",
    ],
  },
  {
    icon: Workflow,
    number: "04",
    title: "Add the context.",
    subtitle: "TOOLS & COLLABORATION",
    description:
      "Pair technical analysis with business context, documentation, and communication.",
    skills: [
      "Jupyter Notebook & Git / GitHub",
      "Relational databases",
      "Business & marketing acumen",
      "Documentation & presentation",
    ],
  },
];

export function CoreCompetenciesSection() {
  return (
    <>
      <div className="section-kicker">
        <span className="eyebrow">03 / MY TOOLKIT</span>
        <span className="eyebrow">CLEANING · ANALYSIS · COMMUNICATION</span>
      </div>
      <div className="section-heading-row">
        <h2>
          From questions
          <br />
          <em>to clarity.</em>
        </h2>
        <p>
          Choose the method that fits the question.
        </p>
      </div>
      <div className="competency-grid">
        {competencies.map((item) => (
          <article className="competency" key={item.number}>
            <div className="competency-top">
              <item.icon size={25} strokeWidth={1.3} />
              <span>{item.number}</span>
            </div>
            <span className="eyebrow">{item.subtitle}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>
              {item.skills.map((skill) => (
                <li key={skill}>
                  <ArrowRight size={12} />
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="toolkit-notes">
        <p>
          <span className="eyebrow">ALSO EXPLORING</span>Deep neural networks ·
          CNNs · Reinforcement learning
        </p>
        <p>
          <span className="eyebrow">HUMAN LANGUAGES</span>English (C1, IELTS
          8.0) · Hindi · Gujarati
        </p>
      </div>
    </>
  );
}
