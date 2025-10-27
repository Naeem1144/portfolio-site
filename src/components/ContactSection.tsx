
"use client";
import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import { useState, FormEvent, ChangeEvent } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Connect
        </motion.h2>
        <Card className="max-w-2xl mx-auto bg-gray-800">
          <CardHeader>
            <h3 className="text-2xl font-bold">Send a Message</h3>
          </CardHeader>
          <CardBody>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start p-4 mb-6 rounded-md bg-green-900"
              >
                <FaCheckCircle className="text-green-400 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-300">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-green-400">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="text-white"
              />
              <Input
                type="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-white"
              />
              <Input
                name="message"
                label="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="text-white"
              />
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
