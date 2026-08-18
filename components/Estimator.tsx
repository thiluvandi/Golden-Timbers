"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { species } from "@/lib/data/species";
import { buildWhatsAppLink } from "@/lib/contact";

type Format = "Round Logs" | "Sawn Planks" | "Door Frames";

const FORMATS: { value: Format; unit: string; description: string }[] = [
  { value: "Round Logs", unit: "Cft", description: "Unmilled logs, sold by cubic feet" },
  { value: "Sawn Planks", unit: "Sq.ft", description: "Milled to your thickness spec" },
  { value: "Door Frames", unit: "Units", description: "Fabricated to opening size" },
];

const STEP_LABELS = ["Species", "Format", "Volume", "Delivery"];

export default function Estimator() {
  const [step, setStep] = useState(0);
  const [speciesId, setSpeciesId] = useState(species[0].id);
  const [format, setFormat] = useState<Format>("Round Logs");
  const [volume, setVolume] = useState("");
  const [pincode, setPincode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedSpecies = useMemo(
    () => species.find((s) => s.id === speciesId) ?? species[0],
    [speciesId]
  );
  const selectedFormat = useMemo(
    () => FORMATS.find((f) => f.value === format)!,
    [format]
  );

  const canAdvance = [
    Boolean(speciesId),
    Boolean(format),
    Boolean(volume),
    /^\d{6}$/.test(pincode),
  ];

  const goNext = () => setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const summary = `Timber Estimate Request — Golden Timbers
Species: ${selectedSpecies.name} (${selectedSpecies.origin})
Format: ${format}
Volume: ${volume} ${selectedFormat.unit}
Delivery Pincode: ${pincode}, Bengaluru`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const sendOnWhatsApp = () => {
    window.open(buildWhatsAppLink(summary), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="estimator" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-ochre">
            Trade Inquiry
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Timber Estimator
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-charcoal/70 sm:text-base">
            Build a structured inquiry in under a minute — we&rsquo;ll respond with
            rates and stock availability over WhatsApp.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-white p-6 sm:p-10">
          {!submitted ? (
            <>
              <ol className="mb-9 flex items-center justify-between">
                {STEP_LABELS.map((label, i) => (
                  <li key={label} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition ${
                          i < step
                            ? "bg-ochre text-cream"
                            : i === step
                            ? "bg-forest text-cream"
                            : "bg-sand text-charcoal/40"
                        }`}
                      >
                        {i < step ? <Check size={14} /> : i + 1}
                      </div>
                      <span className="hidden text-[11px] text-charcoal/50 sm:block">
                        {label}
                      </span>
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div
                        className={`mx-2 h-px flex-1 ${
                          i < step ? "bg-ochre" : "bg-line"
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="min-h-[220px]"
                  >
                    {step === 0 && (
                      <div>
                        <h3 className="font-display text-xl text-forest">
                          Select Species
                        </h3>
                        <p className="mt-1 text-sm text-charcoal/60">
                          Choose the timber species for your order.
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {species.map((item) => (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => setSpeciesId(item.id)}
                              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition ${
                                speciesId === item.id
                                  ? "border-forest bg-forest text-cream"
                                  : "border-line text-charcoal/75 hover:border-forest/40"
                              }`}
                            >
                              {item.name}
                              {speciesId === item.id && <Check size={15} />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <h3 className="font-display text-xl text-forest">
                          Select Format
                        </h3>
                        <p className="mt-1 text-sm text-charcoal/60">
                          How should this timber be supplied?
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {FORMATS.map((f) => (
                            <button
                              type="button"
                              key={f.value}
                              onClick={() => setFormat(f.value)}
                              className={`rounded-xl border p-4 text-left transition ${
                                format === f.value
                                  ? "border-forest bg-forest text-cream"
                                  : "border-line text-charcoal/75 hover:border-forest/40"
                              }`}
                            >
                              <p className="text-sm font-medium">{f.value}</p>
                              <p
                                className={`mt-1 text-xs ${
                                  format === f.value ? "text-cream/70" : "text-charcoal/50"
                                }`}
                              >
                                {f.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h3 className="font-display text-xl text-forest">
                          Specify Volume
                        </h3>
                        <p className="mt-1 text-sm text-charcoal/60">
                          Estimated quantity required, in {selectedFormat.unit}.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                          <input
                            type="number"
                            min={0}
                            required
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            placeholder="e.g. 250"
                            className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-ochre"
                          />
                          <span className="shrink-0 rounded-lg bg-sand px-4 py-3 text-sm font-medium text-charcoal/70">
                            {selectedFormat.unit}
                          </span>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <h3 className="font-display text-xl text-forest">
                          Delivery Location
                        </h3>
                        <p className="mt-1 text-sm text-charcoal/60">
                          Enter your Bengaluru site pin code.
                        </p>
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                          placeholder="560026"
                          className="mt-6 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-ochre"
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/60 transition hover:text-forest disabled:opacity-0"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  {step < STEP_LABELS.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canAdvance[step]}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canAdvance[3]}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ochre px-6 py-3 text-sm font-medium text-cream transition hover:bg-ochre-dark disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Generate Inquiry
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-ochre">
                Inquiry Summary
              </p>
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-line bg-sand p-5 font-sans text-sm leading-relaxed text-charcoal">
                {summary}
              </pre>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={sendOnWhatsApp}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-forest-light"
                >
                  Send via WhatsApp
                  <Send size={15} />
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(0);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-charcoal/70 transition hover:border-forest hover:text-forest"
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
