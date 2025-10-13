"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/Card'; // Using Card sub-components
import { Button } from './ui/Button';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

export function ProjectsSection({ repos = [], isLoading = false }: ProjectsProps) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, i) => (
      <motion.div key={`skeleton-${i}`} variants={itemVariants}>
        <Card className="h-full flex flex-col custom-card overflow-hidden bg-gradient-to-b from-background/95 to-primary/10 dark:from-background-dark/95 dark:to-primary-dark/10 border-2 border-primary/15 dark:border-primary-dark/15 shadow-lg animate-pulse">
          {/* Enhanced skeleton with shimmer effect overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-animation"></div>
          
          <CardHeader>
            <div className="h-6 bg-secondary/30 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-secondary/30 rounded w-full mb-1"></div>
            <div className="h-4 bg-secondary/30 rounded w-5/6"></div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-5 w-16 bg-secondary/30 rounded"></div>
              <div className="h-5 w-16 bg-secondary/30 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-secondary/20 rounded-full"></div>
              <div className="h-6 w-24 bg-secondary/20 rounded-full"></div>
              <div className="h-6 w-16 bg-secondary/20 rounded-full"></div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <div className="h-10 flex-1 bg-primary/30 rounded-md"></div>
            <div className="h-10 flex-1 bg-secondary/30 rounded-md"></div>
          </CardFooter>
        </Card>
      </motion.div>
    ))
  );

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center mt-24 mb-8">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-primary to-accent mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-gray-300/80 text-center font-normal max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A curated selection of my work, showcasing my skills in action.
        </motion.p>
        {/* Decorative line */}
        <motion.div 
          className="mt-4 h-1 w-24 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      
      <div className="mt-3">
        {isLoading ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {renderSkeletons()}
          </motion.div>
        ) : repos.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center">
            <Card className="w-full text-center p-8 custom-card overflow-hidden 
                   bg-gradient-to-b from-background/95 to-primary/10 
                   dark:from-background-dark/95 dark:to-primary-dark/10 
                   border-2 border-primary/15 dark:border-primary-dark/15 
                   shadow-lg hover:shadow-xl transition-all duration-300" hoverable={false}>
              {/* Removed previous styling and background elements */}
              
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <FaGithub className="text-primary/70 dark:text-primary-dark/70" size={28} />
              </div>
              
              <CardTitle className="mb-3 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">No Projects Yet</CardTitle>
              <CardDescription className="text-base">
                It looks like there are no projects to display at the moment. Please check back later or visit my GitHub profile directly!
              </CardDescription>
              
              <Button 
                href="https://github.com/Naeem1144" 
                target="_blank" 
                variant="primary" 
                className="mt-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaGithub className="mr-2" /> View on GitHub
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {repos.map((repo) => (
              <motion.div key={repo.name} variants={itemVariants}>
              <Card className="h-full flex flex-col custom-card overflow-hidden group" hoverable={false}>
                  {/* Remove previous background elements since we're using the consistent style */}
                  
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start mb-3 relative">
                      <CardTitle className="!text-lg lg:!text-xl !mb-1 break-all group-hover:text-primary transition-colors duration-300">
                        {repo.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm min-h-[3em] leading-relaxed">
                      {repo.description || 'No description provided for this project.'}
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="flex-grow relative z-10">
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {repo.topics.slice(0, 4).map(topic => (
                          <span 
                            key={topic} 
                            className="text-xs bg-gradient-to-r from-gray-500/20 to-slate-500/20 
                                     text-slate-400
                                     px-2.5 py-1 rounded-full shadow-sm
                                     border border-slate-400/20"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 relative pt-5 z-10">
                    
                    <Button 
                      href={repo.htmlUrl} 
                      target="_blank"
                      variant="primary"
                      className="w-full sm:flex-1 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </Button>
                    {repo.homepage && (
                      <Button 
                        href={repo.homepage}
                        target="_blank"
                        variant="outline"
                        className="w-full sm:flex-1 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <FaExternalLinkAlt className="mr-2" /> Live Demo
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
