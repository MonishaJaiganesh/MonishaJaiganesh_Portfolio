
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AquaPulseImg from "../assets/aqua_pulse.png";
import PropertyPulseImg from "../assets/property_pulse.png";
import AIHoneypotImg from "../assets/ai_honeypot.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Aqua Pulse",
    category: "IoT / Research",
    description: "Developed a biomimetic IoT fish equipped with pH and turbidity sensors, achieving 98% sensor reliability. Built a data pipeline via ESP32 for real-time cloud synchronization. Published in IEEE Xplore.",
    tags: ["IoT", "ESP32", "Sensors"],
    image: AquaPulseImg,
    github: "https://github.com/MonishaJaiganesh/AquaPulse_App",
  },
  {
    id: 2,
    title: "Property Pulse",
    category: "AI / ML",
    description: "Architected an ML model for real estate prediction, achieving 94% accuracy across 5,000+ records using advanced regression techniques. Published research in IEEE Xplore.",
    tags: ["Python", "Scikit-learn", "ML"],
    image: PropertyPulseImg,
    github: "https://github.com/MonishaJaiganesh/AI_Estate_Prediction",
  },
  {
    id: 3,
    title: "AI Honeypot System",
    category: "Cybersecurity",
    description: "Advanced AI-driven honeypot system designed for proactive threat detection and analysis, utilizing language models and scalable databases.",
    tags: ["FastAPI", "Langchain", "PostgreSQL"],
    image: AIHoneypotImg,
    github: "https://github.com/MonishaJaiganesh/AI_Agentic_Honeypot_System_Finale",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = gsap.utils.toArray(".project-card");

    // Animation loop to check for center elements and scale them
    // Title Animation - Removed as per request to keep it "behind" and stable
    // User wanted it "behind the project and dont go up". 
    // We will rely on CSS positioning to keep it centered and fixed in the container.

    const updateScales = () => {
      const center = window.innerWidth / 2;
      // Get current transform X of the slider (optimized to avoid reflows)
      const currentX = gsap.getProperty(sliderRef.current, "x") || 0;

      cards.forEach((card) => {
        // Calculate card center relative to the slider's start
        // We assume the slider starts at x=0 relative to the viewport initially (before scroll)
        // Actually, the slider is centered via flex/padding, so offsetLeft gives pos relative to slider parent.

        // However, simpler relative math:
        // Card's absolute position = (Card's Offset Left) + (Slider's current X Translation)
        const cardX = card.offsetLeft + card.offsetWidth / 2;
        const cardCenterInViewport = cardX + currentX;

        const distance = Math.abs(center - cardCenterInViewport);
        const maxDistance = 500;

        let scale = gsap.utils.mapRange(0, maxDistance, 1, 0.8, distance);
        scale = gsap.utils.clamp(0.8, 1, scale);

        let opacity = gsap.utils.mapRange(0, maxDistance, 1, 0.5, distance);
        opacity = gsap.utils.clamp(0.5, 1, opacity);

        let zIndex = scale > 0.9 ? 10 : 1;

        gsap.set(card, {
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          overwrite: 'auto'
        });
      });
    };

    let ctx = gsap.context(() => {
      // Add scroll listener to the slider itself (for manual touch override or initial check)
      window.addEventListener("resize", updateScales);

      // Horizontal Scroll Animation
      const getScrollAmount = () => {
        if (!sliderRef.current) return 0;
        return -(sliderRef.current.scrollWidth - window.innerWidth + 100);
      };

      const tween = gsap.to(sliderRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.3, // Faster response/less lag
          invalidateOnRefresh: true,
          end: () => "+=" + (sliderRef.current ? sliderRef.current.scrollWidth : 2000),
          onUpdate: updateScales
        }
      });

      // Initial call to set scales
      updateScales();

    }, containerRef);

    // Refresh ScrollTrigger after a slight delay 
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      window.removeEventListener("resize", updateScales);
    };
  }, []);

  return (
    <section ref={containerRef} id="projects" className="relative h-screen bg-transparent overflow-hidden flex flex-col justify-center">

      {/* Background Glow for Contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Background Title - Positioned Higher */}
      <div className="my-works-title absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
        <h2 className="text-[12vw] font-[900] text-transparent bg-clip-text bg-gradient-to-b from-cyan-200/20 via-white/10 to-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.1)] uppercase tracking-widest leading-none whitespace-nowrap">
          My Works
        </h2>
      </div>

      <div className="w-full relative z-10 px-0">
        {/* Horizontal Slider Container */}
        {/* We remove overflow-x-auto because GSAP will handle the translation (x) via ScrollTrigger pin */}
        <div
          ref={sliderRef}
          className="flex items-center gap-10 px-[50vw] w-max" // Padding to center first/last items
          style={{ willChange: "transform" }} // Performance hint
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card relative w-[70vw] md:w-[500px] h-[50vh] flex-shrink-0 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col shadow-cyan-900/20"
              style={{ transformOrigin: "center center", willChange: "transform, opacity" }} // Performance hint
            >
              {/* Image Area - Top 60% */}
              <div className="h-[60%] w-full relative overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />

                <div className="absolute bottom-4 left-6">
                  <span className="inline-block bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white font-[Syne] leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Content Area - Bottom 40% */}
              <div className="flex-1 p-6 relative">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-0 right-6 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform cursor-pointer text-black text-xl no-underline"
                >
                  ↗
                </a>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-gray-500 border border-white/5 px-2 py-1 rounded bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;
