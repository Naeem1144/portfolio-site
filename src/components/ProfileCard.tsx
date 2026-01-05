"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { FiMapPin, FiExternalLink } from 'react-icons/fi';
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

// Skeleton loader
function ProfileSkeleton() {
  return (
    <div className="card">
      <div className="card-content p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl skeleton mb-4" />
          <div className="h-6 w-36 skeleton rounded mb-2" />
          <div className="h-4 w-28 skeleton rounded mb-3" />
          <div className="h-12 w-full skeleton rounded mb-4" />
          <div className="h-11 w-full skeleton rounded-lg mb-2" />
          <div className="h-11 w-full skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProfileCard({ profile, isLoading = false }: ProfileCardProps) {
  if (isLoading) return <ProfileSkeleton />;

  if (!profile) {
    return (
      <div className="card">
        <div className="card-content flex items-center justify-center p-6">
          <p className="text-[var(--foreground-muted)]">Unable to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <div className="card-content p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[var(--border)]">
              <Image
                src={profile.avatarUrl}
                alt={`${profile.name}'s avatar`}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--accent)] rounded-full border-2 border-[var(--background-card)]" />
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
            {profile.name}
          </h3>
          
          {/* Location */}
          {profile.location && (
            <div className="flex items-center gap-1 text-sm text-[var(--foreground-subtle)] mb-3">
              <FiMapPin className="w-3.5 h-3.5" />
              <span>{profile.location}</span>
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-5">
              {profile.bio}
            </p>
          )}

          {/* Actions */}
          <div className="w-full space-y-2">
            <Button
              href="/Naeem_Resume.pdf"
              download
              variant="primary"
              className="w-full"
            >
              <FaDownload className="w-4 h-4" />
              Download Resume
            </Button>
            
            <Button
              href={profile.htmlUrl}
              target="_blank"
              variant="outline"
              className="w-full"
            >
              <FiExternalLink className="w-4 h-4" />
              View GitHub
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
