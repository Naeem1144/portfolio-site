import { ArrowUpRight } from "lucide-react";
import { projectAnchor, projectByNumber } from "@/lib/projects";
import { site } from "@/lib/site";
import { skillGroups } from "@/lib/skills";

export function ProfileSection() {
  const job = site.experience[0]!;

  return (
    <div className="about">
      <div className="about__head">
        <div>
          <p className="eyebrow">02 / The person behind the projects</p>
          <h2 id="about-heading">Marketing taught me to ask.<br /><em>Data taught me to look closer.</em></h2>
          <div className="prose about__prose">
            <p>
              I studied marketing at {site.education.school} in Toronto, and
              I&rsquo;ve always loved the point where business questions meet
              data. Marketing taught me to ask what a decision really needs
              before I reach for a chart.
            </p>
            <p>
              I taught myself the technical side along the way: SQL, Python,
              Power BI and machine learning. That turned into four
              certificates and the eight projects above, all while I was
              working at {job.org} in Canada. Now I&rsquo;m looking for my
              first data role, ideally somewhere people actually use the
              dashboards to make decisions.
            </p>
          </div>
          <a
            href={site.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="button about__resume"
          >
            Download résumé <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>

        <dl className="facts" aria-label="At a glance">
          <div>
            <dt>Looking for</dt>
            <dd>Junior data analyst, data scientist or marketing analytics roles</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{site.location}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>
              <a href="#credentials">{site.education.short}</a>
              <span>
                {site.education.school}, {site.education.graduated}
              </span>
            </dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>
              {job.role}, {job.org}
              <span>{job.place} · {job.years}</span>
            </dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>
              {site.languages.map((language) => language.name).join(", ")}
              <span>English at C1 (IELTS {site.ielts.score})</span>
            </dd>
          </div>
        </dl>
      </div>

      <section className="strengths" aria-labelledby="strengths-heading">
        <h3 id="strengths-heading" className="about__subhead">
          What I bring to a team
        </h3>
        <ol>
          {site.strengths.map((strength, index) => (
            <li key={strength.title}>
              <span className="strengths__index num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4>{strength.title}</h4>
              <p>{strength.body}</p>
              <p className="strengths__evidence">{strength.evidence}</p>
            </li>
          ))}
        </ol>
      </section>

      <details className="skills skills-disclosure">
        <summary><span>My toolkit, with the work to back it up</span><span aria-hidden="true">+</span></summary>
        <div className="skills__head">
          <h3 id="skills-heading" className="about__subhead">
            Skills
          </h3>
          <p>Click a number to see the project where I used that skill.</p>
        </div>
        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div className="skills__group" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.skills.map((skill) => (
                  <li className="skill" key={skill.name}>
                    <span className="skill__name">{skill.name}</span>
                    <span className="skill__evidence">
                      {skill.projects ? (
                        skill.projects.map((number) => (
                          <a
                            key={number}
                            href={`#${projectAnchor(number)}`}
                            className="chip"
                            title={projectByNumber(number).title}
                            aria-label={`Project ${number}: ${projectByNumber(number).title}`}
                          >
                            {number}
                          </a>
                        ))
                      ) : (
                        <span className="skill__via">{skill.via}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
