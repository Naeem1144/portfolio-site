import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MoreAboutMeSection } from "@/components/MoreAboutMeSection";
import { CoreCompetenciesSection } from "@/components/CoreCompetenciesSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <section id="projects" className="section work-section">
          <div className="container">
            <ProjectsSection />
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container">
            <MoreAboutMeSection />
          </div>
        </section>
        <section id="skills" className="section skills-section">
          <div className="container">
            <CoreCompetenciesSection />
          </div>
        </section>
        <section id="certifications" className="section credentials-section">
          <div className="container">
            <CertificationsSection />
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <div className="container">
            <ContactSection />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
