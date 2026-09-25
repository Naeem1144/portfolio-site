"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { ArrowUpRight, ArrowRight, Check, LoaderCircle } from "lucide-react";

type FieldName = "name" | "email" | "message";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) =>
      previous[name as FieldName] ? { ...previous, [name as FieldName]: undefined } : previous,
    );
    if (status !== "idle") setStatus("idle");
  };
  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!formData.name.trim()) next.name = "Please enter your name.";
    if (!formData.email.trim()) next.email = "Please enter your email address.";
    else if (!emailPattern.test(formData.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!formData.message.trim()) next.message = "Please enter a message.";
    return next;
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      const firstInvalid = (["name", "email", "message"] as const).find(
        (field) => validationErrors[field],
      );
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }
    setErrors({});
    setSubmitting(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Message not sent");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="section-kicker">
        <span className="eyebrow">05 / GET IN TOUCH</span>
        <span className="availability">
          <i />
          OPEN TO OPPORTUNITIES
        </span>
      </div>
      <div className="contact-grid">
        <div className="contact-copy">
          <h2>
            Let’s talk about
            <br />
            the <em>work.</em>
            <ArrowUpRight className="contact-big-arrow" strokeWidth={1} />
          </h2>
          <p>
            Have a role, project, or question in mind? Tell me what you’re
            working on.
          </p>
          <a className="contact-email" href="mailto:aknaeem246@gmail.com">
            aknaeem246@gmail.com
            <ArrowUpRight size={22} />
          </a>
          <div className="contact-socials">
            <a
              href="https://www.linkedin.com/in/naeemnagori/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/Naeem1144"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
            <span>Ahmedabad, India</span>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-label="Contact Naeem"
          aria-busy={submitting}
          noValidate
        >
          <div className="form-heading">
            <span className="eyebrow">SHARE THE DETAILS</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                maxLength={120}
                disabled={submitting}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="field-error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                autoComplete="email"
                required
                maxLength={254}
                disabled={submitting}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="field-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Role, project, or question…"
              rows={3}
              required
              maxLength={5000}
              disabled={submitting}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p className="field-error" id="message-error">
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="button button-lime"
            disabled={submitting}
          >
            {submitting ? (
              <>
                Sending message… <LoaderCircle className="spinner" size={18} />
              </>
            ) : (
              <>
                Send message <ArrowRight size={19} />
              </>
            )}
          </button>
          <div className="form-status" role="status" aria-live="polite">
            {status === "success" && (
              <p className="success-message">
                <Check size={16} />
                Message sent. Thanks for reaching out.
              </p>
            )}
          {status === "error" && (
            <p className="error-message">
              {Object.keys(errors).length > 0 ? (
                "Please fix the highlighted fields and try again."
              ) : (
                <>
                  Message couldn&rsquo;t be sent. Try again or{" "}
                  <a href="mailto:aknaeem246@gmail.com">email me directly</a>.
                </>
              )}
            </p>
          )}
          </div>
        </form>
      </div>
    </>
  );
}
