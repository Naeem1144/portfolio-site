import { ArrowUpRight, Github } from "lucide-react";
import type { CSSProperties } from "react";
import { Odometer } from "./Odometer";
import { ProjectFigure } from "./ProjectFigures";
import {
  projectAnchor,
  projectByNumber,
  projectHref,
  type Project,
} from "@/lib/projects";
import { ICON_SIZE, ICON_STROKE } from "@/lib/icon";
import { site } from "@/lib/site";

/**
 * The evidence: four projects, one pattern each.
 *
 * A hiring manager decides in 30 seconds, so each project shows the drawing,
 * the question, two results and the code. The method is one click down, the
 * sources of the headline numbers close the section, and the other projects
 * live on GitHub.
 */

const SELECTED = ["01", "02", "03", "04"];

export function ProjectsSection() {
  const selected = SELECTED.map((number) => projectByNumber(number));

  return (
    <>
      <header className="section-head" data-reveal="rise">
        <p className="eyebrow">
          <span className="eyebrow__no">01</span>Work
        </p>
        <h2 id="work-heading">
          Four projects, from question to <mark className="hl">result</mark>.
        </h2>
        <p className="section-head__note">
          Four of sixteen, written up here. Each one shows the question, the result and the
          code behind it. The rest are on GitHub.
        </p>
      </header>

      <ol className="projects">
        {selected.map((project, i) => (
          <ProjectItem
            key={project.repo}
            project={project}
            figure={i + 2}
            defaultOpen={i === 0}
          />
        ))}
      </ol>

      <div className="projects__foot" data-reveal="rise">
        <section className="sources" aria-labelledby="sources-heading">
          <h3 id="sources-heading" className="subhead">
            Sources
          </h3>
          <ol className="sources__list">
            {site.proof.map((item, i) => (
              <li key={item.project} style={{ "--i": i } as CSSProperties}>
                <span className="sources__no num" aria-hidden="true">
                  {i + 1}
                </span>
                <p>
                  <span className="sr-only">Source {i + 1}: </span>
                  <span className="num">{item.value}</span> {item.label}.{" "}
                  <span className="sources__detail">{item.source}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <p className="projects__more">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary"
          >
            <Github
              className="button__glyph"
              size={ICON_SIZE}
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
            />
            <span>
              All <span className="num">{site.githubRepos}</span> projects on GitHub
            </span>
            <ArrowUpRight
              className="button__icon"
              size={ICON_SIZE}
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </>
  );
}

function ProjectItem({
  project,
  figure,
  defaultOpen = false,
}: {
  project: Project;
  figure: number;
  defaultOpen?: boolean;
}) {
  const anchor = projectAnchor(project.number);
  const outcomes = project.outcomes.slice(0, 2);

  return (
    <li id={anchor} className="project" data-reveal="rise">
      <div className="project__figure">
        <ProjectFigure visual={project.visual} number={figure} />
      </div>

      <article className="project__body" aria-labelledby={`${anchor}-title`}>
        <div className="project__head">
          <p className="project__index" aria-hidden="true">
            <span className="project__no">{project.number}</span>
            <span className="project__of">/ {String(SELECTED.length).padStart(2, "0")}</span>
          </p>
          <p className="project__meta">
            {project.discipline} · {project.year}
          </p>
        </div>
        <h3 id={`${anchor}-title`} className="project__title">
          {project.title}
        </h3>
        <p className="project__thesis">{project.thesis}</p>
        <p className="project__stack">
          <span aria-hidden="true">{project.stack.join(" · ")}</span>
          <span className="sr-only">Technical stack: {project.stack.join(", ")}</span>
        </p>

        <dl className="stats">
          {outcomes.map((outcome) => (
            <div className="stat" key={outcome.label}>
              <dt>{outcome.label}</dt>
              <dd>
                <Odometer value={outcome.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="project__links">
          <a
            href={projectHref(project.repo)}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Code
            <ArrowUpRight
              className="link__icon"
              size={ICON_SIZE}
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
            />
            <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Live demo
              <ArrowUpRight
                className="link__icon"
                size={ICON_SIZE}
                strokeWidth={ICON_STROKE}
                aria-hidden="true"
              />
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>

        <details className="method" open={defaultOpen}>
          <summary>
            <span>How I did it</span>
            <span className="method__count num" aria-hidden="true">
              {project.approach.length} steps
            </span>
          </summary>
          <div className="method__body">
            <div>
              <h4>Problem</h4>
              <p>{project.problem}</p>
            </div>
            <div>
              <h4>Method</h4>
              <ol className="method__steps">
                {project.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </details>
      </article>
    </li>
  );
}
