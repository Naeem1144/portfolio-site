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
    <Card className="w-full max-w-sm mx-auto custom-card h-full">
      <CardContent className="animate-pulse flex flex-col items-center p-6 h-full">
        <div className="rounded-full bg-foreground/10 h-32 w-32 mb-5"></div>
        <div className="h-7 bg-foreground/10 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
        <div className="h-4 bg-foreground/10 rounded w-5/6 mb-5"></div>
        <div className="flex gap-3 mt-4 w-full justify-center">
          <div className="h-10 w-10 rounded-md bg-foreground/10"></div>
          <div className="h-10 w-10 rounded-md bg-foreground/10"></div>
          <div className="h-10 w-10 rounded-md bg-foreground/10"></div>
        </div>
        <div className="h-11 bg-foreground/10 rounded-md w-full mt-6"></div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return skeletonCard;
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-sm mx-auto custom-card h-full">
        <CardContent className="p-6 text-center flex flex-col justify-center items-center h-full">
          <p className="text-base text-foreground/60">Could not load profile information at this time.</p>
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
          <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-primary/15">
            <Image 
              src={profile.avatarUrl}
              alt={`${profile.name}'s avatar`}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
          
          <CardTitle className="!text-2xl md:!text-2xl mb-2">{profile.name}</CardTitle>
          {profile.location && (
            <p className="text-sm text-foreground/50 mb-4">{profile.location}</p>
          )}
          
          {(profile.followers !== undefined || profile.following !== undefined) && (
            <div className="flex gap-8 text-sm text-foreground/60 mb-8">
              {profile.followers !== undefined && (
                <div className="text-center">
                  <span className="font-semibold block text-base text-foreground">{profile.followers}</span> 
                  <span className="text-xs">Followers</span>
                </div>
              )}
              {profile.following !== undefined && (
                <div className="text-center">
                  <span className="font-semibold block text-base text-foreground">{profile.following}</span> 
                  <span className="text-xs">Following</span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-3 justify-center mb-6">
            <a 
              href={profile.htmlUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 rounded-lg border border-primary/10 bg-primary/5 flex items-center justify-center no-underline"
            >
              <FaGithub className="w-5 h-5 text-primary" />
            </a>
            <a 
              href="https://www.linkedin.com/in/naeemnagori/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 rounded-lg border border-primary/10 bg-primary/5 flex items-center justify-center no-underline"
            >
              <FaLinkedin className="w-5 h-5 text-primary" />
            </a>
            <a 
              href="mailto:aknaeem246@gmail.com" 
              aria-label="Send Email"
              className="w-11 h-11 rounded-lg border border-primary/10 bg-primary/5 flex items-center justify-center no-underline"
            >
              <FaEnvelope className="w-5 h-5 text-primary" />
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
