import { ArrowUpRight } from "lucide-react";
import { credentials } from "@/lib/credentials";
import { site } from "@/lib/site";

/**
 * Education and certificates as one list. The link says what it really opens:
 * a personal certificate can be verified, a programme page can only be viewed.
 */
export function CredentialsSection() {
  const { education } = site;

  return (
    <section className="subsection" aria-labelledby="credentials-heading" data-reveal="rise">
      <h3 id="credentials-heading" className="subhead">
        Education &amp; certifications
      </h3>
      <ol className="credentials">
        <li>
          <div>
            <p className="credentials__title">
              {education.programme}, {education.major}
            </p>
            <p className="credentials__issuer">
              {education.school}, {education.place} · {education.award}
            </p>
          </div>
          <span className="credentials__date num">{education.graduated}</span>
          <span />
        </li>

        {credentials.map((cert) => (
          <li key={cert.title}>
            <div>
              <p className="credentials__title">{cert.title}</p>
              <p className="credentials__issuer">{cert.issuer}</p>
            </div>
            <span className="credentials__date num">{cert.date}</span>
            <a
              className="link credentials__action"
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cert.linkKind === "credential" ? "Verify" : "View programme"}
              <ArrowUpRight className="link__icon" size={14} aria-hidden="true" />
              <span className="sr-only"> for {cert.title} (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
