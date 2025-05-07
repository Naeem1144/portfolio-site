"use client";

import React from 'react';
import { Card, CardContent } from './ui/Card';
import { motion } from 'framer-motion';

export function MoreAboutMeSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full h-full"
    >
      <Card 
        className="custom-card h-full flex flex-col overflow-hidden 
                   bg-gradient-to-b from-background/95 to-primary/10 
                   dark:from-background-dark/95 dark:to-primary-dark/10 
                   border-2 border-primary/15 dark:border-primary-dark/15 
                   shadow-lg hover:shadow-xl transition-all duration-300" 
        hoverable={false}
      >
        {/* Remove the previous background layers since we're using the same gradient as ProfileCard */}
        
        <CardContent className="flex-1 flex flex-col justify-center p-8">
          <div className="space-y-4 relative">
            <p className="text-foreground/90 dark:text-foreground-dark/90 text-sm md:text-base leading-relaxed font-normal">
            As a 21-year-old aspiring data scientist and analyst, I am deeply passionate about leveraging data to uncover impactful insights, address real-world challenges, and empower businesses with actionable intelligence. My robust foundation in data science, programming, statistics, and mathematics equips me to tackle projects with analytical rigor and a commitment to delivering meaningful results.</p>
            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
            <p className="text-foreground/90 dark:text-foreground-dark/90 text-sm md:text-base leading-relaxed font-normal">
            My journey in technology began as a child, captivated by programming in C++ on my father&apos;s laptop. This early curiosity blossomed into a profound appreciation for the transformative power of technology and data. Since 2019, I have dedicated myself to continuous growth in the field, earning multiple certifications, engaging in advanced coursework, and immersing myself in hands-on projects across diverse real-world scenarios. By actively participating in the data science community, I consistently hone my skills and contribute to the field&apos;s advancement.</p>
            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
            <p className="text-foreground/90 dark:text-foreground-dark/90 text-sm md:text-base leading-relaxed font-normal">
            While I may not yet have extensive corporate experience, I bring an abundance of dedication, knowledge, and a relentless drive to excel. I am eager to contribute my expertise and enthusiasm to any organization, delivering exceptional value and impactful outcomes.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
