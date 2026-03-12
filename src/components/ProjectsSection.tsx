"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

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
    <div className="py-5 border-b border-[var(--border)]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="h-5 w-40 skeleton rounded" />
        <div className="h-4 flex-1 skeleton rounded" />
        <div className="h-4 w-20 skeleton rounded" />
      </div>
    </div>
  );
}

function ProjectRow({ repo, index }: { repo: Repo; index: number }) {
  const langColor = repo.language
    ? (languageColors[repo.language] || languageColors.default)
    : languageColors.default;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="py-5 border-b border-[var(--border)] group hover:bg-[var(--chrome)]/20 transition-colors duration-200 -mx-4 px-4 rounded-lg"
    >
      {/* Project name */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="font-medium text-[var(--foreground)] font-mono text-sm truncate group-hover:text-[var(--accent)] transition-colors duration-200">
          {repo.name}
        </h3>
        {/* Links */}
        <div className="flex items-center gap-4 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors"
          >
            <FaGithub className="w-3.5 h-3.5" />
            <span>Code</span>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[var(--accent)] hover:text-[var(--accent-muted)] transition-colors"
            >
              <span>Demo</span>
              <FiArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed line-clamp-2 mb-2">
        {repo.description || 'No description provided.'}
      </p>

      {/* Language + Topics */}
      <div className="flex items-center gap-3 text-xs text-[var(--foreground-subtle)]">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full ring-1 ring-white/5"
              style={{ backgroundColor: langColor }}
            />
            <span className="font-mono">{repo.language}</span>
          </div>
        )}
        {repo.topics && repo.topics.length > 0 && (
          <span>{repo.topics.slice(0, 5).join(' · ')}</span>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 text-center"
    >
      <FaGithub className="w-8 h-8 text-[var(--foreground-subtle)] mx-auto mb-4" />
      <h3 className="text-sm font-medium text-[var(--foreground)] mb-2">
        No Projects Yet
      </h3>
      <p className="text-sm text-[var(--foreground-muted)] mb-6">
        Check back later or visit my GitHub profile directly.
      </p>
      <a
        href="https://github.com/Naeem1144"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-muted)] transition-colors"
      >
        <FaGithub className="w-4 h-4" />
        View GitHub
        <FiArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

export function ProjectsSection({ repos = [], isLoading = false }: ProjectsProps) {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-10"
      >
        <h2 className="text-[var(--foreground)]">Featured Projects</h2>
        <p className="mx-auto">
          A selection of work showcasing data science and development skills
        </p>
      </motion.div>

      {/* Projects List */}
      {isLoading ? (
        <div className="border-t border-[var(--border)]">
          {[...Array(3)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="border-t border-[var(--border)]">
          {repos.map((repo, index) => (
            <ProjectRow key={repo.name} repo={repo} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
