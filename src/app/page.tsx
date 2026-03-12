import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { MoreAboutMeSection } from '@/components/MoreAboutMeSection';
import { CoreCompetenciesSection } from '@/components/CoreCompetenciesSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { ContactSection } from '@/components/ContactSection';
import { ProfileCard } from '@/components/ProfileCard';
import { Footer } from '@/components/Footer';
import { fetchGitHubProfile, fetchPinnedRepos } from '@/lib/github';
import { Container, Section } from '@/components/ScrollRestoration';

export default async function Home() {
  const profile = await fetchGitHubProfile();
  const repos = await fetchPinnedRepos();

  return (
    <>
      <Header />
      
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <Section id="about" variant="elevated">
          <Container>
            {/* Section Header */}
            <div className="section-header mb-10 text-center">
              <h2 className="text-[var(--foreground)]">About</h2>
              <p className="mx-auto">
                The background, mindset, and technical foundation behind my work
              </p>
            </div>

            {/* Profile */}
            <div className="mb-10">
              <Suspense fallback={<ProfileCard profile={null} isLoading={true} />}>
                <ProfileCard profile={profile} />
              </Suspense>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-10" />

            {/* More About Me */}
            <MoreAboutMeSection />
          </Container>
        </Section>

        {/* Skills Section */}
        <Section id="skills">
          <Container>
            <CoreCompetenciesSection />
          </Container>
        </Section>

        {/* Certifications Section */}
        <Section id="certifications" variant="elevated">
          <Container>
            <CertificationsSection />
          </Container>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <Container>
            <Suspense fallback={<ProjectsSection repos={[]} isLoading={true} />}>
              <ProjectsSection repos={repos} />
            </Suspense>
          </Container>
        </Section>

        {/* Contact Section */}
        <Section id="contact" variant="elevated">
          <Container>
            <ContactSection />
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
