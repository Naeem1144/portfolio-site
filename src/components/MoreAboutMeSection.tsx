"use client";

import React from 'react';
import { Card, CardContent } from './ui/Card';
export function MoreAboutMeSection() {
  return (
    <div className="w-full h-full">
      <Card className="custom-card h-full flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col justify-center p-8 lg:p-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/8 bg-background/60 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-foreground/60 mb-3">About me</p>
              <p className="text-foreground/80 leading-relaxed text-sm">
                A 21-year-old data scientist and analyst in progress—curious, disciplined, and focused on translating messy datasets into decisions that move the needle.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-background/60 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-foreground/60 mb-3">Journey</p>
              <p className="text-foreground/80 leading-relaxed text-sm">
                From tinkering with C++ as a kid to deep dives into ML, statistics, and business analytics since 2019—certifications, coursework, and plenty of hands-on builds sharpen how I approach each problem.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-background/60 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-foreground/60 mb-3">What you get</p>
              <p className="text-foreground/80 leading-relaxed text-sm">
                A partner who asks the right questions, documents clearly, iterates quickly, and cares about measurable outcomes more than flashy charts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
