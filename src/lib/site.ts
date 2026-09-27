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
  available: true,
  social: {
    github: `https://github.com/${GITHUB_USER}`,
    linkedin: "https://www.linkedin.com/in/naeemnagori/",
  },
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
    /** Customer-facing projects where the marketing training does the framing. */
    appliedIn: ["01", "03", "04"],
  },
  schooling: {
    school: "M.S. Public Higher Secondary School",
    programme: "Higher secondary, Commerce",
    years: "2021 to 2022",
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
  ielts: {
    score: "8.0",
    scale: "/ 9",
    level: "CEFR C1",
    test: "IELTS General Training",
    date: "Jun 2025",
  },
  languages: [
    { name: "English", level: "C1 · IELTS 8.0" },
    { name: "Hindi", level: "Native" },
    { name: "Gujarati", level: "Native" },
  ],
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
      evidence: "8 projects, Google Data Analytics",
    },
    {
      title: "I'm easy to work with",
      body: "I speak and write English fluently, and I spent over a year working shifts in a busy team at Tim Hortons in Canada. I turn up, I get things done, and I can explain what I did.",
      evidence: "IELTS 8.0, Tim Hortons 2025 to 2026",
    },
  ],
  /**
   * Social card figures. Each is quoted from the linked project's repository:
   * the row count of HotelCustomersDataset.xlsx, the GTA Gradient Boosting
   * test R², the CNN's validation accuracy, and the bandit strategy count.
   */
  proof: [
    { value: "83,590", label: "hotel customer records sorted into groups", project: "01" },
    { value: "0.990", label: "R² when predicting Toronto-area house prices", project: "05" },
    { value: "99.21%", label: "validation accuracy staging Alzheimer's from MRI scans", project: "07" },
    { value: "8", label: "bandit algorithms I wrote from scratch", project: "08" },
  ],
} as const;

/** Deep link for a repository on the owner's GitHub profile. */
export function githubRepoUrl(repo: string): string {
  return `https://github.com/${GITHUB_USER}/${repo}`;
}
