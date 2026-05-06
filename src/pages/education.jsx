import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaGraduationCap } from "react-icons/fa";
import sairamLogo from "../assets/sairam.jpg";
import snptLogo from "../assets/snpt.jpg";

const educationData = [
  {
    degree: "B.E – Computer Science And Engineering",
    institution: "Sri Sairam Engineering College, West Tambaram, Chennai",
    duration: "2023–2027",
    status: "On-Process",
    cgpa: "7.57 CGPA",
    logo: sairamLogo,
    mapUrl: "https://maps.app.goo.gl/aG6hgzAUu1m7eU4k7",
  },
  {
    degree: "HSE – Computer Science",
    institution: "Shree Niketan Patasala, Mannivakkam, Chennai",
    duration: "2021–2023",
    status: "Completed",
    cgpa: null,
    logo: snptLogo,
    mapUrl: "https://maps.app.goo.gl/napec4ZSwSxhsYbt6",
  },
];

const Education = () => {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ amount: 0.3 }}
      className="relative bg-transparent text-white px-6 py-24 font-[Ubuntu] overflow-hidden scroll-mt-24"
    >
      {/* === Background Glow Circles === */}
      {/* === Background Glow Circles === */}

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 relative z-10">
        <motion.div
          className="flex items-center mb-8 px-4 py-2 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaGraduationCap className="text-4xl mr-3 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold font-[Ubuntu]">
            <span className="text-yellow-300">My </span>
            <span className="text-purple-300">Education</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col gap-10 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          transition={{ staggerChildren: 0.3 }}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/5 border border-white/10 border-l-4 border-purple-500 hover:border-yellow-400 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition duration-300 px-6 py-6 md:py-8 flex flex-col md:flex-row items-start gap-6 hover:scale-[1.02]"
            >
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-yellow-300 mb-1">{edu.degree}</h3>
                <p className="text-gray-200 mb-2">{edu.institution}</p>
                <p className="text-emerald-400 text-sm font-medium mb-3">
                  {edu.duration} | {edu.status}{" "}
                  {edu.cgpa && `| ${edu.cgpa}`}
                </p>
                <a
                  href={edu.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-blue-300 hover:text-yellow-200"
                >
                  📍 View on Google Maps
                </a>
              </div>
              <div className="w-full md:w-1/3 h-40 rounded-xl overflow-hidden shadow-md">
                <img
                  src={edu.logo}
                  alt={edu.institution}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
