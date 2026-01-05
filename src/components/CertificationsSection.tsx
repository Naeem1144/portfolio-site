"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar } from 'react-icons/fi';

const certifications = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    year: "2025",
    description: "Completed rigorous training covering the data lifecycle, analysis, visualization, and tools including SQL, R, and Tableau.",
    color: "var(--accent)",
  },
  {
    title: "Data Science Certification",
    issuer: "Udemy",
    year: "2024",
    description: "Comprehensive training in data analysis, visualization, machine learning, deep neural networks, NLP, MLOps, Python, and related frameworks.",
    color: "var(--tertiary)",
  },
  {
    title: "Data Analyst Certificate",
    issuer: "TOPS Technologies",
    year: "2023",
    description: "Completed 6 months of rigorous on-site training covering Python, statistics, Excel, Tableau, SQL, project building, and problem solving.",
    color: "var(--secondary)",
  },
];

export function CertificationsSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-10"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="badge badge-accent mb-4 inline-block"
        >
          Credentials
        </motion.span>
        <h2 className="text-[var(--foreground)]">Certifications</h2>
        <p className="mx-auto">
          Professional certifications that validate my expertise
        </p>
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="card-content p-5">
              {/* Icon & Year */}
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${cert.color}15` }}
                >
                  <FiAward className="w-5 h-5" style={{ color: cert.color }} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
                  <FiCalendar className="w-3.5 h-3.5" />
                  <span>{cert.year}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[var(--foreground)] mb-1 leading-tight">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-sm text-[var(--accent)] font-medium mb-3">
                {cert.issuer}
              </p>

              {/* Description */}
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
