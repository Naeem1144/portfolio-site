import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
// Remove old AboutSection import
// import { AboutSection } from '@/components/AboutSection'; 
import { MoreAboutMeSection } from '@/components/MoreAboutMeSection'; // Import new component
import { CoreCompetenciesSection } from '@/components/CoreCompetenciesSection'; // Import new component
import { ContactSection } from '@/components/ContactSection';
import { ProfileCard } from '@/components/ProfileCard';
import { Footer } from '@/components/Footer';
import { fetchGitHubProfile, fetchPinnedRepos } from '@/lib/github';
import { ScrollRestoration, Container, Section } from '@/components/ScrollRestoration';

// Cache GitHub data for 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Home() {
  // Fetch data in parallel for better performance
  const [profile, repos] = await Promise.all([
    fetchGitHubProfile(),
    fetchPinnedRepos()
  ]);
  
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="flex flex-col items-center w-full">
        <HeroSection />

        <Section id="about" className="overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          </div>
          <Container>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center justify-center mt-32 mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">About Me</h2>
                <p className="text-base md:text-lg text-foreground/60 text-center font-light max-w-xl">
                  A glimpse into my journey, skills, and what drives my passion for technology and data.
                </p>
                <div className="mt-6 w-24 mx-auto divider" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start lg:items-stretch">
                <div className="lg:col-span-1 h-full">
                  <Suspense fallback={<ProfileCard profile={null} isLoading={true} />}>
                    <ProfileCard profile={profile} />
                  </Suspense>
                </div>
                <div className="lg:col-span-2 h-full">
                  <MoreAboutMeSection />
                </div>
              </div>
              <div className="w-full">
                <CoreCompetenciesSection /> 
              </div>
            </div>
          </Container>
        </Section>

        <Section id="projects">
          <Container>
            <Suspense fallback={<ProjectsSection repos={[]} isLoading={true} />}>
              <ProjectsSection repos={repos} />
            </Suspense>
          </Container>
        </Section>

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
