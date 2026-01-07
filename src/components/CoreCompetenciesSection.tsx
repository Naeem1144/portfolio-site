"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiDatabase, 
  FiCpu, 
  FiCode,
  FiBarChart2,
  FiLayers,
  FiBriefcase
} from 'react-icons/fi';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Data Analysis',
    icon: FiBarChart2,
    color: 'var(--accent)',
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
    icon: FiCpu,
    color: 'var(--tertiary)',
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
    icon: FiCode,
    color: 'var(--secondary)',
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
    icon: FiDatabase,
    color: '#f472b6',
    skills: [
      'SQL',
      'RDBMS',
      'Vector Databases',
    ]
  },
  {
    title: 'Statistics',
    icon: FiLayers,
    color: '#a78bfa',
    skills: [
      'Descriptive & Inferential Statistics',
      'A/B Testing & Bayesian Statistics',
      'Conversion Optimization',
      'Customer Segmentation',
    ]
  },
  {
    title: 'Professional',
    icon: FiBriefcase,
    color: '#fb923c',
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

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = category.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card group"
    >
      <div className="card-content">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: category.color }} />
          </div>
          <h4 className="font-semibold text-[var(--foreground)] text-sm sm:text-base">{category.title}</h4>
        </div>

        {/* Skills */}
        <ul className="space-y-2">
          {category.skills.map((skill, i) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.03 }}
              className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]"
            >
              <span 
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-mono text-xs">{skill}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function CoreCompetenciesSection() {
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
          Expertise
        </motion.span>
        <h2 className="text-[var(--foreground)]">Core Competencies</h2>
        <p className="mx-auto">
          A comprehensive toolkit for turning data into decisions
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
