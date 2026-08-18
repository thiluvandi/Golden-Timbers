"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useQuoteModal } from "@/lib/quote-modal-context";

const NAV_LINKS = [
  { label: "Species Catalog", href: "#catalog" },
  { label: "Sawmill Services", href: "#services" },
  { label: "Sustainability & Kiln Drying", href: "#sustainability" },
  { label: "Trade Inquiry", href: "#estimator" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#hero" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight text-forest">
            Golden Timbers
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-ochre">
            Bengaluru · Est. 1985
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal/75 transition hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={open}
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-forest-light"
          >
            Get Bulk Pricing
          </button>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-forest lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-cream lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="rounded-lg px-2 py-3 text-sm text-charcoal/80 transition hover:bg-sand"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  handleNavClick();
                  open();
                }}
                className="mt-2 rounded-full bg-forest px-5 py-3 text-sm font-medium text-cream"
              >
                Get Bulk Pricing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
