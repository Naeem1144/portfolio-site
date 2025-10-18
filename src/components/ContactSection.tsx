"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'; // Using Card sub-components
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Removed unused icons

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-accent/5 to-transparent rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-accent/10 via-primary/5 to-transparent rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="flex flex-col items-center justify-center mt-32 mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p 
          className="text-base md:text-lg text-foreground/60 text-center font-light max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you.
        </motion.p>
        <motion.div 
          className="mt-6 h-0.5 w-20 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-3 items-stretch mt-3">
        {/* Contact Form Card */}
        <motion.div 
          className="h-full"
          variants={cardVariants}
        >
          <Card className="custom-card overflow-hidden h-full flex flex-col">
            <CardHeader className="!pb-2 !mb-4 p-6 md:p-8 relative z-10">
              <CardTitle className="!text-2xl md:!text-3xl">
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-6 md:p-8 pt-0 relative z-10">
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start p-4 mb-6 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-300/30 dark:border-green-700/30"
                >
                  <FaCheckCircle className="text-green-500 dark:text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Message Sent!</h4>
                    <p className="text-sm text-green-600 dark:text-green-400/90">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                  </div>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start p-4 mb-6 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-300/30 dark:border-red-700/30"
                >
                  <FaExclamationCircle className="text-red-500 dark:text-red-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Oops! Something went wrong.</h4>
                    <p className="text-sm text-red-600 dark:text-red-400/90">Please try submitting the form again, or reach out via one of my social channels.</p>
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-6 flex-1">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2 transition-colors">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-background/40 backdrop-blur-md outline-none focus:border-primary/30 transition-all duration-200 selection:bg-primary/20"
                    />
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2 transition-colors">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-background/40 backdrop-blur-md outline-none focus:border-primary/30 transition-all duration-200 selection:bg-primary/20"
                    />
                  </div>
                  
                  <div className="group flex-1">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 transition-colors">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can I help you?"
                      className="w-full h-full min-h-[120px] px-4 py-3 rounded-lg border border-primary/20 bg-background/40 backdrop-blur-sm outline-none focus:border-primary/40 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto mt-auto rounded-lg"
                  disabled={isSubmitting}
                >
                  <span className="flex items-center">
                    {isSubmitting ? (
                      <>
                        <motion.div className="mr-2 w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> 
                        Send Message
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}