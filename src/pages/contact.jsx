import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-[120px] -z-10" />

        {/* Section heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Contact
            </span>
          </h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase font-mono">
            Let's work together
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="w-full max-w-2xl bg-[#111318] border border-white/10 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-white text-2xl font-bold mb-3">Get in Touch</h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            I'm always open to discussing new projects, internship
            opportunities, or just having a chat about technology. Feel free to
            reach out!
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Email — cyan filled */}
            <motion.a
              href="mailto:monishajaiganesh@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-pink-500 text-white font-semibold text-sm rounded-lg shadow-md shadow-pink-500/30 hover:brightness-110 transition-all duration-200"
            >
              <FaEnvelope className="text-base" />
              monishajaiganesh@gmail.com
            </motion.a>

            {/* LinkedIn — dark outlined */}
            <motion.a
              href="https://www.linkedin.com/in/monishajaiganesh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-transparent border border-white/20 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <FaLinkedin className="text-base text-[#0A66C2]" />
              LinkedIn
            </motion.a>

            {/* GitHub — dark outlined */}
            <motion.a
              href="https://github.com/monishajaiganesh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-transparent border border-white/20 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <FaGithub className="text-base" />
              GitHub
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
