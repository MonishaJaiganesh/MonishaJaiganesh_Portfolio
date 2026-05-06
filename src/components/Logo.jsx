import React from "react";
import { motion } from "framer-motion";

export default function Logo() {
    return (
        <a href="#home" className="block w-12 h-12 relative group cursor-pointer">
            <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]"
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.1, rotate: 10, transition: { duration: 0.3 } }}
            >
                {/* Hexagon Background */}
                <motion.path
                    d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: { duration: 2, ease: "easeInOut" }
                        }
                    }}
                    className="group-hover:stroke-cyan-400 transition-colors duration-300"
                />

                {/* 'MJ' Monogram */}
                <motion.text
                    x="50"
                    y="63"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fontFamily="Ubuntu, sans-serif"
                    fill="#FACC15"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
                        }
                    }}
                    className="group-hover:fill-cyan-400 transition-colors duration-300"
                >
                    MJ
                </motion.text>



                {/* Gradients */}
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                        <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Glow Effect Layer */}
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </a>
    );
}
