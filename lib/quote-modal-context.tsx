"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import QuoteModal from "@/components/QuoteModal";

interface QuoteModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={close} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}
