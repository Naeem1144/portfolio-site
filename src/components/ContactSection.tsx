"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiUser, FiMessageSquare, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  message: string;
}

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Form submission error:', errorData);
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset success status after a few seconds
      if (submitStatus === 'success') {
        setTimeout(() => setSubmitStatus('idle'), 7000);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div 
        className="flex flex-col items-center justify-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(102,126,234,0.5)',
          }}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-white/70 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? Let&apos;s create something amazing together
        </motion.p>
      </motion.div>

      {/* Contact Form */}
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className="relative p-8 md:p-12 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 45px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Animated Background Gradient */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1), rgba(236,72,153,0.1))',
              backgroundSize: '300% 300%',
              animation: 'gradientMove 8s ease infinite',
            }}
          />

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <FiCheck className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-1">Message Sent Successfully!</h4>
                  <p className="text-green-200/80 text-sm">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-300 mb-1">Oops! Something went wrong</h4>
                  <p className="text-red-200/80 text-sm">Please try again or reach out via my social channels.</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-3">
                <FiUser className="inline w-4 h-4 mr-2" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                placeholder="Your full name"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-3">
                <FiMail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                placeholder="your.email@example.com"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-3">
                <FiMessageSquare className="inline w-4 h-4 mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 resize-none"
                placeholder="Tell me about your project, ask a question, or just say hello..."
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-2xl font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.8))',
                  boxShadow: '0 8px 25px rgba(99,102,241,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={!isSubmitting ? { 
                  scale: 1.02,
                  y: -2,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9))',
                  boxShadow: '0 12px 35px rgba(99,102,241,0.4)',
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FiSend className="w-5 h-5" />
                    <span>Send Message</span>
                  </div>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}