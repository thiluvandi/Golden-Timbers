"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, species } from "@/lib/data/species";
import { SpeciesCategory, WoodSpecies } from "@/lib/types";
import SpeciesDrawer from "./SpeciesDrawer";

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<SpeciesCategory | "all">("all");
  const [activeSpecies, setActiveSpecies] = useState<WoodSpecies | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? species
        : species.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="catalog" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden>
        <Image
          src="/catalog-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(0.6) sepia(0.1) contrast(1.05)" }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-cream/70"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-10 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-ochre">
              Species Catalog
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Domestic &amp; imported timber, graded for the trade
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70 sm:text-base">
              Every log entering our yard is graded, seasoned, and catalogued to
              specification — browse density, grain, and moisture data before you
              order.
            </p>
          </div>
        </div>

        <div className="scrollbar-none mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-transparent text-charcoal/70 hover:border-forest/40 hover:text-forest"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveSpecies(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveSpecies(item);
                }
              }}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_20px_45px_-25px_rgba(28,40,38,0.35)]"
            >
              <div
                className="relative flex h-44 items-end overflow-hidden p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(150deg, ${item.tone[0]} 0%, ${item.tone[1]} 100%)`,
                }}
              >
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest">
                  {item.grade}
                </span>
                <div className="grain-overlay absolute inset-0" />
                <div className="relative">
                  <h3 className="font-display text-2xl text-cream drop-shadow-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-cream/80">
                    {item.origin}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-charcoal/70">
                  <SpecRow label="Density" value={item.density} />
                  <SpecRow label="Grain" value={item.grainType} />
                  <SpecRow label="Moisture" value={item.moistureContent} />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sand px-2.5 py-1 text-[11px] text-charcoal/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="mt-auto flex items-center justify-between rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-forest transition hover:border-forest hover:bg-forest hover:text-cream"
                >
                  View Specs &amp; Cut Sizes
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <SpeciesDrawer species={activeSpecies} onClose={() => setActiveSpecies(null)} />
    </section>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-charcoal/45">{label}</dt>
      <dd className="mt-0.5 font-medium text-charcoal">{value}</dd>
    </div>
  );
}
