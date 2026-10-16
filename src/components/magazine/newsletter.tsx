"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsletterSchema } from "@/lib/schemas";

export function Newsletter() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("website")) return;
    const result = newsletterSchema.safeParse({
      email: form.get("email"),
      consent: form.get("consent") === "on",
    });
    if (!result.success) {
      setStatus(result.error.issues[0]?.message || "Check your details.");
      return;
    }
    const endpoint =
      process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || process.env.VITE_NEWSLETTER_ENDPOINT;
    if (!endpoint) {
      setStatus("Newsletter subscriptions are not open yet. Please check back soon.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error();
      setStatus("Check your inbox to confirm your subscription.");
    } catch {
      setStatus("We could not subscribe you. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="newsletter-band">
      <div className="site-container newsletter-inner">
        <div>
          <span className="eyebrow">The MediaVault Brief</span>
          <h2>
            A fresh perspective.
            <br />
            Straight to your inbox.
          </h2>
          <p>The stories, insights and ideas that deserve a place in your week.</p>
        </div>
        <form onSubmit={submit}>
          <div className="newsletter-fields">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
            />
            <Button size="lg" disabled={busy} type="submit">
              {busy ? "Subscribing…" : "Subscribe to the Brief"}
              <ArrowUpRight />
            </Button>
          </div>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <label className="consent-label">
            <input type="checkbox" name="consent" required />
            <span>
              I agree to receive the MediaVault Brief. Unsubscribe anytime.{" "}
              <Link href="/privacy">Privacy policy</Link>.
            </span>
          </label>
          {status && (
            <p role="status" className="form-status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
