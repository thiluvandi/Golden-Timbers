"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { useQuoteModal } from "@/lib/quote-modal-context";

const NAV_LINKS = [
  { label: "Species Catalog", href: "/#catalog" },
  { label: "Sawmill Services", href: "/#services" },
  { label: "Sustainability & Kiln Drying", href: "/#sustainability" },
  { label: "Trade Inquiry", href: "/#estimator" },
  { label: "About Us", href: "/about" },
];

export default function Footer() {
  const { open } = useQuoteModal();

  return (
    <footer className="bg-espresso text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/golden-timbers-mark.png"
                alt=""
                width={428}
                height={463}
                className="h-9 w-auto"
              />
              <span className="font-display text-xl text-cream">Golden Timbers</span>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-ochre-light">
              Timber Yard &amp; Sawmill
            </p>
            <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0 text-ochre-light" />
              <span>
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-ochre-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
              Trade Desk
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="inline-flex items-center gap-2 transition hover:text-ochre-light"
                >
                  <Phone size={15} /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-ochre-light"
                >
                  <Mail size={15} /> {CONTACT.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
              Working Hours
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {CONTACT.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span className="text-cream/60">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
              Documentation
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              Get the current e-catalog and rate sheet sent directly to your inbox
              or WhatsApp.
            </p>
            <button
              onClick={open}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm font-medium transition hover:border-ochre-light hover:text-ochre-light"
            >
              <Download size={15} />
              E-Catalog &amp; Price List
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Golden Timbers. Trading since{" "}
            {CONTACT.since}. All rights reserved.
          </p>
          <p>GSTIN: {CONTACT.gstin}</p>
        </div>
      </div>
    </footer>
  );
}
