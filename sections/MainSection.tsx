import MainContent from "../components/MainContent";
import NodeProcessor from "@/components/NodeProcessor";
import InteractiveCanvasBackground from "@/components/InteractiveCanvasBackground";

const Main = () => {
  return (
    <section className="relative overflow-x-hidden wider-blur-container">
      <InteractiveCanvasBackground />
      <MainContent />
      <NodeProcessor />
    </section>
  );
};

export default Main;
