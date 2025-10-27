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
        <Card className="h-full flex flex-col custom-card overflow-hidden animate-pulse">
          {/* Refined skeleton shimmer effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-animation"></div>
          
          <CardHeader>
            <div className="h-6 bg-foreground/10 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-foreground/10 rounded w-full mb-1"></div>
            <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-5 w-16 bg-foreground/10 rounded"></div>
              <div className="h-5 w-16 bg-foreground/10 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-foreground/8 rounded-full"></div>
              <div className="h-6 w-24 bg-foreground/8 rounded-full"></div>
              <div className="h-6 w-16 bg-foreground/8 rounded-full"></div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <div className="h-10 flex-1 bg-primary/20 rounded-md"></div>
            <div className="h-10 flex-1 bg-foreground/10 rounded-md"></div>
          </CardFooter>
        </Card>
      </motion.div>
    ))
  );

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center mt-32 mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className="text-base md:text-lg text-foreground/60 text-center font-light max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A curated selection of my work, showcasing my skills in action.
        </motion.p>
        {/* Refined decorative line */}
        <motion.div 
          className="mt-6 h-0.5 w-20 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50"
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
            <Card className="w-full text-center p-8 custom-card overflow-hidden" hoverable={false}>
              
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <FaGithub className="text-primary" size={28} />
              </div>
              
              <CardTitle className="mb-3 text-2xl">No Projects Yet</CardTitle>
              <CardDescription className="text-base text-foreground/60">
                It looks like there are no projects to display at the moment. Please check back later or visit my GitHub profile directly!
              </CardDescription>
              
              <Button 
                href="https://github.com/Naeem1144" 
                target="_blank" 
                variant="primary" 
                className="mt-6"
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
              <Card className="h-full flex flex-col custom-card overflow-hidden" hoverable={false}>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start mb-3 relative">
                      <CardTitle className="!text-lg lg:!text-xl !mb-1 break-all">
                        {repo.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm min-h-[3em] leading-relaxed text-foreground/60">
                      {repo.description || 'No description provided for this project.'}
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="flex-grow relative z-10">
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {repo.topics.slice(0, 4).map(topic => (
                          <span 
                            key={topic} 
                            className="text-xs bg-primary/10 text-foreground/70 px-3 py-1.5 rounded-full border border-primary/10"
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
                      className="w-full sm:flex-1"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </Button>
                    {repo.homepage && (
                      <Button 
                        href={repo.homepage}
                        target="_blank"
                        variant="bordered"
                        className="w-full sm:flex-1"
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
