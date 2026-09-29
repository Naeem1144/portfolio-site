/**
 * Single source of truth for personal and brand data. The header, hero,
 * profile, contact section, footer, JSON-LD and social card all read from here.
 */

export const GITHUB_USER = "Naeem1144";

export const site = {
  name: "Naeem Nagori",
  initials: "nn",
  role: "Data Analyst & Data Scientist",
  seeking: "junior data analyst, data scientist or marketing analytics",
  email: "aknaeem246@gmail.com",
  location: "Ahmedabad, India",
  timeZone: { id: "Asia/Kolkata", city: "Ahmedabad", label: "IST, UTC+5:30" },
  available: true,
  social: {
    github: `https://github.com/${GITHUB_USER}`,
    linkedin: "https://www.linkedin.com/in/naeemnagori/",
  },
  /**
   * Public repositories on GitHub. The page writes up eight of them; the rest
   * are only on the profile, so counts that point at GitHub use this figure.
   */
  githubRepos: 16,
  resume: {
    href: "/Naeem_Nagori_Resume.pdf",
    label: "Résumé",
  },
  copyrightStart: 2023,
  education: {
    school: "Seneca Polytechnic",
    place: "Toronto, Canada",
    programme: "Business Administration",
    major: "Marketing",
    award: "Ontario College Diploma",
    short: "Marketing diploma",
    length: "Two-year programme",
    years: "Jan 2023 to Apr 2025",
    graduated: "2025",
  },
  experience: [
    {
      role: "Team Member",
      org: "Tim Hortons",
      place: "Canada",
      years: "Jul 2025 to Aug 2026",
      detail: "Baking and store operations as part of a busy team.",
    },
  ],
  languages: [
    { name: "English", level: "C1 · IELTS 8.0" },
    { name: "Hindi", level: "Native" },
    { name: "Gujarati", level: "Native" },
  ],
  /** Only tools a project or certificate on this page actually shows. */
  tools: ["SQL", "Python", "Power BI", "Excel", "scikit-learn", "PyTorch"],
  /** The pitch: each claim names the evidence behind it. */
  strengths: [
    {
      title: "I think about the business first",
      body: "My diploma is in marketing, so before I touch the data I want to know who the customer is and what decision the numbers are meant to help with.",
      evidence: "Seneca diploma, HubSpot Inbound Marketing",
    },
    {
      title: "I can do the whole job",
      body: "I can take a messy spreadsheet all the way to a clean dataset, a SQL database, a Power BI report or a trained model. All of my code is on GitHub if you'd like to look.",
      evidence: "16 projects, Google Data Analytics",
    },
    {
      title: "I'm easy to work with",
      body: "I speak and write English fluently, and I spent over a year working shifts in a busy team at Tim Hortons in Canada. I turn up, I get things done, and I can explain what I did.",
      evidence: "IELTS 8.0, Tim Hortons 2025 to 2026",
    },
  ],
  /**
   * The three headline results, shown in the hero and on the social card. Each
   * is quoted from the linked project's repository (the row count of
   * HotelCustomersDataset.xlsx, the GTA Gradient Boosting test R², the CNN's
   * validation accuracy) and links to that project on the page.
   */
  proof: [
    {
      value: "83,590",
      label: "hotel customers grouped by behaviour",
      project: "01",
      source: "Row count of HotelCustomersDataset.xlsx, the dataset in the segmentation repository.",
    },
    {
      value: "0.990",
      label: "R² predicting Toronto-area house prices",
      project: "05",
      source: "Gradient Boosting on the held-out test set, 0.9898, as reported in the project repository.",
    },
    {
      value: "99.21%",
      label: "validation accuracy on Alzheimer's MRI stages",
      project: "07",
      source: "Validation accuracy of the CNN, as reported in the project README. Test accuracy was 99%.",
    },
  ],
} as const;

/** Deep link for a repository on the owner's GitHub profile. */
export function githubRepoUrl(repo: string): string {
  return `https://github.com/${GITHUB_USER}/${repo}`;
}
