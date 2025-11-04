"use client";

import React, { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'; // Using Card sub-components
import { Button } from './ui/Button';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
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
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
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
      
      // Reset success status after a few seconds
      timeoutRef.current = setTimeout(() => setSubmitStatus('idle'), 7000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset error status after a few seconds
      timeoutRef.current = setTimeout(() => setSubmitStatus('idle'), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-accent/5 to-transparent rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-accent/10 via-primary/5 to-transparent rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="flex flex-col items-center justify-center mt-28 mb-10">
        <h2 
          className="font-bold text-foreground mb-4 text-center"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            lineHeight: 'var(--line-height-tight)',
            letterSpacing: 'var(--letter-spacing-tight)',
            textWrap: 'balance'
          }}
        >
          Let&apos;s Connect
        </h2>
        <p 
          className="text-foreground/65 text-center font-light max-w-xl"
          style={{
            fontSize: 'var(--font-size-md)',
            lineHeight: 'var(--line-height-relaxed)',
            letterSpacing: 'var(--letter-spacing-wide)'
          }}
        >
          Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you.
        </p>
        <div 
          className="mt-5 w-20 divider mx-auto"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-3 items-stretch mt-3">
        {/* Contact Form Card */}
        <div 
          className="h-full"
        >
          <Card className="custom-card overflow-hidden h-full flex flex-col">
              <CardHeader className="!pb-2 !mb-4 p-6 md:p-8 relative z-10">
              <CardTitle 
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  lineHeight: 'var(--line-height-tight)',
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-6 md:p-8 pt-0 relative z-10">
              {submitStatus === 'success' && (
                <div 
                  className="flex items-start p-4 mb-6 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-300/30 dark:border-green-700/30"
                >
                  <FaCheckCircle className="text-green-500 dark:text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 
                      className="font-semibold text-green-700 dark:text-green-300"
                      style={{
                        fontSize: 'var(--font-size-base)',
                        letterSpacing: 'var(--letter-spacing-normal)'
                      }}
                    >
                      Message Sent!
                    </h4>
                    <p 
                      className="text-green-600 dark:text-green-400/90"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: 'var(--line-height-relaxed)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    >
                      Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div 
                  className="flex items-start p-4 mb-6 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-300/30 dark:border-red-700/30"
                >
                  <FaExclamationCircle className="text-red-500 dark:text-red-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 
                      className="font-semibold text-red-700 dark:text-red-300"
                      style={{
                        fontSize: 'var(--font-size-base)',
                        letterSpacing: 'var(--letter-spacing-normal)'
                      }}
                    >
                      Oops! Something went wrong.
                    </h4>
                    <p 
                      className="text-red-600 dark:text-red-400/90"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: 'var(--line-height-relaxed)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    >
                      Please try submitting the form again, or reach out via one of my social channels.
                    </p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-6 flex-1">
                  <div className="group">
                    <label 
                      htmlFor="name" 
                      className="block font-medium text-foreground/80 mb-2 transition-colors"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    >
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
                      className="w-full px-4 py-3 rounded-lg glass-input outline-none"
                      style={{
                        fontSize: 'var(--font-size-base)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    />
                  </div>
                  
                  <div className="group">
                    <label 
                      htmlFor="email" 
                      className="block font-medium text-foreground/80 mb-2 transition-colors"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    >
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
                      className="w-full px-4 py-3 rounded-lg glass-input outline-none"
                      style={{
                        fontSize: 'var(--font-size-base)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    />
                  </div>
                  
                  <div className="group flex-1">
                    <label 
                      htmlFor="message" 
                      className="block font-medium text-foreground/80 mb-2 transition-colors"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        letterSpacing: 'var(--letter-spacing-wide)'
                      }}
                    >
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
                      className="w-full h-full min-h-[120px] px-4 py-3 rounded-lg glass-input outline-none resize-none"
                      style={{
                        fontSize: 'var(--font-size-base)',
                        letterSpacing: 'var(--letter-spacing-wide)',
                        lineHeight: 'var(--line-height-relaxed)'
                      }}
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
                    <span className="flex items-center">
                      <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">
                        <span
                          className="block h-3 w-3 rounded-full border-2"
                          style={{
                            borderColor: 'var(--border-subtle)',
                            borderTopColor: 'rgba(var(--primary-rgb), 0.85)',
                            animation: 'spin 0.8s linear infinite'
                          }}
                        />
                      </span>
                      Sending...
                    </span>
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
        </div>
      </div>
    </div>
  );
}