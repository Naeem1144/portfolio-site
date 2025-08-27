"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiDownload, FiMail, FiMapPin } from 'react-icons/fi';
import { motion, useTransform, useMotionValue } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const skeletonCard = (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative overflow-hidden rounded-3xl h-full p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
        }}
      >
        <div className="animate-pulse flex flex-col items-center h-full">
          <div className="w-32 h-32 rounded-full bg-white/10 mb-6" />
          <div className="h-6 bg-white/10 rounded-lg w-3/4 mb-3" />
          <div className="h-4 bg-white/10 rounded-lg w-1/2 mb-6" />
          <div className="flex gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10" />
            <div className="w-16 h-16 rounded-2xl bg-white/10" />
            <div className="w-16 h-16 rounded-2xl bg-white/10" />
          </div>
          <div className="w-full h-12 bg-white/10 rounded-xl" />
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return skeletonCard;
  }

  if (!profile) {
    return (
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="relative overflow-hidden rounded-3xl h-full p-8 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 45px rgba(0,0,0,0.1)',
          }}
        >
          <p className="text-lg text-white/70 text-center">Could not load profile information at this time.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full perspective-1000"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="relative overflow-hidden rounded-3xl h-full p-8 transition-all duration-500"
          style={{
            background: isHovered 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(25px)',
            border: isHovered 
              ? '1px solid rgba(255,255,255,0.2)' 
              : '1px solid rgba(255,255,255,0.1)',
            boxShadow: isHovered 
              ? '0 35px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
              : '0 25px 45px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Animated Background Gradient */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1), rgba(236,72,153,0.1))',
              backgroundSize: '300% 300%',
              animation: 'gradientMove 8s ease infinite',
            }}
          />

          {/* Floating Elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 flex flex-col items-center text-center h-full">
            {/* Profile Image with 3D Effect */}
            <motion.div
              className="relative mb-6"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
                    padding: '3px',
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <Image 
                      src={profile.avatarUrl}
                      alt={`${profile.name}'s avatar`}
                      fill
                      className="object-cover"
                      sizes="128px"
                      priority
                    />
                  </div>
                </div>
              </div>
              
              {/* Status Indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </motion.div>
            
            {/* Name and Title */}
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {profile.name}
            </motion.h3>

            {profile.location && (
              <motion.div 
                className="flex items-center gap-2 text-white/70 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <FiMapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{profile.location}</span>
              </motion.div>
            )}
            
            {/* Stats */}
            {(profile.followers !== undefined || profile.following !== undefined) && (
              <motion.div 
                className="flex gap-8 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {profile.followers !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{profile.followers}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Followers</div>
                  </div>
                )}
                {profile.following !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{profile.following}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Following</div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Social Links */}
            <motion.div 
              className="flex gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                { href: profile.htmlUrl, icon: FaGithub, label: "GitHub", color: "from-gray-600 to-gray-800" },
                { href: "https://www.linkedin.com/in/naeemnagori/", icon: FaLinkedin, label: "LinkedIn", color: "from-blue-600 to-blue-800" },
                { href: "mailto:aknaeem246@gmail.com", icon: FiMail, label: "Email", color: "from-red-500 to-pink-600" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                  rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center no-underline transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    background: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </motion.a>
              ))}
            </motion.div>
            
            {/* Download Button */}
            <motion.div
              className="w-full mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.a
                href="/Naeem_Resume.pdf"
                target="_blank"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-medium rounded-2xl no-underline transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.8))',
                  boxShadow: '0 8px 25px rgba(99,102,241,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9))',
                  boxShadow: '0 12px 35px rgba(99,102,241,0.4)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
}
