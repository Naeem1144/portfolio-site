"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaCode, FaChartLine, FaServer } from 'react-icons/fa';
import { SiPython, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiPostgresql, SiDocker, SiTensorflow, SiScikitlearn, SiPandas, SiGit } from 'react-icons/si';

const TechBadge = ({ icon: Icon, name }: { icon: React.ElementType, name: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <span className="text-xs font-medium text-foreground/80">{name}</span>
  </div>
);

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4">

      {/* 1. Main Profile Card (Large) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-2xl p-8 border border-white/10 bg-zinc-900/50 backdrop-blur-sm relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
           <FaCode size={120} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-mono text-emerald-400 mb-2">ABOUT ME</h3>
            <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
              Bridge between <br/> Data & Engineering
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-md">
              I&apos;m a multidisciplinary developer with a passion for building data-driven applications.
              My background intersects rigorous data analysis with modern full-stack engineering, allowing me to build systems that are not just functional, but intelligent.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <TechBadge icon={SiPython} name="Python" />
            <TechBadge icon={SiTypescript} name="TypeScript" />
            <TechBadge icon={SiPostgresql} name="PostgreSQL" />
          </div>
        </div>
      </motion.div>

      {/* 2. Core Stats / Focus (Tall) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 rounded-2xl p-6 border border-white/10 bg-zinc-900/30 backdrop-blur-sm flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
           <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2">
             <FaDatabase size={20} />
           </div>
           <h3 className="font-semibold text-foreground">Data Engineering</h3>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Building robust pipelines and scalable data architectures. ETL, warehousing, and optimization.
           </p>
        </div>

        <div className="w-full h-[1px] bg-white/5" />

        <div className="flex flex-col gap-2">
           <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 mb-2">
             <FaChartLine size={20} />
           </div>
           <h3 className="font-semibold text-foreground">Analytics & ML</h3>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Turning raw data into actionable insights using predictive models and statistical analysis.
           </p>
        </div>

        <div className="w-full h-[1px] bg-white/5" />

        <div className="flex flex-col gap-2">
           <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
             <FaServer size={20} />
           </div>
           <h3 className="font-semibold text-foreground">Backend Systems</h3>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Designing APIs and microservices that power modern web applications.
           </p>
        </div>
      </motion.div>

      {/* 3. Tech Stack Grid (Square-ish) */}
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: 0.2 }}
         className="col-span-1 md:col-span-3 lg:col-span-1 row-span-2 rounded-2xl p-6 border border-white/10 bg-zinc-900/30 backdrop-blur-sm"
      >
        <h3 className="text-sm font-medium text-foreground mb-4">Toolkit</h3>
        <div className="grid grid-cols-2 gap-3">
           <TechBadge icon={SiReact} name="React" />
           <TechBadge icon={SiNextdotjs} name="Next.js" />
           <TechBadge icon={SiTailwindcss} name="Tailwind" />
           <TechBadge icon={SiDocker} name="Docker" />
           <TechBadge icon={SiTensorflow} name="TensorFlow" />
           <TechBadge icon={SiScikitlearn} name="Scikit" />
           <TechBadge icon={SiPandas} name="Pandas" />
           <TechBadge icon={SiGit} name="Git" />
        </div>
      </motion.div>

    </div>
  );
}
