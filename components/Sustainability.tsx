"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Thermometer, TreeDeciduous } from "lucide-react";

const STEPS = [
  {
    icon: TreeDeciduous,
    title: "Responsibly Sourced",
    description:
      "Log procurement from certified plantations and managed forest concessions across 10+ source nations.",
  },
  {
    icon: Thermometer,
    title: "Kiln Dried to Heart (KDHT)",
    description:
      "Computer-monitored kiln chambers bring every batch down to 10–14% moisture content before it leaves the yard.",
  },
  {
    icon: ShieldCheck,
    title: "Chemical Treatment",
    description:
      "Boron and CCA pressure treatment options for termite, borer, and fungal resistance on request.",
  },
  {
    icon: Leaf,
    title: "Low-Waste Milling",
    description:
      "Offcuts and sawdust are redirected to packing, biomass, and particle-board partners — nothing goes to landfill.",
  },
];

export default function Sustainability() {
  return (
    <section id="sustainability" className="bg-forest py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-ochre-light">
              Our Process
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Our process to ensure every output remains premium
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/65">
            Moisture content, treatment batch, and origin are logged for every
            consignment — ask our trade desk for documentation on any order.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 bg-forest p-7"
            >
              <span className="text-xs font-medium text-ochre-light">
                0{i + 1}
              </span>
              <step.icon size={22} strokeWidth={1.5} className="text-cream" />
              <h3 className="font-display text-lg text-cream">{step.title}</h3>
              <p className="text-sm leading-relaxed text-cream/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
