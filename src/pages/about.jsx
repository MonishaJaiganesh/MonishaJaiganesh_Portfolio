
import { motion } from "framer-motion";
import profileImage from "../assets/me1.jpeg";
import AboutProfile from "../components/AboutProfile";

export default function About() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.02
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.07, ease: "easeOut" }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.05, ease: "backOut" }
    }
  };

  const headingText = "About Me";

  return (
    <section
      id="about"
      className="min-h-screen relative bg-transparent text-white px-6 py-24 font-[Ubuntu] flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10">

        {/* === Left: Text Content === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Animated Heading with Glitch Effect on Hover */}
          <motion.h2
            className="text-4xl sm:text-6xl font-bold flex justify-center lg:justify-start gap-2 overflow-hidden cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            {headingText.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className={`inline-block ${char === " " ? "w-4" : ""}`}
                whileHover={{
                  y: -5,
                  color: "#22d3ee",
                  textShadow: "0 0 8px rgba(34,211,238,0.8)"
                }}
              >
                {char === "M" || char === "e" ? <span className="text-yellow-400">{char}</span> : char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Bio Paragraphs with Glass Cards */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
              <p className="relative text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 transition-colors">
                I'm a pre-final year Computer Science student at{" "}
                <span className="text-yellow-300 font-semibold relative inline-block group/link cursor-pointer">
                  Sri Sairam Engineering College
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover/link:w-full"></span>
                </span>
                . I don't just write code; I engineer digital experiences that bridge the gap between imagination and reality.
              </p>
            </div>
          </motion.div>

          {/* Floating Tech Card - Upgraded */}
          <motion.div
            variants={itemVariants}
            className="relative p-6 border-l-4 border-cyan-500 bg-slate-800/40 rounded-r-xl backdrop-blur-md overflow-visible group hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <p className="relative text-base text-gray-200 z-10">
              <span className="text-cyan-400 font-bold tracking-wide uppercase text-sm">Technical Arsenal</span>
              <br />
              {/* <span className="text-lg font-medium">Full Stack  • GenAI  • Automation  • Competitive Coding</span> */}
            </p>

            {/* Vertical connector from box */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-cyan-500/60 to-cyan-500/30">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500/80"></div>
            </div>
          </motion.div>

          {/* Skills Lists Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 relative">
            {/* Horizontal connector line */}
            <div className="hidden sm:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

            {/* Left branch */}
            <div className="hidden sm:block absolute top-0 left-1/4 w-0.5 h-4 bg-gradient-to-b from-cyan-500/40 to-transparent"></div>

            {/* Right branch */}
            <div className="hidden sm:block absolute top-0 right-1/4 w-0.5 h-4 bg-gradient-to-b from-cyan-500/40 to-transparent"></div>

            {[
              { title: "Core Stacks", color: "purple", items: ["Full Stack Development", "App Development", "Cloud & DevOps"] },
              { title: "Passions", color: "cyan", items: ["Machine Learning", "Automation", "System Design"] }
            ].map((section, idx) => (
              <div key={idx} className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <h3 className={`text-lg font-semibold text-${section.color}-400 flex items-center justify-center lg:justify-start gap-2`}>
                  <span className={`w-2 h-2 bg-${section.color}-400 rounded-full group-hover:animate-ping`}></span>
                  {section.title}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 justify-center lg:justify-start"
                      whileHover={{ x: 5, color: section.color === "purple" ? "#a855f7" : "#22d3ee" }}
                    >
                      <span className="opacity-50">›</span> {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* === Right: New Unique 3D Profile === */}
        <div className="order-1 lg:order-2 hidden lg:flex justify-center lg:justify-center perspective-[2000px] z-20">
          <AboutProfile src={profileImage} />
        </div>

      </div>
    </section>
  );
}
