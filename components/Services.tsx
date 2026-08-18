"use client";

import { motion } from "framer-motion";
import { Axe, DoorOpen, Flame, Truck } from "lucide-react";
import { services } from "@/lib/data/services";
import { ServiceDef } from "@/lib/types";

const ICONS: Record<ServiceDef["icon"], typeof Axe> = {
  sawblade: Axe,
  flame: Flame,
  door: DoorOpen,
  truck: Truck,
};

export default function Services() {
  return (
    <section id="services" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-ochre">
            Sawmill Services
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Beyond timber supply — full sawmilling value-add
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 sm:text-base">
            From standing log to site-ready material, our yard handles the full
            production chain for contractors, architects, and interior teams
            across Bengaluru.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-line bg-cream p-8 transition hover:border-forest/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition group-hover:bg-ochre">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-xl text-forest">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-charcoal/60"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ochre" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
