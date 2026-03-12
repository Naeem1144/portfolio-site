"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Data Analysis',
    skills: [
      'Python',
      'Power BI & Tableau',
      'SAP',
      'Advanced Excel',
      'Data Visualization',
      'Data Cleaning & ETL',
      'Data Modeling',
      'Data Storytelling',
    ]
  },
  {
    title: 'Data Science',
    skills: [
      'Deep Learning',
      'Machine Learning',
      'NLP',
      'Time Series Analysis',
      'Predictive Modeling',
      'Feature Engineering',
      'Model Validation',
    ]
  },
  {
    title: 'AI & LLMs',
    skills: [
      'Large Language Models',
      'Agentic Workflows',
      'RAG Systems',
      'Model Context Protocol',
      'Prompt Engineering',
      'Fine-tuning',
    ]
  },
  {
    title: 'Databases',
    skills: [
      'SQL',
      'RDBMS',
      'Vector Databases',
    ]
  },
  {
    title: 'Statistics',
    skills: [
      'Descriptive & Inferential Statistics',
      'A/B Testing & Bayesian Statistics',
      'Conversion Optimization',
      'Customer Segmentation',
    ]
  },
  {
    title: 'Professional',
    skills: [
      'Strategic Planning',
      'Analytical Thinking',
      'Market Research',
      'Documentation',
      'Presentation Skills',
      'Trilingual: English, Hindi, Gujarati',
    ]
  }
];

export function CoreCompetenciesSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-[var(--accent)] opacity-30" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-40" />
          <span className="w-6 h-px bg-gradient-to-l from-transparent to-[var(--accent)] opacity-30" />
        </div>
        <h2 className="text-[var(--foreground)]">Core Competencies</h2>
        <p className="mx-auto">
          A comprehensive toolkit for turning data into decisions
        </p>
      </motion.div>

      {/* Definition-list layout */}
      <div className="border-t border-[var(--border)]">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-8 py-4 border-b border-[var(--border)] hover:bg-[var(--chrome)]/10 transition-colors duration-200 -mx-4 px-4"
          >
            <dt className="text-sm font-medium text-[var(--foreground)] sm:py-0.5 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-40 sm:hidden" />
              {category.title}
            </dt>
            <dd className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              {category.skills.join(' · ')}
            </dd>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
