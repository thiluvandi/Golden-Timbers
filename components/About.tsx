"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useQuoteModal } from "@/lib/quote-modal-context";

export default function About() {
  const { open } = useQuoteModal();

  return (
    <>
      <section className="bg-cream pb-16 pt-36 sm:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-ochre"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mt-3 max-w-2xl font-display text-4xl leading-tight text-forest sm:text-5xl"
          >
            Four decades of trusted timber craftsmanship in Bengaluru
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-charcoal/70 sm:text-base"
          >
            From a single yard on Mysore Road to a trade partner for contractors,
            architects, and interior teams across Karnataka — this is the Golden
            Timbers story.
          </motion.p>
        </div>
      </section>

      <section className="bg-cream pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-2xl text-forest">Our Story</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/70 sm:text-base">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum. Sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-forest">Our Craft</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-base">
                Eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/70 sm:text-base">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
            </div>

            <button
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition hover:bg-forest-light"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="grain-overlay relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-forest">
              <div className="relative flex flex-col items-center gap-4 text-center">
                <button
                  type="button"
                  aria-label="Play company video"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-forest transition hover:scale-105 hover:bg-cream"
                >
                  <Play size={22} className="ml-0.5" fill="currentColor" />
                </button>
                <p className="text-xs uppercase tracking-[0.25em] text-cream/70">
                  Company Overview — Video Coming Soon
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-charcoal/50">
              A walkthrough of our Mysore Road yard, kiln facility, and milling
              floor.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
