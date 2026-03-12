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
            className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-8 py-4 border-b border-[var(--border)]"
          >
            <dt className="text-sm font-medium text-[var(--foreground)] sm:py-0.5">
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
