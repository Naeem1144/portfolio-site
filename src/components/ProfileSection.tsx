import type { CSSProperties } from "react";
import { site } from "@/lib/site";

/**
 * Why to trust the work: where the thinking comes from, what he is looking
 * for, and the three habits that show up in every project.
 */
export function ProfileSection() {
  return (
    <div className="about">
      <div className="split" data-reveal="rise">
        <div>
          <p className="eyebrow">
            <span className="eyebrow__no">02</span>About
          </p>
          <h2 id="about-heading">
            <mark className="hl">Business first.</mark> Data to back it up.
          </h2>
          <div className="prose about__prose">
            <p>
              I studied marketing at {site.education.school} in Toronto. Marketing taught
              me to ask what a decision needs before I reach for a chart.
            </p>
            <p>
              I taught myself SQL, Python, Power BI and machine learning alongside it.
              Now I&apos;m looking for my first full-time data role, ideally somewhere
              people actually use the analysis to decide.
            </p>
          </div>
        </div>

        {/* A heading, not a label: dl is not reliably nameable. */}
        <h3 className="sr-only">At a glance</h3>
        <dl className="facts">
          <div style={{ "--i": 0 } as CSSProperties}>
            <dt>Looking for</dt>
            <dd>{site.seeking}</dd>
          </div>
          <div style={{ "--i": 1 } as CSSProperties}>
            <dt>Based in</dt>
            <dd>{site.location}</dd>
          </div>
          <div style={{ "--i": 2 } as CSSProperties}>
            <dt>Tools</dt>
            <dd>{site.tools.join(", ")}</dd>
          </div>
          <div style={{ "--i": 3 } as CSSProperties}>
            <dt>Languages</dt>
            <dd>
              {site.languages
                .map((language) => `${language.name}: ${language.level}`)
                .join(", ")}
            </dd>
          </div>
          <div style={{ "--i": 4 } as CSSProperties}>
            <dt>Experience</dt>
            <dd>
              {site.experience.map((job) => (
                <div className="facts__item" key={`${job.org}-${job.role}`}>
                  {job.role}, {job.org}
                  <span>
                    {job.years} · {job.detail}
                  </span>
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <section className="subsection" aria-labelledby="practice-heading" data-reveal="rise">
        <h3 id="practice-heading" className="subhead">
          How I work
        </h3>
        <ol className="practice">
          {site.strengths.map((strength, i) => (
            <li key={strength.title} style={{ "--i": i } as CSSProperties}>
              <span className="practice__no num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4>{strength.title}</h4>
              <p>{strength.body}</p>
              <p className="practice__evidence">{strength.evidence}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
