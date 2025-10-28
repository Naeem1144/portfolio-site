"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from './ui/Card';
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope } from 'react-icons/fa';

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
    <Card className="w-full max-w-sm mx-auto custom-card h-full overflow-hidden">
      <div className="h-20 w-full bg-primary/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/10 to-transparent" />
      </div>
      <CardContent className="animate-pulse flex flex-col items-center p-6 pt-0 h-full">
        <div className="-mt-12 mb-4 rounded-full bg-foreground/10 h-28 w-28" />
        <div className="h-6 bg-foreground/10 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-foreground/10 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-2 gap-3 w-full mt-2">
          <div className="h-14 rounded-xl bg-foreground/10"></div>
          <div className="h-14 rounded-xl bg-foreground/10"></div>
        </div>
        <div className="flex gap-3 mt-5 w-full justify-center">
          <div className="h-11 w-11 rounded-lg bg-foreground/10"></div>
          <div className="h-11 w-11 rounded-lg bg-foreground/10"></div>
          <div className="h-11 w-11 rounded-lg bg-foreground/10"></div>
        </div>
        <div className="h-11 bg-foreground/10 rounded-lg w-full mt-6"></div>
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
    <div className="w-full h-full">
      <Card className="custom-card h-full overflow-hidden flex flex-col" hoverable={false}>
        <CardHeader className="p-0 relative">
          <div className="relative h-24 w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/10 to-transparent" />
            <div className="absolute inset-0 bg-grid-pattern opacity-25" />
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 flex flex-col items-center text-center relative z-10">
          <div className="relative -mt-12 w-28 h-28 rounded-full overflow-hidden border border-[rgba(var(--primary-rgb),0.25)] shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.35)]">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.name}'s avatar`}
              fill
              className="object-cover"
              sizes="112px"
              priority
            />
          </div>

          <CardTitle className="!text-2xl md:!text-2xl mt-4">{profile.name}</CardTitle>
          {profile.location && (
            <p className="text-sm text-foreground/55 mt-1">{profile.location}</p>
          )}

          {profile.bio && (
            <p className="mt-4 text-foreground/75 text-sm leading-relaxed line-clamp-3 max-w-xs">
              {profile.bio}
            </p>
          )}

          {(profile.followers !== undefined || profile.following !== undefined) && (
            <div className="grid grid-cols-2 gap-3 w-full mt-6">
              {profile.followers !== undefined && (
                <div className="glass-border rounded-xl px-4 py-3 text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-foreground/60">Followers</span>
                  <span className="block text-lg font-semibold text-foreground">{profile.followers}</span>
                </div>
              )}
              {profile.following !== undefined && (
                <div className="glass-border rounded-xl px-4 py-3 text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-foreground/60">Following</span>
                  <span className="block text-lg font-semibold text-foreground">{profile.following}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-center mt-6">
            <a
              href={profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 rounded-lg border border-subtle bg-primary/5 flex items-center justify-center no-underline"
              title="GitHub"
            >
              <FaGithub className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/naeemnagori/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 rounded-lg border border-subtle bg-primary/5 flex items-center justify-center no-underline"
              title="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 text-primary" />
            </a>
            <a
              href="mailto:aknaeem246@gmail.com"
              aria-label="Send Email"
              className="w-11 h-11 rounded-lg border border-subtle bg-primary/5 flex items-center justify-center no-underline"
              title="Email"
            >
              <FaEnvelope className="w-5 h-5 text-primary" />
            </a>
          </div>
        </CardContent>

        <CardFooter className="px-6">
          <Button
            href="/Naeem_Resume.pdf"
            download={true}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <FaFileDownload className="mr-2" /> Download Resume
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
