import FeaturesSection from "@/sections/FeaturesSection";
import MainSection from "@/sections/MainSection";
import PerformanceSection from "@/sections/PerformanceSection";
import TableSection from "@/sections/TableSection";
import EcoSystemSection from "@/sections/EcoSystemSection";
import LatestSection from "@/sections/LatestSection";
import RotatingBackgroundTorus from "@/threejs/RotatingBackgroundTorus";
import CombinedWireframeScene from "@/threejs/WireframeScene";
import FAQSection from "@/sections/FAQSection";
import Accordion from "@/sections/FAQSection";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <MainSection />
      <FeaturesSection />
      <PerformanceSection />
      <TableSection />
      <EcoSystemSection />
      <LatestSection />
      <Accordion />
      {/* <RotatingBackgroundTorus /> */}
      {/* <CombinedWireframeScene type={"upper"} /> */}
    </main>
  );
}
