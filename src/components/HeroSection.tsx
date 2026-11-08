import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { HeroFigure } from "./HeroFigure";
import { Odometer } from "./Odometer";
import { ICON_SIZE, ICON_STROKE } from "@/lib/icon";
import { projectAnchor } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * The finding first: who this is, what he does, what he has proved, and how to
 * reach him. The highlighter marks the outcome; each result carries a
 * footnote to its source, listed at the end of the work.
 */
export function HeroSection() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__copy">
            {site.available && (
              <p className="status hero__enter">
                Open to {site.seeking} · {site.location}
              </p>
            )}
            <h1 id="hero-heading" className="hero__enter">
              Data analyst who turns business questions into{" "}
              <mark className="hl">decisions</mark>.
            </h1>
            <p className="hero__lede hero__enter">
              I studied marketing, then taught myself SQL, Python and Power BI. I find
              the pattern in the data and make it usable.
            </p>
            <div className="hero__actions hero__enter">
              <a href="#contact" className="button button--primary">
                Get in touch
              </a>
              <a
                href={site.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {site.resume.label}
                <ArrowUpRight
                  className="link__icon"
                  size={ICON_SIZE}
                  strokeWidth={ICON_STROKE}
                  aria-hidden="true"
                />
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="hero__figure hero__enter">
            <HeroFigure />
          </div>

          <ul className="keyfigures" aria-label="Headline results">
            {site.proof.map((item, i) => (
              <li key={item.project} style={{ "--i": i } as CSSProperties}>
                <a className="keyfigure" href={`#${projectAnchor(item.project)}`}>
                  <span className="keyfigure__value num">
                    <Odometer value={item.value} />
                    <sup className="keyfigure__note" aria-hidden="true">
                      {i + 1}
                    </sup>
                  </span>
                  <span className="keyfigure__label">{item.label}</span>
                  <span className="sr-only">
                    , see the project. Source listed in Sources at the end of the Work section.
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
