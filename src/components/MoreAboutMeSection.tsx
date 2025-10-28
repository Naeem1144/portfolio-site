"use client";

import React from 'react';
import { Card, CardContent } from './ui/Card';
export function MoreAboutMeSection() {
  return (
    <div
      className="w-full h-full"
    >
      <Card 
        className="custom-card h-full flex flex-col overflow-hidden"
      >
        <CardContent className="flex-1 flex flex-col justify-center p-8 relative z-10">
          <div className="space-y-6 relative">
            <p 
              className="text-foreground/70 font-light max-w-none mx-auto"
              style={{
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                letterSpacing: 'var(--letter-spacing-wide)',
                textWrap: 'pretty'
              }}
            >
            As a 21-year-old aspiring data scientist and analyst, I am deeply passionate about leveraging data to uncover impactful insights, address real-world challenges, and empower businesses with actionable intelligence. My robust foundation in data science, programming, statistics, and mathematics equips me to tackle projects with analytical rigor and a commitment to delivering meaningful results.</p>
            <div className="w-16 mx-auto divider opacity-50"></div>
            <p 
              className="text-foreground/70 font-light max-w-none mx-auto"
              style={{
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                letterSpacing: 'var(--letter-spacing-wide)',
                textWrap: 'pretty'
              }}
            >
            My journey in technology began as a child, captivated by programming in C++ on my father&apos;s laptop. This early curiosity blossomed into a profound appreciation for the transformative power of technology and data. Since 2019, I have dedicated myself to continuous growth in the field, earning multiple certifications, engaging in advanced coursework, and immersing myself in hands-on projects across diverse real-world scenarios. By actively participating in the data science community, I consistently hone my skills and contribute to the field&apos;s advancement.</p>
            <div className="w-16 mx-auto divider opacity-50"></div>
            <p 
              className="text-foreground/70 font-light max-w-none mx-auto"
              style={{
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                letterSpacing: 'var(--letter-spacing-wide)',
                textWrap: 'pretty'
              }}
            >
            While I may not yet have extensive corporate experience, I bring an abundance of dedication, knowledge, and a relentless drive to excel. I am eager to contribute my expertise and enthusiasm to any organization, delivering exceptional value and impactful outcomes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
