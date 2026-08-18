import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Catalog from "@/components/Catalog";
import Services from "@/components/Services";
import Sustainability from "@/components/Sustainability";
import Estimator from "@/components/Estimator";
import HashScrollHandler from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <Metrics />
      <Catalog />
      <Services />
      <Sustainability />
      <Estimator />
    </>
  );
}
