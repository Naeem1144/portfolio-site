import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SignalSculpture } from "./SignalSculpture";

const tools = [
  "SQL",
  "Python",
  "Power BI",
  "Excel",
  "Tableau",
  "DAX",
  "Data modeling",
  "ETL",
  "KPI reporting",
  "Data storytelling",
  "Data analysis",
  "Statistics",
  "A/B testing",
  "pandas",
  "NumPy",
  "scikit-learn",
  "Matplotlib",
  "Seaborn",
  "Jupyter",
  "Git",
  "Deep learning",
  "NLP",
  "Computer vision",
  "Reinforcement learning",
  "ChatGPT",
  "Claude",
  "GitHub Copilot",
  "Google Analytics",
  "Google Ads",
  "SEO",
  "Email marketing",
  "CRM",
  "Marketing analytics",
];

export function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-topline">
          <span className="eyebrow">
            ANALYTICAL THINKING. HUMAN PERSPECTIVE.
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
              information into clear dashboards, useful models, and better
              decisions.
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
            Data analytics <span>/</span> Data science <span>/</span> Business
            intelligence <span>/</span> Marketing analytics
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
          <div className="ribbon-strip">
            <div className="ribbon-track">
              {[false, true].map((isClone) => (
                <div
                  className="ribbon-group"
                  key={String(isClone)}
                  aria-hidden={isClone || undefined}
                >
                  {tools.map((tool) => (
                    <span key={tool}>
                      {tool}
                      <i aria-hidden="true">✳</i>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
