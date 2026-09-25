import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSections";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <StatsSection/>
      <FeaturesSection/>
      <PricingSection/>
    </div>
  );
}
