"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent, } from './ui/Card';
import { Button } from './ui/Button';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

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
        throw new Error('Failed to send message');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 7000);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have a question or proposal? I&apos;d love to hear from you.
        </p>
      </div>

      <Card className="border border-white/10 bg-zinc-900/30 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          {submitStatus === 'success' && (
            <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FaCheckCircle size={18} />
              <div className="text-sm font-medium">Message sent successfully!</div>
            </div>
          )}

          {submitStatus === 'error' && (
             <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
               <FaExclamationCircle size={18} />
               <div className="text-sm font-medium">Something went wrong. Please try again.</div>
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
                 <input
                   type="text"
                   id="name"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   required
                   placeholder="John Doe"
                   className="w-full px-4 py-2.5 rounded-md bg-zinc-900/50 border border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                 />
               </div>
               <div className="space-y-2">
                 <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   required
                   placeholder="john@example.com"
                   className="w-full px-4 py-2.5 rounded-md bg-zinc-900/50 border border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
               <textarea
                 id="message"
                 name="message"
                 value={formData.message}
                 onChange={handleChange}
                 required
                 rows={5}
                 placeholder="How can I help you?"
                 className="w-full px-4 py-3 rounded-md bg-zinc-900/50 border border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-all placeholder:text-muted-foreground/50 text-sm resize-none"
               />
            </div>

            <Button
               type="submit"
               variant="primary" // Primary
               className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-medium"
               disabled={isSubmitting}
             >
               {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
