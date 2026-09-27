/**
 * Certifications.
 *
 * Each entry links out so a reviewer can check the claim. `linkKind`
 * separates a per-person verification URL from an issuer landing page, so the
 * UI can label them honestly instead of implying every entry opens a
 * certificate. Dates follow the résumé.
 */

export type Credential = {
  title: string;
  detail: string;
  issuer: string;
  date: string;
  /** What the programme covered, in a few words each. */
  covers: string[];
  href: string;
  linkKind: "credential" | "issuer";
  credentialId?: string;
  /** Accessible text for the outbound link. */
  linkLabel: string;
};

export const credentials: Credential[] = [
  {
    title: "Google Data Analytics",
    detail: "Professional Certificate",
    issuer: "Google · Coursera",
    date: "Sep 2025",
    covers: ["Data lifecycle", "SQL", "Spreadsheets", "Tableau", "Visualisation"],
    href: "https://www.coursera.org/professional-certificates/google-data-analytics",
    linkKind: "issuer",
    linkLabel: "View the Google Data Analytics programme",
  },
  {
    title: "Data Science, ML, DL & NLP Bootcamp",
    detail: "Complete course certificate",
    issuer: "Udemy",
    date: "2025",
    covers: ["Machine learning", "Deep learning", "NLP", "Tableau"],
    href: "https://www.udemy.com/certificate/UC-d8be2692-b47c-437e-9422-11520e426ae8/",
    linkKind: "credential",
    credentialId: "UC-d8be2692-b47c-437e-9422-11520e426ae8",
    linkLabel: "Verify this Udemy certificate",
  },
  {
    title: "Inbound Marketing",
    detail: "Professional certification",
    issuer: "HubSpot Academy",
    date: "Sep 2024",
    covers: ["Content strategy", "Marketing funnel", "Data-driven marketing"],
    href: "https://academy.hubspot.com/courses/inbound-marketing",
    linkKind: "issuer",
    linkLabel: "View the HubSpot Inbound Marketing course",
  },
  {
    title: "Data Analytics",
    detail: "Classroom training & certification",
    issuer: "TOPS Technologies",
    date: "Oct 2023",
    covers: ["Python", "Statistics", "Excel", "SQL", "Tableau"],
    href: "https://www.tops.edu.in/",
    linkKind: "issuer",
    linkLabel: "Visit TOPS Technologies",
  },
];
