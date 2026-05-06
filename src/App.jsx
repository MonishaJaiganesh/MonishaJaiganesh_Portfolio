import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Skills from "./pages/skills";

import Projects from "./pages/project";
import Experience from "./pages/experience";
import Contact from "./pages/contact";
import Background3D from "./components/Background3D";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";
import "./App.css";

function App() {
  // Always scroll to top on mount (page load / reload)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <div className="text-white font-[Ubuntu] overflow-x-hidden relative" style={{ cursor: "none" }}>
      <CustomCursor />
      <Background3D />
      <Navbar />

      {/* Radial gradient background glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `radial-gradient(circle at bottom, #000000 40%, #3b3a3a 50%, #000 80%)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      {/* Interactive particle layer */}
      <ParticleBackground />

      <div className="relative z-10">
        <section id="home" className="scroll-mt-1 py-1">
          <Home />
        </section>

        <section id="about" className="scroll-mt-1 py-1">
          <About />
        </section>

        <section id="skills" className="scroll-mt-1 py-1">
          <Skills />
        </section>

        <section id="experience" className="scroll-mt-1 py-1">
          <Experience />
        </section>

        <section id="projects" className="scroll-mt-1 py-1">
          <Projects />
        </section>

        <section id="contact" className="scroll-mt-1 py-1">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
