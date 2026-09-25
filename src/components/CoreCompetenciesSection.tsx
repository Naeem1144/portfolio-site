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
    subtitle: "DATA ANALYSIS",
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
    subtitle: "BUSINESS INTELLIGENCE",
    description:
      "Build clear dashboards and communicate what the data shows.",
    skills: [
      "Power BI, Power BI Service & Tableau",
      "Advanced Excel & automation",
      "Matplotlib & Seaborn",
      "Dashboard design & data storytelling",
    ],
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "Test the patterns.",
    subtitle: "DATA SCIENCE & AI",
    description:
      "Model customer groups, test patterns, and build with machine and deep learning.",
    skills: [
      "K-Means, DBSCAN & HDBSCAN",
      "scikit-learn & predictive modeling",
      "Deep learning · CNNs · NLP",
      "PCA, t-SNE & reinforcement learning",
    ],
  },
  {
    icon: Workflow,
    number: "04",
    title: "Add the context.",
    subtitle: "MARKETING & BUSINESS",
    description:
      "Pair technical analysis with marketing strategy, business context, and communication.",
    skills: [
      "Google Analytics & Google Ads",
      "SEO, email marketing & CRM",
      "Marketing analytics & funnels",
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
          CNNs · Reinforcement learning · NLP
        </p>
        <p>
          <span className="eyebrow">AI TOOLS</span>ChatGPT · Claude · GitHub
          Copilot
        </p>
        <p>
          <span className="eyebrow">HUMAN LANGUAGES</span>English (C1, IELTS
          8.0) · Hindi · Gujarati
        </p>
      </div>
    </>
  );
}
