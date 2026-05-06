import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/5 bg-black/20 backdrop-blur-md mt-auto">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Copyright Text */}
        <div className="text-gray-400 text-sm font-medium tracking-wide font-[Ubuntu]">
          © {new Date().getFullYear()} Monisha Jaiganesh. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/MonishaJaiganesh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/monishajaiganesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0077b5] transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
