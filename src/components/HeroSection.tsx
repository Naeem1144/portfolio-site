import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroFigure } from "./HeroFigure";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__eyebrow">
          <p className="eyebrow">Naeem Nagori · Data analyst & curious mind</p>
          <p className="hero__status"><span className="status-dot" aria-hidden="true" />{site.available ? "Open to opportunities" : site.location}</p>
        </div>
        <div className="hero__grid">
          <div className="hero__main">
            <h1 id="hero-heading">Curiosity first.<br /><em>Clarity follows.</em></h1>
            <p className="hero__lede">I&rsquo;m Naeem. I bring a marketing mind to data: asking better questions, finding the patterns, and making the answer useful.</p>
            <div className="hero__actions">
              <a href="#projects" className="button button--primary">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
              <a href="#about" className="text-link">A little about me <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <p className="hero__location">Based in Ahmedabad, India <span aria-hidden="true">↗</span> Shaped by Toronto</p>
          </div>
          <div className="hero__art">
            <p className="hero__annotation"><span aria-hidden="true">↳</span> From curiosity to convergence</p>
            <HeroFigure />
          </div>
        </div>
        <div className="hero__foot">
          <p>Business questions.<br /><span>Technical follow-through.</span></p>
          <p className="hero__tools">SQL / Python / Power BI / Machine learning</p>
          <a href="#projects" className="hero__scroll" aria-label="Scroll to my work"><ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
