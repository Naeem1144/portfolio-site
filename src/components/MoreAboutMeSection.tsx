"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiBookOpen, FiAward } from 'react-icons/fi';

const highlights = [
  {
    icon: FiTarget,
    title: "Mission-Driven",
    description: "Passionate about leveraging data to uncover insights, solve real-world challenges, and empower businesses with actionable intelligence."
  },
  {
    icon: FiBookOpen,
    title: "Continuous Learner",
    description: "Started coding in C++ as a child, and since 2019, I've been dedicated to mastering data science through certifications, coursework, and hands-on projects."
  },
  {
    icon: FiAward,
    title: "Ready to Excel",
    description: "While early in my career, I bring dedication, deep knowledge, and a relentless drive to deliver exceptional value and impactful outcomes."
  }
];

export function MoreAboutMeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <div className="card-content p-6">
          {/* Intro paragraph */}
          <p className="text-[var(--foreground-muted)] leading-relaxed mb-6">
            As a <span className="text-[var(--foreground)] font-medium">21-year-old aspiring data scientist</span>, 
            I combine a robust foundation in programming, statistics, and mathematics with a genuine passion 
            for turning complex data into meaningful stories. My journey began with childhood curiosity 
            and has evolved into a dedicated pursuit of excellence in the field.
          </p>

          {/* Highlights */}
          <div className="space-y-2 sm:space-y-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-[var(--background-elevated)] border border-[var(--border)]"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--accent)]/10 
                  flex items-center justify-center">
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-[var(--foreground)] text-xs sm:text-sm mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-5 pt-5 border-t border-[var(--border)]">
            <blockquote className="pl-3 border-l-2 border-[var(--accent)]">
              <p className="text-sm italic text-[var(--foreground-muted)]">
                &ldquo;I believe in the power of data to transform businesses and create meaningful impact. 
                Every dataset tells a story waiting to be discovered.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
