/**
 * Skills, each tied to the projects that use it.
 *
 * `projects` holds project numbers from `projects.ts`; the profile renders
 * them as links to the project on the page. A skill with no project behind it
 * names where it was learned instead, so no line is an unsupported claim.
 */

export type Skill = {
  name: string;
  projects?: string[];
  /** Shown when there is no project to point at. */
  via?: string;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Data analysis",
    skills: [
      { name: "SQL (joins, CTEs, window functions)", projects: ["02"] },
      { name: "Data cleaning & preparation", projects: ["01", "04", "05"] },
      { name: "Exploratory data analysis", projects: ["01", "04"] },
      { name: "Statistics", via: "TOPS, Google" },
      { name: "Advanced Excel & spreadsheets", via: "TOPS, Google" },
    ],
  },
  {
    title: "Business intelligence",
    skills: [
      { name: "Power BI & DAX", projects: ["03"] },
      { name: "Dashboard design & reporting", projects: ["03"] },
      { name: "KPI & trend tracking", projects: ["03"] },
      { name: "Data visualisation", projects: ["01", "03", "08"] },
      { name: "Tableau", via: "Google, Udemy" },
    ],
  },
  {
    title: "Marketing intelligence",
    skills: [
      { name: "Customer segmentation & profiles", projects: ["01"] },
      { name: "Churn & retention analysis", projects: ["03", "04"] },
      { name: "Funnels, cohorts & A/B testing", via: "Seneca" },
      { name: "Google Analytics & Ads, SEO", via: "Seneca" },
      { name: "Inbound marketing & content strategy", via: "HubSpot" },
      { name: "Data-driven marketing", via: "HubSpot, Seneca" },
    ],
  },
  {
    title: "Machine learning & AI",
    skills: [
      { name: "Predictive modelling", projects: ["04", "05", "06"] },
      { name: "Clustering (K-Means, DBSCAN, HDBSCAN)", projects: ["01"] },
      { name: "Deep learning (PyTorch, TensorFlow)", projects: ["04", "07"] },
      { name: "Model testing & validation", projects: ["04", "05"] },
      { name: "Explainable predictions", projects: ["06"] },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Python", projects: ["01", "04", "05", "06", "07", "08"] },
      { name: "pandas, NumPy & scikit-learn", projects: ["01", "05", "06"] },
      { name: "Plotting (Matplotlib, Seaborn, Plotly)", projects: ["01", "04", "05"] },
      { name: "MySQL", projects: ["02"] },
      { name: "Streamlit apps", projects: ["06", "07"] },
      { name: "Git & GitHub", via: "Every project" },
      { name: "Microsoft Office (Word, Excel, PowerPoint)", via: "Seneca, TOPS" },
    ],
  },
  {
    title: "Business & people",
    skills: [
      { name: "Turning business questions into analysis", projects: ["01", "03"] },
      { name: "Recommendations for decision-makers", projects: ["01"] },
      { name: "Explaining results in plain English", projects: ["03", "06"] },
      { name: "Attention to detail & data quality", projects: ["02"] },
      { name: "Clear writing & presenting (C1 English)", via: "IELTS 8.0" },
      { name: "Teamwork & reliability under pressure", via: "Tim Hortons" },
      { name: "Working across cultures", via: "India & Canada" },
    ],
  },
];

