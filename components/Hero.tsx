"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import { useQuoteModal } from "@/lib/quote-modal-context";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const { open } = useQuoteModal();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollProgress.current = latest;
  });

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-cream"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(115deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(115deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
        aria-hidden
      >
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(0.5) sepia(0.1) contrast(1.05)" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0">
          <Scene scrollProgress={scrollProgress} />
        </motion.div>
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-24 lg:max-w-[62%] lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block w-fit rounded-full bg-cream/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-ochre backdrop-blur-sm"
        >
          Golden Timbers · Bengaluru Since 1985
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance mt-5 max-w-xl font-display text-5xl leading-[1.05] text-forest sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
        >
          Premium Timber.
          <br />
          Precision Milled.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-balance text-base leading-relaxed text-charcoal/75 sm:text-lg"
        >
          Bangalore&rsquo;s trusted B2B timber trade partner since 1985. Delivering
          premium teak, pine, hardwoods, and custom sawmilling solutions across
          Karnataka.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={scrollToCatalog}
            className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-forest-light"
          >
            Explore Wood Species
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-cream/60 px-7 py-3.5 text-sm font-medium text-forest backdrop-blur transition hover:border-forest hover:bg-cream"
          >
            Request Quote / Rate Sheet
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          onClick={scrollToCatalog}
          className="absolute bottom-10 left-6 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal/50 transition hover:text-forest sm:flex lg:left-10"
        >
          <MoveDown size={14} className="animate-bounce" />
          Scroll
        </motion.button>
      </motion.div>
    </section>
  );
}
