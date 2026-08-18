import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Us — Golden Timbers",
  description:
    "Golden Timbers has been Bengaluru's trusted B2B timber trade partner since 1985 — learn about our story and craft.",
};

export default function AboutPage() {
  return <About />;
}
