import React from "react";
import { motion } from "framer-motion";
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaAws,
  FaDocker,
  FaGitlab,
  FaCloud,
} from "react-icons/fa";
import {
  SiJavascript,
  SiC,
  SiFastapi,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiFlutter,
  SiPrometheus,
  SiGrafana,
  SiGithubactions,
  SiNextdotjs,
  SiPandas,
  SiScikitlearn,
  SiPlotly,
} from "react-icons/si";

const frontendSkills = [
  { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
  { name: "React", icon: <FaReact />, color: "#61dafb" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
  { name: "HTML5", icon: <FaHtml5 />, color: "#e34f26" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572b6" },
  { name: "Flutter", icon: <SiFlutter />, color: "#54c5f8" },
  { name: "Java", icon: <FaJava />, color: "#f89820" },
  { name: "Python", icon: <FaPython />, color: "#3776ab" },
  { name: "C", icon: <SiC />, color: "#a8b9cc" },
];

const backendSkills = [
  { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
  { name: "MySQL", icon: <SiMysql />, color: "#4479a1" },
  { name: "Firebase", icon: <SiFirebase />, color: "#ffca28" },
  { name: "Pandas", icon: <SiPandas />, color: "#e70488" },
  { name: "Scikit-learn", icon: <SiScikitlearn />, color: "#f7931e" },
  { name: "Matplotlib", icon: <SiPlotly />, color: "#11a0d9" },
];

const devopsSkills = [
  { name: "Docker", icon: <FaDocker />, color: "#2496ed" },
  { name: "AWS", icon: <FaAws />, color: "#ff9900" },
  { name: "GitLab", icon: <FaGitlab />, color: "#fc6d26" },
  { name: "GitHub Actions", icon: <SiGithubactions />, color: "#2088ff" },
  { name: "Grafana", icon: <SiGrafana />, color: "#f46800" },
  { name: "Prometheus", icon: <SiPrometheus />, color: "#e6522c" },
  { name: "Cloud", icon: <FaCloud />, color: "#00bfff" },
];

const categories = [
  {
    label: "Frontend & Languages",
    skills: frontendSkills,
    accent: "#facc15",          // yellow
    gradFrom: "rgba(250,204,21,0.12)",
    gradTo: "rgba(250,204,21,0)",
    borderColor: "rgba(250,204,21,0.2)",
    barColor: "#facc15",
  },
  {
    label: "Backend",
    skills: backendSkills,
    accent: "#a78bfa",          // violet
    gradFrom: "rgba(167,139,250,0.12)",
    gradTo: "rgba(167,139,250,0)",
    borderColor: "rgba(167,139,250,0.2)",
    barColor: "#a78bfa",
  },
  {
    label: "DevOps",
    skills: devopsSkills,
    accent: "#fb923c",          // orange
    gradFrom: "rgba(251,146,60,0.12)",
    gradTo: "rgba(251,146,60,0)",
    borderColor: "rgba(251,146,60,0.2)",
    barColor: "#fb923c",
  },
];

const SkillBadge = ({ skill, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.05, delay }}
    whileHover={{ y: -6, scale: 1.07 }}
    className="flex flex-col items-center gap-2 group"
  >
    {/* Icon circle */}
    <div
      className="w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontSize: "1.75rem",
        color: skill.color,
        boxShadow: `0 0 0 0 ${skill.color}33`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 18px 4px ${skill.color}44`;
        e.currentTarget.style.background = `${skill.color}14`;
        e.currentTarget.style.borderColor = `${skill.color}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 ${skill.color}33`;
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {skill.icon}
    </div>
    <span className="text-[11px] font-medium text-gray-400 group-hover:text-white transition-colors duration-200 text-center leading-tight">
      {skill.name}
    </span>
  </motion.div>
);

const SkillCard = ({ cat, cardDelay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.07, delay: cardDelay }}
    className="relative rounded-2xl overflow-hidden flex flex-col"
    style={{
      background: "rgba(8,8,10,0.7)",
      backdropFilter: "blur(20px)",
      border: `1px solid ${cat.borderColor}`,
      boxShadow: `0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
    }}
  >
    {/* Top gradient wash */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at top left, ${cat.gradFrom} 0%, ${cat.gradTo} 60%)`,
      }}
    />

    {/* Glowing top bar */}
    <div
      className="h-[3px] w-full"
      style={{
        background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
        boxShadow: `0 0 12px 2px ${cat.accent}66`,
      }}
    />

    <div className="relative z-10 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-1.5 h-7 rounded-full"
          style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }}
        />
        <h3
          className="text-lg font-bold tracking-wide"
          style={{ color: cat.accent }}
        >
          {cat.label}
        </h3>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-5">
        {cat.skills.map((skill, idx) => (
          <SkillBadge key={idx} skill={skill} delay={cardDelay + idx * 0.01} />
        ))}
      </div>
    </div>
  </motion.div>
);

const Skills = () => (
  <section
    id="skills"
    className="min-h-screen relative w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-transparent font-[Ubuntu]"
  >
    {/* Ambient glows */}
    <div className="absolute top-1/3 left-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="w-full max-w-6xl flex flex-col items-center z-10">
      {/* Title */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.05 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-white">Technical </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-violet-400 to-orange-400">
            Arsenal
          </span>
        </h2>
        <p className="mt-3 text-gray-500 text-sm tracking-widest uppercase font-mono">
          Tools & technologies I work with
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {categories.map((cat, i) => (
          <SkillCard key={i} cat={cat} cardDelay={i * 0.02} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
