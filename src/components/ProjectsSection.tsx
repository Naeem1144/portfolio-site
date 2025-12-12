"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/Card';
import { Button } from './ui/Button';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

interface Repo {
  name: string;
  description: string;
  htmlUrl: string;
  stars: number | undefined;
  forks: number | undefined;
  language: string | null | undefined;
  homepage: string | null;
  topics?: string[];
}

interface ProjectsProps {
  repos: Repo[];
  isLoading?: boolean;
}

export function ProjectsSection({ repos = [], isLoading = false }: ProjectsProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-xl bg-zinc-900/50 border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Selected Work</h2>
        <p className="text-muted-foreground max-w-2xl">
          Open source projects and experiments.
        </p>
      </div>
      
      {repos.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-white/10">
          <p className="text-muted-foreground mb-4">No projects found.</p>
          <Button href="https://github.com/Naeem1144" target="_blank" variant="outline">
            Check GitHub
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo) => (
            <div key={repo.name} className="group">
              <Card className="h-full flex flex-col bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-medium text-lg tracking-tight group-hover:text-foreground transition-colors">
                      {repo.name}
                    </CardTitle>
                    <div className="flex gap-3 text-muted-foreground text-xs">
                       {repo.stars !== undefined && (
                         <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                           <FaStar size={12} /> {repo.stars}
                         </span>
                       )}
                       {repo.forks !== undefined && (
                         <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                           <FaCodeBranch size={12} /> {repo.forks}
                         </span>
                       )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {repo.description || "No description provided."}
                  </p>
                </CardHeader>

                <CardContent className="flex-grow py-2">
                  <div className="flex flex-wrap gap-2">
                    {/* Language Badge */}
                    {repo.language && (
                       <span className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         {repo.language}
                       </span>
                    )}
                    {/* Topic Badges (Limit 2) */}
                    {repo.topics?.slice(0, 2).map(topic => (
                      <span key={topic} className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 flex gap-3 border-t border-white/5 mt-auto">
                   <Button
                      href={repo.htmlUrl}
                      target="_blank"
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-9 text-xs font-medium hover:bg-white/10 hover:text-foreground text-muted-foreground"
                   >
                     <FaGithub className="mr-2 h-3.5 w-3.5" /> Code
                   </Button>
                   {repo.homepage && (
                     <Button
                        href={repo.homepage}
                        target="_blank"
                        variant="primary" // Primary
                        size="sm"
                        className="flex-1 h-9 text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
                     >
                       <FaExternalLinkAlt className="mr-2 h-3 w-3" /> Live
                     </Button>
                   )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
