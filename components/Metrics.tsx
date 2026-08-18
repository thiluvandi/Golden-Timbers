"use client";

import { motion } from "framer-motion";
import { Globe2, ShieldCheck, Timer, Truck } from "lucide-react";

const METRICS = [
  {
    icon: Timer,
    value: "40+",
    label: "Years of Timber Expertise",
  },
  {
    icon: Globe2,
    value: "10+",
    label: "Nations Imported From",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Kiln-Seasoned & Termite Resistant Options",
  },
  {
    icon: Truck,
    value: "Direct",
    label: "Site Delivery Across Bangalore & Karnataka",
  },
];

export default function Metrics() {
  return (
    <section className="relative border-y border-line bg-forest">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-line/10 px-6 lg:grid-cols-4 lg:px-10">
        {METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 bg-forest px-4 py-10 sm:px-6"
          >
            <metric.icon size={20} className="text-ochre-light" strokeWidth={1.5} />
            <span className="font-display text-3xl text-cream sm:text-4xl">
              {metric.value}
            </span>
            <span className="text-xs leading-snug text-cream/60 sm:text-sm">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
