import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { fetchPinnedRepos } from '@/lib/github';
import { ScrollRestoration, Container, Section } from '@/components/ScrollRestoration';
import { BentoGrid } from '@/components/about/BentoGrid';

export default async function Home() {
  const repos = await fetchPinnedRepos();
  
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="flex flex-col items-center w-full bg-background overflow-hidden">
        <HeroSection />

        <Section id="about" className="py-24 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          <Container>
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
              <div className="w-12 h-1 bg-primary rounded-full opacity-50" />
            </div>
            <BentoGrid />
          </Container>
        </Section>

        <Section id="projects" className="py-24 bg-zinc-900/20 border-y border-white/5">
          <Container>
            <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5 rounded-xl" />}>
              <ProjectsSection repos={repos} />
            </Suspense>
          </Container>
        </Section>

        <Section id="contact" className="py-24">
          <Container>
            <ContactSection />
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
