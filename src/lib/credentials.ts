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
  href: string;
  linkKind: "credential" | "issuer";
  credentialId?: string;
};

export const credentials: Credential[] = [
  {
    title: "Google Data Analytics",
    detail: "Professional Certificate",
    issuer: "Google · Coursera",
    date: "Sep 2025",
    href: "https://www.coursera.org/professional-certificates/google-data-analytics",
    linkKind: "issuer",
  },
  {
    title: "Data Science, ML, DL & NLP Bootcamp",
    detail: "Complete course certificate",
    issuer: "Udemy",
    date: "2025",
    href: "https://www.udemy.com/certificate/UC-d8be2692-b47c-437e-9422-11520e426ae8/",
    linkKind: "credential",
    credentialId: "UC-d8be2692-b47c-437e-9422-11520e426ae8",
  },
  {
    title: "Inbound Marketing",
    detail: "Professional certification",
    issuer: "HubSpot Academy",
    date: "Sep 2024",
    href: "https://academy.hubspot.com/courses/inbound-marketing",
    linkKind: "issuer",
  },
  {
    title: "Data Analytics",
    detail: "Classroom training & certification",
    issuer: "TOPS Technologies",
    date: "Oct 2023",
    href: "https://www.tops-int.com/",
    linkKind: "issuer",
  },
];
