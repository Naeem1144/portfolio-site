"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card'; // Only keeping used components
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  profile: {
    name: string;
    bio: string;
    avatarUrl: string;
    followers?: number;
    following?: number;
    htmlUrl: string;
    location?: string; // Added location
  } | null;
  isLoading?: boolean;
}

export function ProfileCard({ profile, isLoading = false }: ProfileCardProps) {
  const skeletonCard = (
    <Card className="w-full max-w-sm mx-auto custom-card h-full 
                   bg-gradient-to-b from-background/95 to-primary/10 
                   dark:from-background-dark/95 dark:to-primary-dark/10 
                   border-2 border-primary/15 dark:border-primary-dark/15 
                   shadow-lg"> {/* Added common styles */}
      <CardContent className="animate-pulse flex flex-col items-center p-6 h-full"> {/* Added h-full */}
        <div className="rounded-full bg-secondary/30 h-32 w-32 mb-5"></div>
        <div className="h-7 bg-secondary/30 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-secondary/30 rounded w-full mb-2"></div>
        <div className="h-4 bg-secondary/30 rounded w-5/6 mb-5"></div>
        <div className="flex gap-3 mt-4 w-full justify-center">
          <div className="h-10 w-10 rounded-full bg-secondary/30"></div>
          <div className="h-10 w-10 rounded-full bg-secondary/30"></div>
          <div className="h-10 w-10 rounded-full bg-secondary/30"></div>
        </div>
        <div className="h-11 bg-secondary/30 rounded-md w-full mt-6"></div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return skeletonCard;
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-sm mx-auto custom-card h-full 
                     bg-gradient-to-b from-background/95 to-primary/10 
                     dark:from-background-dark/95 dark:to-primary-dark/10 
                     border-2 border-primary/15 dark:border-primary-dark/15 
                     shadow-lg"> {/* Added common styles */}
        <CardContent className="p-6 text-center flex flex-col justify-center items-center h-full">
          <p className="text-lg text-foreground/70">Could not load profile information at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Card 
        className="overflow-hidden custom-card h-full flex flex-col"
        hoverable={false}
      >
        <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
          <div className="relative w-36 h-36 mb-5 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            <Image 
              src={profile.avatarUrl}
              alt={`${profile.name}'s avatar`}
              fill
              className="object-cover"
              sizes="144px"
              priority
            />
          </div>
          
          <CardTitle className="!text-2xl md:!text-3xl mb-1">{profile.name}</CardTitle>
          {profile.location && (
            <p className="text-sm text-foreground/60 dark:text-foreground-dark/60 mb-3">{profile.location}</p>
          )}
          
          {(profile.followers !== undefined || profile.following !== undefined) && (
            <div className="flex gap-6 text-sm text-foreground/70 dark:text-foreground-dark/70 mb-6">
              {profile.followers !== undefined && (
                <div className="text-center">
                  <span className="font-bold block text-lg text-primary dark:text-primary-dark">{profile.followers}</span> Followers
                </div>
              )}
              {profile.following !== undefined && (
                <div className="text-center">
                  <span className="font-bold block text-lg text-primary dark:text-primary-dark">{profile.following}</span> Following
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-4 justify-center mb-6">
            <a 
              href={profile.htmlUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-12 h-12 rounded-md border-2 border-primary/20 hover:border-primary/40 bg-background/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 no-underline hover:no-underline"
            >
              <FaGithub className="w-6 h-6 text-primary" />
            </a>
            <a 
              href="https://www.linkedin.com/in/naeemnagori/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-12 h-12 rounded-md border-2 border-primary/20 hover:border-primary/40 bg-background/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 no-underline hover:no-underline"
            >
              <FaLinkedin className="w-6 h-6 text-primary" />
            </a>
            <a 
              href="mailto:aknaeem246@gmail.com" 
              aria-label="Send Email"
              className="w-12 h-12 rounded-md border-2 border-primary/20 hover:border-primary/40 bg-background/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 no-underline hover:no-underline"
            >
              <FaEnvelope className="w-6 h-6 text-primary" />
            </a>
          </div>

          <Button 
            href="/Naeem_Resume.pdf"
            download={true}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <FaFileDownload className="mr-2" /> Download Resume
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
