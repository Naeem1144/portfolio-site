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
        <Section id="about">
          <Container>
            {/* Section Header */}
            <div className="section-header mb-12 text-center">
              <span className="badge badge-accent mb-4 inline-block">About</span>
              <h2 className="text-[var(--foreground)]">About Me</h2>
              <p className="mx-auto">
                A glimpse into my journey, skills, and passion for technology
              </p>
            </div>

            {/* About Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Suspense fallback={<ProfileCard profile={null} isLoading={true} />}>
                  <ProfileCard profile={profile} />
                </Suspense>
              </div>
              
              {/* More About Me */}
              <div className="lg:col-span-2">
                <MoreAboutMeSection />
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-16">
              <CoreCompetenciesSection />
            </div>

            {/* Certifications Section */}
            <div className="mt-16">
              <CertificationsSection />
            </div>
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
        <Section id="contact">
          <Container>
            <ContactSection />
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
