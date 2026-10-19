"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  X,
  Menu,
  ChevronDown,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories, subSlug } from "@/lib/queries";

export function Wordmark({ variant = "default" }: { variant?: "default" | "footer" }) {
  const isFooter = variant === "footer";
  return (
    <Link
      href="/"
      aria-label="MediaVault Global home"
      className="wordmark inline-flex items-center transition-opacity hover:opacity-90"
    >
      <Image
        src={isFooter ? "/assets/LOGO PNG - MVGM - WHITE.png" : "/assets/LOGO PNG - MVGM.png"}
        alt="MediaVault Global Magazine"
        width={360}
        height={70}
        priority={!isFooter}
        className={
          isFooter
            ? "h-11 md:h-12 w-auto max-w-[260px] md:max-w-[290px] object-contain"
            : "h-11 sm:h-13 md:h-[62px] lg:h-[68px] w-auto max-w-[260px] sm:max-w-[320px] md:max-w-[380px] object-contain"
        }
      />
    </Link>
  );
}

export function Header() {
  const [announcement, setAnnouncement] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {announcement && (
        <div className="announcement relative flex items-center justify-center">
          <Link href="/magazine/october-2026">
            THE OCTOBER ISSUE <span className="opacity-60">|</span> India’s next chapter. Meet the
            people writing it.
            <ArrowRight size={12} />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 h-7 w-7"
            aria-label="Dismiss announcement"
            onClick={() => setAnnouncement(false)}
          >
            <X size={12} />
          </Button>
        </div>
      )}
      <header className="site-container">
        <div className="masthead">
          <div className="flex items-center gap-8">
            <Wordmark />
            <p className="masthead-note">
              Stories for leaders. Insights for builders.
              <br />
              Perspectives for what comes next.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild title="Search MediaVault">
              <Link href="/search" aria-label="Search">
                <Search size={19} />
              </Link>
            </Button>
            <Button asChild className="desktop-only" size="lg">
              <Link href="/submit-a-story">
                Pitch a Story
                <ArrowUpRight />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-only"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          {getCategories().map((c) => (
            <div className="nav-group" key={c.slug}>
              <Link
                className={`nav-item ${pathname.startsWith(`/category/${c.slug}`) ? "active" : ""}`}
                href={`/category/${c.slug}`}
              >
                {c.name}
                <ChevronDown size={10} />
              </Link>
              <div className="nav-dropdown">
                {c.subs.map((sub) => (
                  <Link key={sub} href={`/category/${c.slug}/${subSlug(sub)}`}>
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/video" className="nav-item">
            Video
          </Link>
          <Link href="/magazine" className="nav-item">
            Magazine
          </Link>
          <Link href="/about" className="nav-item">
            About
          </Link>
        </nav>
      </header>
      {open && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="flex justify-between">
            <Wordmark />
            <Button
              size="icon"
              variant="ghost"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <nav onClick={() => setOpen(false)}>
            <Link href="/">Home</Link>
            {getCategories().map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}>
                {c.name}
              </Link>
            ))}
            <Link href="/video">Video</Link>
            <Link href="/magazine">Magazine</Link>
            <Link href="/about">About</Link>
            <Link href="/partner">Partner With Us</Link>
            <Button asChild>
              <Link href="/submit-a-story">
                Pitch a Story
                <ArrowUpRight />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}

export function PartnerBand() {
  return (
    <section className="site-container partner-band">
      <div>
        <span className="eyebrow">Meaningful partnerships</span>
        <h2>Connect your brand with what comes next.</h2>
        <p>Thoughtful collaborations. Relevant conversations. Transparent partnerships.</p>
      </div>
      <Button variant="editorial" size="lg" asChild>
        <Link href="/partner">
          Partner With Us
          <ArrowUpRight />
        </Link>
      </Button>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Wordmark variant="footer" />
            <p>
              The people, ideas and businesses shaping what comes next — from India to the world.
            </p>
            <div className="flex gap-5 mt-5">
              <span title="LinkedIn coming soon">
                <Linkedin size={16} />
              </span>
              <span title="Instagram coming soon">
                <Instagram size={16} />
              </span>
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              {getCategories()
                .slice(0, 4)
                .map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
              <Link href="/magazine">The Magazine</Link>
            </div>
          </div>
          <div>
            <h3>MediaVault</h3>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/about/editorial-standards">Editorial Standards</Link>
              <Link href="/about/contribute">Write for Us</Link>
              <Link href="/partner">Partner With Us</Link>
              <Link href="/about/contact">Contact Desk</Link>
              <Link href="/video">CEO Voice</Link>
            </div>
          </div>
          <div>
            <h3>Our standards</h3>
            <div className="footer-links">
              <Link href="/about/editorial-standards">Editorial Policy</Link>
              <Link href="/corrections">Corrections</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MediaVault Global. All rights reserved.</span>
          <span>
            Preview edition · Illustrative stories, fictional profiles & AI-generated photography.
          </span>
          <span>India first. A global perspective.</span>
        </div>
      </div>
    </footer>
  );
}
