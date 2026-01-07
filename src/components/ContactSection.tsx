"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/Loading';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const contactLinks = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'aknaeem246@gmail.com',
    href: 'mailto:aknaeem246@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: '/in/naeemnagori',
    href: 'https://www.linkedin.com/in/naeemnagori/',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: '/Naeem1144',
    href: 'https://github.com/Naeem1144',
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-12"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="badge badge-accent mb-4 inline-block"
        >
          Get in Touch
        </motion.span>
        <h2 className="text-[var(--foreground)]">Let&apos;s Work Together</h2>
        <p className="mx-auto">
          Open to full-time roles, freelance projects, and exciting collaborations.
        </p>
      </motion.div>

      {/* Main Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        {/* Left - Contact Info */}
        <div className="space-y-6">
          {/* Intro */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-3">
              Looking for a data scientist?
            </h3>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              I&apos;m actively seeking opportunities where I can apply my skills in 
              machine learning, deep learning, and data analytics to solve meaningful problems. 
              Whether you&apos;re hiring or have a project in mind, I&apos;d love to connect.
            </p>
          </div>

          {/* Location & Availability */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--chrome)] border border-[var(--border)]">
              <span className="text-base sm:text-lg">📍</span>
              <span className="text-xs sm:text-sm text-[var(--foreground-muted)]">Ontario, Canada</span>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span className="text-xs sm:text-sm text-[var(--accent)] font-medium">Open to work</span>
            </div>
          </div>

          {/* Contact Links */}
          <div className="space-y-3 pt-2">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--background-card)] border border-[var(--border)]
                  hover:border-[var(--accent)]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--chrome)] flex items-center justify-center
                  group-hover:bg-[var(--accent)]/10 transition-colors">
                  <link.icon className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--foreground-subtle)] uppercase tracking-wider">{link.label}</p>
                  <p className="text-sm text-[var(--foreground)] font-medium">{link.value}</p>
                </div>
                <svg className="w-4 h-4 text-[var(--foreground-subtle)] group-hover:text-[var(--accent)] transition-colors" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="card card-glow">
          <div className="card-content p-4 sm:p-6 md:p-8">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20"
              >
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                  <p className="text-sm text-[var(--accent)]">
                    Message sent! I&apos;ll get back to you soon.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <div className="flex items-center gap-3">
                  <FaExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Name <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Email <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="input"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Message <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Tell me about the role or project..."
                  className="input resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="border-[var(--background)]/30 border-t-[var(--background)]" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
