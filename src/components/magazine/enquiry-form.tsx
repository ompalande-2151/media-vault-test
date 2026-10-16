"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { enquirySchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

type Values = z.infer<typeof enquirySchema>;

export function EnquiryForm({ kind }: { kind: "story" | "partner" }) {
  const [status, setStatus] = useState("");
  const story = kind === "story";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(enquirySchema) });

  async function submit(values: Values) {
    const endpoint = story
      ? process.env.NEXT_PUBLIC_STORY_ENDPOINT || process.env.VITE_STORY_ENDPOINT
      : process.env.NEXT_PUBLIC_PARTNER_ENDPOINT || process.env.VITE_PARTNER_ENDPOINT;

    if (!endpoint) {
      setStatus(
        "Submissions are not open yet. Your information has not been sent. Please check back soon.",
      );
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error();
      setStatus(
        story
          ? "Thank you. Your pitch has been sent for editorial review. Submission does not guarantee publication."
          : "Thank you. Your enquiry has been sent to the partnerships team.",
      );
    } catch {
      setStatus("Your message could not be sent. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-grid">
        {[
          { key: "name", label: "Your name", placeholder: "Full name" },
          {
            key: "email",
            label: story ? "Email address" : "Work email",
            placeholder: "you@company.com",
          },
          { key: "company", label: "Company", placeholder: "Company name" },
          { key: "role", label: "Your role", placeholder: "Job title" },
        ].map((f) => (
          <div className="field" key={f.key}>
            <label htmlFor={f.key}>{f.label} *</label>
            <input
              id={f.key}
              type={f.key === "email" ? "email" : "text"}
              placeholder={f.placeholder}
              {...register(f.key as "name" | "email" | "company" | "role")}
              aria-invalid={!!errors[f.key as keyof Values]}
            />
            {errors[f.key as keyof Values] && (
              <span className="text-xs text-destructive">
                {errors[f.key as keyof Values]?.message}
              </span>
            )}
          </div>
        ))}
        <div className="field field-wide">
          <label htmlFor="interest">{story ? "Story type" : "I’m interested in"} *</label>
          <select id="interest" {...register("interest")}>
            <option value="">Select an option</option>
            {(story
              ? ["Founder story", "Leader perspective", "Company story"]
              : [
                  "Advertising",
                  "Sponsored feature",
                  "Newsletter partnership",
                  "Video partnership",
                  "Media partnership",
                  "Events & awards",
                  "Request media kit",
                ]
            ).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          {errors.interest && (
            <span className="text-xs text-destructive">{errors.interest.message}</span>
          )}
        </div>
        <div className="field field-wide">
          <label htmlFor="message">{story ? "Tell us about your story" : "Your message"} *</label>
          <textarea
            id="message"
            placeholder={
              story
                ? "What makes this story relevant? What can our readers learn from it?"
                : "Tell us about your brand, objectives and the partnership you have in mind."
            }
            {...register("message")}
          />
          {errors.message && (
            <span className="text-xs text-destructive">{errors.message.message}</span>
          )}
        </div>
        {story && (
          <div className="field field-wide">
            <label htmlFor="links">Supporting links (optional)</label>
            <input
              id="links"
              placeholder="Website, LinkedIn or relevant coverage"
              {...register("links")}
            />
          </div>
        )}
      </div>
      <label className="consent-label">
        <input type="checkbox" {...register("consent")} />
        <span>
          I consent to MediaVault Global using these details to respond to my{" "}
          {story ? "submission" : "enquiry"}. <Link href="/privacy">Privacy policy</Link>.
        </span>
      </label>
      {errors.consent && <p className="form-status">{errors.consent.message}</p>}
      <p className="form-note mt-5">
        {story
          ? "Every pitch is reviewed on editorial merit. Submission does not guarantee publication, and no payment secures earned editorial coverage."
          : "Commercial partnerships are clearly labelled. No partnership guarantees earned editorial coverage."}
      </p>
      <Button size="lg" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending…" : story ? "Submit your Story" : "Send your Enquiry"}
        <ArrowUpRight />
      </Button>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
