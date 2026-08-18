"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useQuoteModal } from "@/lib/quote-modal-context";

const NAV_LINKS = [
  { label: "Species Catalog", href: "/#catalog" },
  { label: "Our Services", href: "/#services" },
  { label: "Our Process", href: "/#sustainability" },
  { label: "Trade Inquiry", href: "/#estimator" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useQuoteModal();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only intercept same-page hash links; plain page links (e.g. /about) navigate normally.
    if (!href.startsWith("/#") || pathname !== "/") {
      setMobileOpen(false);
      return;
    }

    event.preventDefault();
    const wasMobileOpen = mobileOpen;
    setMobileOpen(false);

    const scrollToTarget = () => {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (wasMobileOpen) {
      // let the mobile menu finish collapsing before measuring the scroll target
      window.setTimeout(scrollToTarget, 260);
    } else {
      scrollToTarget();
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Golden Timbers home">
          <Image
            src="/golden-timbers-mark.png"
            alt=""
            width={428}
            height={463}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-tight text-forest sm:text-xl">
              Golden Timbers
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-ochre">
              Bengaluru · Est. 1985
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-charcoal/75 transition hover:text-forest"
            >
              {link.label}
            </Link>
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-lg px-2 py-3 text-sm text-charcoal/80 transition hover:bg-sand"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
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
