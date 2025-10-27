
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MoreAboutMeSection } from "@/components/MoreAboutMeSection";
import { CoreCompetenciesSection } from "@/components/CoreCompetenciesSection";
import { ContactSection } from "@/components/ContactSection";
import { ProfileCard } from "@/components/ProfileCard";
import { Footer } from "@/components/Footer";
import { fetchGitHubProfile, fetchPinnedRepos } from "@/lib/github";

export default async function Home() {
  const profile = await fetchGitHubProfile();
  const repos = await fetchPinnedRepos();

  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <main className="flex flex-col items-center w-full">
        <HeroSection />
        <section id="about" className="w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Suspense
                fallback={<ProfileCard profile={null} isLoading={true} />}
              >
                <ProfileCard profile={profile} />
              </Suspense>
            </div>
            <div className="lg:col-span-2">
              <MoreAboutMeSection />
            </div>
          </div>
        </section>
        <ProjectsSection repos={repos} />
        <CoreCompetenciesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
