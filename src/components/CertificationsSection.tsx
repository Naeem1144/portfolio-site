import { Award } from "lucide-react";

const certifications = [
  {
    title: "Google Data Analytics",
    detail: "Professional Certificate",
    issuer: "Google / Coursera",
    year: "2025",
    mark: "G",
    description:
      "Data lifecycle, analysis, visualization, SQL, spreadsheets, and Tableau.",
  },
  {
    title: "Inbound Marketing",
    detail: "Professional Certification",
    issuer: "HubSpot Academy",
    year: "2024",
    mark: "H",
    description:
      "Content strategy and a data-driven approach to the marketing funnel.",
  },
  {
    title: "Data Analytics",
    detail: "Classroom Training & Certification",
    issuer: "TOPS Technologies",
    year: "2023",
    mark: "T",
    description:
      "Python, statistics, Excel, Tableau, SQL, and project development.",
  },
];

export function CertificationsSection() {
  return (
    <div className="credentials-layout">
      <div>
        <span className="eyebrow">04 / CREDENTIALS</span>
        <h2>
          Study, then
          <br />
          <em>build.</em>
        </h2>
        <p>Structured learning, applied through projects.</p>
        <Award size={48} strokeWidth={0.8} className="credential-decoration" />
      </div>
      <div className="credentials-list">
        {certifications.map((cert) => (
          <article key={cert.title} className="credential">
            <div className="credential-mark" aria-hidden="true">
              {cert.mark}
            </div>
            <div>
              <span className="eyebrow">{cert.issuer}</span>
              <h3>{cert.title}</h3>
              <p className="credential-detail">{cert.detail}</p>
              <p>{cert.description}</p>
            </div>
            <span className="credential-year">{cert.year}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
