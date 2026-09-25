import { ArrowUpRight, MoveUpRight } from "lucide-react";

export function MoreAboutMeSection() {
  return (
    <>
      <div className="section-kicker">
        <span className="eyebrow">02 / BEHIND THE ANALYSIS</span>
        <span className="eyebrow">BUSINESS CONTEXT. HANDS-ON ANALYSIS.</span>
      </div>
      <div className="about-grid">
        <div className="about-statement">
          <h2>
            The numbers matter.
            <br />
            <em>So do the people.</em>
          </h2>
          <p className="about-lead">That’s where analysis becomes useful.</p>
          <div className="about-signature">
            <span>Naeem.</span>
            <span className="eyebrow">
              BUSINESS &amp; MARKETING GRADUATE.
              <br />
              DATA ANALYST &amp; DATA SCIENTIST.
            </span>
          </div>
        </div>
        <div className="about-copy">
          <p>
            I&rsquo;m Naeem Nagori, a business and marketing graduate from{" "}
            <strong>Seneca Polytechnic in Toronto</strong>, now based in
            Ahmedabad, India.
          </p>
          <p>
            I use SQL, Python, and Power BI to clean data, explore customer
            behavior, and turn it into dashboards, customer segments, and
            predictive models.
          </p>
          <p>
            I also build machine learning and deep learning projects from
            scratch — clustering, churn prediction, CNNs, and reinforcement
            learning — with AI tools like ChatGPT and Claude in the loop.
          </p>
          <p>
            I&rsquo;m seeking a junior data analyst, data scientist, or
            marketing analytics role where thoughtful work can make a
            difference.
          </p>
          <a
            href="/Naeem_Nagori_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open résumé PDF in a new tab"
            className="text-link"
          >
            View résumé <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="journey-strip">
        <div>
          <span className="eyebrow">THE FOUNDATION</span>
          <h3>Business & Marketing</h3>
          <p>Seneca Polytechnic · Ontario College Diploma</p>
          <span className="journey-year">2023 — 2025</span>
        </div>
        <div className="journey-connector" aria-hidden="true">
          <span /> <MoveUpRight size={37} /> <span />
        </div>
        <div>
          <span className="eyebrow">IN PRACTICE</span>
          <h3>Data Science &amp; AI</h3>
          <p>Machine learning · Deep learning · NLP · Power BI</p>
          <span className="journey-year">
            <i /> CURRENT FOCUS
          </span>
        </div>
      </div>
    </>
  );
}
