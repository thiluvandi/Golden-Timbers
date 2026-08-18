"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Send, X } from "lucide-react";
import { CONTACT, buildWhatsAppLink } from "@/lib/contact";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      `Rate sheet request — ${CONTACT.companyName}`,
      `Name: ${name}`,
      company && `Company: ${company}`,
      `Phone: ${phone}`,
      requirement && `Requirement: ${requirement}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    onClose();
    setName("");
    setCompany("");
    setPhone("");
    setRequirement("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="relative w-full max-w-md rounded-t-2xl border border-line bg-cream p-7 shadow-2xl sm:rounded-2xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-charcoal/50 transition hover:text-charcoal"
            >
              <X size={20} />
            </button>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ochre">
              Trade Inquiry
            </p>
            <h3 id="quote-modal-title" className="mt-2 font-display text-2xl text-forest">
              Request a Quote &amp; Rate Sheet
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              Share a few details and our trade desk will send current rates and stock
              availability over WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="mb-1.5 block text-xs font-medium text-charcoal/60">
                    Full Name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ochre"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="mb-1.5 block text-xs font-medium text-charcoal/60">
                    Company
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Firm / site name"
                    className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ochre"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal/60">
                  Phone / WhatsApp
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ochre"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal/60">
                  Requirement
                </label>
                <textarea
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g. Burma Teak, 50mm planks, ~200 Cft"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ochre"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-medium text-cream transition hover:bg-forest-light"
              >
                Send via WhatsApp
                <Send size={15} />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-charcoal/60">
              <a href={`tel:${CONTACT.phoneHref}`} className="inline-flex items-center gap-1.5 hover:text-ochre">
                <Phone size={13} /> {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 hover:text-ochre">
                <Mail size={13} /> {CONTACT.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
