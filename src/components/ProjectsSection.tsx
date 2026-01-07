"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiFolder, FiStar, FiGitBranch } from 'react-icons/fi';
import { Button } from './ui/Button';

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

// Language color mapping
const languageColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Jupyter: '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  default: 'var(--accent)',
};

function ProjectSkeleton() {
  return (
    <div className="card">
      <div className="card-content">
        <div className="h-5 w-3/4 skeleton rounded mb-3" />
        <div className="h-4 w-full skeleton rounded mb-2" />
        <div className="h-4 w-5/6 skeleton rounded mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 skeleton rounded-full" />
          <div className="h-6 w-20 skeleton rounded-full" />
        </div>
        <div className="flex gap-2 mt-auto pt-4 border-t border-[var(--border)]">
          <div className="h-10 flex-1 skeleton rounded-lg" />
          <div className="h-10 flex-1 skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const langColor = repo.language 
    ? (languageColors[repo.language] || languageColors.default) 
    : languageColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className="card h-full flex flex-col">
        <div className="card-content flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <FiFolder className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
              <h3 className="font-semibold text-[var(--foreground)] font-mono text-sm truncate">
                {repo.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[var(--foreground-subtle)] text-xs flex-shrink-0">
              {repo.stars !== undefined && repo.stars > 0 && (
                <span className="flex items-center gap-1">
                  <FiStar className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
              )}
              {repo.forks !== undefined && repo.forks > 0 && (
                <span className="flex items-center gap-1">
                  <FiGitBranch className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--foreground-muted)] mb-4 flex-grow line-clamp-2">
            {repo.description || 'No description provided.'}
          </p>

          {/* Topics/Tags */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {repo.topics.slice(0, 4).map((topic) => (
                <span 
                  key={topic}
                  className="px-2 py-0.5 text-[10px] font-mono rounded-full
                    bg-[var(--chrome)] text-[var(--foreground-muted)] border border-[var(--border)]"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Language & Actions */}
          <div className="mt-auto pt-4 border-t border-[var(--border)]">
            {/* Language indicator */}
            {repo.language && (
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                <span className="text-xs text-[var(--foreground-muted)] font-mono">
                  {repo.language}
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button 
                href={repo.htmlUrl}
                target="_blank"
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <FaGithub className="w-3.5 h-3.5 mr-1.5" />
                Code
              </Button>
              {repo.homepage && (
                <Button 
                  href={repo.homepage}
                  target="_blank"
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  <FaExternalLinkAlt className="w-3 h-3 mr-1.5" />
                  Demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card max-w-md mx-auto"
    >
      <div className="card-content text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 
          flex items-center justify-center">
          <FaGithub className="w-8 h-8 text-[var(--accent)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          No Projects Yet
        </h3>
        <p className="text-sm text-[var(--foreground-muted)] mb-6">
          Check back later or visit my GitHub profile directly!
        </p>
        <Button 
          href="https://github.com/Naeem1144"
          target="_blank"
          variant="primary"
        >
          <FaGithub className="mr-2" />
          View GitHub
        </Button>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ repos = [], isLoading = false }: ProjectsProps) {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-12"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="badge badge-accent mb-4 inline-block"
        >
          Portfolio
        </motion.span>
        <h2 className="text-[var(--foreground)]">Featured Projects</h2>
        <p className="mx-auto">
          A selection of my work showcasing data science and development skills
        </p>
      </motion.div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, index) => (
            <ProjectCard key={repo.name} repo={repo} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
