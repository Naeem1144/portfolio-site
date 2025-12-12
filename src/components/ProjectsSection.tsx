"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/Card'; // Using Card sub-components
import { Button } from './ui/Button';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Repo {
  name: string;
  description: string;
  htmlUrl: string;
  stars: number | undefined;
  forks: number | undefined;
  language: string | null | undefined;
  homepage: string | null; // Allow null for homepage
  topics?: string[];
}

interface ProjectsProps {
  repos: Repo[];
  isLoading?: boolean;
}

export function ProjectsSection({ repos = [], isLoading = false }: ProjectsProps) {
  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, i) => (
      <div key={`skeleton-${i}`}>
        <Card className="h-full flex flex-col custom-card overflow-hidden animate-pulse">
          {/* Refined skeleton shimmer effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-animation"></div>
          
          <CardHeader>
            <div className="h-6 bg-foreground/10 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-foreground/10 rounded w-full mb-1"></div>
            <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-5 w-16 bg-foreground/10 rounded"></div>
              <div className="h-5 w-16 bg-foreground/10 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-foreground/8 rounded-full"></div>
              <div className="h-6 w-24 bg-foreground/8 rounded-full"></div>
              <div className="h-6 w-16 bg-foreground/8 rounded-full"></div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <div className="h-10 flex-1 bg-primary/20 rounded-md"></div>
            <div className="h-10 flex-1 bg-foreground/10 rounded-md"></div>
          </CardFooter>
        </Card>
      </div>
    ))
  );

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center mt-28 mb-12 text-center gap-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 border border-white/10 shadow-soft">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
          <span className="text-sm font-medium text-foreground/80">Built with care and shipped with users in mind</span>
        </div>
        <div className="space-y-3">
          <h2
            className="font-bold text-foreground text-center"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 2.75rem)',
              lineHeight: 'var(--line-height-tight)',
              letterSpacing: 'var(--letter-spacing-tight)',
              textWrap: 'balance'
            }}
          >
            Selected projects
          </h2>
          <p className="text-foreground/65 text-center max-w-2xl text-lg leading-relaxed">
            Highlights that demonstrate how I handle end-to-end workflows—scoping problems, building models, and presenting clear outcomes.
          </p>
        </div>
      </div>

      <div className="mt-2">
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {renderSkeletons()}
          </div>
        ) : repos.length === 0 ? (
          <div className="flex justify-center">
            <Card className="w-full text-center p-8 custom-card overflow-hidden" hoverable={false}>
              
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <FaGithub className="text-primary" size={28} />
              </div>
              
              <CardTitle 
                className="mb-3"
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  lineHeight: 'var(--line-height-tight)',
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                No Projects Yet
              </CardTitle>
              <CardDescription 
                style={{
                  fontSize: 'var(--font-size-base)',
                  lineHeight: 'var(--line-height-relaxed)',
                  letterSpacing: 'var(--letter-spacing-wide)'
                }}
              >
                It looks like there are no projects to display at the moment. Please check back later or visit my GitHub profile directly!
              </CardDescription>
              
              <Button 
                href="https://github.com/Naeem1144" 
                target="_blank" 
                variant="primary" 
                className="mt-6"
              >
                <FaGithub className="mr-2" /> View on GitHub
              </Button>
            </Card>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {repos.map((repo) => (
              <div key={repo.name} className="flex">
                <Card className="h-full flex flex-col custom-card overflow-hidden">
                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <CardTitle
                          className="!mb-1 break-all font-mono"
                          style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                            lineHeight: 'var(--line-height-snug)',
                            letterSpacing: '-0.01em'
                          }}
                        >
                          {repo.name}
                        </CardTitle>
                        <CardDescription
                          className="text-foreground/65"
                          style={{
                            fontSize: 'var(--font-size-sm)',
                            lineHeight: 'var(--line-height-relaxed)',
                            letterSpacing: 'var(--letter-spacing-wide)'
                          }}
                        >
                          {repo.description || 'No description provided for this project.'}
                        </CardDescription>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                        {repo.language || 'Code'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow relative z-10">
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 4).map(topic => (
                          <span
                            key={topic}
                            className="pill-surface text-foreground/70 px-3 py-1.5 rounded-full font-mono border-subtle"
                            style={{
                              fontSize: 'var(--font-size-xs)',
                              letterSpacing: '-0.01em'
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <span className="inline-flex items-center gap-1"><FaGithub /> {repo.stars ?? 0} stars</span>
                      <span className="inline-flex items-center gap-1"><FaExternalLinkAlt /> {repo.forks ?? 0} forks</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3 relative pt-5 z-10">
                    <Button
                      href={repo.htmlUrl}
                      target="_blank"
                      variant="primary"
                      className="w-full sm:flex-1"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </Button>
                    {repo.homepage && (
                      <Button
                        href={repo.homepage}
                        target="_blank"
                        variant="outline"
                        className="w-full sm:flex-1"
                      >
                        <FaExternalLinkAlt className="mr-2" /> Live Demo
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
