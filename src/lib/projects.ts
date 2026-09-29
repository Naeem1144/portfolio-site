import { githubRepoUrl } from "./site";

/**
 * Project catalogue.
 *
 * Every figure in `outcomes` is quoted from the project's own README or
 * repository metadata, and `source` records where when it is not obvious.
 * Where a project publishes no metric (the churn network lists the metrics it
 * tracked but prints no values), the outcome describes the method instead.
 * Do not fill those gaps with a plausible number.
 *
 * Copy is first person and plain: no em dashes, no slogans.
 */

export type ProjectCategory = "analytics" | "machine-learning";

/** Which illustration `ProjectFigure` draws for this project. */
export type ProjectVisual =
  | "clusters"
  | "schema"
  | "dashboard"
  | "network"
  | "regression"
  | "ensemble"
  | "stages"
  | "bandit";

export type Outcome = {
  value: string;
  label: string;
  source?: string;
};

export type Project = {
  /** Two-digit ordinal. Also the anchor: `#project-01`. */
  number: string;
  repo: string;
  title: string;
  /** One or two sentences: what the project is and why it exists. */
  thesis: string;
  discipline: string;
  category: ProjectCategory;
  year: string;
  stack: string[];
  problem: string;
  /** Ordered, so it reads as a method rather than a feature list. */
  approach: string[];
  outcomes: Outcome[];
  visual: ProjectVisual;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    repo: "segmentation-project",
    title: "Hotel customer segmentation",
    thesis: "Which hotel guests behave differently, and how could the hotel tell them apart?",
    discipline: "Clustering",
    category: "analytics",
    year: "2025",
    stack: ["Python", "pandas", "scikit-learn", "K-Means", "DBSCAN", "HDBSCAN", "PCA", "t-SNE"],
    problem:
      "The hotel had 83,590 customer records, and a lot of them needed work before they were useful. Some columns were hashed IDs, revenue was split across two channels, and a field called DaysSinceCreation was really measuring how long someone had been a customer.",
    approach: [
      "I dropped the ID, NameHash and DocIDHash columns. They say nothing about how a guest behaves, and keeping them would have grouped people by identity instead of behaviour.",
      "I explored revenue, lead time, cancellations, no-shows and special requests before deciding which features to use.",
      "I clustered the data three ways. K-Means gave me compact groups, and DBSCAN and HDBSCAN picked up the unusual stay lengths and big spenders that averages hide.",
      "I used PCA and t-SNE to plot the groups in two dimensions, so I could actually see them and sanity-check them.",
      "I wrote up each group as a customer profile, with a suggestion for how the hotel could look after it.",
    ],
    outcomes: [
      { value: "83,590", label: "records cleaned and analysed", source: "HotelCustomersDataset.xlsx" },
      { value: "3", label: "clustering methods compared" },
      { value: "2", label: "ways of plotting the groups" },
    ],
    visual: "clusters",
  },
  {
    number: "02",
    repo: "sql-analysis",
    title: "Booking and retail databases in SQL",
    thesis: "Two MySQL databases that keep their own data clean, plus the queries I used to analyse them.",
    discipline: "SQL · Database design",
    category: "analytics",
    year: "2025",
    stack: ["MySQL", "Triggers", "Stored procedures", "CTEs", "Window functions"],
    problem:
      "If a booking database has mistakes in it, every report built on top of it has the same mistakes. Ages go out of date, a changed passenger ID leaves other tables pointing at nothing, and one duplicated employee can double a headcount.",
    approach: [
      "For the train booking system I built three linked tables, with triggers that work out each passenger's age from their date of birth and update IDs everywhere when they change.",
      "I added a five-character rule for Passenger_id and proper foreign keys, so bad rows can't get in at all.",
      "I made backup tables and an EMPTY_DATA() procedure, so I could reset a test run with one call.",
      "For the retail store data I ranked stores and employees, averaged sales by product, and matched up staff records using joins and DISTINCT.",
      "I removed duplicate employees directly in the table instead of copying the clean rows into a second one.",
    ],
    outcomes: [
      { value: "2", label: "databases designed from scratch" },
      { value: "5+", label: "triggers and stored procedures" },
    ],
    visual: "schema",
  },
  {
    number: "03",
    repo: "professional-power-bi-dashboard",
    title: "Customer churn dashboard",
    thesis: "A Power BI report that shows not just how many customers left, but who they were and where they were.",
    discipline: "Business intelligence",
    category: "analytics",
    year: "2025",
    stack: ["Power BI", "Power BI Service", "DAX"],
    problem:
      "A single churn number doesn't tell a manager much. They need to know which customers left, where they were and what they had in common. Without that, the report gets a nod in a meeting and is never opened again.",
    approach: [
      "I used a public churn dataset from Kaggle, so anyone can check my numbers against the source.",
      "I showed churn over time rather than as one figure, so there's always something to compare against.",
      "I broke the rate down by demographics, subscription plan and geography to see where it was highest.",
      "I kept every chart cross-filterable and exportable, so people can dig into it themselves.",
    ],
    outcomes: [
      { value: "6", label: "views in one report" },
      { value: "3", label: "breakdowns: demographics, plan, geography" },
    ],
    visual: "dashboard",
  },
  {
    number: "04",
    repo: "alzheimer-disease-detection",
    title: "Alzheimer's stage classifier",
    thesis: "It reads an MRI scan and places it in one of four stages of Alzheimer's, instead of just saying yes or no.",
    discipline: "Computer vision · CNN",
    category: "machine-learning",
    year: "2025",
    stack: ["Python", "PyTorch", "CNN", "Streamlit"],
    problem:
      "Most image classifiers only say whether something is there or not. With dementia that isn't very helpful, because catching it early matters most, and a plain yes or no can't show what stage someone is at.",
    approach: [
      "I trained the model to tell four stages apart: non-demented, very mild, mild and moderate.",
      "I built a convolutional neural network and trained it on the Well-Documented Alzheimer's Dataset from Kaggle.",
      "I published the model under an MIT licence and put it online, so anyone can try it on a real scan.",
    ],
    outcomes: [
      { value: "99.21%", label: "validation accuracy", source: "README" },
      { value: "99%", label: "test accuracy", source: "README" },
      { value: "4", label: "stages it can tell apart" },
    ],
    visual: "stages",
    liveUrl: "https://alzheimerpredictioncnn-naeem.streamlit.app/",
  },
  {
    number: "05",
    repo: "customer-churn-prediction",
    title: "Telecom churn prediction",
    thesis: "Most customers don't leave, so a model can look accurate while missing the ones who do. I built this one to catch them.",
    discipline: "Deep learning · Classification",
    category: "machine-learning",
    year: "2024",
    stack: ["Python", "PyTorch", "scikit-learn", "SMOTE"],
    problem:
      "Telecom churn data is very unbalanced. A model can get a high accuracy score just by predicting that nobody leaves, and learn nothing useful about the customers who actually do.",
    approach: [
      "I explored the data first, using count plots and density plots to see how each column was spread.",
      "I encoded the categorical columns and scaled the numeric ones, so no single feature dominated training.",
      "I used SMOTE to create more examples of customers who churned, so the model had enough of them to learn from.",
      "I built a neural network in PyTorch and judged it on accuracy, precision, recall, F1 and AUC together, not accuracy alone.",
    ],
    outcomes: [
      { value: "SMOTE", label: "used to balance the training data" },
      { value: "5", label: "metrics used to judge the model" },
    ],
    visual: "network",
  },
  {
    number: "06",
    repo: "spam-email-detection-system",
    title: "Explainable spam detection",
    thesis: "A spam filter that tells you why it flagged an email, so people can actually trust it.",
    discipline: "Classification · Ensemble",
    category: "machine-learning",
    year: "2025",
    stack: ["Python", "scikit-learn", "Naive Bayes", "Logistic Regression", "SVM", "Streamlit"],
    problem:
      "When a real email gets marked as spam with no explanation, people tend to loosen the filter. That's exactly when the dangerous phishing emails start slipping through.",
    approach: [
      "I combined three models (Naive Bayes, Logistic Regression and SVM), so no single model's blind spots decide the result.",
      "I engineered more than fifteen features beyond the text itself, like word and character counts, links and domains, urgent or money-related words, HTML structure and punctuation.",
      "I added a confidence score, so borderline emails can go to a person instead of being decided by a hard cutoff.",
      "Every prediction comes with a reason in plain English, and the whole thing runs in a Streamlit app that keeps track of its own performance.",
    ],
    outcomes: [
      { value: "96-97%", label: "accuracy on test data", source: "README: “~96-97% on test data”" },
      { value: "3", label: "models voting together" },
      { value: "15+", label: "engineered features" },
    ],
    visual: "ensemble",
  },
  {
    number: "07",
    repo: "RL-by-hand",
    title: "Multi-armed bandits, by hand",
    thesis: "I wrote eight bandit algorithms from scratch and tested how they cope when the rewards keep changing.",
    discipline: "Reinforcement learning",
    category: "machine-learning",
    year: "2026",
    stack: ["Python", "NumPy", "pytest", "ruff", "uv"],
    problem:
      "Bandit algorithms are usually tested in settings that never change, where careful strategies look clever. I wanted to see what happens when the rewards drift over time, because that's what real systems have to deal with.",
    approach: [
      "I implemented eight strategies myself: epsilon-greedy, UCB, KL-UCB, variance-aware UCB, Beta-Bernoulli and normal Thompson sampling, forgetting Thompson sampling, and sliding-window UCB.",
      "I built test environments where the rewards drift at two different speeds, plus steady ones to compare against.",
      "I wrote one shared evaluation setup with paired statistics, so every algorithm is tested under exactly the same conditions.",
      "I made the whole study reproducible, with pytest and ruff checking the code on every change.",
    ],
    outcomes: [
      { value: "8", label: "algorithms written from scratch" },
      { value: "4", label: "test environments, 2 of them drifting" },
    ],
    visual: "bandit",
  },
];

export const projectAnchor = (number: string) => `project-${number}`;

export const projectHref = (repo: string) => githubRepoUrl(repo);

export function projectByNumber(number: string): Project {
  const project = projects.find((p) => p.number === number);
  if (!project) throw new Error(`No project numbered ${number}`);
  return project;
}
