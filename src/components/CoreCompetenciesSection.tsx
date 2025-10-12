"use client";

import React from 'react';
import { Card, CardContent } from './ui/Card';

interface SkillItem {
  name: string;
  level?: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
  color: string;
}

const skills: SkillCategory[] = [
  {
    category: 'Data Analysis',
    items: [
      { name: 'Python' },
      { name: 'Power BI & Tableau' },
      { name: 'Systems, Applications & Products in Data Processing (SAP)' },
      { name: 'Advanced Excel' },
      { name: 'Data Visualization' },
      { name: 'Data Cleaning & Preprocessing' },
      { name: 'Data Integration & ETL' },
      { name: 'Data Modeling & Warehousing' },
      { name: 'Data Storytelling' },

    ],
    color: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-600/20 dark:to-cyan-600/20',
  },
  {
    category: 'Data Science',
    items: [
      { name: 'Deep Learning' },
      { name: 'Machine Learning' },
      { name: 'Natural Language Processing' },
      { name: 'Time Series Analysis' },
      { name: 'Predictive Modeling' },
      { name: 'Feature Engineering' },
      { name: 'Model Evaluation & Validation' },
    ],
    color: 'from-purple-500/20 to-pink-500/20 dark:from-purple-600/20 dark:to-pink-600/20',
  },
  {
    category: 'AI & LLM',
    items: [
      { name: 'Large Language Models' },
      { name: 'Agentic Workflows' },
      { name: 'Retrieval  Augmented Generation' },
      { name: 'Model Context Protocol' },
      { name: 'Prompt Engineering' },
      { name: 'Fine-tuning & Training' },
    ],
    color: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-600/20 dark:to-teal-600/20',
  },
  {
    category: 'Databases',
    items: [
      { name: 'Structured Query Language (SQL)' },
      { name: 'Relational Database Management Systems (RDBMS)' },
      { name: 'Vector Databases' },
    ],
    color: 'from-orange-500/20 to-amber-500/20 dark:from-orange-600/20 dark:to-amber-600/20',
  },
  {
    category: 'Statistics',
    items: [
      { name: 'Descriptive & Inferential Statistics' },
      { name: 'A/B Testing & Bayesian Statistics' },
      { name: 'Conversion Optimization & Trend Analysis' },
      { name: 'Customer Segmentation' },
    ],
    color: 'from-red-500/20 to-rose-500/20 dark:from-red-600/20 dark:to-rose-600/20',
  },
  {
    category: 'More Skills',
    items: [
      { name: 'Microsoft Office Suite' },
      { name: 'Strategic Planning' },
      { name: 'Analytical thinking' },
      { name: 'Market Research & Analysis' },
      { name: 'Reporting & Documentation' },
      { name: 'Presentation Skills' },
      { name: 'Collaboration & Clear Communication' },
      { name: 'Trilingual: English, Hindi, Gujarati' },
      { name: 'Web Development technologies (basic)' },
      { name: 'Understanding of Business Processes, Finance and Marketing' },
    ],
    color: 'from-indigo-500/20 to-violet-500/20 dark:from-indigo-600/20 dark:to-violet-600/20',
  },
];

export function CoreCompetenciesSection() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center mt-24 mb-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-primary to-accent mb-4">Core Competencies</h2>
        <p className="text-lg md:text-xl text-gray-300/80 text-center font-normal mt-2 max-w-2xl">
          A comprehensive overview of my key skills and expertise
        </p>
        <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 w-full mt-3">
        {/* Data Analysis - Featured Card */}
        <div className="md:col-span-3 lg:col-span-4">
          <Card className="custom-card h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${skills[0].color} opacity-50`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 dark:from-background-dark/95 dark:to-background-dark/80"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 opacity-70"></div>
            
            <CardContent className="p-6 relative">
              <h4 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
                {skills[0].category}
              </h4>
              
              <ul className="space-y-3">
                {skills[0].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start text-foreground/85 dark:text-foreground-dark/85"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3 mt-1 flex-shrink-0 w-4 h-4 text-primary/70 dark:text-primary-dark/70"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="flex-grow text-base">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Machine Learning - Tall Card */}
        <div className="md:col-span-3 lg:col-span-4">
          <Card className="custom-card h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${skills[1].color} opacity-50`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 dark:from-background-dark/95 dark:to-background-dark/80"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 opacity-70"></div>
            
            <CardContent className="p-6 relative">
              <h4 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
                {skills[1].category}
              </h4>
              
              <ul className="space-y-3">
                {skills[1].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start text-foreground/85 dark:text-foreground-dark/85"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3 mt-1 flex-shrink-0 w-4 h-4 text-primary/70 dark:text-primary-dark/70"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="flex-grow text-base">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI & LLM - Compact Card */}
        <div className="md:col-span-3 lg:col-span-4">
          <Card className="custom-card h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${skills[2].color} opacity-50`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 dark:from-background-dark/95 dark:to-background-dark/80"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 opacity-70"></div>
            
            <CardContent className="p-6 relative">
              <h4 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
                {skills[2].category}
              </h4>
              
              <ul className="space-y-3">
                {skills[2].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start text-foreground/85 dark:text-foreground-dark/85"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3 mt-1 flex-shrink-0 w-4 h-4 text-primary/70 dark:text-primary-dark/70"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="flex-grow text-base">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Databases - Small Card */}
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="custom-card h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${skills[3].color} opacity-50`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 dark:from-background-dark/95 dark:to-background-dark/80"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 opacity-70"></div>
            
            <CardContent className="p-6 relative">
              <h4 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
                {skills[3].category}
              </h4>
              
              <ul className="space-y-3">
                {skills[3].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start text-foreground/85 dark:text-foreground-dark/85"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3 mt-1 flex-shrink-0 w-4 h-4 text-primary/70 dark:text-primary-dark/70"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="flex-grow text-base">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Statistics - Small Card */}
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="custom-card h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${skills[4].color} opacity-50`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 dark:from-background-dark/95 dark:to-background-dark/80"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 opacity-70"></div>
            
            <CardContent className="p-6 relative">
              <h4 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
                {skills[4].category}
              </h4>
              
              <ul className="space-y-3">
                {skills[4].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start text-foreground/85 dark:text-foreground-dark/85"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3 mt-1 flex-shrink-0 w-4 h-4 text-primary/70 dark:text-primary-dark/70"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="flex-grow text-base">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Professional Skills - Wide Card */}
        <div className="md:col-span-4 lg:col-span-6">
          <Card className="custom-card h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${skills[5].color} opacity-50`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 dark:from-background-dark/95 dark:to-background-dark/80"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 opacity-70"></div>
            
            <CardContent className="p-6 relative">
              <h4 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
                {skills[5].category}
              </h4>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills[5].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start text-foreground/85 dark:text-foreground-dark/85"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3 mt-1 flex-shrink-0 w-4 h-4 text-primary/70 dark:text-primary-dark/70"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="flex-grow text-base">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}