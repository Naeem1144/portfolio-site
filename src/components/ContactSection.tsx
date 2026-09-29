"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { CopyEmail } from "./CopyEmail";
import { LocalTime } from "./LocalTime";
import { site } from "@/lib/site";

type FieldName = "name" | "email" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "invalid" }
  | { kind: "failed"; reason: string };

const FIELDS: FieldName[] = ["name", "email", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MAX = 5000;
const REQUEST_TIMEOUT_MS = 15000;
const EMPTY: Values = { name: "", email: "", message: "" };

/** Who's asking. Each one rewrites the query's answer and the message prompt. */
const TOPICS = [
  {
    id: "role",
    where: "hiring for a data role",
    reply: "Send me the role. I'll come back with questions, and a time to talk.",
    placeholder: "Tell me about the role, the team and the data they work with",
  },
  {
    id: "data",
    where: "has a dataset to explore",
    reply: "Send a sample. I'll tell you what it can answer, and what it can't.",
    placeholder: "What's in the data, and what would you like to know from it?",
  },
  {
    id: "hello",
    where: "just saying hello",
    reply: "Hello back. Ask me anything about the work above.",
    placeholder: "Say hello, or ask about any of the projects",
  },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email address doesn’t look right.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  return errors;
}

async function failureReason(response: Response): Promise<string> {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string; retryAfter?: number }
    | null;
  if (payload?.error === "tooMany") {
    const minutes = Math.max(1, Math.ceil((payload.retryAfter ?? 60) / 60));
    return `That's a lot of messages in a short time. Please try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`;
  }
  if (payload?.error === "delivery") return "Sorry, your message couldn’t be delivered.";
  return payload?.error ?? `The server returned an error (${response.status}).`;
}

export function ContactSection() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [topicId, setTopicId] = useState<TopicId>("role");
  const topic = TOPICS.find((t) => t.id === topicId)!;
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName;
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus({ kind: "invalid" });
      const first = FIELDS.find((field) => found[field]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    setStatus({ kind: "idle" });

    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      if (!response.ok) {
        setStatus({ kind: "failed", reason: await failureReason(response) });
        return;
      }
      setStatus({ kind: "success" });
      setValues(EMPTY);
    } catch (error) {
      setStatus({
        kind: "failed",
        reason:
          (error as Error)?.name === "AbortError"
            ? "Sorry, that took too long to send."
            : "I couldn’t reach the server. Please check your connection.",
      });
    } finally {
      clearTimeout(timer);
      abortRef.current = null;
      setSubmitting(false);
    }
  };

  const field = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    readOnly: submitting,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name: FieldName): ReactNode =>
    errors[name] && (
      <p className="field__error" id={`contact-${name}-error`}>
        {errors[name]}
      </p>
    );

  return (
    <div className="contact">
      <header className="contact__head" data-reveal="rise">
        <p className="eyebrow">
          <span className="eyebrow__no">03</span>Contact
        </p>
        <h2 id="contact-heading" className="contact__title">
          Got data? <mark className="hl">Let&apos;s talk.</mark>
        </h2>
      </header>

      <div className="contact__intro">
        <div className="query">
          <p className="query__comment" aria-hidden="true">
            -- What brings you here?
          </p>
          <p aria-hidden="true">
            <span className="query__kw">SELECT</span> reply
          </p>
          <p aria-hidden="true">
            <span className="query__kw">FROM</span> naeem
          </p>
          <p className="query__where">
            <span aria-hidden="true">
              <span className="query__kw">WHERE</span> you =
            </span>
            <label className="sr-only" htmlFor="contact-topic">
              What brings you here?
            </label>
            <span className="query__pick">
              <select
                id="contact-topic"
                value={topicId}
                onChange={(event) => setTopicId(event.target.value as TopicId)}
              >
                {TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    &apos;{t.where}&apos;
                  </option>
                ))}
              </select>
              <ChevronDown className="query__chevron" size={15} aria-hidden="true" />
            </span>
          </p>
          <p className="query__result" aria-live="polite">
            <span className="query__rows" aria-hidden="true">
              1 row
            </span>
            {topic.reply}
          </p>
        </div>

        <p className="contact__lede">Email is quickest. I usually reply within two days.</p>

        <CopyEmail className="contact__email" />
        <LocalTime />

        <ul className="contact__links">
          <li>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              LinkedIn
              <ArrowUpRight className="link__icon" size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              GitHub
              <ArrowUpRight className="link__icon" size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={site.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {site.resume.label}
              <ArrowUpRight className="link__icon" size={16} aria-hidden="true" />
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <form
        className="form"
        onSubmit={handleSubmit}
        aria-label="Send a message"
        aria-busy={submitting}
        noValidate
      >
        <div className="form__row">
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input {...field("name")} autoComplete="name" maxLength={120} />
            {fieldError("name")}
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              {...field("email")}
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              maxLength={254}
            />
            {fieldError("email")}
          </div>
        </div>

        <div className="field">
          <label htmlFor="contact-message">
            Message
            <span className="field__counter" aria-hidden="true">
              {values.message.length > MESSAGE_MAX * 0.8 &&
                `${values.message.length} / ${MESSAGE_MAX}`}
            </span>
          </label>
          <textarea
            {...field("message")}
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder={topic.placeholder}
          />
          {fieldError("message")}
        </div>

        <div className="form__foot">
          <button type="submit" className="button button--primary" disabled={submitting}>
            {submitting ? (
              <>
                Sending
                <LoaderCircle className="spinner" size={17} aria-hidden="true" />
              </>
            ) : (
              <>
                Send message
                <ArrowRight className="button__icon" size={17} aria-hidden="true" />
              </>
            )}
          </button>

          <div className="form__status" role="status" aria-live="polite" aria-atomic="true">
            {status.kind === "success" && (
              <p className="form__success">
                <Check size={16} aria-hidden="true" />
                Sent. Thanks for getting in touch, I&rsquo;ll get back to you soon.
              </p>
            )}
            {status.kind === "invalid" && (
              <p className="form__error">Nearly there. Please check the fields marked above.</p>
            )}
            {status.kind === "failed" && (
              <p className="form__error">
                {status.reason} You can{" "}
                <a href={`mailto:${site.email}`}>email me directly</a> instead.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
