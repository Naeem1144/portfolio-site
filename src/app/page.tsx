import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProfileSection } from "@/components/ProfileSection";
import { CredentialsSection } from "@/components/CredentialsSection";
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

        <section id="projects" className="section" aria-labelledby="work-heading">
          <div className="container">
            <ProjectsSection />
          </div>
        </section>

        <section id="about" className="section section--rule" aria-labelledby="about-heading">
          <div className="container">
            <ProfileSection />
          </div>
        </section>

        <section
          id="credentials"
          className="section section--tinted"
          aria-labelledby="credentials-heading"
        >
          <div className="container">
            <CredentialsSection />
          </div>
        </section>

        <section id="contact" className="section band" aria-labelledby="contact-heading">
          <div className="container">
            <ContactSection />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
