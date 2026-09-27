import { ArrowUpRight } from "lucide-react";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectFigure } from "./ProjectFigures";
import {
  PROJECT_LIST_ID,
  filterCounts,
  projectAnchor,
  projectHref,
  projects,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Selected work.
 *
 * A server component; only the filter ships to the browser. Each project shows
 * what a reviewer scans for (the question, the result, the stack, the code)
 * and keeps the method behind a native `<details>`, so the list stays short
 * without hiding anything from search engines or assistive tech.
 */
export function ProjectsSection() {
  return (
    <>
      <header className="section-head">
        <div>
          <p className="eyebrow">01 / A few questions I followed</p>
          <h2 id="work-heading">Less guesswork.<br /><em>More understanding.</em></h2>
          <p>
            {filterCounts.all} projects across analytics and machine learning.
            Start with the hotel study: it&rsquo;s where my interest in people
            meets my work with data. Explore the methods and code in each project.
          </p>
        </div>
        <ProjectFilter />
      </header>

      <ol className="projects" id={PROJECT_LIST_ID} data-filter="all">
        {projects.map((project) => (
          <ProjectItem key={project.repo} project={project} />
        ))}
      </ol>

      <p className="projects__more">
        <a
          href={site.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          More on GitHub <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const sourced = project.outcomes.filter((outcome) => outcome.source);

  return (
    <li
      id={projectAnchor(project.number)}
      className={`project${project.number === "01" ? " project--featured" : ""}`}
      data-category={project.category}
    >
      <div className="project__figure">
        <div className="project__cover-label"><span>{project.number === "01" ? "Featured study" : project.discipline}</span><span>{project.number} / 08</span></div>
        <ProjectFigure visual={project.visual} />
      </div>

      <article className="project__body" aria-labelledby={`${projectAnchor(project.number)}-title`}>
        <p className="project__meta">
          <span className="project__number">{project.number}</span>
          <span>{project.discipline}</span>
          <span>{project.year}</span>
        </p>

        <h3 id={`${projectAnchor(project.number)}-title`} className="project__title">
          {project.title}
        </h3>
        <p className="project__thesis">{project.thesis}</p>

        <dl className="stats">
          {project.outcomes.map((outcome) => (
            <div className="stat" key={outcome.label}>
              <dt>{outcome.label}</dt>
              <dd>{outcome.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="tags" aria-label="Tools and techniques">
          {project.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>

        <div className="project__links">
          <a
            href={projectHref(project.repo)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Code <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Live demo <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>

        <details className="notes">
          <summary>
            <span>Inside the project</span>
            <span className="notes__hint">Problem, method{sourced.length > 0 && ", sources"}</span>
          </summary>
          <div className="notes__body">
            <h4>Problem</h4>
            <p>{project.problem}</p>
            <h4>Method</h4>
            <ol className="notes__steps">
              {project.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {sourced.length > 0 && (
              <>
                <h4>Sources</h4>
                <ul className="notes__sources">
                  {sourced.map((outcome) => (
                    <li key={outcome.label}>
                      <span className="num">{outcome.value}</span>: {outcome.source}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </details>
      </article>
    </li>
  );
}
