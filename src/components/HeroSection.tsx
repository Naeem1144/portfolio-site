import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SignalSculpture } from "./SignalSculpture";

export function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-topline">
          <span className="eyebrow">
            ANALYTICAL THINKING. HUMAN PERSPECTIVE.
          </span>
          <span className="availability">
            <i />
            Open to opportunities
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-intro">
              <span className="tiny-cross">+</span> HELLO, I’M NAEEM
            </div>
            <h1>
              Making data
              <br />
              <em>mean more.</em>
              <span className="heading-period" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p>
              I connect <strong>data and people</strong>—turning complex
              information into clear insights and better decisions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="button button-dark">
                Explore my work <ArrowDown size={18} />
              </a>
              <a href="#contact" className="text-link">
                Let’s talk <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <SignalSculpture />
        </div>
        <div className="hero-bottom">
          <span className="eyebrow">
            BASED IN AHMEDABAD, INDIA <span className="location-cross">↗</span>
          </span>
          <span className="hero-discipline">
            Data analytics <span>/</span> Customer insights <span>/</span>{" "}
            Business intelligence
          </span>
          <a
            href="#projects"
            className="scroll-cue"
            aria-label="Scroll to selected work"
          >
            <ArrowDown size={17} />
          </a>
        </div>
      </div>
      <div className="tool-ribbon">
        <div className="container ribbon-inner">
          <span className="eyebrow">TOOLS I USE</span>
          <div>
            <span>SQL</span>
            <i>✳</i>
            <span>Python</span>
            <i>✳</i>
            <span>Power BI</span>
            <i>✳</i>
            <span>Excel</span>
            <i>✳</i>
            <span>scikit-learn</span>
          </div>
        </div>
      </div>
    </section>
  );
}
