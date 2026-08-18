"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Layers, Ruler, Droplets, Flame, X } from "lucide-react";
import { WoodSpecies } from "@/lib/types";
import { useQuoteModal } from "@/lib/quote-modal-context";

interface SpeciesDrawerProps {
  species: WoodSpecies | null;
  onClose: () => void;
}

export default function SpeciesDrawer({ species, onClose }: SpeciesDrawerProps) {
  const { open } = useQuoteModal();

  return (
    <AnimatePresence>
      {species && (
        <motion.div className="fixed inset-0 z-[90]">
          <motion.div
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-cream shadow-2xl"
          >
            <div
              className="relative flex h-52 shrink-0 items-end p-7"
              style={{
                background: `linear-gradient(150deg, ${species.tone[0]} 0%, ${species.tone[1]} 100%)`,
              }}
            >
              <div className="grain-overlay absolute inset-0" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 rounded-full bg-cream/90 p-2 text-forest transition hover:bg-cream"
              >
                <X size={18} />
              </button>
              <div className="relative">
                <span className="rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest">
                  {species.grade}
                </span>
                <h3 className="mt-3 font-display text-3xl text-cream drop-shadow-sm">
                  {species.name}
                </h3>
                <p className="text-xs uppercase tracking-wide text-cream/80">
                  Origin — {species.origin}
                </p>
              </div>
            </div>

            <div className="flex-1 p-7">
              <p className="text-sm leading-relaxed text-charcoal/75">
                {species.description}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <StatBlock icon={Layers} label="Density" value={species.density} />
                <StatBlock icon={Droplets} label="Moisture Content" value={species.moistureContent} />
                <StatBlock icon={Ruler} label="Grain Type" value={species.grainType} />
                <StatBlock icon={Flame} label="Seasoning" value={species.cutSizes.seasoning} />
              </div>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-ochre">
                  Best For
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {species.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sand px-3 py-1 text-xs text-charcoal/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-line bg-white">
                <p className="border-b border-line px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-forest">
                  Available Cut Sizes
                </p>
                <dl className="divide-y divide-line">
                  <CutRow label="Log Girths" value={species.cutSizes.logGirths} />
                  <CutRow label="Plank Thickness" value={species.cutSizes.plankThickness} />
                  <CutRow label="Length Range" value={species.cutSizes.lengthRange} />
                  <CutRow label="Seasoning" value={species.cutSizes.seasoning} />
                </dl>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-line bg-cream p-6">
              <button
                onClick={() => {
                  onClose();
                  open();
                }}
                className="w-full rounded-lg bg-forest px-5 py-3.5 text-sm font-medium text-cream transition hover:bg-forest-light"
              >
                Request Pricing for {species.name}
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Layers;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <Icon size={16} className="text-ochre" strokeWidth={1.5} />
      <p className="mt-2 text-[10px] uppercase tracking-wide text-charcoal/45">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-charcoal">{value}</p>
    </div>
  );
}

function CutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 text-sm">
      <dt className="text-charcoal/55">{label}</dt>
      <dd className="font-medium text-charcoal">{value}</dd>
    </div>
  );
}
