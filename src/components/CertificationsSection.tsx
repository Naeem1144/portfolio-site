"use client";

import React from 'react';
import { motion } from 'framer-motion';

const certifications = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    year: "2025",
    description: "Completed rigorous training covering the data lifecycle, analysis, visualization, and tools including SQL, R, and Tableau.",
  },
  {
    title: "Data Science Certification",
    issuer: "Udemy",
    year: "2024",
    description: "Comprehensive training in data analysis, visualization, machine learning, deep neural networks, NLP, MLOps, Python, and related frameworks.",
  },
  {
    title: "Data Analyst Certificate",
    issuer: "TOPS Technologies",
    year: "2023",
    description: "Completed 6 months of rigorous on-site training covering Python, statistics, Excel, Tableau, SQL, project building, and problem solving.",
  },
];

export function CertificationsSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-10"
      >
        <h2 className="text-[var(--foreground)]">Certifications</h2>
        <p className="mx-auto">
          Professional certifications that validate my expertise
        </p>
      </motion.div>

      {/* Timeline-style stacked list */}
      <div className="border-t border-[var(--border)]">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-8 py-5 border-b border-[var(--border)]"
          >
            {/* Year */}
            <span className="font-mono text-sm text-[var(--foreground-subtle)] tabular-nums">
              {cert.year}
            </span>

            {/* Details */}
            <div>
              <h3 className="font-medium text-[var(--foreground)] text-sm leading-relaxed mb-0.5">
                {cert.title}
              </h3>
              <p className="text-xs text-[var(--foreground-subtle)] mb-2">
                {cert.issuer}
              </p>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
