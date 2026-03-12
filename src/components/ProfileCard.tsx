"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin, FiExternalLink, FiDownload } from 'react-icons/fi';
import { Button } from './ui/Button';

interface ProfileCardProps {
  profile: {
    name: string;
    bio: string;
    avatarUrl: string;
    followers?: number;
    following?: number;
    htmlUrl: string;
    location?: string;
  } | null;
  isLoading?: boolean;
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className="w-24 h-24 rounded-full skeleton flex-shrink-0" />
      <div className="flex-1 w-full space-y-3">
        <div className="h-6 w-40 skeleton rounded" />
        <div className="h-4 w-24 skeleton rounded" />
        <div className="h-16 w-full skeleton rounded" />
        <div className="flex gap-3">
          <div className="h-10 w-36 skeleton rounded-lg" />
          <div className="h-10 w-32 skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProfileCard({ profile, isLoading = false }: ProfileCardProps) {
  if (isLoading) return <ProfileSkeleton />;

  if (!profile) {
    return (
      <p className="text-[var(--foreground-muted)] text-sm">Unable to load profile</p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-[var(--border)]">
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name}'s avatar`}
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-sm font-medium text-[var(--foreground)] mb-1">
          {profile.name}
        </h3>
        
        {profile.location && (
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[var(--foreground-subtle)] mb-3">
            <FiMapPin className="w-3 h-3" />
            <span>{profile.location}</span>
          </div>
        )}

        {profile.bio && (
          <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-5">
            {profile.bio}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          <Button
            href="/Naeem_Resume.pdf"
            download
            variant="primary"
          >
            <FiDownload className="w-3.5 h-3.5" />
            Download Resume
          </Button>
          
          <Button
            href={profile.htmlUrl}
            target="_blank"
            variant="outline"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            View GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
