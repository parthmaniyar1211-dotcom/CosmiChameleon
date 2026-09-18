import { useState } from "react";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { SharedCanvas } from "./components/three/SharedCanvas";
import { Navigation } from "./components/ui/Navigation";
import { ProjectModal } from "./components/ui/ProjectModal";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Industries } from "./components/sections/Industries";
import { Products } from "./components/sections/Products";
import { Work } from "./components/sections/Work";
import { Process } from "./components/sections/Process";
import { WhyUs } from "./components/sections/WhyUs";
import { Technology } from "./components/sections/Technology";
import { FinalCTA } from "./components/sections/FinalCTA";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import type { ProjectItem } from "./content/projects";

export function App() {
  const { activeSection } = useScrollProgress();

  // Coordinated section states linked to the 3D scene
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  // Standard Experience Option (User Accessibility & Low GPU Toggle)
  const [isStandardExperience, setIsStandardExperience] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cosmichameleon_standard_mode") === "true";
    }
    return false;
  });

  const handleToggleStandardExperience = (standard: boolean) => {
    setIsStandardExperience(standard);
    try {
      localStorage.setItem("cosmichameleon_standard_mode", standard ? "true" : "false");
    } catch {
      // Storage unavailable
    }
  };

  return (
    <div className="relative min-h-screen bg-cosmic-950 text-neutral-100 selection:bg-accent-cyan/20 selection:text-accent-cyan">
      {/* Floating Glass Navigation Header with Standard Experience Control */}
      <Navigation
        activeSection={activeSection}
        isStandardExperience={isStandardExperience}
        onToggleStandardExperience={handleToggleStandardExperience}
      />

      {/* ONE Shared 3D Canvas across the entire continuous scroll journey */}
      <SharedCanvas
        activeServiceIndex={activeServiceIndex}
        activeProductIndex={activeProductIndex}
        activeProjectIndex={activeProjectIndex}
        activeTechIndex={activeTechIndex}
        isStandardExperience={isStandardExperience}
      />

      {/* Real HTML Content Layers */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services
          activeIndex={activeServiceIndex}
          onSelectService={setActiveServiceIndex}
        />
        <Industries />
        <Products
          activeProductIndex={activeProductIndex}
          onSelectProduct={setActiveProductIndex}
        />
        <Work
          onSelectProject={(project) => setModalProject(project)}
          onHoverProject={setActiveProjectIndex}
        />
        <Process />
        <WhyUs />
        <Technology
          activeTechIndex={activeTechIndex}
          onSelectTech={setActiveTechIndex}
        />
        <FinalCTA />
        <Contact />
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}

export default App;
