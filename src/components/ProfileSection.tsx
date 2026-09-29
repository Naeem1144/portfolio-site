import { Fragment } from "react";
import { site } from "@/lib/site";

/**
 * Why to trust the work: where the thinking comes from, what he is looking
 * for, and the three habits that show up in every project.
 */
export function ProfileSection() {
  const english = site.languages.find((language) => language.name === "English")!;

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
              Now I&apos;m looking for my first data role, ideally somewhere people
              actually use the analysis to decide.
            </p>
          </div>
        </div>

        <dl className="facts" aria-label="At a glance">
          <div>
            <dt>Looking for</dt>
            <dd>Data analyst and marketing analytics roles</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{site.location}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{site.tools.join(", ")}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>
              {site.languages.map((language) => language.name).join(", ")}
              <span>English: {english.level}</span>
            </dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>
              {site.experience.map((job) => (
                <Fragment key={`${job.org}-${job.role}`}>
                  {job.role}, {job.org}
                  <span>{job.years}</span>
                </Fragment>
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
          {site.strengths.map((strength) => (
            <li key={strength.title}>
              <h4>{strength.title}</h4>
              <p>{strength.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
