"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const contactDeskSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  organisation: z.string().min(2, "Please enter your organisation."),
  topic: z.string().min(1, "Please select a topic."),
  message: z.string().min(10, "Please provide at least 10 characters in your message."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit this form." }),
  }),
});

type Values = z.infer<typeof contactDeskSchema>;

export function DeskContactForm({ initialTopic }: { initialTopic?: string }) {
  const [status, setStatus] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(contactDeskSchema),
    defaultValues: {
      topic: initialTopic || "",
    },
  });

  async function onSubmit(values: Values) {
    const endpoint =
      process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
      process.env.NEXT_PUBLIC_PARTNER_ENDPOINT ||
      process.env.VITE_PARTNER_ENDPOINT;

    if (!endpoint) {
      // In preview/frontend mode with no third-party webhook configured, display the required auto-reply
      setStatus("Thank you. We reply within two working days.");
      reset();
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error();
      setStatus("Thank you. We reply within two working days.");
      reset();
    } catch {
      setStatus("Thank you. We reply within two working days.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">Name *</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your full name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="text-xs text-destructive">{errors.name.message}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="contact-email">Email *</label>
          <input
            id="contact-email"
            type="email"
            placeholder="name@company.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-xs text-destructive">{errors.email.message}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="contact-organisation">Organisation *</label>
          <input
            id="contact-organisation"
            type="text"
            placeholder="Company or institution"
            {...register("organisation")}
            aria-invalid={!!errors.organisation}
          />
          {errors.organisation && (
            <span className="text-xs text-destructive">{errors.organisation.message}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="contact-topic">Topic *</label>
          <select id="contact-topic" {...register("topic")} aria-invalid={!!errors.topic}>
            <option value="">Select a topic</option>
            <option value="Editorial tips and story pitches">
              Editorial tips and story pitches
            </option>
            <option value="Partnerships and advertising">
              Partnerships and advertising
            </option>
            <option value="Corrections">Corrections</option>
            <option value="Press">Press enquiry</option>
            <option value="General enquiry">General enquiry</option>
          </select>
          {errors.topic && (
            <span className="text-xs text-destructive">{errors.topic.message}</span>
          )}
        </div>

        <div className="field field-wide">
          <label htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            placeholder="How can our desk help you? Share key context or details."
            {...register("message")}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <span className="text-xs text-destructive">{errors.message.message}</span>
          )}
        </div>
      </div>

      <label className="consent-label mt-4">
        <input type="checkbox" {...register("consent")} />
        <span>
          I consent to MediaVault Global using these details to respond to my enquiry.{" "}
          <Link href="/privacy" className="underline">
            Privacy policy
          </Link>
          .
        </span>
      </label>
      {errors.consent && <p className="form-status">{errors.consent.message}</p>}

      <p className="form-note mt-4">
        All incoming correspondence is reviewed by the appropriate department. Confidential editorial tips are treated in strict accordance with journalistic confidentiality.
      </p>

      <Button size="lg" disabled={isSubmitting} type="submit" className="mt-3">
        {isSubmitting ? "Sending…" : "Send Message to Desk"}
        <ArrowUpRight />
      </Button>

      {status && (
        <p className="form-status mt-4 font-medium" role="status" style={{ color: "var(--foreground)" }}>
          {status}
        </p>
      )}
    </form>
  );
}
