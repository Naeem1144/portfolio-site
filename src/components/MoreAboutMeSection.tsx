"use client";

import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  {
    title: "Problem-Solving Mindset",
    description: "I like working at the point where messy information becomes clear direction. Whether the challenge is analysis, modeling, or communication, I focus on finding the signal and turning it into action."
  },
  {
    title: "Technical Breadth",
    description: "My toolkit spans Python, SQL, machine learning, deep learning, data visualization, and modern AI workflows. That range helps me move from exploration and experimentation to practical implementation."
  },
  {
    title: "Built To Grow Fast",
    description: "I am early in my career, but I bring seriousness, curiosity, and consistency. I learn quickly, care about doing the work well, and want to contribute in environments where high standards matter."
  }
];

export function MoreAboutMeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Intro paragraph */}
      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-4">
        I am focused on data science, data analytics, machine learning, and AI.
        My background combines programming, statistics, and analytical thinking,
        which helps me work from raw data and experimentation through to insight,
        modeling, and practical business value.
      </p>

      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-8">
        What drives me most is solving meaningful problems with data. I enjoy exploring
        datasets, identifying patterns, building models, and translating technical results
        into clear recommendations people can trust and act on. I am especially interested
        in opportunities where I can keep growing across analytics, machine learning, and AI
        while contributing meaningful value from day one.
      </p>

      {/* Highlights — row/divider pattern matching skills and certifications */}
      <div className="border-t border-[var(--border)]">
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.06 }}
            className="py-4 border-b border-[var(--border)] hover:bg-[var(--chrome)]/10 transition-colors duration-200 -mx-4 px-4"
          >
            <h4 className="font-medium text-[var(--foreground)] text-sm mb-1 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-40" />
              {item.title}
            </h4>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed pl-3">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
