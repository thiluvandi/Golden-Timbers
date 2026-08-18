"use client";

import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
