import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profileImage from "../assets/me2.jpeg";

// Scramble Text Component
const ScrambleText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

import Profile3D from "../components/Profile3D";

// Scramble Text Component

const HomePage = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Machine Learning Engineer",
    "Exploring GenAI",
    "Devops & Cloud Enthusiast",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.07 }}
      viewport={{ amount: 0.3 }}
      className="min-h-screen w-screen relative overflow-x-hidden bg-transparent font-[ubuntu] flex items-center justify-center pt-24 pb-12 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-8 items-center pointer-events-auto">
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 z-10 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.05 }}
          >
            <div className="inline-block px-3 py-1 mb-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
              <span className="text-cyan-400 font-mono text-xs tracking-wider">
                Available for Hire
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 font-[Syne]">
              Monisha <br />
              Jaiganesh
            </h1>

            <div className="flex items-center justify-center lg:justify-start space-x-3 text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
              <span>I'm a</span>
              <ScrambleText
                text={roles[currentRoleIndex]}
                className="font-bold text-yellow-400 tracking-wide font-mono"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.02, duration: 0.05 }}
            className="text-gray-400 text-lg leading-relaxed max-w-lg"
          >
            Crafting immersive digital experiences with modern web technologies.
            Passionate about clean code, 3D interactivity, and solving complex
            problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="flex gap-6 items-center pt-4"
          >
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer"
            >
              <button className="px-8 py-3.5 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Let's Talk
              </button>
            </Link>

            <div className="flex gap-4">
              {[
                { Icon: FaGithub, url: "https://github.com/MonishaJaiganesh" },
                {
                  Icon: FaLinkedin,
                  url: "https://www.linkedin.com/in/monishajaiganesh/",
                },
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300 text-white text-xl"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: 3D Profile Card */}
        <div className="order-1 lg:order-2 flex justify-center perspective-[2000px] z-20 mt-4 lg:mt-0">
          <Profile3D
            src={profileImage}
            className="w-64 h-[22rem] sm:w-80 sm:h-[28rem]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
