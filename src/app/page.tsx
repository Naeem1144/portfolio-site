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
import { ScrollRestoration } from '@/components/ScrollRestoration';

export default async function Home() {
  const profile = await fetchGitHubProfile();
  const repos = await fetchPinnedRepos();
  
  return (
    <>
      <ScrollRestoration />
      <Header />
      
      {/* Main content container with consistent horizontal padding */}
      <main className="flex flex-col items-center w-full">
        {/* Hero Section - Full width, specific styling within component */}
        <HeroSection />
        
        {/* About Section */}
        <section id="about" className="w-full relative overflow-hidden">
          {/* Background decorative elements with reduced opacity for subtlety */}
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          </div>
          
          {/* Max width container for content within the section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Container for the two-row layout + new header */}
            <div className="flex flex-col gap-3">
              {/* Premium Section Header */}
              <div className="flex flex-col items-center justify-center mt-24 mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-primary to-accent mb-4">About Me</h2>
                <p className="text-lg md:text-xl text-gray-300/80 text-center font-normal max-w-2xl">
                  A glimpse into my journey, skills, and what drives my passion for technology and data.
                </p>
                <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
              </div>
              
              {/* First Row: ProfileCard and MoreAboutMeSection */}
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

              {/* Second Row: CoreCompetenciesSection */}
              <div className="w-full"> 
                <CoreCompetenciesSection /> 
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<ProjectsSection repos={[]} isLoading={true} />}>
              <ProjectsSection repos={repos} />
            </Suspense>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactSection />
          </div>
        </section>
      </main>
      
      <div className="mt-7">
        <Footer />
      </div>
    </>
  );
}
