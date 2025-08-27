"use client";

import React, { useState } from 'react';
import { FiExternalLink, FiGithub, FiStar, FiGitBranch } from 'react-icons/fi';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Repo {
  name: string;
  description: string;
  htmlUrl: string;
  stars: number | undefined;
  forks: number | undefined;
  language: string | null | undefined;
  homepage: string | null; // Allow null for homepage
  topics?: string[];
}

interface ProjectsProps {
  repos: Repo[];
  isLoading?: boolean;
}

// Modern Project Card Component
const ProjectCard = ({ repo, index }: { repo: Repo; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const getLanguageColor = (language: string | null | undefined) => {
    const colors: { [key: string]: string } = {
      javascript: 'from-yellow-400 to-yellow-600',
      typescript: 'from-blue-400 to-blue-600',
      python: 'from-green-400 to-green-600',
      react: 'from-cyan-400 to-cyan-600',
      vue: 'from-emerald-400 to-emerald-600',
      css: 'from-pink-400 to-pink-600',
      html: 'from-orange-400 to-orange-600',
      java: 'from-red-400 to-red-600',
      cpp: 'from-purple-400 to-purple-600',
      default: 'from-gray-400 to-gray-600'
    };
    return colors[language?.toLowerCase() || 'default'] || colors.default;
  };

  return (
    <motion.div
      className="h-full perspective-1000"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        className="h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="relative h-full p-6 rounded-3xl transition-all duration-500 flex flex-col"
          style={{
            background: isHovered 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(25px)',
            border: isHovered 
              ? '1px solid rgba(255,255,255,0.2)' 
              : '1px solid rgba(255,255,255,0.1)',
            boxShadow: isHovered 
              ? '0 35px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
              : '0 25px 45px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Animated Background Gradient */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1), rgba(236,72,153,0.1))',
              backgroundSize: '300% 300%',
              animation: 'gradientMove 8s ease infinite',
            }}
          />

          {/* Project Header */}
          <div className="relative z-10 mb-4">
            <div className="flex items-start justify-between mb-3">
              <motion.h3 
                className="text-xl font-bold text-white leading-tight"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </motion.h3>
              
              {repo.language && (
                <motion.span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLanguageColor(repo.language)}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {repo.language}
                </motion.span>
              )}
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed mb-4 min-h-[3rem]">
              {repo.description || 'No description provided for this project.'}
            </p>
          </div>

          {/* Project Stats */}
          {(repo.stars !== undefined || repo.forks !== undefined) && (
            <div className="relative z-10 flex items-center gap-4 mb-4">
              {repo.stars !== undefined && (
                <div className="flex items-center gap-1 text-white/60">
                  <FiStar className="w-4 h-4" />
                  <span className="text-sm font-medium">{repo.stars}</span>
                </div>
              )}
              {repo.forks !== undefined && (
                <div className="flex items-center gap-1 text-white/60">
                  <FiGitBranch className="w-4 h-4" />
                  <span className="text-sm font-medium">{repo.forks}</span>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Tags */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-2 mb-6">
              {repo.topics.slice(0, 5).map((topic, topicIndex) => (
                <motion.span
                  key={topic}
                  className="px-3 py-1 text-xs font-medium rounded-xl text-white/80"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * topicIndex, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  }}
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="relative z-10 flex gap-3 mt-auto">
            <motion.a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-2xl no-underline transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.8))',
                boxShadow: '0 8px 25px rgba(99,102,241,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9))',
                boxShadow: '0 12px 35px rgba(99,102,241,0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FiGithub className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </motion.a>

            {repo.homepage && (
              <motion.a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-2xl no-underline transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiExternalLink className="w-4 h-4" />
                <span className="text-sm">Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function ProjectsSection({ repos = [], isLoading = false }: ProjectsProps) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const renderSkeletons = () => (
    Array.from({ length: 6 }).map((_, i) => (
      <motion.div 
        key={`skeleton-${i}`}
        className="h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
      >
        <div
          className="relative h-full p-6 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
          }}
        >
          <div className="animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-white/10 rounded-lg w-3/4" />
              <div className="h-6 bg-white/10 rounded-full w-16" />
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-3/4" />
            </div>
            <div className="flex gap-2 mb-6">
              <div className="h-6 bg-white/10 rounded-full w-16" />
              <div className="h-6 bg-white/10 rounded-full w-20" />
              <div className="h-6 bg-white/10 rounded-full w-14" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-white/10 rounded-2xl flex-1" />
              <div className="h-10 bg-white/10 rounded-2xl flex-1" />
            </div>
          </div>
        </div>
      </motion.div>
    ))
  );

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div 
        className="flex flex-col items-center justify-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(102,126,234,0.5)',
          }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-white/70 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A curated collection of my work, showcasing innovative solutions and technical expertise
        </motion.p>
      </motion.div>
      
      {/* Projects Grid */}
      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderSkeletons()}
          </div>
        ) : repos.length === 0 ? (
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div
              className="text-center p-12 rounded-3xl max-w-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
              }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiGithub className="w-10 h-10 text-white/70" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Projects are currently being loaded. Check back soon or visit my GitHub profile!
              </p>
              
              <motion.a
                href="https://github.com/Naeem1144"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 no-underline"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-5 h-5" />
                <span>Visit GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {repos.map((repo, index) => (
              <ProjectCard key={repo.name} repo={repo} index={index} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
