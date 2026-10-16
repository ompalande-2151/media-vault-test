"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ABOUT_LINKS = [
  { href: "/about", label: "Overview" },
  { href: "/about/editorial-standards", label: "Mission & Standards" },
  { href: "/about/team", label: "The Team" },
  { href: "/about/contact", label: "Contact Us" },
  { href: "/about/contribute", label: "Careers & Contributors" },
];

export function AboutNav() {
  const pathname = usePathname();

  return (
    <nav className="section-subnav" aria-label="About section navigation">
      {ABOUT_LINKS.map((item) => {
        const isActive =
          item.href === "/about"
            ? pathname === "/about"
            : pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`section-subnav-link ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
