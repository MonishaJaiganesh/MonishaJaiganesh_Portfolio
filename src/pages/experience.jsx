import { motion } from "framer-motion";

const domainCertifications = [
  {
    name: "Operating Systems Fundamentals",
    provider: "NPTEL",
    color: "#facc15",
  },
  {
    name: "Compiler Design",
    provider: "NPTEL",
    color: "#facc15",
  },
  {
    name: "Introduction to IOT",
    provider: "NPTEL",
    color: "#facc15",
  },
  {
    name: "Cloud Computing",
    provider: "NPTEL",
    color: "#facc15",
  },
];

const coreSubjects = [
  { name: "Data Structures in Java", provider: "NPTEL" },
  { name: "Python for Data Science", provider: "NPTEL" },
  { name: "C Programming", provider: "GUVI" },
  { name: "Python Programming", provider: "Great Learning" },
  { name: "AWS Cloud Practitioner", provider: "UDEMY" },
  { name: "Networking Basics", provider: "Cisco" },
  { name: "Introduction to Modern AI", provider: "CISCO" },
  { name: "Principles of Gen AI", provider: "Infosys" },
  { name: "Introduction to AI - Premier", provider: "Infosys" },
];

const experiences = [
  {
    role: "Database Management Intern",
    company: "Foxconn India Pvt Ltd",
    period: "Jun 2025 – Jul 2025",
    location: "Remote",
    type: "Database Management",
    accentColor: "#facc15",
    borderColor: "rgba(250,204,21,0.25)",
    gradFrom: "rgba(250,204,21,0.08)",
    points: [
      "Collaborated with a multidisciplinary team to engineer embedded IoT solutions for smart manufacturing by integrating 15+ industrial sensors.",
      "Streamlined manufacturing workflows through real-time data analysis, contributing to a 12% improvement in operational efficiency.",
    ],
  },
  {
    role: "Artificial Intelligence & Machine Learning Intern",
    company: "Infosys Limited",
    period: "Sep 2025 – Oct 2025",
    location: "Chennai",
    type: "AI / ML",
    accentColor: "#a78bfa",
    borderColor: "rgba(167,139,250,0.25)",
    gradFrom: "rgba(167,139,250,0.08)",
    points: [
      "Partnered with senior engineers to develop a high-precision ML model for real estate price prediction, achieving a 94% accuracy rate.",
      "Performed extensive feature engineering to identify key valuation drivers, improving model performance metrics by 18%.",
    ],
  },
  {
    role: "Networking Intern",
    company: "Cisco Networking Academy",
    period: "Jul 2025 – Aug 2025",
    location: "Remote",
    type: "Networking",
    accentColor: "#38bdf8",
    borderColor: "rgba(56,189,248,0.25)",
    gradFrom: "rgba(56,189,248,0.08)",
    points: [
      "Designed hierarchical network topologies using Cisco Packet Tracer.",
      "Implemented proper subnetting and IP allocation strategies.",
      "Simulated real-world connectivity, routing, and traffic validation scenarios.",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.07, ease: "easeOut" },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 overflow-hidden bg-transparent font-[Ubuntu]"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl z-10 mt-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.05 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-white">Work </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-violet-400 to-pink-400">
              Experience
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm tracking-widest uppercase font-mono">
            Internships & Professional Work
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Vertical line */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-yellow-400/40 via-violet-400/30 to-sky-400/30 hidden md:block" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="relative flex gap-6 md:ml-16"
            >
              {/* Timeline dot */}
              <div
                className="hidden md:flex absolute -left-[52px] top-6 w-4 h-4 rounded-full border-2 items-center justify-center flex-shrink-0"
                style={{
                  borderColor: exp.accentColor,
                  boxShadow: `0 0 10px ${exp.accentColor}66`,
                  background: "#0a0a0a",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: exp.accentColor }}
                />
              </div>

              {/* Card */}
              <div
                className="w-full rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: "rgba(8,8,10,0.75)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${exp.borderColor}`,
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Radial tint */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${exp.gradFrom} 0%, transparent 65%)`,
                  }}
                />

                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${exp.accentColor}, transparent)`,
                    boxShadow: `0 0 10px ${exp.accentColor}55`,
                  }}
                />

                <div className="relative z-10">
                  {/* Badge row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border font-mono tracking-wider"
                      style={{
                        color: exp.accentColor,
                        borderColor: `${exp.accentColor}44`,
                        background: `${exp.accentColor}11`,
                      }}
                    >
                      {exp.type}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">
                      📍 {exp.location}
                    </span>
                    <span className="text-gray-500 text-xs font-mono ml-auto">
                      🗓 {exp.period}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: exp.accentColor }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 text-sm font-semibold mb-4 tracking-wide">
                    @ {exp.company}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                      >
                        <span
                          style={{ color: exp.accentColor }}
                          className="mt-1 flex-shrink-0"
                        >
                          ▹
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Certifications Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-400">
                Certifications
              </span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm tracking-widest uppercase font-mono">
              Professional Credentials & Training
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Domain Papers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                  System Design Domain Specializations
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              </div>

              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {domainCertifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="relative rounded-xl p-4 overflow-hidden group"
                    style={{
                      background: "rgba(8,8,10,0.75)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${cert.color}22`,
                      boxShadow:
                        "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    {/* Accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background: cert.color,
                        boxShadow: `0 0 8px ${cert.color}66`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start gap-3">
                        <span
                          className="text-lg mt-0.5 flex-shrink-0"
                          style={{ color: cert.color }}
                        >
                          ◆
                        </span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-base leading-snug mb-1">
                            {cert.name}
                          </h4>
                          {cert.subtitle && (
                            <p className="text-gray-400 text-xs mb-1 italic">
                              {cert.subtitle}
                            </p>
                          )}
                          <p
                            className="text-xs font-mono font-bold tracking-wider"
                            style={{ color: cert.color }}
                          >
                            {cert.provider}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${cert.color}08 0%, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Core Subjects with Bulletins */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
                  Core Subjects
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              </div>

              <div
                className="relative rounded-xl p-6 overflow-hidden"
                style={{
                  background: "rgba(8,8,10,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: "linear-gradient(90deg, #34d399, #14b8a6)",
                    boxShadow: "0 0 10px rgba(52,211,153,0.4)",
                  }}
                />

                {/* Radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at top right, rgba(52,211,153,0.05) 0%, transparent 60%)",
                  }}
                />

                <motion.ul
                  className="space-y-3 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {coreSubjects.map((subject, idx) => (
                    <motion.li
                      key={idx}
                      variants={cardVariants}
                      className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed group"
                    >
                      <span className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-200">
                        •
                      </span>
                      <div className="flex-1">
                        <span className="text-white font-medium">
                          {subject.name}
                        </span>
                        <span className="text-emerald-400 font-mono text-xs ml-2">
                          ({subject.provider})
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
