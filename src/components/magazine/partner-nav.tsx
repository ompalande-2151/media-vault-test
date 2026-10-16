"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PARTNER_LINKS = [
  { href: "/partner", label: "Overview" },
  { href: "/partner/sponsored-content", label: "Sponsored & Partner Content" },
  { href: "/partner/advertise", label: "Advertise" },
  { href: "/partner/press-releases", label: "Press Releases" },
  { href: "/partner/awards-events", label: "Awards & Events" },
];

export function PartnerNav() {
  const pathname = usePathname();

  return (
    <nav className="section-subnav" aria-label="Partner section navigation">
      {PARTNER_LINKS.map((item) => {
        const isActive =
          item.href === "/partner"
            ? pathname === "/partner" || pathname === "/partner-with-us"
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
