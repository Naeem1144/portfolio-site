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
      
      {/* Modern Main Content Container */}
      <main className="flex flex-col items-center w-full relative">
        {/* Hero Section - Full width, immersive design */}
        <HeroSection />
        
        {/* About Section with Modern Spacing */}
        <section id="about" className="w-full relative py-24 lg:py-32">
          {/* Dynamic Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/6 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">
              {/* Section Header with Modern Typography */}
              <div className="flex flex-col items-center justify-center mb-12">
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(102,126,234,0.5)',
                  }}
                >
                  About Me
                </h2>
                <p className="text-lg md:text-xl text-white/70 text-center max-w-3xl leading-relaxed">
                  A glimpse into my journey, skills, and what drives my passion for technology and data science
                </p>
              </div>
              
              {/* Profile and About Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                  <Suspense fallback={<ProfileCard profile={null} isLoading={true} />}>
                    <ProfileCard profile={profile} />
                  </Suspense>
                </div>
                <div className="lg:col-span-2">
                  <MoreAboutMeSection />
                </div>
              </div>

              {/* Core Competencies */}
              <div className="mt-16">
                <CoreCompetenciesSection />
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section with Enhanced Spacing */}
        <section id="projects" className="w-full py-24 lg:py-32 relative">
          {/* Background Elements for Projects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/5" />
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-[140px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<ProjectsSection repos={[]} isLoading={true} />}>
              <ProjectsSection repos={repos} />
            </Suspense>
          </div>
        </section>
        
        {/* Contact Section with Modern Layout */}
        <section id="contact" className="w-full py-24 lg:py-32 relative">
          {/* Contact Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-purple-500/5 to-transparent" />
            <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-[120px]" />
          </div>
          
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
