import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { credentials } from "@/lib/credentials";
import { projectAnchor, projectByNumber } from "@/lib/projects";
import { site } from "@/lib/site";

export function CredentialsSection() {
  const { education, schooling, ielts } = site;

  return (
    <>
      <header className="section-head">
        <div>
          <h2 id="credentials-heading">Education &amp; certifications</h2>
          <p>
            My diploma taught me how businesses think, and these{" "}
            {credentials.length} certificates taught me the technical tools.
            You can check each one on the issuer&rsquo;s site.
          </p>
        </div>
      </header>

      <div className="edu">
        <article className="edu__main" aria-labelledby="edu-title">
          <p className="edu__kicker">
            <span>Diploma</span>
            <span className="num">{education.years}</span>
          </p>
          <h3 id="edu-title" className="edu__title">
            {education.programme}
            <em>{education.major}</em>
          </h3>
          <p className="edu__award">
            {education.award}, {education.school}
            <span>
              {education.place} · {education.length}
            </span>
          </p>

          <div className="edu__applied">
            <h4 className="label">Projects where I used what I learned</h4>
            <ul>
              {education.appliedIn.map((number) => (
                <li key={number}>
                  <a href={`#${projectAnchor(number)}`}>
                    <span className="num">{number}</span>
                    {projectByNumber(number).title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <dl className="edu__side">
          <div>
            <dt className="label">English</dt>
            <dd>
              <span className="edu__score num">
                {ielts.score}
                <span>{ielts.scale}</span>
              </span>
              <span className="edu__what">{ielts.test}</span>
              <span className="edu__note">
                {ielts.level} · {ielts.date}
              </span>
            </dd>
          </div>
          <div>
            <dt className="label">School</dt>
            <dd>
              <span className="edu__what">{schooling.programme}</span>
              <span className="edu__note">
                {schooling.school} · {schooling.years}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <section className="certs" aria-labelledby="certs-heading">
        <h3 id="certs-heading" className="about__subhead">
          Certificates
        </h3>
        <ol className="certs__list">
          {credentials.map((cert) => (
            <li className="cert" key={cert.title}>
              <p className="cert__date num">{cert.date}</p>
              <div className="cert__body">
                <h4 className="cert__title">{cert.title}</h4>
                <p className="cert__issuer">
                  {cert.detail}, {cert.issuer}
                </p>
              </div>
              <p className="cert__covers">
                <span className="sr-only">Covered: </span>
                {cert.covers.join(", ")}
              </p>
              <a
                className="text-link text-link--small cert__link"
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cert.linkKind === "credential" ? (
                  <>
                    <BadgeCheck size={14} aria-hidden="true" /> Verify
                  </>
                ) : (
                  "Course page"
                )}
                <ArrowUpRight size={13} aria-hidden="true" />
                <span className="sr-only">, {cert.linkLabel} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
