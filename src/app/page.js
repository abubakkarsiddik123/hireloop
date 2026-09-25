import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSections";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <StatsSection/>
      <FeaturesSection/>
    </div>
  );
}
