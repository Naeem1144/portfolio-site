"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiSend, FiArrowUpRight } from 'react-icons/fi';
import { Button } from './ui/Button';

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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header mb-10"
      >
        <h2 className="text-[var(--foreground)]">Get in Touch</h2>
        <p className="mx-auto">
          Open to full-time roles, freelance projects, and collaborations.
        </p>
      </motion.div>

      {/* Main Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
      >
        {/* Left - Contact Info */}
        <div>
          <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-6">
            I&apos;m actively seeking opportunities where I can apply my skills in
            machine learning, deep learning, and data analytics to solve meaningful problems.
          </p>

          <p className="text-xs text-[var(--foreground-subtle)] mb-6">
            Ontario, Canada · Open to work
          </p>

          {/* Contact Links — row/divider pattern */}
          <div className="border-t border-[var(--border)]">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between gap-4 py-3.5 border-b border-[var(--border)]
                  group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <link.icon className="w-4 h-4 text-[var(--foreground-subtle)] flex-shrink-0" />
                  <span className="text-sm text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors truncate">
                    {link.value}
                  </span>
                </div>
                <FiArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)] transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form (open, no card wrapper) */}
        <div>
          {/* Success Message */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-2.5"
            >
              <FaCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-400">
                Message sent. I&apos;ll get back to you soon.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-2.5"
            >
              <FaExclamationCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="label">
                  Name
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
                <label htmlFor="email" className="label">
                  Email
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
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
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
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[var(--background)] border-t-transparent rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-3.5 h-3.5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
