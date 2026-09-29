import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProfileSection } from "@/components/ProfileSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

/**
 * One page, one job: get the interview. The page is a brief. It states the
 * finding (hero), shows the evidence (work), earns trust (about) and ends on
 * the next step (contact, on the dark band with the footer).
 */
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <HeroSection />

        <section id="projects" className="section" aria-labelledby="work-heading">
          <div className="container">
            <ProjectsSection />
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-heading">
          <div className="container">
            <ProfileSection />
            <CredentialsSection />
          </div>
        </section>

        <section id="contact" className="section night" aria-labelledby="contact-heading">
          <div className="container">
            <ContactSection />
          </div>
        </section>
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
